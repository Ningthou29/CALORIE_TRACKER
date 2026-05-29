import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useUserStore } from '../stores/userStore'
import { calculateTDEE, calculateMacros } from '../utils/calculators'

const profileSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    age: z.number().min(15).max(120),
    gender: z.enum(['male', 'female']),
    height: z.number().min(100).max(250),
    weight: z.number().min(30).max(300),
    activityLevel: z.enum(['sedentary', 'light', 'moderate', 'active', 'very_active']),
    goal: z.enum(['lose', 'maintain', 'gain']),
})

export default function ProfileSetup() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            age: 30,
            height: 170,
            weight: 70,
        }
    })

    const setUserProfile = useUserStore((state) => state.setUserProfile)

    const onSubmit = (data) => {
        const tdee = calculateTDEE(data)
        const macros = calculateMacros(tdee, data.goal)
        setUserProfile({ ...data, tdee, macros, isComplete: true })
    }

    return (
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Set Up Your Profile</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input {...register('name')} className="w-full p-2 border rounded-lg dark:bg-gray-700" />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Age</label>
                    <input type="number" {...register('age', { valueAsNumber: true })} className="w-full p-2 border rounded-lg dark:bg-gray-700" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Gender</label>
                    <select {...register('gender')} className="w-full p-2 border rounded-lg dark:bg-gray-700">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Height (cm)</label>
                    <input type="number" {...register('height', { valueAsNumber: true })} className="w-full p-2 border rounded-lg dark:bg-gray-700" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                    <input type="number" {...register('weight', { valueAsNumber: true })} className="w-full p-2 border rounded-lg dark:bg-gray-700" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Activity Level</label>
                    <select {...register('activityLevel')} className="w-full p-2 border rounded-lg dark:bg-gray-700">
                        <option value="sedentary">Sedentary (little or no exercise)</option>
                        <option value="light">Light (1-3 days/week)</option>
                        <option value="moderate">Moderate (4-5 days/week)</option>
                        <option value="active">Active (daily exercise)</option>
                        <option value="very_active">Very Active (intense 6-7 days/week)</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Goal</label>
                    <select {...register('goal')} className="w-full p-2 border rounded-lg dark:bg-gray-700">
                        <option value="lose">Lose Weight</option>
                        <option value="maintain">Maintain Weight</option>
                        <option value="gain">Gain Weight</option>
                    </select>
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600">
                    Start Tracking
                </button>
            </form>
        </div>
    )
}