import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { accessToken, user } = await login({ email, password });
      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '50px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Вход</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: 'block', width: '100%', padding: '8px', margin: '8px 0' }}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: 'block', width: '100%', padding: '8px', margin: '8px 0' }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#22c55e',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Войти
        </button>
      </form>
      <button
        onClick={() => navigate('/register')}
        style={{ marginTop: '16px', background: 'none', color: '#22c55e', cursor: 'pointer' }}
      >
        Нет аккаунта? Зарегистрироваться
      </button>
    </div>
  );
}