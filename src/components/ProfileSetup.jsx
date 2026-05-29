import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Activity, Target, User, Heart } from 'lucide-react'
import { userProfileSchema } from '../utils/validation'
import { calculateTDEE, calculateMacros } from '../utils/calculators'
import { useUserStore } from '../stores/userStore'
import { ACTIVITY_LEVELS, GOALS } from '../utils/constants'

export default function ProfileSetup() {
  const setUserProfile = useUserStore((state) => state.setUserProfile)
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      gender: 'male',
      activityLevel: 'sedentary',
      goal: 'maintain',
    },
  })

  const onSubmit = (data) => {
    // Calculate targets using Mifflin-St Jeor and macro ratios
    const tdee = calculateTDEE(data)
    const macros = calculateMacros(tdee, data.goal)

    // Save profile to state & localstorage
    setUserProfile({
      ...data,
      tdee,
      macros,
      isComplete: true,
    })
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Welcome to NutriTrack
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-sm mx-auto">
          Let's calculate your daily energy expenditure and macronutrient requirements to personalize your dashboard.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 shadow-xl rounded-3xl p-6 md:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Section 1: Basic Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-500" /> Vitals & Profile
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name-input" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">
                  Your Name
                </label>
                <input
                  id="name-input"
                  type="text"
                  placeholder="e.g., Ningthouba"
                  {...register('name')}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 focus:outline-none transition-all dark:text-white"
                />
                {errors.name && (
                  <p className="text-rose-500 text-xs font-medium mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="age-input" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">
                  Age (Years)
                </label>
                <input
                  id="age-input"
                  type="number"
                  placeholder="e.g., 28"
                  {...register('age', { valueAsNumber: true })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 focus:outline-none transition-all dark:text-white"
                />
                {errors.age && (
                  <p className="text-rose-500 text-xs font-medium mt-1">{errors.age.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="gender-select" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">
                  Gender
                </label>
                <select
                  id="gender-select"
                  {...register('gender')}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 focus:outline-none transition-all dark:text-white"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && (
                  <p className="text-rose-500 text-xs font-medium mt-1">{errors.gender.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="height-input" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">
                  Height (cm)
                </label>
                <input
                  id="height-input"
                  type="number"
                  placeholder="e.g., 175"
                  {...register('height', { valueAsNumber: true })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 focus:outline-none transition-all dark:text-white"
                />
                {errors.height && (
                  <p className="text-rose-500 text-xs font-medium mt-1">{errors.height.message}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="weight-input" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-1">
                  Weight (kg)
                </label>
                <input
                  id="weight-input"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 72.5"
                  {...register('weight', { valueAsNumber: true })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 focus:outline-none transition-all dark:text-white"
                />
                {errors.weight && (
                  <p className="text-rose-500 text-xs font-medium mt-1">{errors.weight.message}</p>
                )}
              </div>
            </div>
          </div>

          <hr className="border-slate-100 dark:border-slate-800/80" />

          {/* Section 2: Activity Level */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-500" /> Activity Level
            </h3>
            
            <div className="space-y-2">
              {Object.entries(ACTIVITY_LEVELS).map(([key, value]) => (
                <label
                  key={key}
                  className="flex items-start p-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/60 cursor-pointer transition-colors"
                >
                  <input
                    type="radio"
                    value={key}
                    {...register('activityLevel')}
                    className="mt-1 mr-3 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <span className="block text-sm font-bold text-slate-700 dark:text-slate-200">
                      {value.label}
                    </span>
                    <span className="block text-xs text-slate-400 dark:text-slate-500">
                      {value.description}
                    </span>
                  </div>
                </label>
              ))}
              {errors.activityLevel && (
                <p className="text-rose-500 text-xs font-medium mt-1">{errors.activityLevel.message}</p>
              )}
            </div>
          </div>

          <hr className="border-slate-100 dark:border-slate-800/80" />

          {/* Section 3: Goal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <Target className="w-4 h-4 text-pink-500" /> Fitness Goal
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {Object.entries(GOALS).map(([key, value]) => (
                <label
                  key={key}
                  className="flex flex-col p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/60 cursor-pointer text-center transition-colors"
                >
                  <input
                    type="radio"
                    value={key}
                    {...register('goal')}
                    className="mx-auto mb-2 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    {value.label}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                    {value.description}
                  </span>
                </label>
              ))}
              {errors.goal && (
                <p className="text-rose-500 text-xs font-medium mt-1">{errors.goal.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-indigo-500/15 hover:shadow-indigo-500/25 transition-all text-sm tracking-wide mt-4 uppercase flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4 animate-pulse" /> Compute & Start Tracking
          </button>
        </form>
      </div>
    </div>
  )
}
