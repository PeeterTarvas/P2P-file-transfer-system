import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import './index.css';

const PeerComponent = () => {
    const [peerId, setPeerId] = useState('');
    const [remoteId, setRemoteId] = useState('');
    const [connection, setConnection] = useState(null);
    const [fileNotification, setFileNotification] = useState(null);
    const [receivedFile, setReceivedFile] = useState(null);
    const [messages, setMessages] = useState([]); // State to store messages
    const peerRef = useRef(null);

    useEffect(() => {
        // Create a PeerJS instance
        peerRef.current = new Peer();

        // On successful connection, set the peer ID
        peerRef.current.on('open', id => {
            setPeerId(id);
        });

        // Handle incoming connections
        peerRef.current.on('connection', conn => {
            conn.on('data', data => {
                // Handle incoming data (text or file)
                if (data.file) {
                    // Show a notification to download the file
                    setReceivedFile(data);
                    setFileNotification(`You received a file: ${data.fileName}. Do you want to download it?`);
                } else {
                    // Update messages with the received message
                    setMessages(prevMessages => [...prevMessages, { from: 'Remote', text: data }]);
                }
            });
            setConnection(conn);
        });

        // Cleanup on component unmount
        return () => {
            peerRef.current.destroy();
        };
    }, []);

    const connectToPeer = () => {
        const conn = peerRef.current.connect(remoteId);
        conn.on('open', () => {
            conn.send('Hello from ' + peerId);
            setConnection(conn);
            // Update messages with the sent message
            setMessages(prevMessages => [...prevMessages, { from: 'You', text: 'Hello from ' + peerId }]);
        });

        conn.on('data', data => {
            if (data.file) {
                setReceivedFile(data);
                setFileNotification(`You received a file: ${data.fileName}. Do you want to download it?`);
            } else {
                // Update messages with the received message
                setMessages(prevMessages => [...prevMessages, { from: 'Remote', text: data }]);
            }
        });
    };

    const sendMessage = (message) => {
        if (connection) {
            connection.send(message);
            // Update messages with the sent message
            setMessages(prevMessages => [...prevMessages, { from: 'You', text: message }]);
        }
    };

    const sendFile = (file) => {
        if (connection) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileData = {
                    file: new Uint8Array(e.target.result),
                    fileName: file.name,
                };
                connection.send(fileData);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const downloadFile = () => {
        if (receivedFile) {
            const blob = new Blob([receivedFile.file]);
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = receivedFile.fileName;
            link.click();
            setFileNotification(null); // Clear notification after download
            setReceivedFile(null); // Clear received file
        }
    };

    const ignoreFile = () => {
        setFileNotification(null); // Clear notification
        setReceivedFile(null); // Clear received file
    };

    return (
        <div>
            <h2>Your Peer ID: {peerId}</h2>
            <input
                type="text"
                placeholder="Enter Remote Peer ID"
                value={remoteId}
                onChange={(e) => setRemoteId(e.target.value)}
            />
            <button onClick={connectToPeer}>Connect</button>
            <br />
            <input
                type="file"
                onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                        sendFile(file);
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
            <br />
            <h3>Messages:</h3>
            <input
                type="text"
                placeholder="Type a message"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        sendMessage(e.target.value);
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
