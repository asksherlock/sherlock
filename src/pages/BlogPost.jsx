import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StarfieldBackground from '../components/StarfieldBackground';
import LexicalRenderer from '../components/LexicalRenderer';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${import.meta.env.VITE_CMS_URL}/posts?where[slug][equals]=${slug}&depth=1`)
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
    <div className="bg-black text-slate-50 min-h-screen font-sans relative overflow-hidden">
      <StarfieldBackground />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-1 max-w-3xl w-full mx-auto px-6 pt-36 pb-24">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-indigo-400 font-semibold mb-12 hover:text-indigo-300 transition-colors"
          >
            <span>&larr;</span> Volver al Blog
          </Link>

          {loading ? (
            <div className="flex justify-center items-center py-32">
              <div className="w-12 h-12 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
            </div>
          ) : !post ? (
            <div className="text-center py-32">
              <h1 className="text-4xl text-white mb-4 font-bold">Artículo no encontrado</h1>
              <p className="text-slate-400">El artículo que buscas no existe o ha sido eliminado.</p>
            </div>
          ) : (
            <motion.article 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }}
            >
              <div className="text-sm text-indigo-400 font-semibold mb-6 tracking-widest uppercase">
                {new Date(post.publishedAt || post.createdAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-12 leading-tight text-white tracking-tight">
                {post.title}
              </h1>

              {post.featuredImage && (
                <div className="w-full aspect-[16/9] md:h-[400px] rounded-3xl overflow-hidden mb-16 shadow-2xl border border-white/5 relative group">
                  <img 
                    src={post.featuredImage.url.startsWith('http') ? post.featuredImage.url : `${import.meta.env.VITE_CMS_URL.replace('/api', '')}${post.featuredImage.url}`} 
                    alt={post.featuredImage.alt || post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                </div>
              )}

              <div className="mt-8">
                <LexicalRenderer content={post.content} />
              </div>
            </motion.article>
          )}
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
