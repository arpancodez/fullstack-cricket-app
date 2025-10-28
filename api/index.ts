import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import serverless from 'serverless-http';

// Import routes (when they are implemented)
// import authRoutes from '../backend/src/routes/authRoutes';
// import matchRoutes from '../backend/src/routes/matchRoutes';
// import playerRoutes from '../backend/src/routes/playerRoutes';
// import scoreRoutes from '../backend/src/routes/scoreRoutes';

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
      '/api/auth',
      '/api/matches',
      '/api/players',
      '/api/scores'
    ]
  });
});

// Routes (uncomment when implemented)
// app.use('/api/auth', authRoutes);
// app.use('/api/matches', matchRoutes);
// app.use('/api/players', playerRoutes);
// app.use('/api/scores', scoreRoutes);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// Export the Express app for serverless deployment
export default serverless(app);
