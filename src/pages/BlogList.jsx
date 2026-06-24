import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StarfieldBackground from '../components/StarfieldBackground';

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data.docs || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching posts:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ background: '#000000', color: '#f8fafc', minHeight: '100vh', fontFamily: '"Inter", sans-serif', position: 'relative' }}>
      <StarfieldBackground />
      
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />
        
        <main style={{ maxWidth: 1200, margin: '0 auto', padding: '150px 24px 100px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif', marginBottom: 20, background: 'linear-gradient(135deg, #f8fafc, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Blog & Insights
            </h1>
            <p style={{ fontSize: '20px', color: '#94a3b8', maxWidth: 600, marginBottom: 60 }}>
              Descubre las últimas tendencias en investigación de usuarios, IA sintética y optimización de productos.
            </p>
          </motion.div>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid rgba(99,102,241,0.2)', borderTopColor: '#6366f1', animation: 'spin 1s linear infinite' }} />
            </div>
          ) : posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '100px 0', color: '#64748b', fontSize: '18px' }}>
              No hay artículos publicados todavía.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 32 }}>
              {posts.map((post, i) => (
                <motion.div 
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                    <div style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      borderRadius: 24,
                      overflow: 'hidden',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)';
                      e.currentTarget.style.transform = 'translateY(-5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    >
                      {post.heroImage && (
                        <div style={{ width: '100%', height: 200, background: `url(http://localhost:4000${post.heroImage.url}) center/cover` }} />
                      )}
                      {!post.heroImage && (
                        <div style={{ width: '100%', height: 200, background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: '40px' }}>🕵️‍♂️</span>
                        </div>
                      )}
                      <div style={{ padding: 32, flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ fontSize: '13px', color: '#818cf8', fontWeight: 600, marginBottom: 12 }}>
                          {new Date(post.publishedAt || post.createdAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                        <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#f8fafc', marginBottom: 16, lineHeight: 1.3 }}>
                          {post.title}
                        </h2>
                        <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.6, flex: 1 }}>
                          {post.excerpt || 'Haz clic para leer el artículo completo...'}
                        </p>
                        <div style={{ marginTop: 24, fontSize: '14px', color: '#6366f1', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                          Leer más <span style={{ fontSize: '18px' }}>→</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </main>
        
        <Footer />
      </div>
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
