import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';

const PeerComponent = () => {
    const [peerId, setPeerId] = useState('');
    const [remoteId, setRemoteId] = useState('');
    const [connection, setConnection] = useState(null);
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
                console.log('Received:', data);
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
        });

        conn.on('data', data => {
            console.log('Received:', data);
        });
    };

    const sendMessage = (message) => {
        if (connection) {
            connection.send(message);
        }
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
            <button onClick={() => sendMessage('Hello!')}>Send Message</button>
        </div>
    );
};

export default PeerComponent;
