// IMPORTANT: This file must be in /app/api/meals/route.ts
// Make sure this is a server-side API route, not a client component

import { NextRequest, NextResponse } from 'next/server';

import mysql from 'mysql2/promise';

// Dynamic import to ensure mysql2 is only loaded on the server
const getMysqlConnection = async () => {
  const mysql = await import('mysql2/promise');
  return mysql.default;
};

// Database configuration
const dbConfig_old = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'calorie-compass',
  port: parseInt(process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'auth_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// GET - Get user's meals
export async function GET(request: NextRequest) {
  let connection;
  
  try {
    console.log('📘 API: Getting meals...');
    
    // Dynamic import of mysql2
    const mysql = await getMysqlConnection();
    connection = await mysql.createConnection(dbConfig);
    console.log('📘 API: Connected to database');
    
    const [rows] = await connection.execute(
      'SELECT * FROM user_meals ORDER BY created_at DESC'
    );
    
    console.log('📘 API: Query executed, rows found:', (rows as any[]).length);
    
    // Close connection before returning
    await connection.end();
    console.log('📘 API: Connection closed');
    
    // Return consistent structure that frontend expects
    return NextResponse.json({
      success: true,
      meals: rows || [],
      count: (rows as any[]).length
    });
    
  } catch (error: any) {
    console.error('❌ API Error:', error.message);
    
    // Make sure connection is closed on error
    if (connection) {
      try {
        await connection.end();
      } catch (closeError) {
        console.error('❌ Error closing connection:', closeError);
      }
    }
    
    return NextResponse.json({
      success: false,
      error: error.message || 'Database connection failed',
      meals: [] // Always return meals array even on error
    }, {
      status: 500
    });
  }
}

// POST - Create a new meal
// export async function createMeal(request: any) {
export async function POST(request: NextRequest) {
  let connection;
  
  try {
    const body = await request.json();
    console.log('📘 API: Creating new meal:', body);

   
    

    // const [response] = await pool.execute(
    //   "INSERT INTO user_meals (meal_name, meal_type) VALUES (?, ?)",
    //   [
    //     request.meal_name || 'Unnamed Meal',
    //     request.meal_type || 'breakfast'
    //   ]
    // ) as any;


            /////// OLD STUFF BELOW //////

    const mysql = await getMysqlConnection();
    connection = await mysql.createConnection(dbConfig);
    
    const [result] = await connection.execute(
      'INSERT INTO user_meals (user_id, food_name, meal_type, calories, protein, carbohydrates, fat, date_eaten) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        // request.meal_name || 'Unnamed Meal',
        // request.meal_type || 'breakfast',
        // request.total_calories || 0,
        // request.total_protein || 0,
        // request.total_carbs || 0,
        // request.total_fat || 0
        body.user_id || 1,
        body.food_name || 'Unnamed Meal',
        body.meal_type || 'breakfast',
        body.calories || 0,
        body.protein || 0,
        body.carbohydrates || 0,
        body.fat || 0,
        new Date().toISOString().split('T')[0]
      ]
    );
    
    // await connection.end();
    
    return NextResponse.json({
      success: true,
      message: 'Meal created successfully',
      mealId: (result as any).insertId
    });
    
  } catch (error: any) {
    console.error('❌ API Error:', error.message);
    
    if (connection) {
      try {
        await connection.end();
      } catch (closeError) {
        console.error('❌ Error closing connection:', closeError);
      }
    }
    
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to create meal'
    }, {
      status: 500
    });
  }
}

// DELETE - Delete a meal
export async function DELETE(request: NextRequest) {
  let connection;
  
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'Meal ID is required'
      }, {
        status: 400
      });
    }
    
    const mysql = await getMysqlConnection();
    connection = await mysql.createConnection(dbConfig);
    
    const [result] = await connection.execute(
      'DELETE FROM user_meals WHERE id = ?',
      [id]
    );
    
    await connection.end();
    
    return NextResponse.json({
      success: true,
      message: 'Meal deleted successfully',
      affectedRows: (result as any).affectedRows
    });
    
  } catch (error: any) {
    console.error('❌ API Error:', error.message);
    
    if (connection) {
      try {
        await connection.end();
      } catch (closeError) {
        console.error('❌ Error closing connection:', closeError);
      }
    }
    
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to delete meal'
    }, {
      status: 500
    });
  }
}

// This ensures the route runs only on the server
export const runtime = 'nodejs';