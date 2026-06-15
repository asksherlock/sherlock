import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Real logos using Clearbit API (without any CSS filters that break them)
const CLIENTS = [
  { name: 'BBVA', image: '/logos/LOGO-BBVA.png' }, 
  { name: 'Adidas', image: '/logos/logo-Adidas.png' }, 
  { name: 'Uber', image: '/logos/logo-Uber.png' }, 
  { name: 'Tec de Monterrey', image: '/logos/logo-TEC.png' }, 
  { name: 'SURA', image: '/logos/logo-Sura.png' }, 
  { name: 'PEMEX', image: '/logos/logo-Pemex.png' }, 
  { name: 'Coca-Cola', image: '/logos/logo-CocaCola.png' }, 
  { name: 'Rotoplas', image: '/logos/logo-rotoplas.png' }, 
  { name: 'Anáhuac', image: '/logos/Logo-Anáhuac.png' }, 
  { name: 'Caja Popular Mexicana', image: '/logos/logo-CajaPopularMexicana.png' }, 
  { name: 'Compartamos Banco', image: '/logos/logo-CompartamosBanco.png' }, 
  { name: 'Evaluatest', image: '/logos/logo-Evaluatest.png' }, 
  { name: 'Innogyzer', image: '/logos/logo-Innogyzer.png' }, 
  { name: 'Zorro', image: '/logos/logo-Zorro.png' }, 
];

const DOUBLED = [...CLIENTS, ...CLIENTS, ...CLIENTS];
const DOUBLED_REV = [...CLIENTS, ...CLIENTS, ...CLIENTS].reverse();

function LogoImg({ client, index }) {
  const [error, setError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const logoUrl = client.image;

  return (
    <motion.div
      className="logo-container"
      animate={isHovered ? {
        y: -10,
        scale: 1.15,
        rotate: 0,
      } : {
        y: [-10, 10, -10],
        rotate: [-3, 3, -3],
        scale: 1,
      }}
      transition={isHovered ? {
        type: "spring",
        stiffness: 300,
        damping: 20
      } : {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: (index % 10) * 0.4
      }}
      style={{
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 170, 
        height: 170,
        cursor: 'default',
        position: 'relative',
        zIndex: isHovered ? 20 : 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!error ? (
        <img 
          className="client-logo-img"
          src={logoUrl} 
          alt={client.name} 
          onError={() => setError(true)}
          style={{ 
            width: '100%', 
            height: '100%', 
            maxWidth: 130, 
            maxHeight: 85, 
            objectFit: 'contain',
            filter: isHovered 
              ? 'brightness(0) invert(1) drop-shadow(0px 0px 12px rgba(34,211,238,0.6)) drop-shadow(0px 0px 20px rgba(168,85,247,0.6)) opacity(1)' 
              : 'brightness(0) invert(1) drop-shadow(0px 0px 4px rgba(34,211,238,0.3)) drop-shadow(0px 0px 10px rgba(168,85,247,0.3)) opacity(0.8)',
            transition: 'all 0.4s ease'
          }}
        />
      ) : (
        <span className="client-logo-img" style={{
          fontSize: '24px',
          fontWeight: 800,
          color: '#f8fafc',
          fontFamily: 'Space Grotesk, sans-serif',
        }}>
          {client.name.charAt(0)}
        </span>
      )}
    </motion.div>
  );
}

export default function Clients() {
  const rowRef = useRef(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const row = rowRef.current;
    let position = 0;
    const speed = 1.1; // Slightly slower
    let animId;

    const animate = () => {
      if (!row || pausedRef.current) {
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
    <section id="clients" style={{ padding: '120px 0', overflow: 'hidden', position: 'relative' }}>
      {/* Edge fades */}
      {['left', 'right'].map(side => (
        <div key={side} style={{
          position: 'absolute',
          [side]: 0, top: 0, bottom: 0, width: 200,
          background: `linear-gradient(${side === 'left' ? '90deg' : '-90deg'}, #04040a 20%, transparent)`,
          zIndex: 20, pointerEvents: 'none',
        }} />
      ))}

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', marginBottom: 80 }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 100, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', marginBottom: 20 }}>
            <span style={{ fontSize: '11px', color: '#34d399', fontWeight: 600, letterSpacing: '0.08em' }}>
              EMPRESAS QUE CONFÍAN EN SHERLOCK AI
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 12, background: 'linear-gradient(135deg, #f8fafc, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Líderes de industria que ya conocen<br />a sus usuarios mejor que nunca
          </h2>
        </motion.div>
      </div>

      {/* Snake / Wave Row */}
      <div style={{ overflow: 'hidden', padding: '100px 0' }}>
        <div ref={rowRef} style={{ display: 'flex', gap: 24, width: 'max-content', alignItems: 'center' }}>
          {/* We multiply the array to make sure the wave is long enough to infinitely scroll seamlessly */}
          {[...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS].map((c, i) => (
            <LogoImg key={i} client={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
