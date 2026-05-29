import axios from 'axios'

// USDA FoodData Central API configuration
// You can replace 'DEMO_KEY' with your custom USDA API key from https://fdc.nal.usda.gov/
const API_KEY = import.meta.env.VITE_USDA_API_KEY || 'DEMO_KEY'
const BASE_URL = 'https://api.nal.usda.gov/fdc/v1'

/**
 * Searches USDA FoodData Central for a query string.
 * Maps result nutrients cleanly:
 * - 208: Energy (Calories)
 * - 203: Protein
 * - 205: Carbohydrate
 * - 204: Total lipid (Fat)
 */
export async function searchFood(query, pageSize = 25) {
  if (!query || query.trim().length < 2) return []

  try {
    const response = await axios.get(`${BASE_URL}/foods/search`, {
      params: {
        api_key: API_KEY,
        query: query,
        pageSize: pageSize,
        dataType: ['Foundation', 'SR Legacy', 'Branded'], // Filter for standard foods
      },
    })

    if (!response.data || !response.data.foods) return []

    return response.data.foods.map((food) => {
      const getNutrientValue = (number, nameQuery) => {
        // Find by nutrient number
        let nutrient = food.foodNutrients?.find(
          (n) => String(n.nutrientNumber) === String(number)
        )
        
        // Fallback to name search if number is not matched
        if (!nutrient && nameQuery) {
          nutrient = food.foodNutrients?.find((n) =>
            n.nutrientName?.toLowerCase().includes(nameQuery.toLowerCase())
          )
        }
        
        return nutrient ? Math.max(0, Math.round(nutrient.value)) : 0
      }

      // USDA values are always given *per 100g* of the food item
      return {
        id: food.fdcId || Date.now() + Math.random(),
        name: food.description,
        brand: food.brandOwner || food.brandName || null,
        calories: getNutrientValue('208', 'Energy'),
        protein: getNutrientValue('203', 'Protein'),
        carbs: getNutrientValue('205', 'Carbohydrate'),
        fat: getNutrientValue('204', 'Total lipid'),
      }
    })
  } catch (error) {
    console.error('USDA API search request failed:', error)
    throw new Error(error.response?.data?.error?.message || 'Failed to fetch food details from USDA database.')
  }
}
