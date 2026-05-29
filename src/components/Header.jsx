import React, { useEffect, useState } from 'react'

export default function Header() {
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('theme')
        return saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    })

    useEffect(() => {
        localStorage.setItem('theme', theme)
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [theme])

    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold text-blue-500">🍎 NutriTrack</h1>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Calorie Tracker</p>
                </div>
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-2xl"
                    aria-label="Toggle theme"
                >
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>
            </div>
        </header>
    )
}