export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.04)',
      padding: '48px 24px',
      background: '#04040a',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
      }}>
        {/* Top row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 32,
        }}>
          {/* Brand */}
          <div style={{ maxWidth: 280 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
              }}>
                🔍
              </div>
              <span style={{
                fontSize: '18px',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #f8fafc, #94a3b8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: 'Space Grotesk, sans-serif',
              }}>
                Sherlock AI
              </span>
            </div>
            <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.7 }}>
              La plataforma líder de usuarios sintéticos para equipos de producto que quieren entender a sus usuarios antes de perderlos.
            </p>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
            {[
              {
                title: 'Plataforma',
                links: ['Características', 'Cómo funciona', 'Casos de uso', 'Integraciones'],
              },
              {
                title: 'Empresa',
                links: ['Sobre nosotros', 'Blog', 'Clientes', 'Contacto'],
              },
              {
                title: 'Legal',
                links: ['Privacidad', 'Términos', 'Cookies'],
              },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#475569', letterSpacing: '0.08em', marginBottom: 16 }}>
                  {col.title.toUpperCase()}
                </div>
                {col.links.map(link => (
                  <div key={link} style={{ marginBottom: 8 }}>
                    <a
                      href="#"
                      style={{
                        fontSize: '13px',
                        color: '#334155',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => e.target.style.color = '#94a3b8'}
                      onMouseLeave={e => e.target.style.color = '#334155'}
                    >
                      {link}
                    </a>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div style={{
          paddingTop: 24,
          borderTop: '1px solid rgba(255,255,255,0.03)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <span style={{ fontSize: '12px', color: '#1e293b' }}>
            © 2025 Sherlock AI. Todos los derechos reservados. Hecho en México 🇲🇽
          </span>
          <div style={{ display: 'flex', gap: 16 }}>
            {['LinkedIn', 'Twitter', 'YouTube'].map(s => (
              <a
                key={s}
                href="#"
                style={{
                  fontSize: '12px',
                  color: '#1e293b',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.target.style.color = '#6366f1'}
                onMouseLeave={e => e.target.style.color = '#1e293b'}
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
