import { useState } from 'react';
import { usePrevious } from '../hooks/usePrevious';

function CounterWithPrevious() {
  const [count, setCount] = useState(0);
  const prev = usePrevious(count);

  return (
    <div style={{ maxWidth: 300, margin: '40px auto' }}>
      <h1>Счётчик</h1>
      <p>Сейчас: {count}</p>
      <p>Было: {prev === undefined ? '—' : prev}</p>
      <p>
        {prev !== undefined && count > prev && '↑ выросло'}
        {prev !== undefined && count < prev && '↓ уменьшилось'}
      </p>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
      <button onClick={() => setCount((c) => c - 1)}>−1</button>
      <button onClick={() => setCount(0)}>Сброс</button>
    </div>
  );
}

export default CounterWithPrevious;
