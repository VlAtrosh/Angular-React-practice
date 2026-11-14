import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext(null);

const STORAGE_KEY = 'theme:v1';

export function ThemeProvider({ children }) {
  // Ленивая инициализация из localStorage (или системная тема)
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {}
    // fallback — системная тема
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Сохраняем при каждом изменении
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (err) {
      console.warn('Не удалось сохранить тему', err);
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
