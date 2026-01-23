// API request helper interface
export interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}

// Make API request
export const makeRequest = async <T,>(url: string, config: RequestConfig): Promise<T> => {
  const response = await fetch(url, {
    method: config.method,
    headers: config.headers,
    body: config.body ? JSON.stringify(config.body) : undefined,
  });
  if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
  return response.json();
};

// Retry logic for failed requests
export const retryRequest = async <T,>(
  fn: () => Promise<T>,
  retries: number = 3
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    await new Promise(resolve => setTimeout(resolve, 1000));
    return retryRequest(fn, retries - 1);
  }
};

// Build query string from object
export const buildQueryString = (params: Record<string, any>): string => {
  return Object.entries(params)
    .filter(([, value]) => value !== null && value !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
};

// Parse query string to object
export const parseQueryString = (query: string): Record<string, string> => {
  return query
    .replace(/^\?/, '')
    .split('&')
    .reduce((acc, param) => {
      const [key, value] = param.split('=');
      acc[decodeURIComponent(key)] = decodeURIComponent(value || '');
      return acc;
    }, {} as Record<string, string>);
};
