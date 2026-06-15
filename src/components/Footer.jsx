import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      background: '#000000',
      padding: '100px 48px 48px 48px',
      position: 'relative',
      overflow: 'hidden',
      borderTop: '1px solid rgba(255,255,255,0.05)'
    }}>
      <div style={{
        maxWidth: 1400,
        margin: '0 auto',
      }}>
        
        {/* Top Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 48,
          marginBottom: 40,
        }}>
          {/* Top Left: Catchphrase */}
          <div>
            <h3 style={{
              fontSize: '28px',
              fontWeight: 500,
              color: '#f8fafc',
              margin: 0,
              fontFamily: '"Inter", sans-serif',
              letterSpacing: '-0.02em'
            }}>
              Empieza a investigar
            </h3>
          </div>

          {/* Top Right: Links */}
          <div style={{
            display: 'flex',
            gap: 80,
            paddingRight: '4vw'
          }}>
            {[
              {
                title: 'PLATAFORMA',
                links: ['Características', 'Cómo funciona', 'Casos de uso', 'Integraciones']
              },
              {
                title: 'EMPRESA',
                links: ['Sobre nosotros', 'Blog', 'Clientes', 'Contacto']
              },
              {
                title: 'LEGAL',
                links: ['Privacidad', 'Términos', 'Cookies']
              }
            ].map((col, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#475569', letterSpacing: '0.08em' }}>{col.title}</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {col.links.map(link => (
                    <a key={link} href="#" style={{
                      color: '#64748b',
                      textDecoration: 'none',
                      fontSize: '15px',
                      fontWeight: 500,
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => e.target.style.color = '#f8fafc'}
                    onMouseLeave={e => e.target.style.color = '#64748b'}
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Massive Brand Text */}
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <h1 style={{
          fontSize: '15vw',
          fontWeight: 800,
          margin: 0,
          padding: 0,
          letterSpacing: '-0.06em',
          color: '#ffffff',
          fontFamily: '"Inter", sans-serif',
          whiteSpace: 'nowrap',
          lineHeight: 0.9,
        }}>
          Ask-Sherlock
        </h1>
      </div>
    </footer>
  );
}
