import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('thoughtstream-theme');
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem('thoughtstream-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme, setTheme };
};