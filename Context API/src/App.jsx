import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Profile from './pages/Profile';

function Nav() {
  const { user } = useAuth();
  return (
    <nav style={{ display: 'flex', gap: 12, padding: 12 }}>
      <Link to="/">Главная</Link>
      <Link to="/profile">Профиль</Link>
      {!user && <Link to="/login">Войти</Link>}
    </nav>
  );
}

function Home() {
  return <h1 style={{ textAlign: 'center' }}>Главная (публичная)</h1>;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
