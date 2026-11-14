import { useState, useEffect, useRef } from 'react';
import { useDebounce } from '../hooks/useDebounce';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 600);

  const isTyping = query !== debouncedQuery;

  // Имитация запроса
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }

    let cancelled = false;
    setLoading(true);

    const timer = setTimeout(() => {
      if (cancelled) return;
      // имитация ответа API
      setResults(Array.from({ length: 3 }, (_, i) => `${debouncedQuery} — результат ${i + 1}`));
      setLoading(false);
    }, 400);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [debouncedQuery]);

  return (
    <div style={{ maxWidth: 400, margin: '40px auto' }}>
      <h1>Поиск</h1>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Введите запрос"
        style={{ width: '100%', padding: 8 }}
      />

      <div style={{ minHeight: 24, color: '#888', marginTop: 8 }}>
        {isTyping && 'печатает…'}
        {!isTyping && loading && 'загрузка…'}
        {!isTyping && !loading && debouncedQuery && `результаты по «${debouncedQuery}»`}
      </div>

      <ul>
        {results.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
