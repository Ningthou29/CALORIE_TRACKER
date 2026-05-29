import { z } from 'zod'

export const userProfileSchema = z.object({
    name: z.string().min(1, 'Name required'),
    age: z.number().min(15, 'Must be 15+').max(120, 'Must be under 120'),
    gender: z.enum(['male', 'female']),
    height: z.number().min(100, 'Minimum 100cm').max(250, 'Maximum 250cm'),
    weight: z.number().min(30, 'Minimum 30kg').max(300, 'Maximum 300kg'),
    activityLevel: z.enum(['sedentary', 'light', 'moderate', 'active', 'very_active']),
    goal: z.enum(['lose', 'maintain', 'gain']),
})

export const foodItemSchema = z.object({
    id: z.number(),
    name: z.string(),
    quantity: z.number().positive(),
    calories: z.number().positive(),
    macros: z.object({
        protein: z.number(),
        carbs: z.number(),
        fat: z.number(),
    }).optional(),
})