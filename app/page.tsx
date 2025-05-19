'use client';

import { useState, useEffect } from 'react';
import { fetchCalories } from '../lib/api';

export default function Home() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [food, setFood] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn !== 'true') {
      window.location.href = '/login';
    }

    const savedHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    setSearchHistory(savedHistory);

    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!food.trim()) {
      alert('Please enter a food item.');
      return;
    }

    const data = await fetchCalories(food);
    setResult(data);

    const updatedHistory = [food, ...searchHistory.slice(0, 9)];
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  return (
    <div
      style={{
        background: '#f9fafb',
        minHeight: '100vh',
        padding: '2rem',
        fontFamily: 'system-ui, sans-serif',
        color: '#1a202c',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: '2rem',
            color: '#2d3748',
          }}
        >
          🥗 Calorie Compass
        </h1>

        <button
          onClick={() => {
            localStorage.removeItem('isLoggedIn');
            window.location.href = '/login';
          }}
          style={{
            display: 'block',
            margin: '0 auto 1.5rem auto',
            background: '#e53e3e',
            color: '#fff',
            padding: '0.5rem 1.25rem',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '1.5rem',
          }}
        >
          <input
            type="text"
            value={food}
            onChange={(e) => setFood(e.target.value)}
            placeholder="Enter food (e.g. 1 apple)"
            style={{
              flex: 1,
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '6px',
            }}
          />
          <button
            type="submit"
            style={{
              background: '#3182ce',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '0.5rem 1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Get Calories
          </button>
        </form>

        {searchHistory.length > 0 && (
          <div
            style={{
              background: '#edf2f7',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            }}
          >
            <button
              onClick={() => {
                setSearchHistory([]);
                localStorage.removeItem('searchHistory');
              }}
              style={{
                marginBottom: '1rem',
                padding: '0.4rem 1rem',
                background: '#4a5568',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Clear History
            </button>

            <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Search History</h3>
            <ul style={{ paddingLeft: '1rem', listStyleType: 'disc' }}>
              {searchHistory.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {favorites.length > 0 && (
          <div
            style={{
              background: '#fefcbf',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            }}
          >
            <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Favorites ❤️</h3>
            <ul style={{ paddingLeft: '1rem', listStyleType: 'decimal' }}>
              {favorites.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {result && result.foods && (
          <div
            style={{
              backgroundColor: '#e2e8f0',
              padding: '1rem',
              borderRadius: '8px',
              marginTop: '1rem',
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            }}
          >
            <h2 style={{ marginBottom: '1rem' }}>Results:</h2>
            {result.foods.map((foodItem: any, index: number) => {
              const isFavorited = favorites.includes(foodItem.food_name);
              return (
                <div key={index} style={{ marginBottom: '1.5rem' }}>
                  <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                    {foodItem.food_name}{' '}
                    <span
                      onClick={() => {
                        const updatedFavorites = isFavorited
                          ? favorites.filter((f) => f !== foodItem.food_name)
                          : [foodItem.food_name, ...favorites];
                        setFavorites(updatedFavorites);
                        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                      }}
                      style={{
                        cursor: 'pointer',
                        color: isFavorited ? 'red' : 'gray',
                        marginLeft: '0.5rem',
                        fontSize: '1.3rem',
                      }}
                    >
                      ❤️
                    </span>
                  </p>
                  <img
  src={foodItem.photo?.thumb}
  alt={foodItem.food_name}
  style={{
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '0.5rem',
  }}
/>

                  <p>Calories: {foodItem.nf_calories}</p>
                  <p>Protein: {foodItem.nf_protein}g</p>
                  <p>Fat: {foodItem.nf_total_fat}g</p>
                  <p>Carbohydrates: {foodItem.nf_total_carbohydrate}g</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
