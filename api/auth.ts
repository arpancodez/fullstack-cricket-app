/**
 * Vercel Serverless Function: Authentication Handler
 * 
 * This function handles authentication-related API endpoints:
 * - POST /api/auth/register - Register a new user
 * - POST /api/auth/login - Login a user
 * - POST /api/auth/logout - Logout a user
 * 
 * Migrated from backend/src/server.ts as part of Vercel serverless refactoring
 */

import { VercelRequest, VercelResponse } from '@vercel/node';

// Type definitions for authentication
interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

// Validation helper functions
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password: string): boolean => {
  // Password must be at least 6 characters long
  return password && password.length >= 6;
};

const isValidUsername = (username: string): boolean => {
  // Username must be at least 3 characters and only alphanumeric
  const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
  return usernameRegex.test(username);
};

// In-memory storage (replace with database in production)
const users: User[] = [];

// Helper function to hash passwords (use bcrypt in production)
const hashPassword = (password: string): string => {
  // TODO: Implement proper password hashing with bcrypt
  return Buffer.from(password).toString('base64');
};

const verifyPassword = (password: string, hash: string): boolean => {
  // TODO: Implement proper password verification with bcrypt
  return hashPassword(password) === hash;
};

// Main handler function
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { method, body } = req;
  const path = req.url?.split('?')[0] || '';

  try {
    // Register endpoint
    if (method === 'POST' && path.endsWith('/register')) {
      const { username, email, password } = body as RegisterRequest;

      // Validation
      if (!username || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Username, email, and password are required'
        });
      }
      
    // Enhanced validation using helper functions
    if (!isValidUsername(username)) {
      return res.status(400).json({
        success: false,
        message: 'Username must be at least 3 characters and contain only alphanumeric characters and underscores'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

      // Check if user already exists
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'User with this email already exists'
        });
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        username,
        email,
        password: hashPassword(password),
        createdAt: new Date()
      };

      users.push(newUser);

      // Return user without password
      const { password: _, ...userWithoutPassword } = newUser;
      return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user: userWithoutPassword
      });
    }

    // Login endpoint
    if (method === 'POST' && path.endsWith('/login')) {
      const { email, password } = body as LoginRequest;

      // Validation
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email and password are required'
        });
      }

      // Find user
      const user = users.find(u => u.email === email);
      if (!user || !verifyPassword(password, user.password)) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        user: userWithoutPassword
      });
    }

    // Logout endpoint
    if (method === 'POST' && path.endsWith('/logout')) {
      return res.status(200).json({
        success: true,
        message: 'Logout successful'
      });
    }

    // Method/path not found
    return res.status(404).json({
      success: false,
      message: 'Endpoint not found'
    });
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
