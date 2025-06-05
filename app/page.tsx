'use client';

import { useState, useEffect } from 'react';
import { fetchCalories } from '../lib/api';
// import { createMeal } from './api/meals/route';
import { NextRequest } from 'next/server';

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

// ────────── Type definitions and helper for weekly meals ──────────

type Weekday = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

interface LoggedItem {
  foodName: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  quantity: number;
  photoUrl?: string;
}

interface DayMeals {
  breakfast: { goal: number; items: LoggedItem[] };
  lunch:     { goal: number; items: LoggedItem[] };
  dinner:    { goal: number; items: LoggedItem[] };
}

interface WeeklyMeals {
  mon: DayMeals;
  tue: DayMeals;
  wed: DayMeals;
  thu: DayMeals;
  fri: DayMeals;
  sat: DayMeals;
  sun: DayMeals;
}

// Helper to build an "empty week" given a TDEE
function createEmptyWeeklyMeals(dailyTdee: number): WeeklyMeals {
  const b = Math.round(dailyTdee * 0.25);
  const l = Math.round(dailyTdee * 0.375);
  const d = dailyTdee - b - l;
  const oneDay: DayMeals = {
    breakfast: { goal: b, items: [] },
    lunch:     { goal: l, items: [] },
    dinner:    { goal: d, items: [] },
  };
  return {
    mon: { ...oneDay },
    tue: { ...oneDay },
    wed: { ...oneDay },
    thu: { ...oneDay },
    fri: { ...oneDay },
    sat: { ...oneDay },
    sun: { ...oneDay },
  };
}

