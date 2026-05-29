import React from 'react'

export default function CalorieSummary({ consumed, goal }) {
    const percentage = Math.min((consumed / goal) * 100, 100)
    const remaining = goal - consumed
    const circumference = 2 * Math.PI * 88
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-center">Daily Calorie Progress</h3>
            <div className="relative w-64 h-64 mx-auto">
                <svg className="transform -rotate-90 w-64 h-64">
                    <circle cx="128" cy="128" r="88" stroke="#e5e7eb" strokeWidth="16" fill="none" />
                    <circle cx="128" cy="128" r="88" stroke="#3b82f6" strokeWidth="16" fill="none"
                        strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-500" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold">{consumed}</span>
                    <span className="text-sm text-gray-500">of {goal} cal</span>
                    <span className={`text-sm font-semibold mt-2 ${remaining >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {remaining >= 0 ? `${remaining} remaining` : `${Math.abs(remaining)} over`}
                    </span>
                </div>
            </div>
        </div>
    )
}