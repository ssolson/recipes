'use client';

import IngredientList from './components/IngredientList';
import { useApp } from './hooks/useApp';

export default function Home() {
  const { appState, setAppState } = useApp();

  return (
    <main className="w-full h-full flex pt-24">
      <IngredientList />
    </main>
  );
}
