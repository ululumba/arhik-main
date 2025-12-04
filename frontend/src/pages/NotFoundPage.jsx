import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      padding: '80px 20px',
      textAlign: 'center',
      backgroundColor: '#f3f4f6'
    }}>
      <div style={{
        fontSize: '100px',
        fontWeight: 'bold',
        color: '#22c55e',
        marginBottom: '20px'
      }}>
        404
      </div>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Page Not Found</h2>
      <p style={{ marginBottom: '24px', color: '#6b7280' }}>
        We're sorry, the page you requested could not be found. Please go back to the homepage.
      </p>
      <button
        onClick={() => navigate('/')}
        style={{
          padding: '12px 24px',
          backgroundColor: '#22c55e',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontWeight: '600',
          cursor: 'pointer'
        }}
      >
        Go Home
      </button>
    </div>
  );
}