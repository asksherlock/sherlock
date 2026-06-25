import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CLIENTS = [
  { name: 'BBVA', image: '/logos/LOGO-BBVA.png' },
  { name: 'Anáhuac', image: '/logos/Logo-Anáhuac.png' },
  { name: 'Adidas', image: '/logos/logo-Adidas.png' },
  { name: 'Caja Popular', image: '/logos/logo-CajaPopularMexicana.png' },
  { name: 'CocaCola', image: '/logos/logo-CocaCola.png' },
  { name: 'Compartamos', image: '/logos/logo-CompartamosBanco.png' },
  { name: 'Evaluatest', image: '/logos/logo-Evaluatest.png' },
  { name: 'Innogyzer', image: '/logos/logo-Innogyzer.png' },
  { name: 'Pemex', image: '/logos/logo-Pemex.png' },
  { name: 'Sura', image: '/logos/logo-Sura.png' },
  { name: 'TEC', image: '/logos/logo-TEC.png' },
  { name: 'Uber', image: '/logos/logo-Uber.png' },
  { name: 'Zorro', image: '/logos/logo-Zorro.png' },
  { name: 'Rotoplas', image: '/logos/logo-rotoplas.png' },
];

function LogoImg({ client, index }) {
  const [error, setError] = useState(false);
  const logoUrl = client.image;

  return (
    <div
      className={`logo-container float-anim-${index % 3}`}
      style={{
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 170, 
        height: 170,
        cursor: 'default',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {!error ? (
        <img 
          className="client-logo-img"
          src={logoUrl} 
          alt={client.name} 
          onError={() => setError(true)}
        />
      ) : (
        <span className="client-logo-img fallback-text">
          {client.name.charAt(0)}
        </span>
      )}
    </div>
  );
}

export default function Clients() {
  const rowRef = useRef(null);

  useEffect(() => {
    const row = rowRef.current;
    let position = 0;
    const speed = 2.0; // Increased speed
    let animId;

    const animate = () => {
      if (!row) {
        animId = requestAnimationFrame(animate);
        return;
      }
      
      position -= speed;
      const half = row.scrollWidth / 2;
      if (Math.abs(position) >= half) position = 0;
      row.style.transform = `translateX(${position}px)`;
      
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section id="clients" style={{ padding: '48px 0', overflow: 'hidden', position: 'relative', background: 'rgba(0, 0, 0, 0.4)', borderTop: '1px solid rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
      {/* Edge fades */}
      {['left', 'right'].map(side => (
        <div key={side} style={{
          position: 'absolute',
          [side]: 0, top: 0, bottom: 0, width: 200,
          background: `linear-gradient(${side === 'left' ? '90deg' : '-90deg'}, #04040a 20%, transparent)`,
          zIndex: 20, pointerEvents: 'none',
        }} />
      ))}

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', marginBottom: 24 }}>
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center' }}
        >
          <h2 style={{ fontSize: '14px', fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', margin: 0 }}>
            <span style={{ color: '#94a3b8' }}>Organizaciones que confían en </span>
            <span style={{ color: '#38bdf8', textShadow: '0 0 12px rgba(56, 189, 248, 0.4)' }}>Ask Sherlock</span>
          </h2>
        </motion.div>
      </div>

      {/* CSS native animations for max performance */}
      <style>{`
        .client-logo-img {
          width: 100%; 
          height: 100%; 
          max-width: 130px; 
          max-height: 85px; 
          object-fit: contain;
          filter: brightness(0) invert(1) drop-shadow(0px 0px 4px rgba(34,211,238,0.3)) drop-shadow(0px 0px 10px rgba(168,85,247,0.3)) opacity(0.8);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .fallback-text {
          font-size: 24px;
          font-weight: 800;
          color: #f8fafc;
          font-family: 'Space Grotesk', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: none !important;
        }

        .logo-container:hover {
          z-index: 20 !important;
        }

        .logo-container:hover .client-logo-img {
          transform: scale(1.15) translateY(-10px);
          filter: brightness(0) invert(1) drop-shadow(0px 0px 12px rgba(34,211,238,0.6)) drop-shadow(0px 0px 20px rgba(168,85,247,0.6)) opacity(1);
        }

        @keyframes float0 { 
          0%, 100% { transform: translateY(-8px) rotate(-1.5deg); } 
          50% { transform: translateY(8px) rotate(1.5deg); } 
        }
        @keyframes float1 { 
          0%, 100% { transform: translateY(8px) rotate(1.5deg); } 
          50% { transform: translateY(-8px) rotate(-1.5deg); } 
        }
        @keyframes float2 { 
          0%, 100% { transform: translateY(-4px) rotate(-1deg); } 
          50% { transform: translateY(12px) rotate(2deg); } 
        }

        .float-anim-0 { animation: float0 6s ease-in-out infinite; }
        .float-anim-1 { animation: float1 5s ease-in-out infinite; }
        .float-anim-2 { animation: float2 7s ease-in-out infinite; }
        
        .testimonial-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 12px 28px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 100px;
          color: #f8fafc;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          font-family: 'Space Grotesk', sans-serif;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .testimonial-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transform: translateX(-100%);
          transition: transform 0.5s ease;
        }
        
        .testimonial-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(56, 189, 248, 0.5);
          box-shadow: 0 0 20px rgba(56, 189, 248, 0.2);
          transform: translateY(-2px);
        }
        
        .testimonial-btn:hover::before {
          transform: translateX(100%);
        }
      `}</style>

      {/* Infinite scrolling row */}
      <div style={{ overflow: 'hidden', padding: '20px 0 20px 0' }}>
        <div ref={rowRef} style={{ display: 'flex', gap: 24, width: 'max-content', alignItems: 'center' }}>
          {/* Repeat enough times to fill a large screen seamlessly */}
          {[...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS].map((c, i) => (
            <LogoImg key={i} client={c} index={i} />
          ))}
        </div>
      </div>
      
      {/* Testimonial Button */}
      <div style={{ textAlign: 'center', marginTop: '16px', position: 'relative', zIndex: 30 }}>
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
          <a href="#testimonials" className="testimonial-btn" onClick={(e) => {
            e.preventDefault();
            document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            Ver Testimonios
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
