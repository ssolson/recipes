'use client';

import { AppState } from '../../../types';
import React, { createContext, useState, ReactNode } from 'react';

const initialState: AppState = {
  isMainNavOpen: true,
};

export const AppStateContext = createContext<{
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}>({
  appState: initialState,
  setAppState: () => {},
});

export const AppStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [appState, setAppState] = useState<AppState>(initialState);

  return (
    <AppStateContext.Provider value={{ appState, setAppState }}>
      {children}
    </AppStateContext.Provider>
  );
};
