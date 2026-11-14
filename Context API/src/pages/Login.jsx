import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname ?? '/';

  const [name, setName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    login(trimmed);
    navigate(from, { replace: true });
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: '40px auto' }}>
      <h1>Вход</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Имя"
        style={{ width: '100%', padding: 8, marginBottom: 8 }}
      />
      <button type="submit">Войти</button>
    </form>
  );
}

export default Login;
