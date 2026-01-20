/**
 * Barrel Export File for Utilities
 * Centralized export point for all utility modules
 */

// API Client
export { apiClient } from './apiClient';

// Date/Time utilities
export { formatDate, formatTime, getTimeAgo, isToday, isFuture } from './dateTime';

// Form Validation
export { validateEmail, validatePassword, validateUsername, validateLoginForm, validateRegisterForm } from './formValidation';
export type { ValidationError } from './formValidation';

// Storage Management
export { StorageManager } from './storage';
