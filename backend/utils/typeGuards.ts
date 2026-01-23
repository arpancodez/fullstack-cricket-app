// Check if value is string
export const isString = (value: any): value is string => {
  return typeof value === 'string';
};

// Check if value is number
export const isNumber = (value: any): value is number => {
  return typeof value === 'number' && !isNaN(value);
};

// Check if value is boolean
export const isBoolean = (value: any): value is boolean => {
  return typeof value === 'boolean';
};

// Check if value is object
export const isObject = (value: any): value is Record<string, any> => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

// Check if value is array
export const isArray = (value: any): value is any[] => {
  return Array.isArray(value);
};

// Check if value is function
export const isFunction = (value: any): value is Function => {
  return typeof value === 'function';
};

// Check if value is null or undefined
export const isNullOrUndefined = (value: any): value is null | undefined => {
  return value === null || value === undefined;
};

// Check if value is defined
export const isDefined = <T,>(value: T | undefined | null): value is T => {
  return value !== undefined && value !== null;
};
