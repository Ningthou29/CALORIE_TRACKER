const STORAGE_PREFIX = 'nutritrack_'

/**
 * Saves a daily log entry for a specific date
 */
export function saveDailyLog(log) {
  if (!log || !log.date) return
  const key = `${STORAGE_PREFIX}daily_log_${log.date}`
  localStorage.setItem(key, JSON.stringify(log))
}

/**
 * Fetches or initializes a daily log for a specific date
 */
export function getDailyLog(date) {
  const key = `${STORAGE_PREFIX}daily_log_${date}`
  const data = localStorage.getItem(key)
  if (data) {
    try {
      return JSON.parse(data)
    } catch (e) {
      console.error('Error parsing daily log:', e)
    }
  }
  return { date, items: [], totalCalories: 0, totalMacros: { protein: 0, carbs: 0, fat: 0 } }
}

/**
 * Retrieves all saved daily log records
 */
export function getAllLogs() {
  const logs = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith(`${STORAGE_PREFIX}daily_log_`)) {
      try {
        const item = localStorage.getItem(key)
        if (item) logs.push(JSON.parse(item))
      } catch (e) {
        console.error('Error loading log for key', key, e)
      }
    }
  }
  // Sort logs by date descending
  return logs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/**
 * Wipes out all local storage keys associated with the application
 */
export function clearAllData() {
  const keysToRemove = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && (key.startsWith(STORAGE_PREFIX) || key === 'user-profile' || key === 'theme')) {
      keysToRemove.push(key)
    }
  }
  keysToRemove.forEach(key => localStorage.removeItem(key))
}
