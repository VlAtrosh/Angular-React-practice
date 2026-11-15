import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div>
      <h1>Главная</h1>
      <p>Добро пожаловать в трекер задач.</p>
      <Link to="/tasks">Перейти к задачам →</Link>
    </div>
  );
}
