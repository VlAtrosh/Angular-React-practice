import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPosts, deletePost } from '../api/posts';

function PostsWithDelete() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  const mutation = useMutation({
    mutationFn: deletePost,

    // 1. Оптимистично убираем пост из кэша
    onMutate: async (id) => {
      // отменяем текущие запросы, чтобы не перезаписать наш кэш
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      // снимок для rollback
      const previous = queryClient.getQueryData(['posts']);

      // оптимистично обновляем кэш
      queryClient.setQueryData(['posts'], (old = []) => old.filter((p) => p.id !== id));

      return { previous };
    },

    onError: (err, id, context) => {
      queryClient.setQueryData(['posts'], context.previous);
      alert(`Не удалось удалить: ${err.message}`);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p style={{ color: 'red' }}>Ошибка: {error.message}</p>;

  return (
    <ul>
      {data.map((post) => (
        <li key={post.id} style={{ display: 'flex', gap: 8 }}>
          <span style={{ flex: 1 }}>{post.title}</span>
          <button onClick={() => mutation.mutate(post.id)} disabled={mutation.isPending}>
            🗑
          </button>
        </li>
      ))}
    </ul>
  );
}

export default PostsWithDelete;
