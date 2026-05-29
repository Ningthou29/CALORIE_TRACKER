export const ACTIVITY_LEVELS = {
    sedentary: { label: 'Sedentary', description: 'Little or no exercise', multiplier: 1.2 },
    light: { label: 'Light', description: 'Exercise 1-3 times/week', multiplier: 1.375 },
    moderate: { label: 'Moderate', description: 'Exercise 4-5 times/week', multiplier: 1.55 },
    active: { label: 'Active', description: 'Daily exercise or intense exercise 3-4 times/week', multiplier: 1.725 },
    very_active: { label: 'Very Active', description: 'Intense exercise 6-7 times/week', multiplier: 1.9 },
}

export const GOALS = {
    lose: { label: 'Lose Weight', adjustment: -500, color: '#ef4444' },
    maintain: { label: 'Maintain Weight', adjustment: 0, color: '#3b82f6' },
    gain: { label: 'Gain Weight', adjustment: 500, color: '#10b981' },
}

export const MACRO_COLORS = {
    protein: '#ef4444',
    carbs: '#3b82f6',
    fat: '#eab308',
}

export const DEFAULT_MACRO_RATIOS = {
    protein: 0.30,
    carbs: 0.40,
    fat: 0.30,
}