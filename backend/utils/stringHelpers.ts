// Capitalize first letter
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Convert to camelCase
export const toCamelCase = (str: string): string => {
  return str.replace(/[-_\s](.)/g, (_, char) => char.toUpperCase())
    .replace(/^(.)/, (_, char) => char.toLowerCase());
};

// Convert to snake_case
export const toSnakeCase = (str: string): string => {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
};

// Truncate string
export const truncate = (str: string, length: number, suffix: string = '...'): string => {
  if (str.length <= length) return str;
  return str.slice(0, length - suffix.length) + suffix;
};

// Remove special characters
export const removeSpecialChars = (str: string): string => {
  return str.replace(/[^a-zA-Z0-9\s]/g, '');
};
