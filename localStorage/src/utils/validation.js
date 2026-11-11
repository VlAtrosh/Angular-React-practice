export function validateForm({ name, email, password, confirmPassword, age, agree }) {
  const errors = {};

  if (!name.trim()) {
    errors.name = 'Введите имя';
  } else if (name.trim().length < 2) {
    errors.name = 'Минимум 2 символа';
  } else if (!/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(name)) {
    errors.name = 'Только буквы и пробелы';
  }

  if (!email.trim()) {
    errors.email = 'Введите email';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Некорректный email';
  }

  if (!password) {
    errors.password = 'Введите пароль';
  } else if (password.length < 6) {
    errors.password = 'Минимум 6 символов';
  } else if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
    errors.password = 'Должен содержать буквы и цифры';
  }

  if (confirmPassword !== password) {
    errors.confirmPassword = 'Пароли не совпадают';
  }

  if (!age) {
    errors.age = 'Введите возраст';
  } else if (Number(age) < 18) {
    errors.age = 'Только с 18 лет';
  } else if (Number(age) > 120) {
    errors.age = 'Слишком большой возраст';
  }

  if (!agree) {
    errors.agree = 'Нужно согласие';
  }

  return errors;
}
