import { NavLink, Outlet } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

export default function Layout() {
  const { favorites, clearFavorites } = useFavorites();

  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    padding: '8px 14px',
    borderRadius: 8,
    textDecoration: 'none',
    fontWeight: isActive ? 600 : 400,
    color: isActive ? '#fff' : '#9ca3af',
    background: isActive ? '#3b82f6' : 'transparent',
    transition: 'all 0.2s',
  });

  return (
    <div>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: 12,
          borderBottom: '1px solid #374151', // Темная граница
        }}>
        <NavLink to="/" style={linkStyle} end>
          Главная
        </NavLink>
        <NavLink to="/tasks" style={linkStyle}>
          Задачи
        </NavLink>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 14 }}>⭐ {favorites.length}</span>

          {favorites.length > 0 && (
            <button
              onClick={clearFavorites}
              style={{
                padding: '6px 12px',
                cursor: 'pointer',
                borderRadius: 6,
                border: '1px solid #ef4444', // Красная рамка
                background: 'transparent',
                color: '#ef4444', // Красный текст
                fontSize: 13,
                transition: 'all 0.2s',
              }}
              title="Очистить весь список избранного">
              Очистить
            </button>
          )}
        </div>
      </header>

      <main style={{ maxWidth: 720, margin: '0 auto', padding: 20 }}>
        <Outlet />
      </main>
    </div>
  );
}
