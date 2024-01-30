type MeasurementKey = 'Tbsp' | 'Tsp' | 'Cup' | 'Oz';
const conversions: {
  [key in MeasurementKey]: { multiplier: number; newUnit: string };
} = {
  Tbsp: { multiplier: 15, newUnit: 'ml' },
  Tsp: { multiplier: 5, newUnit: 'ml' },
  Cup: { multiplier: 240, newUnit: 'ml' },
  Oz: { multiplier: 28.35, newUnit: 'g' },
};

// Type guard to check if a string is a MeasurementKey
function isMeasurementKey(key: any): key is MeasurementKey {
  return Object.keys(conversions).includes(key);
}
export const convertToMetric = (
  amount: any,
  measurement: MeasurementKey | string | null,
) => {
  if (
    amount === null ||
    measurement === null ||
    !isMeasurementKey(measurement)
  ) {
    return { amount, measurement };
  }
  if (!measurement || !conversions[measurement] || amount === null) {
    return { amount, measurement };
  }

  const conversion = conversions[measurement];
  const convertedAmount = amount * conversion.multiplier;
  // For small measurements, instead of rounding, truncate to a single decimal place
  // This allows for more precise measurements, which can be important in cooking
  return {
    amount:
      convertedAmount < 10
        ? Math.floor(convertedAmount * 10) / 10
        : Math.round(convertedAmount),
    measurement: conversion.newUnit,
  };
};

export function decimalToFraction(decimal: any) {
  if (Math.round(decimal) === decimal) {
    return decimal.toString(); // Return the whole number without converting to fraction
  }
  const tolerance = 0.0625; // Adjust tolerance for precision
  const fractions = [
    { fraction: '1/8', value: 0.125 },
    { fraction: '1/4', value: 0.25 },
    { fraction: '1/3', value: 0.333 },
    { fraction: '1/2', value: 0.5 },
    { fraction: '2/3', value: 0.667 },
    { fraction: '3/4', value: 0.75 },
  ];

  // If the decimal is close to 1, round up to 1
  if (1 - decimal < tolerance) return '1';

  // Check for closest fraction
  for (const frac of fractions) {
    if (Math.abs(decimal - frac.value) < tolerance) {
      return frac.fraction;
    }
  }

  // If no close fraction is found, return as is (or handle differently)
  return decimal.toString();
}
