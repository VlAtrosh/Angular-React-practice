import { useState } from 'react';

function App() {
  // ---- Состояние ----
  const [todos, setTodos] = useState([
    { id: 1, text: 'Изучить useState', done: true },
    { id: 2, text: 'Разобраться с событиями', done: false },
  ]);

  const [inputValue, setInputValue] = useState('');

  // ---- Обработчики ----

  function handleAdd() {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const newTodo = {
      id: Date.now(),
      text: trimmed,
      done: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setInputValue('');
  }

  function handleToggle(id) {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  }

  function handleDelete(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  // ---- Подсчёты ----
  const doneCount = todos.filter((t) => t.done).length;
  const activeCount = todos.length - doneCount;

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', padding: 20 }}>
      <h1>📝 Todo List</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAdd();
        }}
        style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Что нужно сделать?"
          style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid #ddd' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>
          Добавить
        </button>
      </form>

      <p style={{ color: '#666', fontSize: 14 }}>
        Всего: {todos.length} | Активных: {activeCount} | Выполнено: {doneCount}
      </p>

      {todos.length === 0 && (
        <p style={{ textAlign: 'center', color: '#999', padding: 40 }}>
          Задач пока нет. Добавь первую!
        </p>
      )}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 0',
              borderBottom: '1px solid #eee',
            }}>
            <input type="checkbox" checked={todo.done} onChange={() => handleToggle(todo.id)} />
            <span
              style={{
                flex: 1,
                textDecoration: todo.done ? 'line-through' : 'none',
                color: todo.done ? '#999' : '#1e293b',
              }}>
              {todo.text}
            </span>
            <button
              onClick={() => handleDelete(todo.id)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: 18,
                color: '#ef4444',
              }}>
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
