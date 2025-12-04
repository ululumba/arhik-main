import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const finalPrice = product.discont_price || product.price;
  const originalPrice = product.discont_price ? product.price : null;
  const discount = product.discont_price ? Math.round((1 - product.discont_price / product.price) * 100) : null;

  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '16px',
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      transition: 'box-shadow 0.2s',
      maxWidth: '250px'
    }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)'}
       onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)'}
    >
      <img
        src={`http://localhost:3333${product.image}`} 
        alt={product.title}
        style={{
          width: '100%',
          height: '160px',
          objectFit: 'contain',
          marginBottom: '12px'
        }}
        onError={(e) => e.target.src = 'https://placehold.co/200x200?text=No+Image'}
      />
      <h3 style={{ fontWeight: '600', marginBottom: '8px', fontSize: '16px' }}>
        {product.title}
      </h3>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
        <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#22c55e' }}>
          ${finalPrice.toFixed(2)}
        </span>
        {originalPrice && (
          <>
            <span style={{
              marginLeft: '8px',
              fontSize: '14px',
              color: '#6b7280',
              textDecoration: 'line-through'
            }}>
              ${originalPrice.toFixed(2)}
            </span>
            <span style={{
              marginLeft: '8px',
              backgroundColor: '#fee2e2',
              color: '#b91c1c',
              fontSize: '12px',
              padding: '2px 4px',
              borderRadius: '4px'
            }}>
              {discount}%
            </span>
          </>
        )}
      </div>
      <button
        onClick={() => alert('Товар добавлен в корзину!')}
        style={{
          width: '100%',
          padding: '8px',
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
  );
}