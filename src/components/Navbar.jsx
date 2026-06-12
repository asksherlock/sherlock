import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SherlockLogo from './SherlockLogo';

const NAV_LINKS = [
  { label: 'Plataforma', href: '#platform' },
  { label: 'Cómo funciona', href: '#how-it-works' },
  { label: 'Casos de uso', href: '#use-cases' },
  { label: 'Clientes', href: '#clients' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 2.0, delay: 4.0, ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: '0 24px',
        background: scrolled ? 'rgba(4,4,10,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      <div style={{
        maxWidth: 1200, margin: '0 auto', height: 72,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <SherlockLogo size={30} showText={true} />

        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="desktop-nav">
          {NAV_LINKS.map(link => (
            <a key={link.href} href={link.href}
              style={{ fontSize: '14px', fontWeight: 500, color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#f8fafc'}
              onMouseLeave={e => e.target.style.color = '#94a3b8'}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a href="#contact" style={{
            padding: '10px 22px', borderRadius: 10,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: '#fff', fontSize: '14px', fontWeight: 600, textDecoration: 'none',
            transition: 'all 0.2s', boxShadow: '0 0 20px rgba(99,102,241,0.3)',
            display: 'inline-block',
          }}
            onMouseEnter={e => { e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 0 30px rgba(99,102,241,0.5)'; }}
            onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 0 20px rgba(99,102,241,0.3)'; }}
          >
            Solicitar Demo
          </a>
        </div>
      </div>
      <style>{`@media(max-width:768px){.desktop-nav{display:none!important}}`}</style>
    </motion.nav>
  );
}
