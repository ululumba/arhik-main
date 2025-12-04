import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminPage() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');

    if (!token || !storedUser) {
      navigate('/login');
      return;
    }

    if (storedUser.role !== 'admin') {
      alert('Доступ запрещён. Требуется роль администратора.');
      navigate('/');
      return;
    }

    setUser(storedUser);
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setMessage('Вы не авторизованы');
      return;
    }

    try {
      const response = await fetch('http://localhost:4002/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          price: parseFloat(price),
          stock: parseInt(stock, 10),
          description
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(' Товар успешно создан!');
        setTitle('');
        setPrice('');
        setStock('');
        setDescription('');
      } else {
        setMessage(` Ошибка: ${data.error || 'Неизвестная ошибка'}`);
      }
    } catch (error) {
      setMessage(` Ошибка сети: ${error.message}`);
    }
  };

  if (!user) {
    return <div style={{ padding: '50px' }}>Загрузка...</div>;
  }

  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>
        Админка: Создание товара
      </h1>

      {message && (
        <div
          style={{
            padding: '12px',
            marginBottom: '20px',
            backgroundColor: message.includes('✅') ? '#d1fad1' : '#ffeaea',
            color: message.includes('✅') ? '#2e7d32' : '#c62828',
            borderRadius: '6px',
            border: `1px solid ${message.includes('✅') ? '#81c784' : '#ef9a9a'}`
          }}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>Название товара</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Например: Газонокосилка"
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>Цена (₽)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="12000"
            min="0"
            step="0.01"
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>Остаток на складе</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="5"
            min="0"
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600' }}>Описание (опционально)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Мощная газонокосилка для дачи..."
            rows="4"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '16px',
              resize: 'vertical'
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '12px',
            backgroundColor: '#22c55e',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Создать товар
        </button>
      </form>
    </div>
  );
}