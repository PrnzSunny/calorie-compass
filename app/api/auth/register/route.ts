// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool, { dbQueries, User } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();

    // Validate input
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: 'Username, email, and password are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 3) {
      return NextResponse.json(
        { message: 'Password must be at least 3 characters long' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const [existingUsers] = await pool.execute(
      dbQueries.findUserByUsernameOrEmail, 
      [username, email]
    );
    const users = existingUsers as User[];
    
    if (users.length > 0) {
      const existingUser = users[0];
      const field = existingUser.username === username ? 'username' : 'email';
      return NextResponse.json(
        { message: `User with this ${field} already exists` },
        { status: 409 }
      );
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user in database
    const [result] = await pool.execute(
      dbQueries.createUser,
      [username, email, hashedPassword]
    ) as any;

    const newUserId = result.insertId;

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUserId, username },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Return success response
    return NextResponse.json({
      message: 'Account created successfully',
      user: {
        id: newUserId,
        username,
        email
      },
      token
    }, { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle MySQL specific errors
    if (error instanceof Error) {
      if (error.message.includes('ER_DUP_ENTRY')) {
        return NextResponse.json(
          { message: 'Username or email already exists' },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}