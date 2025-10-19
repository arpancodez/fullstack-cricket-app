// Main server entry point for Cricket App backend
// TODO: Add Express server configuration
// TODO: Add MongoDB connection
// TODO: Add middleware setup (cors, body-parser, etc.)
// TODO: Add routes import and configuration
// TODO: Add authentication middleware
// TODO: Add live cricket data fetch service integration
// TODO: Add error handling middleware

import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// TODO: Import and use routes here
// app.use('/api/auth', authRoutes);
// app.use('/api/matches', matchRoutes);
// app.use('/api/players', playerRoutes);
// app.use('/api/scores', scoreRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
