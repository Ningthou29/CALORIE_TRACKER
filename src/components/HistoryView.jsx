import React, { useState, useEffect } from 'react'
import { getDailyLog } from '../utils/storage'

export default function HistoryView() {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
    const [log, setLog] = useState(null)

    useEffect(() => {
        const loadLog = async () => {
            const data = await getDailyLog(selectedDate)
            setLog(data)
        }
        loadLog()
    }, [selectedDate])

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">History</h3>
            <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-2 border rounded-lg mb-4 dark:bg-gray-700"
            />
            {log && (
                <div>
                    <p className="text-center text-2xl font-bold mb-4">{log.totalCalories || 0} calories</p>
                    {log.items && log.items.map((item, idx) => (
                        <div key={idx} className="p-2 border-b">
                            <p>{item.name} - {item.calories} cal</p>
                        </div>
                    ))}
                    {(!log.items || log.items.length === 0) && (
                        <p className="text-center text-gray-500">No food logged on this day</p>
                    )}
                </div>
            )}
        </div>
    )
}