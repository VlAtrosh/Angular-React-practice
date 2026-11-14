import { useAuth } from '../hooks/useAuth';

function Profile() {
  const { user, logout } = useAuth();
  return (
    <div style={{ maxWidth: 400, margin: '40px auto' }}>
      <h1>Профиль</h1>
      <p>Привет, {user.name}!</p>
      <button onClick={logout}>Выйти</button>
    </div>
  );
}

export default Profile;
