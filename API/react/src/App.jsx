import { useState } from 'react';
import UsersCatalog from './components/UsersCatalog';
import RegistrationForm from './components/RegistrationForm';

function App() {
  const [tab, setTab] = useState('users'); // 'users' | 'form'
  const [registered, setRegistered] = useState(null);

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: 20 }}>
      <h1>📘 Части 5–6: useEffect, API, useRef, формы</h1>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <button
          onClick={() => setTab('users')}
          style={{
            padding: '8px 14px',
            borderRadius: 8,
            border: '1px solid #ddd',
            background: tab === 'users' ? '#3b82f6' : 'white',
            color: tab === 'users' ? 'white' : '#374151',
            cursor: 'pointer',
          }}>
          Пользователи (API)
        </button>
        <button
          onClick={() => setTab('form')}
          style={{
            padding: '8px 14px',
            borderRadius: 8,
            border: '1px solid #ddd',
            background: tab === 'form' ? '#3b82f6' : 'white',
            color: tab === 'form' ? 'white' : '#374151',
            cursor: 'pointer',
          }}>
          Регистрация (форма)
        </button>
      </div>

      {tab === 'users' && <UsersCatalog />}

      {tab === 'form' && (
        <div style={{ maxWidth: 450 }}>
          {registered ? (
            <div style={{ padding: 16, background: '#dcfce7', borderRadius: 8 }}>
              <p>✅ Спасибо, {registered.name}!</p>
              <button onClick={() => setRegistered(null)}>Зарегистрировать ещё</button>
            </div>
          ) : (
            <RegistrationForm onSuccess={setRegistered} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
