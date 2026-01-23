// Get environment variable
export const getEnv = (key: string, defaultValue?: string): string => {
  return process.env[key] || defaultValue || '';
};

// Check if in production
export const isProduction = (): boolean => {
  return process.env.NODE_ENV === 'production';
};

// Check if in development
export const isDevelopment = (): boolean => {
  return process.env.NODE_ENV === 'development';
};

// Check if in test
export const isTest = (): boolean => {
  return process.env.NODE_ENV === 'test';
};

// Get required environment variable
export const getRequiredEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

// Parse boolean environment variable
export const getBooleanEnv = (key: string, defaultValue: boolean = false): boolean => {
  const value = process.env[key];
  if (value === undefined) return defaultValue;
  return value.toLowerCase() === 'true' || value === '1';
};

// Parse number environment variable
export const getNumberEnv = (key: string, defaultValue: number = 0): number => {
  const value = process.env[key];
  if (value === undefined) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};

// Get all environment variables
export const getAllEnv = (): NodeJS.ProcessEnv => {
  return process.env;
};
