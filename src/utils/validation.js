import { z } from 'zod'

export const userProfileSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  age: z.number({ invalid_type_error: 'Age must be a number' })
    .min(15, 'Age must be 15 or older')
    .max(120, 'Age must be under 120'),
  gender: z.enum(['male', 'female'], { required_error: 'Gender is required' }),
  height: z.number({ invalid_type_error: 'Height must be a number' })
    .min(100, 'Height must be at least 100 cm')
    .max(250, 'Height must be under 250 cm'),
  weight: z.number({ invalid_type_error: 'Weight must be a number' })
    .min(30, 'Weight must be at least 30 kg')
    .max(300, 'Weight must be under 300 kg'),
  activityLevel: z.enum(['sedentary', 'light', 'moderate', 'active', 'very_active'], {
    required_error: 'Please select your activity level',
  }),
  goal: z.enum(['lose', 'maintain', 'gain'], {
    required_error: 'Please select your goal',
  }),
})

export const foodItemSchema = z.object({
  name: z.string().min(1, 'Food name is required'),
  quantity: z.number({ invalid_type_error: 'Quantity must be a number' })
    .positive('Quantity must be positive')
    .max(5000, 'Quantity seems too high'),
  calories: z.number().nonnegative(),
  protein: z.number().nonnegative(),
  carbs: z.number().nonnegative(),
  fat: z.number().nonnegative(),
})
