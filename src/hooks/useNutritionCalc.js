import { useMemo } from 'react'

export function useNutritionCalc(items) {
    return useMemo(() => {
        const totals = {
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
        }

        items.forEach(item => {
            totals.calories += item.calories || 0
            totals.protein += item.macros?.protein || 0
            totals.carbs += item.macros?.carbs || 0
            totals.fat += item.macros?.fat || 0
        })

        return totals
    }, [items])
}