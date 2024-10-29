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

    useEffect(function () {
        peerRef.current = new Peer();
        peerRef.current.on('open', function (id) {
            setPeerId(id);
        });

        peerRef.current.on('connection', function (conn) {
            conn.on('data', function (data) {
                if (data.file) {
                    setReceivedFile(data);
                    setFileNotification(`You received a file: ${data.fileName}. Do you want to download it?`);
                } else {
                    setMessages(function (prevMessages) {
                        return [...prevMessages, { from: 'Remote', text: data }];
                    });
                }
            });
            setConnection(conn);
        });

        return function () {
            peerRef.current.destroy();
        };
    }, []);

    const connectToPeer = function () {
        const conn = peerRef.current.connect(remoteId);
        conn.on('open', function () {
            conn.send('Hello from ' + peerId);
            setConnection(conn);
            setMessages(function (prevMessages) {
                return [...prevMessages, { from: 'You', text: 'Hello from ' + peerId }];
            });
        });

        conn.on('data', function (data) {
            if (data.file) {
                setReceivedFile(data);
                setFileNotification(`You received a file: ${data.fileName}. Do you want to download it?`);
            } else {
                setMessages(function (prevMessages) {
                    return [...prevMessages, { from: 'Remote', text: data }];
                });
            }
        });
    };

    const sendMessage = function (message) {
        if (connection) {
            connection.send(message);
            setMessages(function (prevMessages) {
                return [...prevMessages, { from: 'You', text: message }];
            });
        }
    };

    const sendFile = function (file) {
        if (connection) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const fileData = {
                    file: new Uint8Array(e.target.result),
                    fileName: file.name,
                };
                connection.send(fileData);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const downloadFile = function () {
        if (receivedFile) {
            const blob = new Blob([receivedFile.file]);
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = receivedFile.fileName;
            link.click();
            setFileNotification(null);
            setReceivedFile(null);
        }
    };

    const ignoreFile = function () {
        setFileNotification(null);
        setReceivedFile(null);
    };

    return (
        <div>
            <h2>Your Peer ID: {peerId}</h2>
            <input
                type="text"
                placeholder="Enter Remote Peer ID"
                value={remoteId}
                onChange={function (e) {setRemoteId(e.target.value);}}
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
