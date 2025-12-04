import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addToCart } from './CartPage';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3333/products/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) setProduct(data[0]);
      });
  }, [id]);

  if (!product) return <div style={{ padding: '50px', textAlign: 'center' }}>Loading...</div>;

  const price = product.discont_price || product.price;
  const oldPrice = product.discont_price ? product.price : null;

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div className="container" style={{
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '48px 20px'
    }}>
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ flex: 1, minWidth: '300px', maxWidth: '500px' }}>
          <img
            src={`http://localhost:3333${product.image}`}
            alt={product.title}
            style={{ width: '100%', height: '400px', objectFit: 'contain' }}
          />
        </div>
        <div style={{ flex: 1, minWidth: '300px', maxWidth: '500px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '16px' }}>{product.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#22c55e' }}>${price.toFixed(2)}</span>
            {oldPrice && <span style={{ marginLeft: '12px', fontSize: '18px', color: '#6b7280', textDecoration: 'line-through' }}>${oldPrice.toFixed(2)}</span>}
          </div>
          <p>{product.description || 'Подробное описание товара.'}</p>
          <button
            onClick={handleAddToCart}
            style={{
              marginTop: '20px',
              padding: '12px 24px',
              backgroundColor: '#22c55e',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}