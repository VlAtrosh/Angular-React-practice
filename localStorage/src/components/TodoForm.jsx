import { useState } from 'react';

function TodoForm({ onAdd }) {
  const [text, setText] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    onAdd(trimmed);
    setText('');
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8 }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Новая задача..."
        style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid #ddd' }}
      />
      <button type="submit" style={{ padding: '10px 20px' }}>
        Добавить
      </button>
    </form>
  );
}

export default TodoForm;
