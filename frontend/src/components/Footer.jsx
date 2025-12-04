export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#f9fafb',
      borderTop: '1px solid #e5e7eb',
      padding: '32px 0',
      marginTop: '48px'
    }}>
      <div className="container" style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '20px'
        }}>

          <div style={{ minWidth: '200px' }}>
            <h3 style={{ fontWeight: '600', marginBottom: '12px' }}>Contact</h3>
            <p style={{ color: '#4b5563', fontSize: '14px', lineHeight: '1.5' }}>
              <strong>Phone:</strong> +7 (499) 350-66-04<br />
              <strong>Address:</strong> Dubininskaya Ulitsa, 96, Moscow, Russia, 115093<br />
              <strong>Hours:</strong> 24/7
            </p>
          </div>


          <div style={{ minWidth: '150px' }}>
            <h3 style={{ fontWeight: '600', marginBottom: '12px' }}>Follow Us</h3>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#d1d5db',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6b7280'
              }}>f</div>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#d1d5db',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6b7280'
              }}>t</div>
            </div>
          </div>


          <div style={{ flex: '1', minWidth: '280px', maxWidth: '500px' }}>
            <h3 style={{ fontWeight: '600', marginBottom: '12px' }}>Find Us</h3>
            <div style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2249.515583722929!2d37.6406755!3d55.7248287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54af6a7d8c7e7%3A0x3c8a7f4e9e5e8c8a!2z0JrRgdC10LzRltC60LDRhtC40Y8sIDk2LCDQnNC-0YHQutCy0LAsINCg0L7RgdGB0LjQuA!5e0!3m2!1sru!2sru!4v1717000000000!5m2!1sru!2sru"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Garden Store Location"
              ></iframe>
            </div>
          </div>
        </div>


        <div style={{
          paddingTop: '24px',
          borderTop: '1px solid #e5e7eb',
          textAlign: 'center',
          color: '#6b7280',
          fontSize: '14px'
        }}>
          © {new Date().getFullYear()} Garden Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
}