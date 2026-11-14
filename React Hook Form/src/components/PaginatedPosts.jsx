import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getPostsPage } from '../api/posts';

const LIMIT = 5;

function PaginatedPosts() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error, isFetching, isPlaceholderData } = useQuery({
    queryKey: ['posts', page], // ← page в ключе!
    queryFn: () => getPostsPage(page, LIMIT),
    placeholderData: keepPreviousData, // сохраняем старые данные, пока грузится новая страница
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p style={{ color: 'red' }}>Ошибка: {error.message}</p>;

  return (
    <div>
      {isFetching && <p style={{ color: '#888' }}>Обновление...</p>}

      <ul>
        {data.posts.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1 || isFetching}>
          ← Назад
        </button>

        <span>
          Стр. {page} из {data.totalPages}
        </span>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= data.totalPages || isFetching}>
          Вперёд →
        </button>
      </div>

      {/* isPlaceholderData — true, если показаны старые данные во время загрузки */}
      {isPlaceholderData && (
        <p style={{ color: '#aaa', fontSize: 12 }}>Показаны данные предыдущей страницы...</p>
      )}
    </div>
  );
}

export default PaginatedPosts;
