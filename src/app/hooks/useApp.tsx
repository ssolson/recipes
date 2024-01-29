'use client';

import { useContext } from 'react';
import { AppStateContext } from '../contexts/AppStateContext';

export function useApp() {
  const { appState, setAppState } = useContext(AppStateContext);

  return {
    appState,
    setAppState,
  };
}
