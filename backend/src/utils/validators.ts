/**
 * Input Validation Utilities
 * Provides validation functions for common data types and formats
 */

import { ValidationError } from './errorHandler';

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 */
export const isValidPassword = (password: string): boolean => {
  return password.length >= 8;
};

/**
 * Validate phone number
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/[- ()]/g, ''));
};

/**
 * Validate required field
 */
export const isRequired = (value: any): boolean => {
  return value !== null && value !== undefined && value !== '';
};

/**
 * Validate string length
 */
export const isValidLength = (value: string, min: number, max: number): boolean => {
  return value.length >= min && value.length <= max;
};

/**
 * Validate URL format
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate integer
 */
export const isValidInteger = (value: any): boolean => {
  return Number.isInteger(value);
};

/**
 * Validate positive number
 */
export const isPositiveNumber = (value: number): boolean => {
  return value > 0;
};

/**
 * Validate user registration data
 */
export const validateUserRegistration = (data: any) => {
  if (!isRequired(data.email)) throw new ValidationError('Email is required');
  if (!isValidEmail(data.email)) throw new ValidationError('Invalid email format');
  if (!isRequired(data.password)) throw new ValidationError('Password is required');
  if (!isValidPassword(data.password)) throw new ValidationError('Password must be at least 8 characters');
  if (!isRequired(data.username)) throw new ValidationError('Username is required');
  if (!isValidLength(data.username, 3, 20)) throw new ValidationError('Username must be between 3 and 20 characters');
};

/**
 * Validate match data
 */
export const validateMatchData = (data: any) => {
  if (!isRequired(data.matchId)) throw new ValidationError('Match ID is required');
  if (!isRequired(data.team1)) throw new ValidationError('Team 1 is required');
  if (!isRequired(data.team2)) throw new ValidationError('Team 2 is required');
};
