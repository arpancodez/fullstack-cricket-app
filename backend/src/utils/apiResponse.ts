/**
 * API Response Formatter
 * Provides consistent API response formatting across the application
 */

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  timestamp: string;
}

export class ResponseFormatter {
  static success<T>(data: T, message: string = 'Operation successful', statusCode: number = 200): ApiResponse<T> {
    return {
      success: true,
      statusCode,
      message,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  static error(message: string, statusCode: number = 500): ApiResponse<null> {
    return {
      success: false,
      statusCode,
      message,
      data: null,
      timestamp: new Date().toISOString(),
    };
  }

  static created<T>(data: T, message: string = 'Resource created successfully'): ApiResponse<T> {
    return this.success(data, message, 201);
  }

  static badRequest(message: string = 'Bad request'): ApiResponse<null> {
    return this.error(message, 400);
  }

  static unauthorized(message: string = 'Unauthorized'): ApiResponse<null> {
    return this.error(message, 401);
  }

  static notFound(message: string = 'Resource not found'): ApiResponse<null> {
    return this.error(message, 404);
  }

  static conflict(message: string = 'Conflict'): ApiResponse<null> {
    return this.error(message, 409);
  }

  static serverError(message: string = 'Internal server error'): ApiResponse<null> {
    return this.error(message, 500);
  }
}

export const sendSuccess = <T>(
  res: any,
  data: T,
  message?: string,
  statusCode?: number
): void => {
  res.status(statusCode || 200).json(ResponseFormatter.success(data, message, statusCode));
};

export const sendError = (res: any, message: string, statusCode: number = 500): void => {
  res.status(statusCode).json(ResponseFormatter.error(message, statusCode));
};
