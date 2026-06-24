import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StarfieldBackground from '../components/StarfieldBackground';

// Basic Lexical RichText Renderer
const renderLexicalNodes = (nodes) => {
  if (!nodes) return null;
  
  return nodes.map((node, i) => {
    if (node.type === 'text') {
      let text = node.text;
      if (node.format & 1) text = <strong key={i}>{text}</strong>;
      if (node.format & 2) text = <em key={i}>{text}</em>;
      if (node.format & 8) text = <u key={i}>{text}</u>;
      return <span key={i}>{text}</span>;
    }
    
    if (node.type === 'paragraph') {
      return <p key={i} style={{ marginBottom: '1.5em', lineHeight: 1.8, fontSize: '18px', color: '#cbd5e1' }}>{renderLexicalNodes(node.children)}</p>;
    }
    
    if (node.type === 'heading') {
      const Tag = `h${node.tag.replace('h', '')}`;
      const size = node.tag === 'h1' ? '40px' : node.tag === 'h2' ? '32px' : '24px';
      return (
        <Tag key={i} style={{ fontSize: size, fontWeight: 700, color: '#f8fafc', marginTop: '2em', marginBottom: '1em' }}>
          {renderLexicalNodes(node.children)}
        </Tag>
      );
    }
    
    if (node.type === 'list') {
      const Tag = node.listType === 'number' ? 'ol' : 'ul';
      return (
        <Tag key={i} style={{ marginBottom: '1.5em', paddingLeft: '2em', fontSize: '18px', color: '#cbd5e1', lineHeight: 1.8 }}>
          {renderLexicalNodes(node.children)}
        </Tag>
      );
    }
    
    if (node.type === 'listitem') {
      return <li key={i}>{renderLexicalNodes(node.children)}</li>;
    }
    
    return null;
  });
};

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:4000/api/posts?where[slug][equals]=${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.docs && data.docs.length > 0) {
          setPost(data.docs[0]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching post:', err);
        setLoading(false);
      });
  }, [slug]);

  return (
    <div style={{ background: '#000000', color: '#f8fafc', minHeight: '100vh', fontFamily: '"Inter", sans-serif', position: 'relative' }}>
      <StarfieldBackground />
      
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />
        
        <main style={{ maxWidth: 800, margin: '0 auto', padding: '150px 24px 100px' }}>
          <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#818cf8', textDecoration: 'none', fontWeight: 600, marginBottom: 40, transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#a5b4fc'} onMouseLeave={e => e.currentTarget.style.color = '#818cf8'}>
            <span>←</span> Volver al Blog
          </Link>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid rgba(99,102,241,0.2)', borderTopColor: '#6366f1', animation: 'spin 1s linear infinite' }} />
            </div>
          ) : !post ? (
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
              <h1 style={{ fontSize: '32px', color: '#f8fafc', marginBottom: 16 }}>Artículo no encontrado</h1>
              <p style={{ color: '#94a3b8' }}>El artículo que buscas no existe o ha sido eliminado.</p>
            </div>
          ) : (
            <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div style={{ fontSize: '14px', color: '#6366f1', fontWeight: 600, marginBottom: 16, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {new Date(post.publishedAt || post.createdAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              
              <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif', marginBottom: 40, lineHeight: 1.2, color: '#ffffff' }}>
                {post.title}
              </h1>

              {post.heroImage && (
                <div style={{ 
                  width: '100%', 
                  height: 400, 
                  borderRadius: 24, 
                  background: `url(http://localhost:4000${post.heroImage.url}) center/cover`,
                  marginBottom: 60,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255,255,255,0.05)'
                }} />
              )}

              <div className="blog-content" style={{ paddingBottom: 60 }}>
                {post.content?.root?.children && renderLexicalNodes(post.content.root.children)}
              </div>
            </motion.article>
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
