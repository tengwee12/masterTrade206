// server.js

const express = require('express');
const http = require('http');
const WebSocket = require('ws');  //imports websocket library

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// WebSocket event handlers
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Handle incoming messages
  ws.on('message', (message) => {
    // Broadcast message to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
