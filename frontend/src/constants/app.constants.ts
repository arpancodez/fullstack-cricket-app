export const APP_CONFIG = {
  API_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  CACHE_TIME: 300000,
};
