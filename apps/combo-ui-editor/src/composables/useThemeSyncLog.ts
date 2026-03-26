import { ref } from 'vue'

export interface LogEntry {
  message: string
  timestamp: Date
}

const logs = ref<LogEntry[]>([])
const MAX_LOGS = 50

export function useThemeSyncLog() {
  const log = (message: string) => {
    const entry: LogEntry = {
      message,
      timestamp: new Date()
    }
    logs.value.push(entry)
    if (logs.value.length > MAX_LOGS) {
      logs.value.shift()
    }
    console.log(message)
  }

  const clear = () => {
    logs.value = []
  }

  return {
    logs,
    log,
    clear
  }
}
