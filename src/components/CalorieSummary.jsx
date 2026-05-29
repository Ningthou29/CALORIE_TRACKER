import React from 'react'
import { Sparkles, Flame, CheckCircle } from 'lucide-react'

export default function CalorieSummary({ consumed, goal }) {
  // Safe math
  const safeConsumed = Math.max(0, consumed)
  const safeGoal = Math.max(1, goal)
  const percentage = Math.min((safeConsumed / safeGoal) * 100, 100)
  const remaining = safeGoal - safeConsumed

  // SVG circular properties
  const radius = 90
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
      {/* Light decorative blobs */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-rose-500/5 rounded-full blur-xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />

      <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center mb-6">
        Daily Calorie Progress
      </h3>

      <div className="relative w-56 h-56 mx-auto animate-scale-in flex items-center justify-center">
        {/* Progress Circle SVG */}
        <svg className="transform -rotate-90 w-full h-full absolute inset-0">
          {/* Background Track */}
          <circle
            cx="112"
            cy="112"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            className="text-slate-100 dark:text-slate-800/50"
          />
          {/* Foreground Progress */}
          <circle
            cx="112"
            cy="112"
            r={radius}
            stroke="url(#progressGradient)"
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" /> {/* Rose */}
              <stop offset="100%" stopColor="#f97316" /> {/* Orange */}
            </linearGradient>
          </defs>
        </svg>

        {/* Center Details */}
        <div className="text-center flex flex-col items-center justify-center z-10">
          <div className="p-2.5 bg-rose-500/10 rounded-2xl text-rose-500 mb-1">
            <Flame className="w-5 h-5 fill-current animate-pulse" />
          </div>
          <span className="text-4xl font-extrabold tracking-tight dark:text-white">
            {safeConsumed.toLocaleString()}
          </span>
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-0.5">
            of {safeGoal.toLocaleString()} kcal
          </span>
        </div>
      </div>

      {/* Footer Alert Indicators */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
        <div>
          <span className="text-slate-400 dark:text-slate-500 block">Status</span>
          <span className="font-bold text-slate-700 dark:text-slate-300">
            {percentage >= 100 ? (
              <span className="text-rose-500 flex items-center gap-1 font-extrabold uppercase">
                Goal Exceeded <Sparkles className="w-3 h-3" />
              </span>
            ) : remaining <= 100 ? (
              <span className="text-amber-500 flex items-center gap-1 font-bold">
                Almost there!
              </span>
            ) : (
              <span className="text-emerald-500 flex items-center gap-1 font-bold">
                On Track <CheckCircle className="w-3.5 h-3.5 fill-emerald-500/10" />
              </span>
            )}
          </span>
        </div>
        <div className="text-right">
          <span className="text-slate-400 dark:text-slate-500 block">Remaining</span>
          <span
            className={`font-black text-sm ${
              remaining >= 0 ? 'text-emerald-500' : 'text-rose-500'
            }`}
          >
            {remaining >= 0
              ? `${remaining.toLocaleString()} kcal`
              : `${Math.abs(remaining).toLocaleString()} kcal over`}
          </span>
        </div>
      </div>
    </div>
  )
}
