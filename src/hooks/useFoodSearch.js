import { useState, useEffect } from 'react'
import { searchFood } from '../services/foodApi'

/**
 * Custom hook to debounce and execute food search queries against the USDA database.
 */
export function useFoodSearch(query, delayMs = 350) {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults([])
      setError(null)
      return
    }

    const handler = setTimeout(async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await searchFood(query)
        setResults(data)
      } catch (err) {
        setError(err.message || 'Search failed. Please try again.')
        setResults([])
      } finally {
        setLoading(false)
      }
    }, delayMs)

    return () => {
      clearTimeout(handler)
    }
  }, [query, delayMs])

  return { results, loading, error }
}
