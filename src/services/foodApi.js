import axios from 'axios'

// 🔴 IMPORTANT: Get your free API key from https://fdc.nal.usda.gov/
// Then replace 'YOUR_USDA_API_KEY_HERE' with your actual key
const API_KEY = 'YOUR_USDA_API_KEY_HERE'
const BASE_URL = 'https://api.nal.usda.gov/fdc/v1'

export async function searchFood(query, pageSize = 20) {
    try {
        const response = await axios.get(`${BASE_URL}/foods/search`, {
            params: {
                api_key: API_KEY,
                query: query,
                pageSize: pageSize,
            }
        })

        return response.data.foods.map(food => {
            const getNutrient = (number) => {
                const nutrient = food.foodNutrients?.find(n => n.nutrientNumber === number)
                return nutrient ? Math.round(nutrient.value) : 0
            }

            return {
                id: food.fdcId,
                name: food.description,
                calories: getNutrient('208'),
                protein: getNutrient('203'),
                carbs: getNutrient('205'),
                fat: getNutrient('204'),
            }
        })
    } catch (error) {
        console.error('API Error:', error)
        return []
    }
}