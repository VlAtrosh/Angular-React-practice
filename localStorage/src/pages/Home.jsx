import { Link } from 'react-router-dom';
import TodoWithStorage from '../components/TodoWithStorage';

function Home() {
  return (
    <div>
      <h1>Главная</h1>
      <p>Добро пожаловать! Это демо роутинга + Todo с сохранением.</p>
      <p>
        <Link to="/users">Перейти к пользователям →</Link>
      </p>

      <hr style={{ margin: '24px 0' }} />

      {/* Часть 7 прямо на главной */}
      <TodoWithStorage />
    </div>
  );
}

export default Home;
