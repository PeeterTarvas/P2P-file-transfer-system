import { PeerServer } from 'peer';  // Import the server component from peer package

const peerServer = PeerServer({ port: 9000, key: 'peerjs' });

peerServer.on('connection', (client) => {
    console.log('Client connected:', client.id);
});

console.log('PeerJS server is running on port 9000');


