import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const getCart = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

const saveCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const addToCart = (product) => {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart(cart);
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const handleRemove = (id) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    saveCart(updated);
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    const updated = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQty } : item
    );
    setCartItems(updated);
    saveCart(updated);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      items: cartItems,
      total: total
    };

    fetch('http://localhost:3333/order/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(() => {
        localStorage.removeItem('cart');
        navigate('/order/success');
      })
      .catch(() => {
        alert('Ошибка при отправке заказа');
      });
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2>Looks like you have no items in your basket yet.</h2>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '12px 24px',
            backgroundColor: '#099a3eff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Continue shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '48px 20px'
    }}>
      <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '32px' }}>Shopping cart</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          {cartItems.map(item => (
            <div key={item.id} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '16px 0',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <img
                src={`http://localhost:3333${item.image}`}
                alt={item.title}
                style={{ width: '64px', height: '64px', objectFit: 'contain' }}
              />
              <div style={{ marginLeft: '16px', flex: 1 }}>
                <h3 style={{ fontWeight: '600' }}>{item.title}</h3>
                <p style={{ color: '#6b7280' }}>${item.price} × {item.quantity}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button
                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: '#f3f4f6',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  -
                </button>
                <span style={{ margin: '0 8px', fontWeight: '600' }}>{item.quantity}</span>
                <button
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: '#f3f4f6',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  +
                </button>
                <button
                  onClick={() => handleRemove(item.id)}
                  style={{
                    marginLeft: '16px',
                    padding: '4px 8px',
                    backgroundColor: '#fee2e2',
                    color: '#b91c1c',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  ×
                </button>
              </div>
              <p style={{ fontWeight: 'bold', color: '#22c55e' }}>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div style={{ flex: 1, minWidth: '250px' }}>
          <div style={{
            backgroundColor: '#f3f4f6',
            padding: '24px',
            borderRadius: '8px'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Order details</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
              <span>Total:</span>
              <span style={{ fontWeight: 'bold', color: '#22c55e' }}>${total.toFixed(2)}</span>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                name="name"
                placeholder="Name"
                required
                style={{
                  padding: '8px 12px',
                  borderRadius: '4px',
                  border: '1px solid #d1d5db'
                }}
              />
              <input
                name="phone"
                placeholder="Phone number"
                required
                style={{
                  padding: '8px 12px',
                  borderRadius: '4px',
                  border: '1px solid #d1d5db'
                }}
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                style={{
                  padding: '8px 12px',
                  borderRadius: '4px',
                  border: '1px solid #d1d5db'
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '10px',
                  backgroundColor: '#0a8838ff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}