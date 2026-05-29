import React from 'react'
import { useUserStore } from '../stores/userStore'

export default function FoodItemsList({ items }) {
    const removeFoodItem = useUserStore((state) => state.removeFoodItem)

    if (items.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-lg">
                <p className="text-gray-500 text-lg">No food logged today</p>
                <p className="text-sm text-gray-400 mt-2">Tap + to add your first meal</p>
            </div>
        )
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
            <h3 className="font-semibold text-lg mb-3">Today's Meals</h3>
            <div className="space-y-3">
                {items.map((item, index) => (
                    <div key={item.id || index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {item.quantity}g • {item.calories} calories
                            </p>
                        </div>
                        <button
                            onClick={() => removeFoodItem(item.id)}
                            className="text-red-500 px-3 py-1 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}