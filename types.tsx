export interface AppState {
  darkMode: boolean;
  isMainNavOpen: boolean;
}
export interface IngredientListItem {
  measurementSystem: string | null;
  amount: number | null;
  measurement: MeasurementKey | string | null;
  size: string | null;
  item: string;
}
export type MeasurementKey = 'Tbsp' | 'Tsp' | 'Cup' | 'Oz';
