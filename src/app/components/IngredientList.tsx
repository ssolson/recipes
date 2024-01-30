'use client';

import { useState } from 'react';
import { totalIngredientList } from '../data/tempIngredientList';
import {
  convertToMetric,
  decimalToFraction,
} from '../utils/ingredientConversions';
import { IngredientListItem } from '../../../types';

export default function IngredientList() {
  const [isMetric, setIsMetric] = useState(false);
  const toggleMeasurementSystem = () => {
    setIsMetric(!isMetric);
  };

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
          {totalIngredientList.map((ingredient: IngredientListItem, index) => {
            let { amount, measurement, size, item } = ingredient;
            if (
              amount &&
              !isMetric &&
              ingredient.measurementSystem === 'English' &&
              Number.isFinite(amount)
            ) {
              amount = decimalToFraction(amount);
            }
            let displayAmount = amount;
            let displayMeasurement = measurement;

            if (isMetric && ingredient.measurementSystem === 'English') {
              const converted = convertToMetric(amount, measurement);
              displayAmount = converted.amount;
              displayMeasurement = converted.measurement;
            }

            return (
              <li key={index} className="flex">
                <div className="flex w-16">
                  <p className=" font-bold">{displayAmount}</p>
                  {displayMeasurement && (
                    <p className="ml-1">{displayMeasurement}</p>
                  )}
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
