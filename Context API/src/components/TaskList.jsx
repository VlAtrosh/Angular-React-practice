import { useMemo, useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import TaskItem from './TaskItem';

function TaskList() {
  const tasks = useTasks();
  const [filter, setFilter] = useState('all');

  const visibleTasks = useMemo(() => {
    console.log('пересчёт фильтрации');
    if (filter === 'active') return tasks.filter((t) => !t.done);
    if (filter === 'done') return tasks.filter((t) => t.done);
    return tasks;
  }, [tasks, filter]);

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        {['all', 'active', 'done'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{ fontWeight: filter === f ? 'bold' : 'normal' }}>
            {f}
          </button>
        ))}
      </div>

      {visibleTasks.length === 0 ? (
        <p>Пусто</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {visibleTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
