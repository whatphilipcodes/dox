import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

function DarkToggle() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // setup on init render
  useEffect(() => {
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
      className='flex items-center gap-2 rounded-lg px-3 py-2'
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {isDarkMode ? <Sun className='h-5 w-5' /> : <Moon className='h-5 w-5' />}
      <span className='text-sm font-medium'>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </span>
    </button>
  );
}

export default DarkToggle;
