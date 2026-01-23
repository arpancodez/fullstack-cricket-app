// Custom error class
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

// Format error response
export const formatErrorResponse = (error: Error) => {
  return {
    success: false,
    message: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
  };
};

// Handle async errors
export const catchAsync = (fn: Function) => {
  return (...args: any[]) => {
    Promise.resolve(fn(...args)).catch(args[args.length - 1]);
  };
};

// Validation error handler
export const handleValidationError = (errors: any[]) => {
  const messages = errors.map(err => err.message).join(', ');
  return new AppError(`Validation failed: ${messages}`, 400);
};

// Not found error
export const createNotFoundError = (resource: string) => {
  return new AppError(`${resource} not found`, 404);
};
