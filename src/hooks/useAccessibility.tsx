import { useEffect, useState } from 'react';

export const useAccessibility = () => {
  const [fontSize, setFontSize] = useState<number>(() => {
    const stored = localStorage.getItem('fontSize');
    return stored ? parseInt(stored) : 100;
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem('darkMode');
    return stored === 'true';
  });

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
    localStorage.setItem('fontSize', fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const increaseFont = () => setFontSize(prev => Math.min(prev + 10, 150));
  const decreaseFont = () => setFontSize(prev => Math.max(prev - 10, 80));
  const toggleContrast = () => setDarkMode(prev => !prev);
  const resetAccessibility = () => {
    setFontSize(100);
    setDarkMode(false);
    localStorage.removeItem('fontSize');
    localStorage.removeItem('darkMode');
  };

  return {
    fontSize,
    darkMode,
    increaseFont,
    decreaseFont,
    toggleContrast,
    resetAccessibility,
  };
};