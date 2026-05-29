import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

export default function MacroBreakdown({ consumed, goals }) {
    const macroData = [
        { name: 'Protein', current: consumed?.protein || 0, goal: goals?.protein || 0, color: '#ef4444' },
        { name: 'Carbs', current: consumed?.carbs || 0, goal: goals?.carbs || 0, color: '#3b82f6' },
        { name: 'Fat', current: consumed?.fat || 0, goal: goals?.fat || 0, color: '#eab308' },
    ]

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Macro Breakdown (grams)</h3>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={macroData} layout="vertical" margin={{ left: 50 }}>
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip />
                    <Bar dataKey="current" name="Consumed">
                        {macroData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Bar>
                    <Bar dataKey="goal" fill="#9ca3af" name="Goal" opacity={0.5} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}