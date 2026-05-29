export const ACTIVITY_LEVELS = {
  sedentary: { label: 'Sedentary', description: 'Little or no exercise', multiplier: 1.2 },
  light: { label: 'Light Active', description: 'Exercise 1-3 times/week', multiplier: 1.375 },
  moderate: { label: 'Moderately Active', description: 'Exercise 4-5 times/week', multiplier: 1.55 },
  active: { label: 'Very Active', description: 'Daily exercise or intense exercise', multiplier: 1.725 },
  very_active: { label: 'Extra Active', description: 'Intense exercise 6-7 times/week or physical job', multiplier: 1.9 },
}

export const GOALS = {
  lose: { label: 'Lose Weight', description: 'Calorie deficit (-500 kcal)', adjustment: -500, color: 'text-rose-500' },
  maintain: { label: 'Maintain Weight', description: 'Neutral calorie balance', adjustment: 0, color: 'text-blue-500' },
  gain: { label: 'Gain Weight', description: 'Calorie surplus (+500 kcal)', adjustment: 500, color: 'text-emerald-500' },
}

export const MACRO_COLORS = {
  protein: '#ef4444',
  carbs: '#3b82f6',
  fat: '#eab308',
}

export const DEFAULT_MACRO_RATIOS = {
  protein: 0.30, // 30% of total calories
  carbs: 0.40,   // 40% of total calories
  fat: 0.30,     // 30% of total calories
}
