import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Peer, { DataConnection } from "peerjs";
import { useFileNotifications } from "../notification.context";
import ApiManager from "../../services/api-manager";

interface PeerComponentProps {
    existingPeerId?: string;
    receiversPeerIds: string[];
    groupId?: string;
    renderComponent?: boolean;
    refreshFileHistory: () => void;
}

interface Message {
    id: string;
    from: "You" | "Remote";
    text: string;
    receivedAt: Date;
}

interface FileNotification {
    id: string;
    fileName: string;
    file: Uint8Array;
    sender: string;
    receivedAt: Date;
    groupId?: string;
}

const PeerComponent: React.FC<PeerComponentProps> = ({
                                                         existingPeerId,
                                                         receiversPeerIds,
                                                         groupId,
                                                         renderComponent = true,
                                                         refreshFileHistory,
                                                     }) => {
    const [peerId, setPeerId] = useState<string>(existingPeerId || "");
    const [connections, setConnections] = useState<DataConnection[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [newMessage, setNewMessage] = useState<string>("");
    const { addNotification } = useFileNotifications();
    const peerRef = useRef<Peer | null>(null);
    const connectionsRef = useRef<DataConnection[]>([]);
    const navigate = useNavigate();

    useEffect(() => {

        peerRef.current = existingPeerId
            ? new Peer(existingPeerId)
            : new Peer();

        peerRef.current.on("open", (id: string) => setPeerId(id));


        peerRef.current.on("connection", (conn: DataConnection) => {
            handleIncomingConnection(conn);
        });


        return () => {
            connectionsRef.current.forEach(conn => {
                conn.close();
            });
            connectionsRef.current = [];
            setConnections([]);
            peerRef.current?.destroy();
        };
    }, [existingPeerId]);

    useEffect(() => {
        connectionsRef.current.forEach(conn => {
            conn.close();
        });
        connectionsRef.current = [];
        setConnections([]);

        if (peerRef.current && receiversPeerIds.length > 0) {
            const newConnections = receiversPeerIds.map(id => {
                const conn = peerRef.current.connect(id);
                conn.on("open", () => {
                    if (receiversPeerIds.includes(id)) {
                        setConnections(prev => [...prev, conn]);
                    } else {
                        conn.close();
                    }
                });

                conn.on("data", (data: any) => handleIncomingData(data, conn));

                conn.on("close", () => {
                    setConnections(prev => prev.filter(c => c !== conn));
                    connectionsRef.current = connectionsRef.current.filter(c => c !== conn);
                });

                return conn;
            });

            connectionsRef.current = newConnections;
        }
    }, [receiversPeerIds, peerId]);

    const handleIncomingConnection = (conn: DataConnection) => {
        if (!receiversPeerIds.includes(conn.peer)) {
            conn.close();
            return;
        }

        conn.on("data", (data: any) => handleIncomingData(data, conn));
        conn.on("close", () => {
            setConnections(prev => prev.filter(c => c !== conn));
            connectionsRef.current = connectionsRef.current.filter(c => c !== conn);
        });

        setConnections(prev => [...prev, conn]);
        connectionsRef.current.push(conn);
    };

    const handleIncomingData = (data: any, conn: DataConnection) => {
        if (!receiversPeerIds.includes(conn.peer)) {
            conn.close();
            return;
        }

        if (data.type === "file") {
            const notification: FileNotification = {
                id: `${data.fileName}-${Date.now()}`,
                fileName: data.fileName,
                file: data.file,
                sender: conn.peer,
                receivedAt: new Date(),
                ...(groupId !== undefined && { groupId }),
            };
            addNotification(notification);
        } else if (data.type === "message") {
            const message: Message = {
                id: `${conn.peer}-${Date.now()}`,
                from: "Remote",
                text: data.text,
                receivedAt: new Date(),
            };
            setMessages(prev => [...prev, message]);
        }
        refreshFileHistory();
    };

    const broadcastFile = async (file: File) => {
        const reader = new FileReader();

        reader.onload = async (e) => {
            const fileData = {
                type: "file",
                file: new Uint8Array(e.target.result as ArrayBuffer),
                fileName: file.name,
            };
            connections.forEach((conn) => conn.send(fileData));
        };

        reader.readAsArrayBuffer(file);
        await createFileIndexForPeerId(file);
        refreshFileHistory();
    };

    const createFileIndexForPeerId = async (file: File) => {
        const storedPeerId = sessionStorage.getItem("peerId");

        if (!storedPeerId) {
            console.error("No peer ID found in session storage");
            return;
        }

        try {
            const fileDto = {
                name: file.name,
                size: file.size,
                id: undefined,
            };

            await ApiManager.createFileAvailabilityIndexByPeerId(storedPeerId, fileDto, groupId);
            console.log("File availability index updated successfully");
        } catch (error) {
            console.error("Error updating file availability index:", error);
        }
    };

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;

        const message: Message = {
            id: `${peerId}-${Date.now()}`,
            from: "You",
            text: newMessage,
            receivedAt: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, message]);

        connections.forEach((conn) =>
            conn.send({ type: "message", text: newMessage })
        );
        setNewMessage("");
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleSendFile = () => {
        if (selectedFile) {
            broadcastFile(selectedFile);
            setSelectedFile(null);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const goBack = () => {
        navigate(-1);
    };

    if (!renderComponent) {
        return null;
    }

    return (
        <div>
            <button onClick={goBack} style={{ marginBottom: "10px" }}>
                Back
            </button>
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{
                    border: "2px dashed #ccc",
                    padding: "20px",
                    marginBottom: "10px",
                    textAlign: "center",
                }}
            >
                Drag & Drop your file here
            </div>
            <input type="file" onChange={handleFileChange} />
            {selectedFile && (
                <div>
                    <p>Selected file: {selectedFile.name}</p>
                    <button onClick={handleSendFile}>Send File</button>
                </div>
            )}
            <div style={{ marginTop: "20px" }}>
        <textarea
            placeholder="Type your message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            rows={4}
            style={{ width: "100%" }}
        />
                <button onClick={handleSendMessage} style={{ marginTop: "10px" }}>
                    Send Message
                </button>
            </div>
            <div>
                <h3>Messages</h3>
                <ul>
                    {messages.map((msg) => (
                        <li key={msg.id}>
                            <strong>{msg.from}:</strong> {msg.text}{" "}
                            <em>({msg.receivedAt.toLocaleTimeString()})</em>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PeerComponent;
