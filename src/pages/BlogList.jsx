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
    window.scrollTo(0, 0);
    fetch(`${import.meta.env.VITE_CMS_URL}/posts?depth=1`)
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
    <div className="bg-black text-slate-50 min-h-screen font-sans relative overflow-hidden">
      <StarfieldBackground />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-1 max-w-7xl w-full mx-auto px-6 pt-36 pb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16 text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-slate-50 to-slate-400">
              Blog & Insights
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto md:mx-0 leading-relaxed font-light">
              Descubre las últimas tendencias en investigación de usuarios, IA sintética y optimización de productos.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-32">
              <div className="w-12 h-12 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-32 text-slate-500 text-lg font-medium">
              No hay artículos publicados todavía.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <motion.div 
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <Link to={`/blog/${post.slug}`} className="block h-full group">
                    <article className="h-full flex flex-col rounded-3xl overflow-hidden bg-white/[0.02] border border-white/[0.05] backdrop-blur-md hover:border-purple-500/30 hover:bg-white/[0.04] hover:-translate-y-2 transition-all duration-300 shadow-2xl">
                      
                      <div className="relative h-56 w-full bg-slate-900/50 overflow-hidden">
                        {post.featuredImage ? (
                          <img 
                            src={post.featuredImage.url.startsWith('http') ? post.featuredImage.url : `${import.meta.env.VITE_CMS_URL.replace('/api', '')}${post.featuredImage.url}`} 
                            alt={post.featuredImage.alt || post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-indigo-500/20 to-purple-600/10 flex items-center justify-center">
                            <span className="text-5xl opacity-50 group-hover:scale-110 transition-transform duration-500">🕵️‍♂️</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      </div>

                      <div className="p-8 flex flex-col flex-1">
                        <time className="text-sm font-semibold text-purple-400 mb-4 tracking-wider uppercase">
                          {new Date(post.publishedAt || post.createdAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </time>
                        
                        <h2 className="text-2xl font-semibold text-white mb-4 leading-snug group-hover:text-purple-300 transition-colors">
                          {post.title}
                        </h2>
                        
                        <p className="text-slate-400 text-base leading-relaxed flex-1 font-light">
                          {post.excerpt || 'Haz clic para leer el artículo completo y explorar los detalles a fondo.'}
                        </p>
                        
                        <div className="mt-8 pt-6 border-t border-white/5 flex items-center text-sm font-medium text-indigo-400 group-hover:text-indigo-300 transition-colors">
                          Leer artículo <span className="ml-2 text-lg transform group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
