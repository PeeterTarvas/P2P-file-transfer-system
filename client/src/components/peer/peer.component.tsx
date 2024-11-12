import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import '../../index.css';

const PeerComponent = ({ existingPeerId, receiversPeerIds }) => {
    console.log("Existing Peer ID: " + existingPeerId);
    console.log("Receivers Peer IDs: ", receiversPeerIds);  // To see the list of peer IDs

    const [peerId, setPeerId] = useState(existingPeerId || '');
    const [connections, setConnections] = useState([]);
    const [fileNotification, setFileNotification] = useState(null);
    const [receivedFile, setReceivedFile] = useState(null);
    const [messages, setMessages] = useState([]);
    const peerRef = useRef(null);

    // Initialize peer and handle connections
    useEffect(() => {
        if (existingPeerId) {
            peerRef.current = new Peer(existingPeerId);
        } else {
            peerRef.current = new Peer();
        }

        peerRef.current.on('open', id => setPeerId(id));

        peerRef.current.on('connection', conn => {
            conn.on('data', data => {
                if (data.file) {
                    setReceivedFile(data);
                    setFileNotification(`You received a file: ${data.fileName}. Do you want to download it?`);
                } else {
                    setMessages(prevMessages => [...prevMessages, { from: 'Remote', text: data }]);
                }
            });
            setConnections(prevConnections => [...prevConnections, conn]);
        });

        return () => peerRef.current.destroy();
    }, [existingPeerId]);

    // Connect to peers from receiversPeerIds prop
    useEffect(() => {
        if (receiversPeerIds.length > 0) {
            receiversPeerIds.forEach(id => {
                const conn = peerRef.current.connect(id);
                conn.on('open', () => {
                    conn.send('Hello from ' + peerId);
                    setConnections(prevConnections => [...prevConnections, conn]);
                    setMessages(prevMessages => [...prevMessages, { from: 'You', text: 'Hello from ' + peerId }]);
                });

                conn.on('data', data => {
                    if (data.file) {
                        setReceivedFile(data);
                        setFileNotification(`You received a file: ${data.fileName}. Do you want to download it?`);
                    } else {
                        setMessages(prevMessages => [...prevMessages, { from: 'Remote', text: data }]);
                    }
                });
            });
        }
    }, [receiversPeerIds, peerId]);  // Re-run when receiversPeerIds or peerId changes

    // Broadcast a message to all connected peers
    const broadcastMessage = message => {
        connections.forEach(conn => {
            conn.send(message);
        });
        setMessages(prevMessages => [...prevMessages, { from: 'You', text: message }]);
    };

    // Broadcast a file to all connected peers
    const broadcastFile = file => {
        const reader = new FileReader();
        reader.onload = e => {
            const fileData = {
                file: new Uint8Array(e.target.result),
                fileName: file.name,
            };
            connections.forEach(conn => conn.send(fileData));
        };
        reader.readAsArrayBuffer(file);
    };

    // Handle file download
    const downloadFile = () => {
        if (receivedFile) {
            const blob = new Blob([receivedFile.file]);
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = receivedFile.fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setFileNotification(null);
            setReceivedFile(null);
            URL.revokeObjectURL(url);
        }
    };

    // Ignore the received file
    const ignoreFile = () => {
        setFileNotification(null);
        setReceivedFile(null);
    };

    return (
        <div>
            <br />
            {/*<button>Add file</button>*/}
            <input
                type="file"
                onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                        broadcastFile(file);
                    }
                }}
            />
            <br />
            {fileNotification && (
                <div className="notification">
                    <p>{fileNotification}</p>
                    <button onClick={downloadFile}>Download</button>
                    <button onClick={ignoreFile}>Ignore</button>
                </div>
            )}
            <br />
            {/*<h3>Messages:</h3>
            <input
                type="text"
                placeholder="Type a message"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        broadcastMessage(e.target.value);
                        e.target.value = '';
                    }
                }}
            />
            <br />
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}><strong>{msg.from}:</strong> {msg.text}</li>
                ))}
            </ul>*/}
        </div>
    );
};

export default PeerComponent;
