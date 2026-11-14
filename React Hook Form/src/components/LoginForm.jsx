import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../schemas/loginSchema';

function LoginForm({ onLogin }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onChange', // isValid обновляется на лету
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(data) {
    await onLogin(data);
    reset();
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

      <button type="submit" disabled={!isValid || isSubmitting || !isDirty}>
        {isSubmitting ? 'Вход...' : 'Войти'}
      </button>
    </form>
  );
}

export default LoginForm;
