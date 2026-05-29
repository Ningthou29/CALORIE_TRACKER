import React from 'react'
import { Trash2, ShoppingBag } from 'lucide-react'
import { useUserStore } from '../stores/userStore'
import { MACRO_COLORS } from '../utils/constants'

export default function FoodItemsList({ items }) {
  const removeFoodItem = useUserStore((state) => state.removeFoodItem)

  if (!items || items.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-8 text-center shadow-sm">
        <div className="mx-auto w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 mb-3.5">
          <ShoppingBag className="w-5 h-5" />
        </div>
        <p className="text-slate-500 dark:text-slate-400 font-bold">No meals logged today</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-[200px] mx-auto">
          Tap the "+" button in the corner to search and log foods!
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Today's Logged Meals
        </h3>
        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800/60 max-h-96 overflow-y-auto pr-1">
        {items.map((item, index) => (
          <div
            key={item.id || index}
            className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0 group"
          >
            <div className="flex-1 space-y-1">
              <div className="flex items-start gap-1">
                <p className="font-bold text-slate-800 dark:text-slate-200 text-sm group-hover:text-indigo-500 transition-colors">
                  {item.name}
                </p>
                {item.brand && (
                  <span className="text-[9px] uppercase font-black tracking-wider text-indigo-500 bg-indigo-500/10 px-1.5 py-0.5 rounded-md mt-0.5">
                    {item.brand}
                  </span>
                )}
              </div>

              {/* Quantity and Calories label */}
              <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
                <span className="font-semibold text-slate-600 dark:text-slate-400">
                  {item.quantity}g
                </span>
                <span className="w-1 h-1 bg-slate-200 dark:bg-slate-800 rounded-full" />
                <span className="font-bold text-rose-500 bg-rose-500/5 dark:bg-rose-500/10 px-1.5 py-0.5 rounded-md text-[10px]">
                  {item.calories} kcal
                </span>
              </div>

              {/* Macro pills */}
              {item.macros && (
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[9px] font-bold text-slate-400">
                    P:{' '}
                    <span
                      className="font-extrabold"
                      style={{ color: MACRO_COLORS.protein }}
                    >
                      {item.macros.protein}g
                    </span>
                  </span>
                  <span className="text-[9px] font-bold text-slate-400">
                    C:{' '}
                    <span
                      className="font-extrabold"
                      style={{ color: MACRO_COLORS.carbs }}
                    >
                      {item.macros.carbs}g
                    </span>
                  </span>
                  <span className="text-[9px] font-bold text-slate-400">
                    F:{' '}
                    <span
                      className="font-extrabold"
                      style={{ color: MACRO_COLORS.fat }}
                    >
                      {item.macros.fat}g
                    </span>
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={() => removeFoodItem(item.id)}
              className="p-2.5 rounded-xl text-slate-300 hover:text-rose-500 dark:text-slate-600 dark:hover:text-rose-400 hover:bg-rose-500/5 dark:hover:bg-rose-500/10 transition-colors ml-4"
              title="Delete food entry"
              aria-label={`Delete ${item.name}`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
