import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from '@google/genai';

export default function FloatingRobot() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { text: '¡Hola! Soy Sherlock. ¿Qué dudas tienes sobre los usuarios sintéticos?', isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Physics state for random movement
  const [pos, setPos] = useState({ x: typeof window !== 'undefined' ? window.innerWidth * 0.8 : 800, y: 200 });
  const posRef = useRef({ x: typeof window !== 'undefined' ? window.innerWidth * 0.8 : 800, y: 200 });
  const velRef = useRef({ x: -1, y: 0.5 });
  const animRef = useRef(null);

  // Random floating movement
  useEffect(() => {
    if (showChat) return; // Stop moving while chatting
    
    let lastTime = performance.now();
    
    const update = (time) => {
      const dt = (time - lastTime) / 16; // normalize to 60fps
      lastTime = time;

      // Randomly steer velocity
      velRef.current.x += (Math.random() - 0.5) * 0.1 * dt;
      velRef.current.y += (Math.random() - 0.5) * 0.1 * dt;

      // Cap speed
      const speed = Math.sqrt(velRef.current.x ** 2 + velRef.current.y ** 2);
      if (speed > 2) {
        velRef.current.x = (velRef.current.x / speed) * 2;
        velRef.current.y = (velRef.current.y / speed) * 2;
      }

      // Update position
      posRef.current.x += velRef.current.x * dt;
      posRef.current.y += velRef.current.y * dt;

      // Wrap around screen X
      if (posRef.current.x > window.innerWidth + 50) posRef.current.x = -50;
      if (posRef.current.x < -50) posRef.current.x = window.innerWidth + 50;

      // Wrap around screen Y (or bounce)
      // Let's make it wrap around Y too so it feels like infinite space
      if (posRef.current.y > window.innerHeight + 50) posRef.current.y = -50;
      if (posRef.current.y < -50) posRef.current.y = window.innerHeight + 50;

      setPos({ x: posRef.current.x, y: posRef.current.y });
      animRef.current = requestAnimationFrame(update);
    };

    animRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animRef.current);
  }, [showChat]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;
    
    const userText = inputValue;
    setMessages(prev => [...prev, { text: userText, isBot: false }]);
    setInputValue('');
    setIsTyping(true);
    
    if (!import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY === 'Pega_aqui_tu_clave_de_API') {
      setMessages(prev => [...prev, { 
        text: '¡Atención! No has configurado tu VITE_GEMINI_API_KEY en el archivo .env. Por favor, añádela y reinicia el servidor para poder platicar contigo.',
        isBot: true 
      }]);
      setIsTyping(false);
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      const systemPrompt = "Eres Sherlock, el asistente virtual inteligente de Ask-Sherlock. Tu objetivo es ayudar a los usuarios a entender cómo nuestra plataforma genera 'Usuarios Sintéticos' interactivos usando IA para simular perfiles reales, permitiendo descubrir fricciones en productos en minutos en lugar de semanas. Eres profesional, astuto y amable. REGLA ESTRICTA: Tus respuestas deben ser EXTREMADAMENTE CONCISAS. Usa siempre saltos de línea, párrafos muy cortos y viñetas (bullet points) para estructurar la información y hacerla fácil de leer.";
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          ...messages.filter(m => m.text).map(m => ({
            role: m.isBot ? 'model' : 'user',
            parts: [{ text: m.text }]
          })),
          { role: 'user', parts: [{ text: userText }] }
        ],
        config: {
          systemInstruction: systemPrompt,
        }
      });

      setMessages(prev => [...prev, { 
        text: response.text,
        isBot: true 
      }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages(prev => [...prev, { 
        text: 'Ups, mis circuitos neuronales tuvieron un fallo al intentar conectarme. Revisa la consola para más detalles.',
        isBot: true 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <motion.div
        style={{
          position: 'fixed',
          left: 0, top: 0,
          x: pos.x,
          y: pos.y,
          zIndex: 50, // Above text wrapper (which is 10) so it is clickable
          cursor: 'pointer',
        }}
        initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', rotate: velRef.current.x > 0 ? 5 : -5 }}
        transition={{ 
          opacity: { duration: 2.0, delay: 4.0, ease: 'easeInOut' },
          scale: { duration: 2.0, delay: 4.0, ease: 'easeInOut' },
          filter: { duration: 2.0, delay: 4.0, ease: 'easeInOut' },
          rotate: { type: 'tween', duration: 0.5 }
        }}
        onClick={() => setShowChat(!showChat)}
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 15px rgba(99,102,241,0.6))', opacity: 0.4 }}>
            <path d="M12 2a2 2 0 0 1 2 2c0 1.1-.9 2-2 2s-2-.9-2-2a2 2 0 0 1 2-2z" fill="#a5b4fc" />
            <path d="M12 6v2" />
            <rect x="5" y="8" width="14" height="10" rx="3" fill="rgba(99,102,241,0.1)" />
            <path d="M8 12h2" stroke="#a5b4fc" strokeWidth="2" />
            <path d="M14 12h2" stroke="#a5b4fc" strokeWidth="2" />
            <path d="M8 18v2" strokeWidth="3" stroke="#8b5cf6" />
            <path d="M16 18v2" strokeWidth="3" stroke="#8b5cf6" />
            <path d="M5 11l-3 2v2" />
            <path d="M19 11l3 2v2" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Chat UI Modal */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            style={{
              position: 'fixed',
              bottom: 40,
              right: 40,
              width: 320,
              height: 400,
              background: 'rgba(10,10,20,0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(99,102,241,0.3)',
              borderRadius: 20,
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              overflow: 'hidden'
            }}
          >
            <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(99,102,241,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: '20px' }}>🤖</span>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#f8fafc' }}>Sherlock Assistant</span>
              </div>
              <button onClick={() => setShowChat(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '18px' }}>✕</button>
            </div>
            
            <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {messages.map((m, i) => (
                <div key={i} style={{ alignSelf: m.isBot ? 'flex-start' : 'flex-end', maxWidth: '85%' }}>
                  <div style={{
                    background: m.isBot ? 'rgba(255,255,255,0.05)' : 'rgba(99,102,241,0.2)',
                    border: `1px solid ${m.isBot ? 'rgba(255,255,255,0.1)' : 'rgba(99,102,241,0.4)'}`,
                    padding: '10px 14px',
                    borderRadius: m.isBot ? '14px 14px 14px 4px' : '14px 14px 4px 14px',
                    color: '#f8fafc',
                    fontSize: '13px',
                    lineHeight: 1.5,
                    whiteSpace: 'pre-wrap'
                  }}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.05)', padding: '10px 14px', borderRadius: '14px 14px 14px 4px', color: '#a1a1aa', fontSize: '13px' }}>
                  Escribiendo...
                </div>
              )}
            </div>

            <form onSubmit={handleSend} style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: 8 }}>
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="Escribe tu pregunta..."
                style={{ flex: 1, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 14px', color: '#fff', fontSize: '13px', outline: 'none' }}
              />
              <button type="submit" style={{ background: '#6366f1', border: 'none', borderRadius: 10, padding: '0 16px', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>
                ↑
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
