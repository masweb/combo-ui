/**
 * Simple Theme Sync Server - Pure JavaScript
 */

const { WebSocketServer } = require('ws')

const PORT = 3001

let currentTheme = null
const clients = new Set()

const wss = new WebSocketServer({ port: PORT }, () => {
  console.log(`[theme-sync] Server running on ws://localhost:${PORT}`)
})

wss.on('connection', ws => {
  console.log('[theme-sync] Client connected')
  clients.add(ws)

  // Send current theme if available
  if (currentTheme) {
    ws.send(JSON.stringify(currentTheme))
  }

  ws.on('message', data => {
    try {
      const message = JSON.parse(data.toString())

      if (message.type === 'theme-update') {
        currentTheme = {
          ...message,
          timestamp: Date.now()
        }

        // Broadcast to all other clients
        broadcast(message)
      }
    } catch (error) {
      console.error('[theme-sync] Error:', error)
    }
  })

  ws.on('close', () => {
    console.log('[theme-sync] Client disconnected')
    clients.delete(ws)
  })
})

function broadcast(message) {
  const data = JSON.stringify(message)
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data)
    }
  })
}
