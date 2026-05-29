const STORAGE_PREFIX = 'nutritrack_'

export function saveDailyLog(log) {
    const key = `${STORAGE_PREFIX}daily_log_${log.date}`
    localStorage.setItem(key, JSON.stringify(log))
}

export function getDailyLog(date) {
    const key = `${STORAGE_PREFIX}daily_log_${date}`
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : { items: [], date, totalCalories: 0 }
}

export function getAllLogs() {
    const logs = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith(STORAGE_PREFIX)) {
            logs.push(JSON.parse(localStorage.getItem(key)))
        }
    }
    return logs
}

export function clearAllData() {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith(STORAGE_PREFIX)) {
            keys.push(key)
        }
    }
    keys.forEach(key => localStorage.removeItem(key))
    localStorage.removeItem('nutritrack-storage')
    localStorage.removeItem('user-profile')
    localStorage.removeItem('theme')
}