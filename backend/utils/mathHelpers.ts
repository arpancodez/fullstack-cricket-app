// Calculate percentage
export const calculatePercentage = (value: number, total: number): number => {
  return (value / total) * 100;
};

// Round to specific decimal places
export const roundToDecimal = (value: number, decimals: number = 2): number => {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

// Generate random number between min and max
export const randomBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Calculate average
export const calculateAverage = (numbers: number[]): number => {
  return numbers.reduce((a, b) => a + b, 0) / numbers.length;
};

// Clamp value between min and max
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

// Calculate absolute difference
export const absDifference = (a: number, b: number): number => {
  return Math.abs(a - b);
};
