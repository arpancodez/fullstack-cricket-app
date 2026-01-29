/**
 * Main Express server configuration for Fullstack Cricket App
 * Handles middleware setup, MongoDB connection, and Vercel serverless export
 */
import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import serverless from 'serverless-http';

// Import routes
import matchRoutes from '../backend/src/routes/matchRoutes';
import scoreRoutes from '../backend/src/routes/scoreRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cricket-app';
if (mongoose.connection.readyState === 0) {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));
}

// Health check endpoint
app.get('/api', (req: Request, res: Response) => {
  res.json({ 
    message: 'Fullstack Cricket App API',
    status: 'Running',
    endpoints: [
      '/api/matches',
      '/api/matches/:id',
      '/api/scores/:matchId',
      '/api/scores/:matchId/commentary',
      '/api/scores/:matchId/batting',
      '/api/scores/:matchId/bowling'
    ]
  });
});

// Routes
app.use('/api/matches', matchRoutes);
app.use('/api/scores', scoreRoutes);

/**
 * Error handling middleware - catches and responds to errors from all routes
 * Logs errors and returns structured error response with 500 status
 */
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// Export the Express app for serverless deployment
export default serverless(app);
