import React from 'react';
import { Link } from 'react-router-dom';

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
                links: [
                  { label: 'Características', href: '#platform' },
                  { label: 'Cómo funciona', href: '#how-it-works' },
                  { label: 'Casos de uso', href: '#use-cases' },
                  { label: 'Planes', href: '#pricing' }
                ]
              },
              {
                title: 'EMPRESA',
                links: [
                  { label: 'Sobre nosotros', href: '#about' },
                  { label: 'Contacto', href: '#contact' }
                ]
              },
              {
                title: 'LEGAL',
                links: [
                  { label: 'Aviso de Privacidad', to: '/aviso-de-privacidad' }
                ]
              }
            ].map((col, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#475569', letterSpacing: '0.08em' }}>{col.title}</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {col.links.map(link => {
                    const linkStyle = {
                      color: '#64748b',
                      textDecoration: 'none',
                      fontSize: '15px',
                      fontWeight: 500,
                      transition: 'color 0.2s ease',
                    };
                    
                    if (link.to) {
                      return (
                        <Link key={link.label} to={link.to} style={linkStyle}
                          onMouseEnter={e => e.target.style.color = '#f8fafc'}
                          onMouseLeave={e => e.target.style.color = '#64748b'}
                        >
                          {link.label}
                        </Link>
                      );
                    }
                    return (
                      <a key={link.label} href={link.href} style={linkStyle}
                        onMouseEnter={e => e.target.style.color = '#f8fafc'}
                        onMouseLeave={e => e.target.style.color = '#64748b'}
                      >
                        {link.label}
                      </a>
                    );
                  })}
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
