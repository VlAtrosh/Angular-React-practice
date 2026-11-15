import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import type { ApiTask } from '../api/tasks';

interface TaskCardProps {
  task: ApiTask;
}

const TaskCard = memo(function TaskCard({ task }: TaskCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(task.id);

  console.log('TaskCard render:', task.id);

  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: 12,
        borderBottom: '1px solid #374151',
      }}>
      <button
        onClick={() => toggleFavorite(task.id)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}
        aria-label={fav ? 'Убрать из избранного' : 'В избранное'}>
        {fav ? '⭐' : '☆'}
      </button>
      <Link to={`/tasks/${task.id}`} style={{ flex: 1, color: '#60a5fa' }}>
        {task.title}
      </Link>
    </li>
  );
});

export default TaskCard;
