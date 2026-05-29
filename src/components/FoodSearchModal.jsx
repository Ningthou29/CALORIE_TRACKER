import React, { useState, useEffect } from 'react'
import { searchFood } from '../services/foodApi'
import { useUserStore } from '../stores/userStore'

export default function FoodSearchModal({ isOpen, onClose }) {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedFood, setSelectedFood] = useState(null)
    const [quantity, setQuantity] = useState(100)
    const addFoodItem = useUserStore((state) => state.addFoodItem)

    useEffect(() => {
        if (!query || query.length < 2) {
            setResults([])
            return
        }

        const timeoutId = setTimeout(async () => {
            setLoading(true)
            try {
                const data = await searchFood(query)
                setResults(data)
            } catch (error) {
                console.error('Search failed:', error)
            } finally {
                setLoading(false)
            }
        }, 300)

        return () => clearTimeout(timeoutId)
    }, [query])

    const handleAdd = () => {
        if (selectedFood) {
            const calories = (selectedFood.calories / 100) * quantity
            addFoodItem({
                id: Date.now(),
                name: selectedFood.name,
                quantity: Math.round(quantity),
                calories: Math.round(calories),
                macros: {
                    protein: Math.round((selectedFood.protein / 100) * quantity),
                    carbs: Math.round((selectedFood.carbs / 100) * quantity),
                    fat: Math.round((selectedFood.fat / 100) * quantity),
                },
            })
            onClose()
            setQuery('')
            setSelectedFood(null)
            setQuantity(100)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end md:items-center justify-center">
            <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-t-2xl md:rounded-2xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b dark:border-gray-700">
                    <input
                        type="text"
                        placeholder="Search food (e.g., apple, chicken, rice)..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full p-3 border dark:border-gray-600 rounded-xl dark:bg-gray-700 dark:text-white"
                        autoFocus
                    />
                </div>

                <div className="p-4 space-y-3">
                    {loading && <div className="text-center py-8"><p className="text-gray-500">Searching...</p></div>}

                    {!loading && results.length === 0 && query.length >= 2 && (
                        <div className="text-center py-8"><p className="text-gray-500">No foods found. Try another search.</p></div>
                    )}

                    {results.map((food) => (
                        <div
                            key={food.id}
                            onClick={() => setSelectedFood(food)}
                            className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedFood?.id === food.id
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                        >
                            <p className="font-medium">{food.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {food.calories} cal • P:{food.protein}g • C:{food.carbs}g • F:{food.fat}g
                            </p>
                        </div>
                    ))}
                </div>

                {selectedFood && (
                    <div className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                        <label className="block text-sm font-medium mb-2">Quantity (grams)</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="w-full p-2 border dark:border-gray-600 rounded-lg mb-3 dark:bg-gray-700"
                            min="1"
                            step="10"
                        />
                        <div className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                            Calories: {Math.round((selectedFood.calories / 100) * quantity)}
                        </div>
                        <button
                            onClick={handleAdd}
                            className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                        >
                            Add to Today
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}