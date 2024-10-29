import React, { useEffect } from 'react';
import Peer from 'peerjs';

const PeerComponent = () => {
    useEffect(() => {
        const peer = new Peer({
            host: 'localhost',
            port: 9000,
            path: '/'
        });

        peer.on('open', (id) => {
            console.log('My peer ID is:', id);
        });

        peer.on('error', (err) => {
            console.error('Connection error:', err);
        });
    }, []);

    return (
        <div>
            <h1>PeerJS Client</h1>
            <p>Check the console for the peer ID</p>
        </div>
    );
};

export default PeerComponent;
