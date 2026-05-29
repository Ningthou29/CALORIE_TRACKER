import { ACTIVITY_LEVELS } from './constants'

/**
 * Calculates Total Daily Energy Expenditure (TDEE) using Mifflin-St Jeor equation.
 */
export function calculateTDEE({ age, gender, height, weight, activityLevel }) {
  // BMR Calculation
  let bmr = 10 * weight + 6.25 * height - 5 * age
  if (gender === 'male') {
    bmr += 5
  } else {
    bmr -= 161
  }

  const multiplier = ACTIVITY_LEVELS[activityLevel]?.multiplier || 1.2
  return Math.round(bmr * multiplier)
}

/**
 * Calculates target macronutrient splits (in grams) based on calorie targets and fitness goals.
 * Ratios: Protein 30% (4 kcal/g), Carbs 40% (4 kcal/g), Fat 30% (9 kcal/g)
 */
export function calculateMacros(tdee, goal) {
  let calorieTarget = tdee
  if (goal === 'lose') {
    calorieTarget = tdee - 500
  } else if (goal === 'gain') {
    calorieTarget = tdee + 500
  }

  // Ensure calorieTarget doesn't drop below a healthy minimum (e.g., 1200 calories)
  calorieTarget = Math.max(calorieTarget, 1200)

  return {
    calories: calorieTarget,
    protein: Math.round((calorieTarget * 0.30) / 4),
    carbs: Math.round((calorieTarget * 0.40) / 4),
    fat: Math.round((calorieTarget * 0.30) / 9),
  }
}

/**
 * Calculates nutrients dynamically based on food item reference quantity (per 100g) and custom serving weight.
 */
export function calculateNutrientFromQuantity(nutrientPer100g, quantityGrams) {
  return Math.round((nutrientPer100g / 100) * quantityGrams)
}