// ────────────────────────────────────────────────────────────────────

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

  // Computed daily target (TDEE)
  const [dailyTarget, setDailyTarget] = useState<number | null>(null);

  // Nutrition state
  const [favorites, setFavorites] = useState<string[]>([]);
  const [food, setFood] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [result, setResult] = useState<ApiResult | null>(null);

  // Servings quantity per item (in search results overlay)
  const [servingQty, setServingQty] = useState<Record<string, number>>({});

  useEffect(() => {
    // protect route
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      window.location.href = '/login';
      return;
    }
    setSearchHistory(JSON.parse(localStorage.getItem('searchHistory') || '[]'));
    setFavorites(JSON.parse(localStorage.getItem('favorites') || '[]'));
  }, []);

  // ────────── NEW STATE: track which weekday is selected ──────────
  const [currentDay, setCurrentDay] = useState<Weekday>(() => {
    const dayIndex = new Date().getDay(); // Sunday = 0, Monday = 1, etc.
    const map: Record<number, Weekday> = {
      0: 'sun',
      1: 'mon',
      2: 'tue',
      3: 'wed',
      4: 'thu',
      5: 'fri',
      6: 'sat',
    };
    return map[dayIndex];
  });

  // ────────── NEW STATE: store all seven days of meals in memory ──────────
  const [weeklyMeals, setWeeklyMeals] = useState<WeeklyMeals | null>(null);

  // ────────────────────────────────────────────────────────────────────────

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
    const a = Number(age),
      h = Number(height),
      w = Number(weight);
    const bmr =
      gender === 'Male'
        ? 10 * w + 6.25 * h - 5 * a + 5
        : 10 * w + 6.25 * h - 5 * a - 161;
    const factor = ACTIVITY_FACTORS[activity];
    const tdee = Math.round(bmr * factor);

    // 1) Set daily target
    setDailyTarget(tdee);

    // 2) Initialize weeklyMeals with meal goals based on TDEE
    setWeeklyMeals(createEmptyWeeklyMeals(tdee));

    // 3) Move to step 5
    setStep(5);
  };

  // Calorie lookup (search API)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!food.trim()) return alert('Please enter a food item.');
    const data = await fetchCalories(food);
    setResult(data);
    const updated = [food, ...searchHistory.slice(0, 9)];

    // console.log("The meal data: " + JSON.stringify(data));
    // console.log("The meal data: " + JSON.stringify(data.foods[0]));
    // console.log("The meal data: " + data.foods[0].food_name);


    var foodItem = data.foods[0];

     var requestTest = {
          user_id: 1,
          food_name: foodItem.food_name,
          calories: foodItem.nf_calories,
          protein: foodItem.nf_protein,
          fat: foodItem.nf_total_fat,
          carbohydrates: foodItem.nf_total_carbohydrate,
          // meal_type: mealType.toLowerCase(),
          // date_eaten: new Date().toISOString().split('T')[0]
        }

    console.log("the request: " + JSON.stringify(requestTest))

        //     body.meal_name || 'Unnamed Meal',
        // body.meal_type || 'breakfast',
        // body.total_calories || 0,
        // body.total_protein || 0,
        // body.total_carbs || 0,
        // body.total_fat || 0
    await fetch('/api/meals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 1,
          food_name: foodItem.food_name,
          calories: foodItem.nf_calories,
          protein: foodItem.nf_protein,
          fat: foodItem.nf_total_fat,
          carbohydrates: foodItem.nf_total_carbohydrate,
          // meal_type: mealType.toLowerCase(),
          // date_eaten: new Date().toISOString().split('T')[0]
        })
      });
      console.log('Saved to database?');
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

  // ────────── Helper: Add a food item to the selected meal of the current day ──────────
  const saveMealToDatabase = async (foodItem: FoodItem, mealType: string) => {
    try {
      await fetch('/api/meals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          food_name: foodItem.food_name,
          calories: foodItem.nf_calories,
          protein: foodItem.nf_protein,
          fat: foodItem.nf_total_fat,
          carbohydrates: foodItem.nf_total_carbohydrate,
          meal_type: mealType.toLowerCase(),
          date_eaten: new Date().toISOString().split('T')[0]
        })
      });
      console.log('✅ Meal with macros saved to database!');
    } catch (error) {
      console.log('❌ Error saving meal:', error);
    }
  };

  function addItemToMeal(mealKey: keyof DayMeals, foodItem: FoodItem) {
    if (!weeklyMeals) return;
    const logged: LoggedItem = {
      foodName: foodItem.food_name,
      calories: foodItem.nf_calories,
      protein: foodItem.nf_protein,
      fat: foodItem.nf_total_fat,
      carbs: foodItem.nf_total_carbohydrate,
      quantity: 1,
      photoUrl: foodItem.photo?.thumb,
    };
    
    setWeeklyMeals(prev => {
      if (!prev) return prev;
      const updatedDay = {
        ...prev[currentDay],
        [mealKey]: {
          goal: prev[currentDay][mealKey].goal,
          items: [...prev[currentDay][mealKey].items, logged],
        },
      };
      return {
        ...prev,
        [currentDay]: updatedDay,
      };
    });
    
    // Save to database with full nutrition info
    saveMealToDatabase(foodItem, mealKey);
    
    // Clear overlay
    setActiveMeal(null);
    setResult(null);
  }

  // ────────── Helper: Remove an item from a meal by index ──────────
  function removeItemFromMeal(mealKey: keyof DayMeals, index: number) {
    if (!weeklyMeals) return;
    setWeeklyMeals(prev => {
      if (!prev) return prev;
      const itemsCopy = [...prev[currentDay][mealKey].items];
      itemsCopy.splice(index, 1);
      const updatedDay = {
        ...prev[currentDay],
        [mealKey]: {
          goal: prev[currentDay][mealKey].goal,
          items: itemsCopy,
        },
      };
      return {
        ...prev,
        [currentDay]: updatedDay,
      };
    });
  }

  // ────────── State to know which meal the user is currently adding to ──────────
  const [activeMeal, setActiveMeal] = useState<keyof DayMeals | null>(null);
  // ────────────────────────────────────────────────────────────────────────────

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

        {/* History Button */}
        <button
          onClick={() => window.location.href = '/history'}
          style={{
            display: 'block',
            margin: '0 auto 1.5rem auto',
            background: '#3182ce',
            color: '#fff',
            padding: '0.5rem 1.25rem',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          📊 View Meal History
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

        {/* Step 5: Show Daily Target & Weekly Meal UI */}
        {step === 5 && dailyTarget !== null && weeklyMeals && (
          <div style={{ margin: '1rem 0' }}>
            <h2 style={{ textAlign: 'center' }}>Your daily target: {dailyTarget} kcal</h2>

            {/* Weekday Tabs */}
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginTop: '1rem',
              }}
            >
              {(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as Weekday[]).map(day => (
                <button
                  key={day}
                  onClick={() => setCurrentDay(day)}
                  style={{
                    padding: '0.5rem 0.75rem',
                    background: currentDay === day ? '#3182ce' : '#fff',
                    color: currentDay === day ? '#fff' : '#2d3748',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    fontSize: '0.8rem',
                  }}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* Meal Boxes for the selected day */}
            <div style={{ marginTop: '1.5rem' }}>
              {(['breakfast', 'lunch', 'dinner'] as Array<keyof DayMeals>).map(mealKey => {
                const { goal, items } = weeklyMeals[currentDay][mealKey];
                const totalCalories = items.reduce((sum, it) => sum + it.calories * it.quantity, 0);

                return (
                  <div
                    key={mealKey}
                    style={{
                      background: '#fff',
                      borderRadius: '8px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                      padding: '1rem',
                      marginBottom: '1rem',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <h3 style={{ margin: 0, textTransform: 'capitalize' }}>{mealKey}</h3>
                      <button
                        onClick={() => setActiveMeal(mealKey)}
                        style={{
                          fontSize: '1.5rem',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#3182ce',
                        }}
                      >
                        ＋
                      </button>
                    </div>

                    <p
                      style={{
                        margin: '0.25rem 0',
                        color: totalCalories > goal ? '#e53e3e' : '#2d3748',
                      }}
                    >
                      {totalCalories} of {goal} kcal
                    </p>

                    {items.length === 0 ? (
                      <p style={{ color: '#718096', marginTop: '0.5rem' }}>
                        No items logged yet.
                      </p>
                    ) : (
                      <ul style={{ paddingLeft: '1rem', marginTop: '0.5rem' }}>
                        {items.map((it, i) => (
                          <li
                            key={i}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              marginBottom: '0.25rem',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              {it.photoUrl && (
                                <img
                                  src={it.photoUrl}
                                  alt={it.foodName}
                                  style={{ width: 40, height: 40, borderRadius: '4px' }}
                                />
                              )}
                              <span>
                                {it.foodName} × {it.quantity} = {(it.calories * it.quantity).toFixed(0)} kcal
                                <br />
                                <small style={{ color: '#666', fontSize: '0.8rem' }}>
                                  🥩 {(it.protein * it.quantity).toFixed(1)}g | 
                                  🥑 {(it.fat * it.quantity).toFixed(1)}g | 
                                  🍞 {(it.carbs * it.quantity).toFixed(1)}g
                                </small>
                              </span>
                            </div>
                            <button
                              onClick={() => removeItemFromMeal(mealKey, i)}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#e53e3e',
                                fontSize: '1.1rem',
                              }}
                            >
                              ×
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Calorie Lookup Form & Overlay (only when adding to a meal) */}
        {step >= 5 && (
          <>
            {/* Search form (always visible after step 5) */}
            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}
            >
              <input
                value={food}
                onChange={e => setFood(e.target.value)}
                placeholder="Search a food (e.g. 1 apple)"
                style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
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
                <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Search History</h3>
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
                <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Favorites ❤️</h3>
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

            {/* Overlay for adding a food item to a meal */}
            {activeMeal && result?.foods && (
              <div
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  background: 'rgba(0,0,0,0.3)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 10,
                }}
                onClick={() => {
                  setActiveMeal(null);
                  setResult(null);
                }}
              >
                <div
                  style={{
                    background: '#fff',
                    borderRadius: '8px',
                    maxWidth: 500,
                    width: '90%',
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    padding: '1rem',
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  <h4 style={{ marginBottom: '1rem' }}>
                    Select a food for {activeMeal.charAt(0).toUpperCase() + activeMeal.slice(1)}
                  </h4>
                  {result.foods.map(foodItem => (
                    <div
                      key={foodItem.food_name}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        margin: '0.5rem 0',
                        padding: '0.5rem',
                        borderRadius: '6px',
                        border: '1px solid #e2e8f0',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {foodItem.photo?.thumb && (
                          <img
                            src={foodItem.photo.thumb}
                            alt={foodItem.food_name}
                            style={{ width: 40, height: 40, borderRadius: '4px' }}
                          />
                        )}
                        <div>
                          <strong>{foodItem.food_name}</strong>
                          <p style={{ margin: 0, fontSize: '0.9rem', color: '#4a5568' }}>
                            {foodItem.nf_calories.toFixed(0)} kcal per serving
                          </p>
                          {/* Macros display in search results */}
                          <div style={{ 
                            display: 'flex', 
                            gap: '0.5rem', 
                            fontSize: '0.8rem', 
                            color: '#666',
                            marginTop: '0.25rem'
                          }}>
                            <span>P: {foodItem.nf_protein.toFixed(1)}g</span>
                            <span>F: {foodItem.nf_total_fat.toFixed(1)}g</span>
                            <span>C: {foodItem.nf_total_carbohydrate.toFixed(1)}g</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => addItemToMeal(activeMeal, foodItem)}
                        style={{
                          background: '#3182ce',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '0.3rem 0.6rem',
                          cursor: 'pointer',
                        }}
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}