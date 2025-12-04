import { useState, useEffect } from 'react';
import { addToCart } from './CartPage'; 

export default function AllProductsPxage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3333/products/all')
      .then(res => res.json())
      .then(setProducts);
  }, []);

  const handleAddToCart = (product) => {

    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.discont_price || product.price,
      image: product.image
    };
    addToCart(cartItem);
    alert('Товар добавлен в корзину!');
  };

  return (
    <div className="container" style={{
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '48px 20px'
    }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>All Products</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '24px' }}>
        {products.map(p => {
          const price = p.discont_price || p.price;
          const oldPrice = p.discont_price ? p.price : null;
          const disc = p.discont_price ? Math.round((1 - p.discont_price / p.price) * 100) : null;
          return (
            <div key={p.id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', backgroundColor: 'white' }}>
              <img
                src={`http://localhost:3333${p.image}`}
                alt={p.title}
                style={{ width: '100%', height: '160px', objectFit: 'contain', marginBottom: '12px' }}
                onError={(e) => e.target.src = 'https://placehold.co/200x200/gray/white?text=No+Image'}
              />
              <h3 style={{ fontWeight: '600', marginBottom: '8px', fontSize: '16px' }}>{p.title}</h3>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#0a8838ff' }}>${price.toFixed(2)}</span>
                {oldPrice && (
                  <>
                    <span style={{ marginLeft: '8px', fontSize: '14px', color: '#6b7280', textDecoration: 'line-through' }}>${oldPrice.toFixed(2)}</span>
                    <span style={{ marginLeft: '8px', backgroundColor: '#fee2e2', color: '#b91c1c', fontSize: '12px', padding: '2px 4px', borderRadius: '4px' }}>{disc}%</span>
                  </>
                )}
              </div>
              <button
                onClick={() => handleAddToCart(p)}
                style={{
                  width: '100%',
                  padding: '8px',
                  backgroundColor: '#0a8838ff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  marginTop: '12px',
                  cursor: 'pointer'
                }}
              >
                Add to cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}