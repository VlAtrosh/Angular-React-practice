import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTasks, createTask } from '../api/tasks';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import EmptyState from '../components/EmptyState';
import { useFavorites } from '../context/FavoritesContext';
import { useDebounce } from '../hooks/useDebounce';
import type { TaskFormValues } from '../schemas/taskSchema';

export default function TasksPage() {
  const queryClient = useQueryClient();
  const { isFavorite } = useFavorites();

  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get('filter') || 'all';

  function setFilter(newFilter: string) {
    if (newFilter === 'all') {
      searchParams.delete('filter');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ filter: newFilter });
    }
  }

  // 2. Поиск с debounce (Творческое задание, Вариант А)
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 300);

  // Загрузка данных
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  // Создание задачи
  const mutation = useMutation({
    mutationFn: (values: TaskFormValues) =>
      createTask({
        title: values.title,
        body: values.body,
        userId: values.userId,
        completed: false,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  // 3. Фильтрация и сортировка (с учетом фильтра, поиска и избранного)
  const sorted = useMemo(() => {
    if (!data) return [];

    let result = [...data].sort((a, b) => a.id - b.id);

    // Фильтр по избранному
    if (filter === 'favorites') {
      result = result.filter((task) => isFavorite(task.id));
    }

    // Поиск по названию
    if (debouncedQuery.trim()) {
      const lowerQuery = debouncedQuery.toLowerCase();
      result = result.filter((task) => task.title.toLowerCase().includes(lowerQuery));
    }

    return result;
  }, [data, filter, isFavorite, debouncedQuery]);

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) {
    return (
      <div>
        <p style={{ color: 'red' }}>Ошибка: {error.message}</p>
        <button onClick={() => refetch()}>Повторить</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Задачи</h1>

      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Поиск по названию..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: 8,
            borderRadius: 6,
            border: '1px solid #4b5563',
            background: '#1f2937',
            color: 'white',
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button
          onClick={() => setFilter('all')}
          style={{
            padding: '6px 12px',
            borderRadius: 6,
            border: '1px solid #4b5563',
            background: filter === 'all' ? '#3b82f6' : 'transparent',
            color: filter === 'all' ? '#fff' : '#9ca3af',
            cursor: 'pointer',
          }}>
          Все
        </button>
        <button
          onClick={() => setFilter('favorites')}
          style={{
            padding: '6px 12px',
            borderRadius: 6,
            border: '1px solid #4b5563',
            background: filter === 'favorites' ? '#3b82f6' : 'transparent',
            color: filter === 'favorites' ? '#fff' : '#9ca3af',
            cursor: 'pointer',
          }}>
          Избранные ⭐
        </button>
      </div>

      <TaskForm onSubmit={(values) => mutation.mutateAsync(values)} />

      {sorted.length === 0 ? (
        filter === 'favorites' ? (
          <EmptyState
            title="Ты пока ничего не добавил в избранное ⭐"
            hint="Нажми на звездочку рядом с задачей, чтобы добавить её сюда."
          />
        ) : (
          <EmptyState title="Задач пока нет. Создай первую!" hint="Используй форму выше." />
        )
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, marginTop: 20 }}>
          {sorted.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </ul>
      )}
    </div>
  );
}
