import { create } from 'zustand'
import { getDailyLog, saveDailyLog, clearAllData } from '../utils/storage'

export const useUserStore = create((set, get) => ({
  // Core State
  profile: null,
  dailyLog: {
    date: new Date().toISOString().split('T')[0],
    items: [],
    totalCalories: 0,
    totalMacros: { protein: 0, carbs: 0, fat: 0 },
  },

  // Actions
  loadProfile: () => {
    const savedProfile = localStorage.getItem('nutritrack_profile')
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile)
        set({ profile: parsed })
        
        // Also load today's log once profile is loaded
        const today = new Date().toISOString().split('T')[0]
        get().loadDailyLog(today)
      } catch (e) {
        console.error('Failed to parse saved profile:', e)
      }
    }
  },

  setUserProfile: (profileData) => {
    set({ profile: profileData })
    localStorage.setItem('nutritrack_profile', JSON.stringify(profileData))
  },

  loadDailyLog: (date) => {
    const log = getDailyLog(date)
    set({ dailyLog: log })
  },

  addFoodItem: (foodItem) => {
    const { dailyLog } = get()
    
    // Add item to items array with unique ID
    const updatedItems = [...dailyLog.items, { ...foodItem, id: foodItem.id || Date.now() }]
    
    // Recalculate totals
    const totalCalories = updatedItems.reduce((sum, item) => sum + (item.calories || 0), 0)
    const totalMacros = updatedItems.reduce((acc, item) => {
      acc.protein += item.macros?.protein || 0
      acc.carbs += item.macros?.carbs || 0
      acc.fat += item.macros?.fat || 0
      return acc
    }, { protein: 0, carbs: 0, fat: 0 })

    const updatedLog = {
      ...dailyLog,
      items: updatedItems,
      totalCalories,
      totalMacros,
    }

    set({ dailyLog: updatedLog })
    saveDailyLog(updatedLog)
  },

  removeFoodItem: (itemId) => {
    const { dailyLog } = get()
    
    const updatedItems = dailyLog.items.filter(item => item.id !== itemId)
    
    // Recalculate totals
    const totalCalories = updatedItems.reduce((sum, item) => sum + (item.calories || 0), 0)
    const totalMacros = updatedItems.reduce((acc, item) => {
      acc.protein += item.macros?.protein || 0
      acc.carbs += item.macros?.carbs || 0
      acc.fat += item.macros?.fat || 0
      return acc
    }, { protein: 0, carbs: 0, fat: 0 })

    const updatedLog = {
      ...dailyLog,
      items: updatedItems,
      totalCalories,
      totalMacros,
    }

    set({ dailyLog: updatedLog })
    saveDailyLog(updatedLog)
  },

  getDailyTotals: () => {
    const { dailyLog } = get()
    return {
      calories: dailyLog.totalCalories || 0,
      macros: dailyLog.totalMacros || { protein: 0, carbs: 0, fat: 0 },
    }
  },

  clearData: () => {
    clearAllData()
    localStorage.removeItem('nutritrack_profile')
    set({
      profile: null,
      dailyLog: {
        date: new Date().toISOString().split('T')[0],
        items: [],
        totalCalories: 0,
        totalMacros: { protein: 0, carbs: 0, fat: 0 },
      },
    })
  },
}))
