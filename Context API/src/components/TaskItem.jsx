import { memo, useCallback } from 'react';
import { useTasksDispatch } from '../hooks/useTasks';

const TaskItem = memo(function TaskItem({ task }) {
  const dispatch = useTasksDispatch();

  const handleToggle = useCallback(() => {
    dispatch({ type: 'TOGGLE', payload: task.id });
  }, [dispatch, task.id]);

  const handleDelete = useCallback(() => {
    dispatch({ type: 'DELETE', payload: task.id });
  }, [dispatch, task.id]);

  // 🔍 для проверки: должно печататься только у изменённой задачи
  console.log('render TaskItem', task.text);

  return (
    <li style={{ display: 'flex', gap: 8, padding: '8px 0' }}>
      <input type="checkbox" checked={task.done} onChange={handleToggle} />
      <span style={{ flex: 1, textDecoration: task.done ? 'line-through' : 'none' }}>
        {task.text}
      </span>
      <button onClick={handleDelete}>✕</button>
    </li>
  );
});

export default TaskItem;
