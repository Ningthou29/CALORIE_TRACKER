import React, { useEffect, useState } from 'react'
import { useUserStore } from './stores/userStore'
import ProfileSetup from './components/ProfileSetup'
import Dashboard from './components/Dashboard'
import Header from './components/Header'

function App() {
  const { profile, loadProfile } = useUserStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initial profile search
    loadProfile()
    setLoading(false)
  }, [loadProfile])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center text-slate-400">
        <div className="w-8 h-8 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin mb-3" />
        <p className="text-xs uppercase font-extrabold tracking-widest text-slate-400 dark:text-slate-500">
          Loading Health Data...
        </p>
      </div>
    )
  }

  // Routing condition: if profile vitals are incomplete, force onboarding setup card
  const showOnboarding = !profile || !profile.isComplete

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Global Brand Navigation */}
      <Header />

      <main className="flex-1 w-full max-w-5xl mx-auto py-6 pb-24">
        {showOnboarding ? (
          <ProfileSetup />
        ) : (
          <Dashboard />
        )}
      </main>

      {/* Footer Branding */}
      <footer className="w-full text-center py-6 text-[10px] font-bold text-slate-400 dark:text-slate-600 border-t border-slate-100 dark:border-slate-900/60 mt-auto bg-white/30 dark:bg-slate-950/20">
        &copy; {new Date().getFullYear()} NutriTrack. Build complete. Stores 100% locally on device.
      </footer>
    </div>
  )
}

export default App
