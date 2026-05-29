import React, { useState, useEffect, useRef } from 'react'
import { Search, X, Loader2, Plus, Minus, Check } from 'lucide-react'
import { useFoodSearch } from '../hooks/useFoodSearch'
import { useUserStore } from '../stores/userStore'
import { calculateNutrientFromQuantity } from '../utils/calculators'

export default function FoodSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [selectedFood, setSelectedFood] = useState(null)
  const [quantity, setQuantity] = useState(100) // Grams default
  const addFoodItem = useUserStore((state) => state.addFoodItem)
  const inputRef = useRef(null)

  // Custom hook for debounced USDA Search queries
  const { results, loading, error } = useFoodSearch(query)

  // Autofocus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 80)
    } else {
      // Clear settings
      setQuery('')
      setSelectedFood(null)
      setQuantity(100)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleAdd = () => {
    if (!selectedFood) return

    const factor = quantity // Per grams

    // Calculate final metrics using helper equations
    const calories = calculateNutrientFromQuantity(selectedFood.calories, factor)
    const protein = calculateNutrientFromQuantity(selectedFood.protein, factor)
    const carbs = calculateNutrientFromQuantity(selectedFood.carbs, factor)
    const fat = calculateNutrientFromQuantity(selectedFood.fat, factor)

    addFoodItem({
      id: Date.now(),
      name: selectedFood.name,
      brand: selectedFood.brand,
      quantity: Math.round(quantity),
      calories,
      macros: { protein, carbs, fat },
    })

    // Reset and close
    onClose()
  }

  const handleSelect = (food) => {
    setSelectedFood(food)
  }

  const adjustQuantity = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount))
  }

  // Calculate live estimates based on current grams input
  const liveCalories = selectedFood
    ? calculateNutrientFromQuantity(selectedFood.calories, quantity)
    : 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-3xl w-full max-w-md max-h-[85vh] flex flex-col overflow-hidden animate-scale-in">
        
        {/* Sticky Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <h3 className="font-extrabold text-slate-800 dark:text-slate-100">
            Log Food Item
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input field */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/20 border-b border-slate-100 dark:border-slate-800/50 relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search USDA database (e.g. egg)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 focus:outline-none transition-all dark:text-white text-sm"
          />
          <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 min-h-[160px]">
          {loading && (
            <div className="flex flex-col items-center justify-center py-10 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mb-2" />
              <p className="text-xs">Searching official USDA database...</p>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10 text-rose-500 text-xs text-center">
              {error}
            </div>
          )}

          {!loading && !error && query.trim().length >= 2 && results.length === 0 && (
            <p className="text-slate-400 dark:text-slate-500 text-xs text-center py-10">
              No matching foods found. Please try a different term.
            </p>
          )}

          {!loading && query.trim().length < 2 && (
            <p className="text-slate-400 dark:text-slate-500 text-xs text-center py-10">
              Type at least 2 characters to search the USDA index...
            </p>
          )}

          {!loading &&
            results.map((food) => {
              const isSelected = selectedFood?.id === food.id
              return (
                <button
                  key={food.id}
                  onClick={() => handleSelect(food)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex justify-between items-start gap-4 ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-500/5 dark:bg-indigo-500/10 ring-2 ring-indigo-500/10'
                      : 'border-slate-100 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-900/60'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                        {food.name}
                      </span>
                      {food.brand && (
                        <span className="text-[8px] font-black uppercase text-indigo-500 bg-indigo-500/10 px-1.5 py-0.5 rounded">
                          {food.brand}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                      Per 100g: P:{food.protein}g • C:{food.carbs}g • F:{food.fat}g
                    </p>
                  </div>
                  <span className="font-black text-xs text-rose-500 bg-rose-500/5 dark:bg-rose-500/10 px-2 py-0.5 rounded-lg shrink-0">
                    {food.calories} kcal
                  </span>
                </button>
              )
            })}
        </div>

        {/* Live Serving Size Adjustment */}
        {selectedFood && (
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-0.5">
                  Weight Controls
                </span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Adjust grams to calculate values
                </span>
              </div>
              
              {/* Stepper controls */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => adjustQuantity(-50)}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold text-slate-500 hover:bg-slate-100"
                >
                  -50
                </button>
                <button
                  onClick={() => adjustQuantity(-10)}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-100"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-16 px-1 py-1 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center text-sm font-black dark:text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />

                <button
                  onClick={() => adjustQuantity(10)}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-100"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => adjustQuantity(50)}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold text-slate-500 hover:bg-slate-100"
                >
                  +50
                </button>
              </div>
            </div>

            {/* Calculations Preview */}
            <div className="flex justify-between items-center bg-white dark:bg-slate-950 p-3 rounded-2xl border border-slate-200/50 dark:border-slate-800/80">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Logged Energy Estimate:
              </span>
              <span className="text-base font-black text-rose-500 animate-scale-in">
                {liveCalories} kcal
              </span>
            </div>

            {/* Submit additions */}
            <button
              onClick={handleAdd}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-2xl shadow-md hover:shadow-lg transition-all text-sm flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" /> Add serving to Today
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
