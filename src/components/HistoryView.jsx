import React, { useState, useEffect } from 'react'
import { Calendar, CheckCircle2, ChevronRight, Ban } from 'lucide-react'
import { getDailyLog } from '../utils/storage'
import { MACRO_COLORS } from '../utils/constants'

export default function HistoryView() {
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0])
  const [log, setLog] = useState(null)

  useEffect(() => {
    const historicalRecord = getDailyLog(selectedDate)
    setLog(historicalRecord)
  }, [selectedDate])

  const safeItems = log?.items || []
  const hasItems = safeItems.length > 0

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-4 h-4 text-purple-500" />
        <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Review Log History
        </h3>
      </div>

      <div className="space-y-4">
        {/* Date Selector input */}
        <div>
          <label htmlFor="history-date-picker" className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">
            Select Calendar Date
          </label>
          <input
            id="history-date-picker"
            type="date"
            max={new Date().toISOString().split('T')[0]}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-sm font-bold dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/10 focus:border-purple-500 transition-all cursor-pointer"
          />
        </div>

        {/* Dynamic Log Output Display */}
        {log && (
          <div className="pt-2 animate-fade-in space-y-4">
            <div className="bg-slate-50 dark:bg-slate-950/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-850 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-0.5">
                  Energy Logged
                </span>
                <span className="text-xl font-black text-rose-500 leading-none">
                  {log.totalCalories || 0} <span className="text-xs font-bold text-slate-400">kcal</span>
                </span>
              </div>

              {hasItems ? (
                <div className="flex items-center gap-1.5 text-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/10 px-2.5 py-1 rounded-xl text-[10px] font-black uppercase">
                  Logged <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase">
                  Empty <Ban className="w-3.5 h-3.5" />
                </div>
              )}
            </div>

            {/* Macro sums breakdown */}
            {hasItems && log.totalMacros && (
              <div className="grid grid-cols-3 gap-2 py-1 text-center">
                <div className="p-2 bg-rose-500/5 dark:bg-rose-500/10 rounded-xl border border-rose-500/5">
                  <span className="text-[8px] font-black uppercase tracking-wider text-rose-500 block mb-0.5">Protein</span>
                  <span className="text-xs font-black dark:text-slate-200">{Math.round(log.totalMacros.protein || 0)}g</span>
                </div>
                <div className="p-2 bg-blue-500/5 dark:bg-blue-500/10 rounded-xl border border-blue-500/5">
                  <span className="text-[8px] font-black uppercase tracking-wider text-blue-500 block mb-0.5">Carbs</span>
                  <span className="text-xs font-black dark:text-slate-200">{Math.round(log.totalMacros.carbs || 0)}g</span>
                </div>
                <div className="p-2 bg-amber-500/5 dark:bg-amber-500/10 rounded-xl border border-amber-500/5">
                  <span className="text-[8px] font-black uppercase tracking-wider text-amber-500 block mb-0.5">Fat</span>
                  <span className="text-xs font-black dark:text-slate-200">{Math.round(log.totalMacros.fat || 0)}g</span>
                </div>
              </div>
            )}

            {/* Itemized meals review list */}
            {hasItems ? (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {safeItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl"
                  >
                    <div className="flex-1 min-w-0 pr-2">
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">{item.name}</p>
                      <span className="text-[10px] font-semibold text-slate-400 block">{item.quantity}g</span>
                    </div>
                    <span className="text-xs font-extrabold text-rose-500 shrink-0 bg-rose-500/5 px-2 py-0.5 rounded-lg">
                      {item.calories} kcal
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-slate-400 dark:text-slate-500">
                <p className="text-xs">No food records stored on this date.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
