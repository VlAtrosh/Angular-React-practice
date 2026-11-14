import { useQuery } from '@tanstack/react-query';
import { getPost } from '../api/posts';

function PostDetails({ id }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['posts', id], // ← id обязателен в ключе
    queryFn: () => getPost(id),
    enabled: !!id, // не запускать, пока id нет
  });

  if (!id) return <p>Выбери пост</p>;
  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p style={{ color: 'red' }}>Ошибка: {error.message}</p>;

  return (
    <article>
      <h2>{data.title}</h2>
      <p>{data.body}</p>
    </article>
  );
}

export default PostDetails;
