import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/auth';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register({ email, password, name });
      alert('Регистрация успешна! Теперь войдите.');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '50px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Регистрация</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ display: 'block', width: '100%', padding: '8px', margin: '8px 0' }}
        />
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
            backgroundColor: '#0a8838ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Зарегистрироваться
        </button>
      </form>
      <button
        onClick={() => navigate('/login')}
        style={{ marginTop: '16px', background: 'none', color: '#0a8838ff', cursor: 'pointer' }}
      >
        Уже есть аккаунт? Войти
      </button>
    </div>
  );
}