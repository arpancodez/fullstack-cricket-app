/**
 * DEPRECATED: This Express server has been migrated to Vercel serverless functions.
 * 
 * All API endpoints have been refactored into individual serverless functions in the /api directory:
 * - /api/auth.ts - Authentication endpoints (register, login, logout)
 * - /api/matches.ts - Match management endpoints (CRUD operations)
 * - /api/players.ts - Player management endpoints (CRUD operations with filtering)
 * - /api/scores.ts - Score tracking endpoints (CRUD operations with calculations)
 * 
 * For detailed migration information, see MIGRATION_GUIDE.md
 * 
 * This file is kept for reference only and should not be used in production.
 * The app.listen() method has been removed as it's not compatible with serverless deployment.
 * 
 * Migration Date: October 29, 2025
 * Status: DEPRECATED
 */

import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint (for reference only)
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'DEPRECATED', 
    message: 'This Express server has been migrated to Vercel serverless functions. See /api directory and MIGRATION_GUIDE.md for details.' 
  });
});

/**
 * NOTE: app.listen() has been removed for serverless compatibility.
 * 
 * In serverless environments like Vercel:
 * - Functions are invoked on-demand via HTTP requests
 * - No continuous server process or port binding is needed
 * - Each function runs independently and scales automatically
 * 
 * Original code (removed):
 * const PORT = process.env.PORT || 5000;
 * app.listen(PORT, () => {
 *   console.log(`Server is running on port ${PORT}`);
 * });
 * 
 * For local development, use:
 * - `vercel dev` to run serverless functions locally
 * - Functions will be available at http://localhost:3000/api/*
 */

// Export the Express app for potential testing purposes
export default app;
