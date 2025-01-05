import React, { useState, useLayoutEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

function DarkToggle() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // setup on init render
  useLayoutEffect(() => {
    const systemPreference = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    const savedMode = localStorage.getItem('darkMode');
    const initialMode =
      savedMode !== null ? savedMode === 'true' : systemPreference;
    setIsDarkMode(initialMode);
    document.documentElement.classList.toggle('dark', initialMode);
  }, []);

  // toggle fn
  function toggleDarkMode() {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
    document.documentElement.classList.toggle('dark', newMode);
  }

  return (
    <button
      onClick={toggleDarkMode}
      className={`flex h-8 w-8 items-center rounded-full bg-neutral-300 dark:bg-neutral-800`}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {isDarkMode ? (
        <Moon className='m-auto h-4 w-4' />
      ) : (
        <Sun className='m-auto h-4 w-4' />
      )}
    </button>
  );
}

export default DarkToggle;
