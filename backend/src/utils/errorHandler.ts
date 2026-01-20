/**
 * Error Handler Utility
 * Provides centralized error handling and custom error classes
 */

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public isOperational: boolean = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(400, message, true);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(404, message, true);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized access') {
    super(401, message, true);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(409, message, true);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}

export const handleError = (error: any) => {
  if (error instanceof AppError) {
    return {
      statusCode: error.statusCode,
      message: error.message,
      isOperational: error.isOperational,
    };
  }
  
  // Unexpected error
  return {
    statusCode: 500,
    message: 'Internal server error',
    isOperational: false,
  };
};
