import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { addToCart } from './CartPage';

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [saleProducts, setSaleProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3333/categories/all')
      .then(res => res.json())
      .then(setCategories);

    fetch('http://localhost:3333/products/all')
      .then(res => res.json())
      .then(data => {
        const discounted = data.filter(p => p.discont_price != null);
        setSaleProducts(discounted.slice(0, 4));
      });
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      phone: e.target.phone.value,
      email: e.target.email.value
    };
    fetch('http://localhost:3333/sale/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(() => {});
  };

  return (
    <div>
      <div style={{
        position: 'relative',
        height: '600px',
        width: '100%',
        overflow: 'hidden'
      }}>
        <img
          src="http://localhost:3333/category_img/banner.jpg"
          alt="Banner"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: 'white'
        }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            marginBottom: '40px'
          }}>
            Amazing Discounts on Garden Products!
          </h1>
          <Link to="/discounted" style={{
            padding: '12px 24px',
            backgroundColor: '#0a8838ff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '10px',
            fontWeight: '600'
          }}>Check out</Link>
        </div>
      </div>

      <div className="container" style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 20px'
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Categories</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
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

      <div style={{
        backgroundColor: '#0b4420ff',
        padding: '48px 20px',
        textAlign: 'center',
        color: 'white'
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '16px'
        }}>
          5% off on the first order
        </h2>
        <form onSubmit={handleSubscribe} style={{
          maxWidth: '600px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          
        }}>
          <input
            name="name"
            type="text"
            placeholder="Name"
            style={{
              padding: '8px 12px',
              borderRadius: '4px',
              border: 'none',
              width: '100%',
              backgroundColor: 'white',
              color: '#374151'
            }}
            required
          />
          <input
            name="phone"
            type="text"
            placeholder="Phone number"
            style={{
              padding: '8px 12px',
              borderRadius: '4px',
              border: 'none',
              width: '100%',
              backgroundColor: 'white',
              color: '#374151'
            }}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            style={{
              padding: '8px 12px',
              borderRadius: '4px',
              border: 'none',
              width: '100%',
              backgroundColor: 'white',
              color: '#374151'
            }}
            required
          />
          <button
            type="submit"
            style={{
              padding: '8px 16px',
              backgroundColor: 'white',
              color: '#22c55e',
              fontWeight: '600',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Get a discount
          </button>
        </form>
      </div>

      <div className="container" style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 20px'
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>Sale</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '24px' }}>
          {saleProducts.map(p => {
            const price = p.discont_price || p.price;
            const oldPrice = p.discont_price ? p.price : null;
            const disc = p.discont_price ? Math.round((1 - p.discont_price / p.price) * 100) : null;
            return (
              <div key={p.id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', backgroundColor: 'white' }}>
                <img
                  src={`http://localhost:3333${p.image}`}
                  alt={p.title}
                  style={{ width: '100%', height: '160px', objectFit: 'contain', marginBottom: '12px' }}
                />
                <h3 style={{ fontWeight: '600', marginBottom: '8px', fontSize: '16px' }}>{p.title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#22c55e' }}>${price.toFixed(2)}</span>
                  {oldPrice && (
                    <>
                      <span style={{
                        marginLeft: '8px',
                        fontSize: '14px',
                        color: '#6b7280',
                        textDecoration: 'line-through'
                      }}>
                        ${oldPrice.toFixed(2)}
                      </span>
                      <span style={{
                        marginLeft: '8px',
                        backgroundColor: '#fee2e2',
                        color: '#b91c1c',
                        fontSize: '12px',
                        padding: '2px 4px',
                        borderRadius: '4px'
                      }}>
                        {disc}%
                      </span>
                    </>
                  )}
                </div>
                <button
                  onClick={() => {
                    const product = {
                      id: p.id,
                      title: p.title,
                      price: price,
                      image: p.image
                    };
                    addToCart(product);
                  }}
                  style={{
                    width: '100%',
                    padding: '8px',
                    backgroundColor: '#088f3aff',
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
          })}
        </div>
      </div>

      <div className="container" style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 20px'
      }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          <div style={{
            backgroundColor: 'white',
            padding: '16px',
            borderRadius: '8px'
          }}>
            
          </div>
          <div style={{
            backgroundColor: 'white',
            padding: '16px',
            borderRadius: '8px'
          }}>
            
            
            
          
            
          </div>
        </div>
      </div>
    </div>
  );
}