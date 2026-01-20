/**
 * Local Storage Utility
 * Provides type-safe wrapper around browser's localStorage API
 */

export class StorageManager {
  private static PREFIX = 'cricket_app_';

  static setItem<T>(key: string, value: T): void {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(this.PREFIX + key, serialized);
    } catch (error) {
      console.error(`Failed to set item in storage: ${key}`, error);
    }
  }

  static getItem<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = localStorage.getItem(this.PREFIX + key);
      if (item === null) return defaultValue || null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Failed to get item from storage: ${key}`, error);
      return defaultValue || null;
    }
  }

  static removeItem(key: string): void {
    try {
      localStorage.removeItem(this.PREFIX + key);
    } catch (error) {
      console.error(`Failed to remove item from storage: ${key}`, error);
    }
  }

  static clear(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith(this.PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Failed to clear storage', error);
    }
  }

  static setToken(token: string): void {
    this.setItem('token', token);
  }

  static getToken(): string | null {
    return this.getItem<string>('token');
  }

  static removeToken(): void {
    this.removeItem('token');
  }

  static setUser(user: any): void {
    this.setItem('user', user);
  }

  static getUser(): any | null {
    return this.getItem('user');
  }

  static removeUser(): void {
    this.removeItem('user');
  }
}
