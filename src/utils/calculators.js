export function calculateTDEE({ age, gender, height, weight, activityLevel }) {
    // Mifflin-St Jeor Formula
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const activityMultipliers = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        very_active: 1.9,
    };

    return Math.round(bmr * activityMultipliers[activityLevel]);
}

export function calculateMacros(tdee, goal) {
    let calorieTarget = tdee;
    if (goal === 'lose') calorieTarget = tdee - 500;
    if (goal === 'gain') calorieTarget = tdee + 500;

    return {
        calories: calorieTarget,
        protein: Math.round((calorieTarget * 0.3) / 4),
        carbs: Math.round((calorieTarget * 0.4) / 4),
        fat: Math.round((calorieTarget * 0.3) / 9),
    };
}

export function calculateCaloriesFromQuantity(foodItem, quantity) {
    return Math.round((foodItem.calories / 100) * quantity);
}

export function getRemainingCalories(consumed, goal) {
    return goal - consumed;
}