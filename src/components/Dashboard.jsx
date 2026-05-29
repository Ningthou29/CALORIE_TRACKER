import React, { useState } from 'react'
import { Plus, User, Target, Sparkles } from 'lucide-react'
import { useUserStore } from '../stores/userStore'
import CalorieSummary from './CalorieSummary'
import MacroBreakdown from './MacroBreakdown'
import FoodItemsList from './FoodItemsList'
import FoodSearchModal from './FoodSearchModal'
import HistoryView from './HistoryView'
import { GOALS } from '../utils/constants'

export default function Dashboard() {
  const { profile, dailyLog, getDailyTotals } = useUserStore()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  
  const totals = getDailyTotals()

  if (!profile) return null

  const activeGoal = GOALS[profile.goal] || GOALS.maintain

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
      
      {/* Dynamic Profile Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 to-indigo-950 dark:from-slate-900 dark:to-slate-950 border border-slate-800 text-white rounded-3xl p-6 shadow-md">
        {/* Glow styling */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 z-10 relative">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-black tracking-widest text-indigo-400 flex items-center gap-1.5 leading-none mb-1">
              Active Member <Sparkles className="w-3.5 h-3.5 animate-pulse text-yellow-400 fill-yellow-400/10" />
            </span>
            <h2 className="text-2xl font-black tracking-tight leading-tight">
              Hello, {profile.name}!
            </h2>
            <p className="text-xs text-slate-400">
              Welcome back to your nutrition cockpit. Let's hit your wellness targets today!
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-2xl">
              <User className="w-4 h-4 text-indigo-400" />
              <div className="text-left leading-none">
                <span className="text-[8px] font-black uppercase text-slate-500 block">Vitals</span>
                <span className="text-xs font-bold">{profile.weight}kg • {profile.height}cm</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-2xl">
              <Target className="w-4 h-4 text-pink-400" />
              <div className="text-left leading-none">
                <span className="text-[8px] font-black uppercase text-slate-500 block">Goal</span>
                <span className="text-xs font-bold" style={{ color: activeGoal.color }}>
                  {activeGoal.label}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Dashboard Grid (Progress & Chart comparison) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CalorieSummary
          consumed={totals.calories}
          goal={profile.macros?.calories || profile.tdee}
        />
        
        <MacroBreakdown
          consumed={totals.macros}
          goals={profile.macros}
        />
      </div>

      {/* Secondary Dashboard Grid (Logged entries, calendar review) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <FoodItemsList items={dailyLog.items} />
        </div>
        <div>
          <HistoryView />
        </div>
      </div>

      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setIsSearchOpen(true)}
        className="fixed bottom-6 right-6 z-30 p-4 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white rounded-2xl shadow-xl shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all text-sm font-bold flex items-center gap-2 cursor-pointer outline-none"
        title="Log a new meal"
        aria-label="Add new food item"
      >
        <Plus className="w-5 h-5" />
        <span className="hidden sm:inline">Log Meal</span>
      </button>

      {/* Food search modal trigger */}
      <FoodSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  )
}
