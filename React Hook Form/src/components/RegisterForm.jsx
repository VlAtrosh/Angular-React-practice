import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email('Некорректный email'),
  password: z.string().min(8, 'Минимум 8 символов'),
});

// имитация сервера: проверяем, занят ли email
async function fakeRegister({ email }) {
  await new Promise((r) => setTimeout(r, 500));
  if (email === 'taken@example.com') {
    throw new Error('EMAIL_TAKEN');
  }
  return { ok: true };
}

function RegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  async function onSubmit(data) {
    try {
      await fakeRegister(data);
      reset();
      alert('Успешно!');
    } catch (err) {
      if (err.message === 'EMAIL_TAKEN') {
        // привязываем серверную ошибку к полю email
        setError(
          'email',
          { type: 'server', message: 'Этот email уже используется' },
          { shouldFocus: true }, // фокус на проблемном поле
        );
      } else {
        // общая ошибка формы
        setError('root.serverError', { message: 'Что-то пошло не так' });
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label>Email</label>
        <input type="email" {...register('email')} />
        {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
      </div>

      <div>
        <label>Пароль</label>
        <input type="password" {...register('password')} />
        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
      </div>

      {errors.root?.serverError && (
        <p style={{ color: 'red' }}>{errors.root.serverError.message}</p>
      )}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Отправка...' : 'Зарегистрироваться'}
      </button>
    </form>
  );
}

export default RegisterForm;
