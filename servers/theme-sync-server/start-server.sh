#!/bin/bash

# Kill any process on port 3001
pkill -f -9 -9 $(lsof -ti :3001 2>/dev/null)

# Start the server
echo "Starting WebSocket server on port 3001..."
node src/simple-server.js
