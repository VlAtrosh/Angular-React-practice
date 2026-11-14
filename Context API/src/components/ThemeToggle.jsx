import { useTheme } from '../hooks/useTheme';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return <button onClick={toggleTheme}>{theme === 'light' ? '🌙 Тёмная' : '☀️ Светлая'}</button>;
}

export default ThemeToggle;
