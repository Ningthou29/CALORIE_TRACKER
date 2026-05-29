import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { MACRO_COLORS } from '../utils/constants'

export default function MacroBreakdown({ consumed, goals }) {
  // Gracefully fallback values
  const currentMacros = consumed || { protein: 0, carbs: 0, fat: 0 }
  const targetMacros = goals || { protein: 0, carbs: 0, fat: 0 }

  const chartData = [
    {
      name: 'Protein',
      current: Math.round(currentMacros.protein || 0),
      goal: Math.round(targetMacros.protein || 0),
      color: MACRO_COLORS.protein,
      unit: 'g',
    },
    {
      name: 'Carbs',
      current: Math.round(currentMacros.carbs || 0),
      goal: Math.round(targetMacros.carbs || 0),
      color: MACRO_COLORS.carbs,
      unit: 'g',
    },
    {
      name: 'Fat',
      current: Math.round(currentMacros.fat || 0),
      goal: Math.round(targetMacros.fat || 0),
      color: MACRO_COLORS.fat,
      unit: 'g',
    },
  ]

  // Customized tooltip styling
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl border border-slate-700 shadow-xl text-xs space-y-1">
          <p className="font-bold">{data.name}</p>
          <p className="text-slate-300">
            Consumed: <span className="font-extrabold text-white">{data.current}{data.unit}</span>
          </p>
          <p className="text-slate-300">
            Daily Target: <span className="font-bold text-white">{data.goal}{data.unit}</span>
          </p>
          {data.goal > 0 && (
            <p className="text-indigo-400 font-semibold mt-1">
              {Math.round((data.current / data.goal) * 100)}% of target met
            </p>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest text-center mb-6">
        Macros Distribution (g)
      </h3>

      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 15, left: -20, bottom: 5 }}
            barCategoryGap={18}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              stroke="#94a3b8"
              fontSize={11}
              fontWeight={700}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            
            {/* Background target bars */}
            <Bar dataKey="goal" fill="#94a3b8" radius={[0, 4, 4, 0]} opacity={0.12} barSize={12} />
            
            {/* Active consumed bars */}
            <Bar dataKey="current" radius={[0, 4, 4, 0]} barSize={12}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Row breakdown labels */}
      <div className="grid grid-cols-3 gap-2 mt-4 text-center">
        {chartData.map((macro) => {
          const ratio = macro.goal > 0 ? Math.round((macro.current / macro.goal) * 100) : 0
          return (
            <div
              key={macro.name}
              className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/50"
            >
              <div className="flex items-center justify-center gap-1.5 mb-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ backgroundColor: macro.color }}
                />
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {macro.name}
                </span>
              </div>
              <p className="text-sm font-extrabold dark:text-white leading-none">
                {macro.current} <span className="text-[10px] text-slate-400">/ {macro.goal}g</span>
              </p>
              <span
                className="text-[9px] font-bold mt-1.5 inline-block px-2 py-0.5 rounded-full"
                style={{
                  color: macro.color,
                  backgroundColor: `${macro.color}15`,
                }}
              >
                {ratio}%
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
