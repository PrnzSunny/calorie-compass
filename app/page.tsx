'use client';

import { useState, useEffect } from 'react';
import { fetchCalories } from '../lib/api';

interface FoodItem {
  food_name: string;
  nf_calories: number;
  nf_protein: number;
  nf_total_fat: number;
  nf_total_carbohydrate: number;
  nf_serving_weight_grams?: number;
  serving_weight_grams?: number;
  photo?: { thumb?: string };
}

interface ApiResult {
  foods: FoodItem[];
}

// Activity factors for TDEE calculation
const ACTIVITY_FACTORS: Record<string, number> = {
  Sedentary: 1.2,
  Light: 1.375,
  Moderate: 1.55,
  Active: 1.725,
  Very: 1.9,
};

export default function Home() {
  // Question flow
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [months, setMonths] = useState('');

  // Personal metrics
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState<keyof typeof ACTIVITY_FACTORS>('Moderate');

  // Computed daily target
  const [dailyTarget, setDailyTarget] = useState<number | null>(null);

  // Nutrition state
  const [favorites, setFavorites] = useState<string[]>([]);
  const [food, setFood] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [result, setResult] = useState<ApiResult | null>(null);

  // Servings quantity per item
  const [servingQty, setServingQty] = useState<Record<string, number>>({});

  useEffect(() => {
    // protect route
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      window.location.href = '/login';
    }
    setSearchHistory(JSON.parse(localStorage.getItem('searchHistory') || '[]'));
    setFavorites(JSON.parse(localStorage.getItem('favorites') || '[]'));
  }, []);

  // Step handlers
  const advanceFromName = () => {
    if (!name.trim()) return alert('Please enter your name.');
    localStorage.setItem('userName', name);
    setStep(2);
  };

  const toggleGoal = (goal: string) => {
    setSelectedGoals(prev =>
      prev.includes(goal)
        ? prev.filter(g => g !== goal)
        : prev.length < 3
        ? [...prev, goal]
        : prev
    );
  };
  const advanceFromGoals = () => {
    if (selectedGoals.length === 0) return alert('Select at least one goal.');
    localStorage.setItem('userGoals', JSON.stringify(selectedGoals));
    setStep(3);
  };

  const advanceFromMonths = () => {
    if (!months || Number(months) <= 0)
      return alert('Please enter a valid number of months.');
    localStorage.setItem('userMonths', months);
    setStep(4);
  };

  const advanceFromMetrics = () => {
    if (!age || !height || !weight)
      return alert('Please complete age, height, and weight.');
    const a = Number(age), h = Number(height), w = Number(weight);
    let bmr =
      gender === 'Male'
        ? 10 * w + 6.25 * h - 5 * a + 5
        : 10 * w + 6.25 * h - 5 * a - 161;
    const factor = ACTIVITY_FACTORS[activity];
    setDailyTarget(Math.round(bmr * factor));
    setStep(5);
  };

  // Calorie lookup
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!food.trim()) return alert('Please enter a food item.');
    const data = await fetchCalories(food);
    setResult(data);
    const updated = [food, ...searchHistory.slice(0, 9)];
    setSearchHistory(updated);
    localStorage.setItem('searchHistory', JSON.stringify(updated));
  };

  // Favorite toggle
  const toggleFavorite = (item: string) => {
    const updated = favorites.includes(item)
      ? favorites.filter(f => f !== item)
      : [item, ...favorites];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div
      style={{
        backgroundImage: 'url(/1.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        padding: '2rem',
        fontFamily: 'system-ui, sans-serif',
        color: '#1a202c',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          background: 'rgba(255,255,255,0.85)',
          borderRadius: '8px',
          padding: '1.5rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '2rem' }}>
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

        {/* Step 1: Name */}
        {step === 1 && (
          <>
            <label>Name:</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your name"
              style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
            />
            <button onClick={advanceFromName} style={{ width: '100%' }}>
              Next
            </button>
          </>
        )}

        {/* Step 2: Goals */}
        {step === 2 && (
          <>
            <p>Select up to three goals:</p>
            <div style={{ display: 'grid', gap: '0.5rem', margin: '0.5rem 0' }}>
              {[
                'Lose weight',
                'Maintain weight',
                'Gain weight',
                'Gain muscle',
                'Modify my diet',
                'Manage stress',
                'Increase step count',
              ].map(goal => (
                <button
                  key={goal}
                  onClick={() => toggleGoal(goal)}
                  style={{
                    textAlign: 'left',
                    padding: '0.75rem',
                    border: '1px solid',
                    borderColor: selectedGoals.includes(goal) ? '#3182ce' : '#ccc',
                    background: selectedGoals.includes(goal) ? '#ebf8ff' : '#fff',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  {goal}
                </button>
              ))}
            </div>
            <button onClick={advanceFromGoals} style={{ width: '100%' }}>
              Next
            </button>
          </>
        )}

        {/* Step 3: Months */}
        {step === 3 && (
          <>
            <label>Months to goal:</label>
            <input
              type="number"
              value={months}
              onChange={e => setMonths(e.target.value)}
              placeholder="e.g. 6"
              style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
            />
            <button onClick={advanceFromMonths} style={{ width: '100%' }}>
              Next
            </button>
          </>
        )}

        {/* Step 4: Metrics */}
        {step === 4 && (
          <>
            <label>Age:</label>
            <input
              type="number"
              value={age}
              onChange={e => setAge(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
            />
            <label>Gender:</label>
            <select
              value={gender}
              onChange={e => setGender(e.target.value as 'Male' | 'Female')}
              style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
            >
              <option>Male</option>
              <option>Female</option>
            </select>
            <label>Height (cm):</label>
            <input
              type="number"
              value={height}
              onChange={e => setHeight(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
            />
            <label>Weight (kg):</label>
            <input
              type="number"
              value={weight}
              onChange={e => setWeight(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
            />
            <label>Activity Level:</label>
            <select
              value={activity}
              onChange={e => setActivity(e.target.value as keyof typeof ACTIVITY_FACTORS)}
              style={{ width: '100%', padding: '0.5rem', margin: '0.5rem 0' }}
            >
              {Object.keys(ACTIVITY_FACTORS).map(a => (
                <option key={a}>{a}</option>
              ))}
            </select>
            <button onClick={advanceFromMetrics} style={{ width: '100%' }}>
              Calculate Daily Goal
            </button>
          </>
        )}

        {/* Step 5: Show Daily Target */}
        {step === 5 && dailyTarget !== null && (
          <div style={{ textAlign: 'center', margin: '1rem 0' }}>
            <h2>Your daily target: {dailyTarget} kcal</h2>
          </div>
        )}

        {/* Calorie Lookup */}
        {step >= 5 && (
          <>
            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}
            >
              <input
                value={food}
                onChange={e => setFood(e.target.value)}
                placeholder="Enter food (e.g. 1 apple)"
                style={{ flex: 1, padding: '0.5rem' }}
              />
              <button type="submit" style={{ padding: '0.5rem 1rem' }}>
                Get Calories
              </button>
            </form>

            {/* Search History */}
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
                <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Search History
                </h3>
                <ul style={{ paddingLeft: '1rem', listStyleType: 'disc' }}>
                  {searchHistory.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Favorites */}
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
                <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  Favorites ❤️
                </h3>
                <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                  {favorites.map((item, i) => (
                    <li
                      key={i}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.5rem',
                      }}
                    >
                      <span>{item}</span>
                      <button
                        onClick={() => {
                          const updated = favorites.filter(f => f !== item);
                          setFavorites(updated);
                          localStorage.setItem('favorites', JSON.stringify(updated));
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '1.2rem',
                          lineHeight: 1,
                          color: '#e53e3e',
                        }}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Results with servings input */}
            {result?.foods && (
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
                {result.foods.map((foodItem, idx) => {
                  const key = foodItem.food_name;
                  const baseGrams =
                    foodItem.nf_serving_weight_grams ??
                    foodItem.serving_weight_grams ??
                    100;
                  const qty = servingQty[key] ?? 1;
                  const totalGrams = baseGrams * qty;
                  const isFav = favorites.includes(key);

                  return (
                    <div key={idx} style={{ marginBottom: '1.5rem' }}>
                      <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                        {key}{' '}
                        <span
                          onClick={() => toggleFavorite(key)}
                          style={{
                            cursor: 'pointer',
                            color: isFav ? 'red' : 'gray',
                            marginLeft: '0.5rem',
                            fontSize: '1.3rem',
                          }}
                        >
                          ❤️
                        </span>
                      </p>
                      {foodItem.photo?.thumb && (
                        <img
                          src={foodItem.photo.thumb}
                          alt={key}
                          style={{
                            width: '80px',
                            height: '80px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            marginBottom: '0.5rem',
                          }}
                        />
                      )}
                      <p>Calories: {(foodItem.nf_calories * qty).toFixed(2)}</p>
                      <p>Protein: {(foodItem.nf_protein * qty).toFixed(2)}g</p>
                      <p>Fat: {(foodItem.nf_total_fat * qty).toFixed(2)}g</p>
                      <p>Carbs: {(foodItem.nf_total_carbohydrate * qty).toFixed(2)}g</p>

                      <div style={{ marginTop: '0.5rem' }}>
                        <label>
                          How many servings?
                          <input
                            type="number"
                            min={0.1}
                            step={0.1}
                            value={servingQty[key] ?? 1}
                            onChange={e => {
                              const v = parseFloat(e.target.value);
                              setServingQty(prev => ({
                                ...prev,
                                [key]: isNaN(v) ? 1 : v,
                              }));
                            }}
                            style={{
                              marginLeft: '0.5rem',
                              width: '4rem',
                              padding: '0.25rem',
                              borderRadius: '4px',
                              border: '1px solid #ccc',
                            }}
                          />
                        </label>
                      </div>

                      <table
                        style={{
                          width: '100%',
                          borderCollapse: 'collapse',
                          marginTop: '0.75rem',
                        }}
                      >
                        <thead>
                          <tr>
                            <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: '0.25rem' }}>
                              Unit
                            </th>
                            <th style={{ textAlign: 'right', borderBottom: '1px solid #ccc', padding: '0.25rem' }}>
                              Total for {qty} serving{qty !== 1 ? 's' : ''}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style={{ padding: '0.25rem' }}>Grams</td>
                            <td style={{ padding: '0.25rem', textAlign: 'right' }}>
                              {totalGrams.toFixed(0)} g
                            </td>
                          </tr>
                          <tr>
                            <td style={{ padding: '0.25rem' }}>Kilograms</td>
                            <td style={{ padding: '0.25rem', textAlign: 'right' }}>
                              {(totalGrams / 1000).toFixed(3)} kg
                            </td>
                          </tr>
                          <tr>
                            <td style={{ padding: '0.25rem' }}>Cups (≈)</td>
                            <td style={{ padding: '0.25rem', textAlign: 'right' }}>
                              {(totalGrams / 240).toFixed(2)} cups
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
