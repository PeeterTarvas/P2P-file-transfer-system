import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import '../../index.css';

const PeerComponent = () => {
    const [peerId, setPeerId] = useState('');
    const [remoteIds, setRemoteIds] = useState(''); // To store multiple remote peer IDs in a comma-separated string
    const [connections, setConnections] = useState([]); // Array to store multiple connections
    const [fileNotification, setFileNotification] = useState(null);
    const [receivedFile, setReceivedFile] = useState(null);
    const [messages, setMessages] = useState([]); // State to store messages
    const peerRef = useRef(null);

    useEffect(() => {
        peerRef.current = new Peer();
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
            setConnections(prevConnections => [...prevConnections, conn]); // Add the new connection
        });

        return () => peerRef.current.destroy();
    }, []);

    const connectToPeers = () => {
        const ids = remoteIds.split(',').map(id => id.trim()); // Split and trim multiple IDs
        ids.forEach(id => {
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
    };

    const broadcastMessage = message => {
        connections.forEach(conn => {
            conn.send(message);
        });
        setMessages(prevMessages => [...prevMessages, { from: 'You', text: message }]);
    };

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

    const downloadFile = () => {
        if (receivedFile) {
            const blob = new Blob([receivedFile.file]);
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = receivedFile.fileName;
            document.body.appendChild(link);
            link.click(); // Trigger the download prompt
            document.body.removeChild(link); // Clean up
            setFileNotification(null);
            setReceivedFile(null);
            URL.revokeObjectURL(url); // Release the object URL
        }
    };

    const ignoreFile = () => {
        setFileNotification(null);
        setReceivedFile(null);
    };

    return (
        <div>
            <h2>Your Peer ID: {peerId}</h2>
            <input
                type="text"
                placeholder="Enter Remote Peer IDs (comma-separated)"
                value={remoteIds}
                onChange={(e) => setRemoteIds(e.target.value)}
            />
            <button onClick={connectToPeers}>Connect</button>
            <br />
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
            <h3>Messages:</h3>
            <input
                type="text"
                placeholder="Type a message"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        broadcastMessage(e.target.value);
                        e.target.value = ''; // Clear input after sending
                    }
                }}
            />
            <br />
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}><strong>{msg.from}:</strong> {msg.text}</li>
                ))}
            </ul>
        </div>
    );
};

export default PeerComponent;
