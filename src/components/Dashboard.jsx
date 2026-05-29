import React, { useState } from 'react'
import { useUserStore } from '../stores/userStore'
import CalorieSummary from './CalorieSummary'
import MacroBreakdown from './MacroBreakdown'
import FoodItemsList from './FoodItemsList'
import FoodSearchModal from './FoodSearchModal'

export default function Dashboard() {
    const { profile, dailyLog, getDailyTotals } = useUserStore()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const totals = getDailyTotals()

    if (!profile) return <div className="text-center py-10">Loading...</div>

    return (
        <div className="space-y-6">
            <CalorieSummary
                consumed={totals.calories}
                goal={profile.tdee}
            />

            <MacroBreakdown
                consumed={totals.macros}
                goals={profile.macros}
            />

            <FoodItemsList items={dailyLog.items} />

            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-20 text-2xl"
            >
                +
            </button>

            <FoodSearchModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    )
}