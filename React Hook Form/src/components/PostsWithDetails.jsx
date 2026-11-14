import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../api/posts';
import PostDetails from './PostDetails';

function PostsWithDetails() {
  const [selectedId, setSelectedId] = useState(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p style={{ color: 'red' }}>Ошибка: {error.message}</p>;

  return (
    <div style={{ display: 'flex', gap: 20 }}>
      <ul style={{ flex: 1 }}>
        {data.map((p) => (
          <li key={p.id}>
            <button onClick={() => setSelectedId(p.id)}>{p.title}</button>
          </li>
        ))}
      </ul>
      <div style={{ flex: 1 }}>
        <PostDetails id={selectedId} />
      </div>
    </div>
  );
}

export default PostsWithDetails;
