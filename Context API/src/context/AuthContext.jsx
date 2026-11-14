import { createContext, useState, useEffect, useCallback, useMemo } from 'react';

export const AuthContext = createContext(null);

const STORAGE_KEY = 'auth:user:v1';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (err) {
      console.warn('Не удалось сохранить пользователя', err);
    }
  }, [user]);

  // login/logout — стабильные (useCallback), чтобы не ломать memo-детей
  const login = useCallback((username) => {
    setUser({ name: username, loggedAt: Date.now() });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
