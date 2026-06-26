import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "100px 0px" });

  useEffect(() => {
    if (isInView) {
      fetch(`${import.meta.env.VITE_CMS_URL}/testimonials?depth=1`)
        .then(res => res.json())
        .then(data => {
          setTestimonials(data.docs || []);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching testimonials:', err);
          setLoading(false);
        });
    }
  }, [isInView]);

  return (
    <section id="testimonials" ref={ref} style={{
      padding: '80px 24px',
      position: 'relative',
      overflow: 'hidden',
      background: 'transparent',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', marginBottom: 40, textAlign: 'center' }}>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: '14px',
            fontWeight: 800,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#38bdf8',
            textShadow: '0 0 12px rgba(56, 189, 248, 0.4)',
            margin: 0,
            marginBottom: 32,
          }}
        >
          TESTIMONIOS
        </motion.h2>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
          <div className="animate-spin" style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid rgba(56,189,248,0.2)', borderTopColor: '#38bdf8' }} />
        </div>
      ) : testimonials.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#64748b', padding: '60px 0' }}>
          Aún no hay testimonios registrados.
        </div>
      ) : (
        <div style={{
          position: 'relative',
          maxWidth: 1400,
          margin: '0 auto',
        }}>
          {/* Gradients to hide the edges for smooth scroll cut-off */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 60, background: 'linear-gradient(90deg, #000 0%, transparent 100%)', zIndex: 5, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 60, background: 'linear-gradient(-90deg, #000 0%, transparent 100%)', zIndex: 5, pointerEvents: 'none' }} />

          {/* Horizontal scroll container */}
          <div 
            className="hide-scrollbar"
            style={{
              display: 'flex',
              gap: 24,
              overflowX: 'auto',
              padding: '20px 60px',
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  scrollSnapAlign: 'center',
                  minWidth: 350,
                  maxWidth: 450,
                  flex: '0 0 auto',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: 24,
                  padding: 32,
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div style={{ position: 'absolute', top: 20, right: 30, fontSize: 60, color: 'rgba(56,189,248,0.1)', fontFamily: 'serif', lineHeight: 1 }}>
                  "
                </div>
                
                <p style={{ color: '#e2e8f0', fontSize: '16px', lineHeight: 1.6, fontStyle: 'italic', marginBottom: 24, flex: 1, zIndex: 1 }}>
                  "{testimonial.quote}"
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: 16, borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 20 }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#1e293b', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
                    {testimonial.avatar ? (
                      <img src={`http://localhost:4000${testimonial.avatar.url}`} alt={testimonial.author} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: 20 }}>
                        👤
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, color: '#f8fafc', fontSize: '16px', fontWeight: 600 }}>{testimonial.author}</h4>
                    {testimonial.role && <span style={{ color: '#94a3b8', fontSize: '14px' }}>{testimonial.role}</span>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <style>{`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
        </div>
      )}
    </section>
  );
}
