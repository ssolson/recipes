'use client';

import { AppState } from '../../types';
import { useApp } from './hooks/useApp';
import { GiHamburgerMenu, GiSeatedMouse, GiSun, GiMoon } from 'react-icons/gi';

export default function Navbar({ children }: { children: React.ReactNode }) {
  const { appState, setAppState } = useApp();

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="bg-base h-screen w-full relative text-baseText">
      <div className="absolute top-2 left-2 z-50 flex w-full justify-between">
        <button
          onClick={() => {
            setAppState((prevAppState: AppState) => ({
              ...prevAppState,
              isMainNavOpen: !prevAppState.isMainNavOpen,
            }));
          }}
          className={`h-20 w-20 p-4 ${appState.isMainNavOpen ? '' : ''}`}
        >
          <GiHamburgerMenu
            className={`h-full w-full duration-500 ${
              appState.isMainNavOpen ? 'text-white' : 'text-primary'
            }`}
          />
        </button>
        <div className="h-20 p-4 md:mr-4 flex font-bold">
          <p className="w-fit text-2xl hidden md:block my-auto">
            RECIPES AT THE TOP
          </p>
          <GiSeatedMouse
            className={`h-full w-24 duration-500 ${
              appState.isMainNavOpen ? 'text-baseText' : 'text-primary'
            }`}
          />
        </div>
      </div>
      <header
        className={`fixed flex py-8 flex-col left-0 w-64 h-full bg-primary duration-500 ${
          appState.isMainNavOpen
            ? 'translate-x-0 opacity-100'
            : '-translate-x-64 opacity-0'
        }`}
      >
        <div className="h-full"></div>
        <button
          onClick={() => {
            toggleDarkMode();
            setAppState((prevAppState: AppState) => ({
              ...prevAppState,
              darkMode: !prevAppState.darkMode,
            }));
          }}
          className="w-24 h-10 mx-auto text-3xl border rounded-md bg-base"
        >
          {appState.darkMode ? (
            <GiMoon className="m-auto" />
          ) : (
            <GiSun className="m-auto" />
          )}
        </button>
      </header>
      <div className="h-full w-full">
        <div className="h-full w-full">{children}</div>
      </div>
    </div>
  );
}
