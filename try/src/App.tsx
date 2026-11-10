import Header from './components/Header';
import StatCard from './components/StatCard';
import StudentList from './components/StudentList';
import { students } from './data/students';
import Footer from './components/Footer';

function App() {
  const totalStudents = students.length;

  const avgGpa = students.reduce((sum, s) => sum + s.gpa, 0) / totalStudents;

  const youngestAge = Math.min(...students.map((s) => s.age));

  const uniqueCities = new Set(students.map((s) => s.city)).size;

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 24 }}>
      {/* 1. Шапка — без пропсов */}
      <Header />

      {/* 2. Блок статистики — 4 одинаковых компонента с разными пропсами */}
      <div
        style={{
          display: 'flex',
          gap: 12,
          marginBottom: 24,
          flexWrap: 'wrap',
        }}>
        {/* Передаём label, value, color как пропсы */}
        <StatCard label="Всего студентов" value={totalStudents} color="#e0f2fe" />
        <StatCard
          label="Средний балл"
          value={avgGpa.toFixed(2)} // .toFixed(2) → "4.43"
          color="#dcfce7"
        />
        <StatCard
          label="Младший возраст"
          value={`${youngestAge} лет`} // шаблонная строка
          color="#fef3c7"
        />
        <StatCard label="Городов" value={uniqueCities} color="#fce7f3" />
      </div>

      {/* 3. Заголовок раздела */}
      <h2 style={{ marginBottom: 16 }}>Список студентов</h2>

      {/* 4. Список карточек — передаём весь массив */}
      <StudentList students={students} />
      <Footer />
    </div>
  );
}

export default App;
