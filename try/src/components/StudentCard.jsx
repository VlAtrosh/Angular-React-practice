import Badge from './Badge';
import type {Student} from '../data/students';

type Props = {student: Student};

function StudentCard({ student }: Props) {
  const { name, age, course, city, gpa, skills } = student;

  function renderStars(rating: number) {
    const fullStars = Math.round(rating); // округляем 4.8 → 5
    const emptyStars = 5 - fullStars; // сколько пустых
    return '⭐'.repeat(fullStars) + '☆'.repeat(emptyStars);
  }

  // Цвет бейджа курса — тернарник для выбора
  const courseColor = course >= 3 ? '#28a745' : '#ffc107';

  return (
    <div
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        padding: '20px',
        background: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}>
      {/* Шапка карточки: имя и курс */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 12,
        }}>
            
        <h3 style={{ margin: 0, fontSize: '18px' }}>{name}</h3>
        <Badge text={`${course} курс`} bg={courseColor} color="white" />
      </div>

      {/* Основная информация. Каждая строка — отдельный <p> */}
      <p style={{ margin: '6px 0', color: '#555' }}>
        <strong>Возраст:</strong> {age} лет
      </p>
      <p style={{ margin: '6px 0', color: '#555' }}>
        <strong>Город:</strong> {city}
      </p>

      {/* GPA со звёздочками */}
      <p style={{ margin: '6px 0', color: '#555' }}>
        <strong>Средний балл:</strong> {gpa} {renderStars(gpa)}
      </p>

      {gpa >= 4.5 && (
        <p style={{margin: '6px 0'}}>
            <span style={{fontSize: 14}}> Отличник </span>
      </p>
      )}

      <div style = {{marginTop: 12}}>
        <strong style ={{fontSize: '14px'}}> Навыки </strong>
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
                marginTop: 6,
            }}
        >
        {skills.map((skill) => (
          <Badge key={skill} text={skill} />
        ))}
       </div>
      </div>
    </div>
  );
}

export default StudentCard;
