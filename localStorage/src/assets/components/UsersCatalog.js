import { useEffect, useState } from 'react';
import { getUsers, getUserById } from '../api/users';

function UsersCatalog() {
  // ---- Список пользователей ----
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState(null);

  // ---- Выбранный пользователь ----
  const [selectedId, setSelectedId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState(null);

  // === Эффект 1: список — один раз при монтировании ===
  useEffect(() => {
    const controller = new AbortController();

    setUsersLoading(true);
    setUsersError(null);

    getUsers(controller.signal)
      .then((data) => setUsers(data))
      .catch((err) => {
        if (err.name !== 'AbortError') setUsersError(err.message);
      })
      .finally(() => setUsersLoading(false));

    return () => controller.abort();
  }, []);

  // === Эффект 2: детали — при смене selectedId ===
  useEffect(() => {
    if (selectedId === null) {
      setSelectedUser(null);
      return;
    }

    const controller = new AbortController();

    setUserLoading(true);
    setUserError(null);

    getUserById(selectedId, controller.signal)
      .then((data) => setSelectedUser(data))
      .catch((err) => {
        if (err.name !== 'AbortError') setUserError(err.message);
      })
      .finally(() => setUserLoading(false));

    return () => controller.abort();
  }, [selectedId]);

  // ---- Рендер списка (ранние возвраты) ----
  function renderUsersList() {
    if (usersLoading) return <p>Загрузка пользователей...</p>;
    if (usersError) return <p style={{ color: 'red' }}>Ошибка: {usersError}</p>;
    if (users.length === 0) return <p>Пользователей нет</p>;

    return (
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => setSelectedId(user.id)}
            style={{
              padding: '8px 12px',
              cursor: 'pointer',
              borderRadius: 6,
              marginBottom: 4,
              background: selectedId === user.id ? '#dbeafe' : 'transparent',
            }}>
            {user.name}
          </li>
        ))}
      </ul>
    );
  }

  // ---- Рендер деталей ----
  function renderUserDetails() {
    if (selectedId === null) {
      return <p style={{ color: '#888' }}>Выбери пользователя слева</p>;
    }
    if (userLoading) return <p>Загрузка...</p>;
    if (userError) return <p style={{ color: 'red' }}>Ошибка: {userError}</p>;
    if (!selectedUser) return null;

    const { name, email, phone, website, company, address } = selectedUser;

    return (
      <div>
        <h2>{name}</h2>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Телефон:</strong> {phone}
        </p>
        <p>
          <strong>Сайт:</strong> {website}
        </p>
        <p>
          <strong>Компания:</strong> {company.name}
        </p>
        <p>
          <strong>Город:</strong> {address.city}
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '250px 1fr',
        gap: 24,
        maxWidth: 800,
        margin: '0 auto',
      }}>
      <aside>
        <h3>Пользователи</h3>
        {renderUsersList()}
      </aside>
      <main>
        <h3>Детали</h3>
        {renderUserDetails()}
      </main>
    </div>
  );
}

export default UsersCatalog;
