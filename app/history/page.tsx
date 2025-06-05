'use client';

import { useState, useEffect } from 'react';

export default function HistoryPage() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('🔍 Fetching meals...');
    
    fetch('/api/meals')
      .then(res => {
        console.log('📡 Response status:', res.status);
        return res.json();
      })
      .then(data => {
        console.log('📊 API Response:', data);
        if (data.success) {
          setMeals(data.meals);
          console.log('✅ Meals loaded:', data.meals.length);
        } else {
          setError('Failed to load meals: ' + data.error);
          console.log('❌ API Error:', data.error);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('❌ Fetch Error:', error);
        setError('Network error: ' + error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '800px', 
      margin: '0 auto',
      background: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#333', textAlign: 'center' }}>🍽️ Meal History</h1>
      
      {/* Debug Info */}
      <div style={{ 
        background: '#fff', 
        padding: '1rem', 
        marginBottom: '1rem',
        border: '2px solid #blue'
      }}>
        <h3>Debug Info:</h3>
        <p>Loading: {loading ? 'Yes' : 'No'}</p>
        <p>Error: {error || 'None'}</p>
        <p>Meals Count: {meals.length}</p>
        <p>Console: Check F12 for more details</p>
      </div>
      
      {loading && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <h2>Loading meal history...</h2>
        </div>
      )}

      {error && (
        <div style={{ 
          background: '#fee', 
          color: '#c00', 
          padding: '1rem', 
          borderRadius: '8px',
          margin: '1rem 0'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {!loading && !error && meals.length === 0 && (
        <div style={{
          background: '#fff',
          padding: '2rem',
          borderRadius: '8px',
          textAlign: 'center',
          marginTop: '2rem'
        }}>
          <p>No meals found in database.</p>
        </div>
      )}

      {!loading && meals.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Found {meals.length} meals:</h3>
          {meals.map((meal: any, index) => (
            <div key={meal.id || index} style={{ 
              background: '#fff', 
              padding: '1.5rem', 
              margin: '1rem 0', 
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                <strong>{meal.food_name || 'Unknown Food'}</strong> - {meal.calories || 0} kcal
              </div>
              
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                Meal Type: {meal.meal_type || 'Unknown'} | 
                Date: {meal.date_eaten || 'Unknown'} | 
                Protein: {meal.protein || 0}g | 
                Fat: {meal.fat || 0}g | 
                Carbs: {meal.carbohydrates || 0}g
              </div>
              
              <div style={{ fontSize: '0.8rem', color: '#999', marginTop: '0.5rem' }}>
                Raw data: {JSON.stringify(meal)}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <button 
        onClick={() => window.location.href = '/'}
        style={{ 
          display: 'block',
          margin: '2rem auto',
          padding: '1rem 2rem', 
          background: '#3182ce', 
          color: 'white', 
          border: 'none',
          borderRadius: '8px',
          fontSize: '1rem',
          cursor: 'pointer'
        }}
      >
        Back to Main App
      </button>
    </div>
  );
}