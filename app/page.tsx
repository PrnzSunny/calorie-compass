'use client'

import { useState } from 'react'
import { fetchCalories } from '../lib/api'

export default function Home() {
  const [food, setFood] = useState('')
  const [result, setResult] = useState(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = await fetchCalories(food)
    setResult(data)
  }

  return (
    <div style={{ padding: '1rem', background: '#000', color: '#fff', minHeight: '100vh' }}>
      <h1>Calorie Compass</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={food}
          onChange={(e) => setFood(e.target.value)}
          placeholder="Enter a food (e.g. 1 apple)"
          style={{ padding: '0.5rem', marginRight: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Get Calories
        </button>
      </form>

      {result && (
        <div style={{ background: '#222', padding: '1rem', borderRadius: '8px' }}>
          <h2>Results:</h2>
          {result.foods.map((foodItem: any, index: number) => (
            <p key={index}>
              {foodItem.food_name}: {foodItem.nf_calories} calories
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
