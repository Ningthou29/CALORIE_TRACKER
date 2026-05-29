import React, { useEffect, useState } from 'react'
import { useUserStore } from './stores/userStore'
import ProfileSetup from './components/ProfileSetup'
import Dashboard from './components/Dashboard'
import Header from './components/Header'

function App() {
    const { profile, loadProfile } = useUserStore()
    const [showProfile, setShowProfile] = useState(false)

    useEffect(() => {
        loadProfile()
    }, [])

    useEffect(() => {
        setShowProfile(!profile?.isComplete)
    }, [profile])

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header />
            <main className="container mx-auto px-4 py-4 pb-20">
                {showProfile ? <ProfileSetup /> : <Dashboard />}
            </main>
        </div>
    )
}

export default App