/**
 * Form Validation Utilities for Frontend
 * Provides validation functions for form inputs and user data
 */

export interface ValidationError {
  field: string;
  message: string;
}

export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Please enter a valid email';
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  return null;
};

export const validateUsername = (username: string): string | null => {
  if (!username) return 'Username is required';
  if (username.length < 3) return 'Username must be at least 3 characters';
  if (username.length > 20) return 'Username must not exceed 20 characters';
  return null;
};

export const validateLoginForm = (email: string, password: string): ValidationError[] => {
  const errors: ValidationError[] = [];
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  
  if (emailError) errors.push({ field: 'email', message: emailError });
  if (passwordError) errors.push({ field: 'password', message: passwordError });
  
  return errors;
};

export const validateRegisterForm = (
  username: string,
  email: string,
  password: string
): ValidationError[] => {
  const errors: ValidationError[] = [];
  const usernameError = validateUsername(username);
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  
  if (usernameError) errors.push({ field: 'username', message: usernameError });
  if (emailError) errors.push({ field: 'email', message: emailError });
  if (passwordError) errors.push({ field: 'password', message: passwordError });
  
  return errors;
};
