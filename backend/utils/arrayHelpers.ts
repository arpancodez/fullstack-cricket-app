// Remove duplicates from array
export const removeDuplicates = <T,>(arr: T[]): T[] => {
  return [...new Set(arr)];
};

// Flatten nested array
export const flattenArray = <T,>(arr: any[]): T[] => {
  return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flattenArray(val) : val), []);
};

// Chunk array into smaller arrays
export const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

// Find element in array
export const findElement = <T,>(arr: T[], predicate: (item: T) => boolean): T | undefined => {
  return arr.find(predicate);
};

// Sort array by property
export const sortByProperty = <T,>(arr: T[], property: keyof T, order: 'asc' | 'desc' = 'asc'): T[] => {
  return [...arr].sort((a, b) => {
    const aVal = a[property];
    const bVal = b[property];
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

// Shuffle array
export const shuffleArray = <T,>(arr: T[]): T[] => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
