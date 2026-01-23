// Deep clone object
export const deepClone = <T,>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

// Merge objects
export const mergeObjects = <T,>(...objs: Partial<T>[]): T => {
  return objs.reduce((acc, obj) => ({ ...acc, ...obj }), {} as T);
};

// Get nested value
export const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((acc, part) => acc?.[part], obj);
};

// Check if object is empty
export const isEmptyObject = (obj: any): boolean => {
  return Object.keys(obj).length === 0;
};

// Pick properties from object
export const pickProperties = <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  return keys.reduce((acc, key) => {
    acc[key] = obj[key];
    return acc;
  }, {} as Pick<T, K>);
};

// Omit properties from object
export const omitProperties = <T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const result = { ...obj };
  keys.forEach(key => delete result[key]);
  return result as Omit<T, K>;
};

// Invert object keys and values
export const invertObject = (obj: Record<string, string>): Record<string, string> => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
  }, {} as Record<string, string>);
};
