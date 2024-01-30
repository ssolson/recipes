export interface AppState {
  darkMode: boolean;
  isMainNavOpen: boolean;
}
export type MeasurementKey = 'Tbsp' | 'Tsp' | 'Cup' | 'Oz';

export type Sizes = 'Small' | null | 'Large';

export interface IngredientListItemProps {
  measurementSystem: string | null;
  amount: string | number | null;
  measurement: MeasurementKey | string | null;
  size: Sizes | null;
  item: string;
}
