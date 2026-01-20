/**
 * Logger Utility
 * Provides structured logging functionality for the application
 */

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
  error?: any;
}

class Logger {
  private isDev = process.env.NODE_ENV === 'development';

  private format(entry: LogEntry): string {
    return `[${entry.timestamp}] [${entry.level}] ${entry.message}`;
  }

  private createEntry(level: LogLevel, message: string, data?: any, error?: any): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      error: error?.message || error,
    };
  }

  debug(message: string, data?: any): void {
    const entry = this.createEntry(LogLevel.DEBUG, message, data);
    if (this.isDev) {
      console.debug(this.format(entry), data);
    }
  }

  info(message: string, data?: any): void {
    const entry = this.createEntry(LogLevel.INFO, message, data);
    console.info(this.format(entry), data);
  }

  warn(message: string, data?: any): void {
    const entry = this.createEntry(LogLevel.WARN, message, data);
    console.warn(this.format(entry), data);
  }

  error(message: string, error?: any, data?: any): void {
    const entry = this.createEntry(LogLevel.ERROR, message, data, error);
    console.error(this.format(entry), { error: entry.error, data });
  }

  logApiRequest(method: string, url: string, statusCode: number, duration: number): void {
    const message = `API Request: ${method} ${url} - ${statusCode}`;
    this.info(message, { duration: `${duration}ms` });
  }

  logApiError(method: string, url: string, statusCode: number, error: any): void {
    const message = `API Error: ${method} ${url} - ${statusCode}`;
    this.error(message, error);
  }

  logDbOperation(operation: string, collection: string, duration: number): void {
    const message = `DB Operation: ${operation} on ${collection}`;
    this.debug(message, { duration: `${duration}ms` });
  }
}

export const logger = new Logger();
