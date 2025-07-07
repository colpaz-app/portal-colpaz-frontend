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

  const [highContrast, setHighContrast] = useState<boolean>(() => {
    const stored = localStorage.getItem('highContrast');
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

  useEffect(() => {
    const html = document.documentElement;
    if (highContrast) {
      html.style.filter = 'invert(1)';
      html.style.backgroundColor = 'black';
    } else {
      html.style.filter = '';
      html.style.backgroundColor = '';
    }
    localStorage.setItem('highContrast', highContrast.toString());
  }, [highContrast]);

  const increaseFont = () => setFontSize(prev => Math.min(prev + 10, 150));
  const decreaseFont = () => setFontSize(prev => Math.max(prev - 10, 80));
  const toggleContrast = () => setHighContrast(prev => !prev);
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const resetAccessibility = () => {
    setFontSize(100);
    setDarkMode(false);
    setHighContrast(false);
    localStorage.removeItem('fontSize');
    localStorage.removeItem('darkMode');
    localStorage.removeItem('highContrast');
  };

  return {
    fontSize,
    darkMode,
    highContrast,
    increaseFont,
    decreaseFont,
    toggleContrast,
    toggleDarkMode,
    resetAccessibility,
  };
};