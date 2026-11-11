import { Routes, Route, NavLink, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import UsersList from './pages/UsersList';
import UserProfile from './pages/UserProfile';
import NotFound from './pages/NotFound';

function Layout() {
  const linkStyle = ({ isActive }) => ({
    fontWeight: isActive ? 'bold' : 'normal',
    color: isActive ? '#3b82f6' : '#374151',
    textDecoration: 'none',
    padding: '8px 12px',
  });

  return (
    <div>
      <nav style={{ display: 'flex', gap: 4, padding: 12, borderBottom: '1px solid #ddd' }}>
        <NavLink to="/" style={linkStyle}>
          Главная
        </NavLink>
        <NavLink to="/about" style={linkStyle}>
          О нас
        </NavLink>
        <NavLink to="/users" style={linkStyle}>
          Пользователи
        </NavLink>
      </nav>

      <main style={{ maxWidth: 700, margin: '0 auto', padding: 20 }}>
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:userId" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
