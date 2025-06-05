// lib/db.ts
import mysql from 'mysql2/promise';

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

// Database connection function
export async function connectDB() {
  try {
    const connection = await pool.getConnection();
    console.log('MySQL Connected Successfully');
    connection.release();
    return pool;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}

// User interface
export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

// Database queries
export const dbQueries = {
  // Create users table
  createUsersTable: `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `,

  // Find user by username
  findUserByUsername: `
    SELECT * FROM users WHERE username = ?
  `,

  // Find user by email
  findUserByEmail: `
    SELECT * FROM users WHERE email = ?
  `,

  // Find user by username or email
  findUserByUsernameOrEmail: `
    SELECT * FROM users WHERE username = ? OR email = ?
  `,

  // Create new user
  createUser: `
    INSERT INTO users (username, email, password) VALUES (?, ?, ?)
  `,

  // Get user by ID
  getUserById: `
    SELECT id, username, email, created_at FROM users WHERE id = ?
  `
};

// Initialize database
export async function initializeDatabase() {
  try {
    const connection = await connectDB();
    await connection.execute(dbQueries.createUsersTable);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
}

export default pool;