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
          marginBottom: 120,
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
            gap: 120,
            paddingRight: '4vw'
          }}>
            {[
              {
                links: ['Descargar', 'Producto', 'Docs', 'Changelog', 'Prensa', 'Lanzamientos']
              },
              {
                links: ['Blog', 'Precios', 'Casos de Uso']
              }
            ].map((col, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {col.links.map(link => (
                  <a key={link} href="#" style={{
                    color: '#94a3b8',
                    textDecoration: 'none',
                    fontSize: '15px',
                    fontWeight: 500,
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={e => e.target.style.color = '#f8fafc'}
                  onMouseLeave={e => e.target.style.color = '#94a3b8'}
                  >
                    {link}
                  </a>
                ))}
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
