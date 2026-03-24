/**
 * Theme Sync WebSocket Server
 *
 * Simple broadcast server for real-time theme updates.
 * - Receives theme updates from the editor
 * - Broadcasts to all connected vanilla apps
 */

import { WebSocketServer, WebSocket, RawData } from 'ws'
import type { IncomingMessage } from 'http'

import { createServer, IncomingMessage, Server } from 'http'

const PORT = 3001

interface ThemeMessage {
  type: 'theme-update'
  payload: unknown
  timestamp: number
}

// Store current theme for new connections
let currentTheme: ThemeMessage | null = null

// Create WebSocket server
const wss = new WebSocketServer({ port: PORT })

// Handle client connections
wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
  const clientIp = req.socket.remoteAddress
  console.log(`[theme-sync] Client connected (${clientIp})`)

  // Send current theme to new client
  if (currentTheme) {
    ws.send(JSON.stringify(currentTheme))
    console.log(`[theme-sync] Sent current theme to new client`)
  }

  // Handle incoming messages
  ws.on('message', (data: RawData) => {
    try {
      const message: ThemeMessage = JSON.parse(data.toString())

      if (message.type === 'theme-update') {
        // Store current theme
        currentTheme = {
          ...message,
          timestamp: Date.now()
        }

        // Broadcast to all other clients
        const clientCount = broadcastToOthers(ws, data)
        console.log(`[theme-sync] Theme update broadcasted to ${clientCount} clients`)
      }
    } catch (error) {
      console.error('[theme-sync] Error parsing message:', error)
    }
  })

  ws.on('close', () => {
    console.log(`[theme-sync] Client disconnected`)
  })

  ws.on('error', (error: Error) => {
    console.error('[theme-sync] WebSocket error:', error.message)
  })
})

/**
 * Broadcast message to all clients except sender
 */
function broadcastToOthers(sender: WebSocket, data: RawData): number {
  let count = 0
  wss.clients.forEach(client => {
    if (client !== sender && client.readyState === WebSocket.OPEN) {
      client.send(data)
      count++
    }
  })
  return count
}
/**
 * Broadcast message to all clients
 */
function broadcastToAll(data: RawData): number {
  let count = 0
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data)
      count++
    }
  })
  return count
}

// Handle server errors
wss.on('error', (error: NodeJS.ErrnoException) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`[theme-sync] ERROR: Port ${PORT} is already in use!`)
    console.error(`[theme-sync] Please close the application using port ${PORT} and try again.`)
    process.exit(1)
  } else {
    console.error('[theme-sync] Server error:', error)
  }
})

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n[theme-sync] Shutting down...')
  wss.close(() => {
    console.log('[theme-sync] Server closed')
    process.exit(0)
  })
})
process.on('SIGTERM', () => {
  wss.close(() => {
    process.exit(0)
  })
})
