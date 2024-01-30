'use client';

import { useState } from 'react';
import { totalIngredientList } from '../data/tempIngredientList';
import {
  convertToMetric,
  decimalToFraction,
} from '../utils/ingredientConversions';

export default function IngredientList() {
  const [isMetric, setIsMetric] = useState(false);
  const toggleMeasurementSystem = () => {
    setIsMetric(!isMetric);
  };

  // Prepare the ingredient list with conversions applied
  const preparedIngredientList = totalIngredientList.map((ingredient) => {
    let { amount, measurement, size, item } = ingredient;

    // Clone the ingredient to avoid mutating the original list
    let preparedIngredient = { ...ingredient };

    if (
      !isMetric &&
      ingredient.measurementSystem === 'English' &&
      Number.isFinite(amount)
    ) {
      // Convert to fraction if needed (for English units)
      preparedIngredient.amount = decimalToFraction(amount);
    } else if (isMetric && ingredient.measurementSystem === 'English') {
      // Convert to metric if needed
      const converted = convertToMetric(amount, measurement);
      preparedIngredient.amount = converted.amount;
      preparedIngredient.measurement = converted.measurement;
    }

    return preparedIngredient;
  });

  return (
    <main className="w-full h-full flex p-4">
      <div className="border w-full h-fit p-2">
        <div className="flex justify-between mb-2">
          <p className="text-2xl font-bold">Ingredients</p>
          <button
            onClick={toggleMeasurementSystem}
            className="mb-4 w-40 px-2 py-1 bg-primary text-white font-semibold rounded-md"
          >
            Switch to {isMetric ? 'English' : 'Metric'}
          </button>
        </div>
        <ul className="list-item">
          {preparedIngredientList.map((ingredient, index: number) => {
            const { amount, measurement, size, item } = ingredient;
            return (
              <li key={index} className="flex">
                <div className="flex w-16">
                  <p className="font-bold">{amount}</p>
                  {measurement && <p className="ml-1">{measurement}</p>}
                </div>
                {size && <p className="ml-2">{size}</p>}
                <p className="ml-2 font-semibold">{item}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
