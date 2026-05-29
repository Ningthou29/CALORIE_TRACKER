import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { saveDailyLog, getDailyLog } from '../utils/storage'

export const useUserStore = create(
    persist(
        (set, get) => ({
            profile: null,
            dailyLog: { items: [], date: new Date().toISOString().split('T')[0] },

            setUserProfile: (profile) => {
                set({ profile })
                localStorage.setItem('user-profile', JSON.stringify(profile))
            },

            loadProfile: () => {
                const saved = localStorage.getItem('user-profile')
                if (saved) {
                    set({ profile: JSON.parse(saved) })
                }
            },

            addFoodItem: (item) => {
                const currentLog = get().dailyLog
                const updatedItems = [...currentLog.items, item]
                const updatedLog = { ...currentLog, items: updatedItems }
                set({ dailyLog: updatedLog })
                saveDailyLog(updatedLog)
            },

            removeFoodItem: (id) => {
                const currentLog = get().dailyLog
                const updatedItems = currentLog.items.filter(item => item.id !== id)
                const updatedLog = { ...currentLog, items: updatedItems }
                set({ dailyLog: updatedLog })
                saveDailyLog(updatedLog)
            },

            getDailyTotals: () => {
                const items = get().dailyLog.items
                return {
                    calories: items.reduce((sum, item) => sum + (item.calories || 0), 0),
                    macros: {
                        protein: items.reduce((sum, item) => sum + (item.macros?.protein || 0), 0),
                        carbs: items.reduce((sum, item) => sum + (item.macros?.carbs || 0), 0),
                        fat: items.reduce((sum, item) => sum + (item.macros?.fat || 0), 0),
                    }
                }
            },
        }),
        {
            name: 'nutritrack-storage',
        }
    )
)