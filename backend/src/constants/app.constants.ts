export const APP_CONSTANTS = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET || 'default-secret',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/cricket-app',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
  API_TIMEOUT: 30000,
  MAX_REQUEST_SIZE: '10mb',
  PAGINATION_LIMIT: 20,
};
