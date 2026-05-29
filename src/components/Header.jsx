import React from 'react'
import { Sun, Moon, RotateCcw } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { useUserStore } from '../stores/userStore'

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const { profile, clearData } = useUserStore()

  const handleReset = () => {
    if (window.confirm('Are you absolutely sure you want to clear your profile and all logged foods? This action is permanent!')) {
      clearData()
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/40">
      <div className="container mx-auto px-4 py-3.5 flex justify-between items-center max-w-5xl">
        <div className="flex items-center space-x-2">
          <div className="bg-rose-500/10 text-rose-500 p-2 rounded-xl text-lg font-bold">
            🍎
          </div>
          <div>
            <h1 className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
              NutriTrack
            </h1>
            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest leading-none">
              Health Monitor
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {profile && (
            <button
              onClick={handleReset}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/5 dark:hover:bg-rose-500/10 transition-colors"
              title="Reset Profile & Data"
              aria-label="Reset all data"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-slate-200/50 dark:border-slate-800/50 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-500 animate-scale-in" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500 animate-scale-in" />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
