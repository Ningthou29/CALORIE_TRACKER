import { useState, useEffect } from 'react'
import { searchFood } from '../services/foodApi'

export function useFoodSearch(query) {
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!query || query.length < 2) {
            setResults([])
            return
        }

        const timeoutId = setTimeout(async () => {
            setLoading(true)
            try {
                const data = await searchFood(query)
                setResults(data)
                setError(null)
            } catch (err) {
                setError(err.message)
                setResults([])
            } finally {
                setLoading(false)
            }
        }, 300)

        return () => clearTimeout(timeoutId)
    }, [query])

    return { results, loading, error }
}