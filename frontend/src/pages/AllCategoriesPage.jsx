import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AllCategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3333/categories/all')
      .then(res => res.json())
      .then(setCategories);
  }, []);

  return (
    <div className="container" style={{
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '48px 20px'
    }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>All Categories</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '16px' }}>
        {categories.map(cat => (
          <Link to={`/categories/${cat.id}`} key={cat.id} style={{ textDecoration: 'none', color: '#374151' }}>
            <div style={{ width: '140px', textAlign: 'center' }}>
              <img
                src={`http://localhost:3333${cat.image}`}
                alt={cat.title}
                style={{ width: '100%', height: '128px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }}
              />
              <p style={{ fontWeight: '600', fontSize: '14px' }}>{cat.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}