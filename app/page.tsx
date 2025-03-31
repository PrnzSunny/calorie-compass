'use client';

import { useState } from 'react';
import { fetchCalories } from '../lib/api';

export default function Home() {
  const [food, setFood] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await fetchCalories(food);
    setResult(data);
  };

  return (
    <div
      style={{
        background: '#f7fafc',
        minHeight: '100vh',
        padding: '2rem',
        fontFamily: 'Arial, sans-serif',
        color: '#1a202c',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      <h1
        style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          marginBottom: '1.5rem',
          textAlign: 'center',
        }}
      >
        Calorie Compass
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '1.5rem',
          justifyContent: 'center',
        }}
      >
        <input
          type="text"
          value={food}
          onChange={(e) => setFood(e.target.value)}
          placeholder="Enter a food (e.g. 1 apple)"
          style={{
            padding: '0.5rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            flex: 1,
          }}
        />
        <button
          type="submit"
          style={{
            background: '#3182ce',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
          }}
        >
          Get Calories
        </button>
      </form>

      {result && result.foods && (
        <div
          style={{
            background: '#e2e8f0',
            padding: '1rem',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
          }}
        >
          <h2 style={{ marginBottom: '0.5rem' }}>Results:</h2>
          {result.foods.map((foodItem: any, index: number) => (
            <p key={index}>
              <strong>{foodItem.food_name}</strong>: {foodItem.nf_calories} calories
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
