import { useEffect, useState } from 'react';

export function useLocalStorage(key, initialValue) {
  // Ленивая инициализация: читаем из хранилища только при монтировании
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved !== null) {
        return JSON.parse(saved);
      }
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    } catch (error) {
      console.warn(`useLocalStorage: не удалось прочитать "${key}"`, error);
      return typeof initialValue === 'function' ? initialValue() : initialValue;
    }
  });

  // Сохраняем при каждом изменении значения
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`useLocalStorage: не удалось сохранить "${key}"`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
