import { Link } from 'react-router-dom';

export default function CategoryCard({ category }) {
  return (
    <Link to={`/categories/${category.id}`} style={{ textDecoration: 'none' }}>
      <div style={{ width: '140px', textAlign: 'center' }}>
        <img
          src={`http://localhost:3333${category.image}`} 
          alt={category.title}
          style={{
            width: '100%',
            height: '128px',
            objectFit: 'cover',
            borderRadius: '8px',
            marginBottom: '8px'
          }}
          onError={(e) => e.target.src = 'https://placehold.co/200x200?text=No+Image'}
        />
        <p style={{ color: '#374151', fontWeight: '600' }}>{category.title}</p>
      </div>
    </Link>
  );
}
