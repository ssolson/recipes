'use client';

import { AppState } from '../../types';
import { useApp } from './hooks/useApp';

export default function Home() {
  const { appState, setAppState } = useApp();

  return <main className="w-full h-full flex"></main>;
}
