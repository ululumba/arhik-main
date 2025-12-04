import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user from localStorage');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <header style={{
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      padding: '16px 0'
    }}>
      <div className="container" style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

          <img
            src="/logo.svg" 
            alt="Logo"
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%'
            }}
          />
          <span style={{ fontWeight: 'bold', fontSize: '20px' }}>Garden Store</span>
        </div>

        <nav style={{ display: 'flex', gap: '82px' }}>
          <Link to="/" style={{ color: '#374151', textDecoration: 'none' }}>Main Page</Link>
          <Link to="/categories" style={{ color: '#374151', textDecoration: 'none' }}>Categories</Link>
          <Link to="/all-products" style={{ color: '#374151', textDecoration: 'none' }}>All products</Link>
          <Link to="/discounted" style={{ color: '#374151', textDecoration: 'none' }}>All sales</Link>
          

          {user?.role === 'admin' && (
            <Link to="/admin" style={{ color: '#374151', textDecoration: 'none' }}>Admin</Link>
          )}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {user ? (
            <>
              <span style={{ color: '#374151' }}>Привет, {user.name}</span>
              <button
                onClick={handleLogout}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ef4444',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Выйти
              </button>
            </>
          ) : (
            <Link to="/login" style={{ color: '#374151', fontSize: '16px', textDecoration: 'none' }}>Войти</Link>
          )}
          <Link to="/cart" style={{ color: '#374151', fontSize: '24px' }}>
            <img
              src="/basket=empty.png" 
              alt="Cart"
              style={{
                width: '50px',
                height: '50px'
              }}
            />
          </Link>
        </div>
      </div>
    </header>
  );
}