import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from '@google/genai';

const BASE_PROFILES = [
  { name: 'Ejecutivo Financiero', age: 45, persona: 'Ejecutivo frustrado con la pasarela de pagos', color: '#6366f1' },
  { name: 'Millennial Compradora', age: 28, persona: 'Usuaria explorando app móvil por primera vez', color: '#ec4899' },
  { name: 'Director de TI', age: 52, persona: 'Evaluando dashboard de métricas empresarial', color: '#22d3ee' },
  { name: 'Estudiante', age: 21, persona: 'Buscando información rápida sin registrarse', color: '#10b981' },
  { name: 'Abuelo Tech', age: 68, persona: 'Intentando pagar servicio básico en línea', color: '#f59e0b' },
];

function RobotAvatar({ size = 24, color = '#6366f1' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(0px 0px 4px ${color}80)` }}>
      {/* Body */}
      <rect x="25" y="35" width="50" height="40" rx="10" stroke={color} strokeWidth="8" fill="rgba(10,10,20,0.9)" />
      {/* Eyes */}
      <rect x="35" y="48" width="10" height="6" rx="3" fill={color} />
      <rect x="55" y="48" width="10" height="6" rx="3" fill={color} />
      {/* Antenna */}
      <line x1="50" y1="35" x2="50" y2="25" stroke={color} strokeWidth="6" strokeLinecap="round" />
      <circle cx="50" cy="18" r="7" stroke={color} strokeWidth="5" fill="none" />
      <circle cx="50" cy="18" r="3" fill={color} />
      {/* Arms */}
      <path d="M22 48 L12 52 L12 65" stroke={color} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M78 48 L88 52 L88 65" stroke={color} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Legs */}
      <rect x="32" y="75" width="10" height="16" rx="5" fill={color} />
      <rect x="58" y="75" width="10" height="16" rx="5" fill={color} />
    </svg>
  );
}

function UserAvatar({ size = 24, color = '#6366f1' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: `drop-shadow(0px 0px 4px ${color}80)` }}>
      {/* Head */}
      <circle cx="50" cy="35" r="18" fill="rgba(10,10,20,0.9)" stroke={color} strokeWidth="6" />
      {/* Body/Shoulders */}
      <path d="M20 85 C20 65 35 55 50 55 C65 55 80 65 80 85" fill="rgba(10,10,20,0.9)" stroke={color} strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function SyntheticSimulator() {
  const [profile, setProfile] = useState(BASE_PROFILES[0]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // Initialize random profile
  useEffect(() => {
    generateNewProfile();
  }, []);

  const generateNewProfile = () => {
    const newProf = randomFrom(BASE_PROFILES);
    setProfile(newProf);
    setMessages([
      { 
        id: Date.now().toString(), 
        role: 'model', 
        text: `¡Hola! Soy un ${newProf.name} de ${newProf.age} años. Actualmente estoy: "${newProf.persona}". ¿En qué te puedo ayudar o qué quieres probar conmigo?` 
      }
    ]);
    setInput('');
    setIsTyping(false);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    
    // Añadir mensaje del usuario
    const newUserMsg = { id: Date.now().toString(), role: 'user', text: userMsg };
    setMessages(prev => [...prev, newUserMsg]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      const systemPrompt = `Eres un usuario de internet con el siguiente perfil: ${profile.name}, ${profile.age} años. Tu situación actual es: "${profile.persona}". Estás siendo entrevistado por un investigador de UX o respondiendo sobre tu experiencia con una página web/aplicación. Responde a sus preguntas de forma natural, realista, en primera persona, manteniendo ESTRICTAMENTE la personalidad, nivel técnico, tono y frustraciones de tu perfil. REGLA ESTRICTA: Se extremadamente conciso (1 párrafo corto). Nunca rompas el personaje.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          ...messages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
          })),
          { role: 'user', parts: [{ text: userMsg }] }
        ],
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        }
      });

      const botText = response.text || 'Error al generar respuesta.';
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: botText
      }]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: '❌ Error de conexión con el motor sintético. Asegúrate de tener tu API Key configurada.'
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={{
      background: 'rgba(4,4,10,0.85)', backdropFilter: 'blur(24px)', border: '1px solid rgba(99,102,241,0.2)',
      borderRadius: '20px', overflow: 'hidden', boxShadow: '0 0 60px rgba(99,102,241,0.12), 0 0 120px rgba(139,92,246,0.06)',
      width: '100%', maxWidth: '540px', display: 'flex', flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{ background: 'rgba(99,102,241,0.08)', borderBottom: '1px solid rgba(99,102,241,0.15)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['#ef4444','#f59e0b','#10b981'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <span style={{ fontSize: '12px', color: '#6366f1', fontWeight: 600, letterSpacing: '0.05em' }}>SHERLOCK AI — SYNTHETIC ENGINE</span>
        </div>
        <button 
          onClick={generateNewProfile}
          style={{ background: 'none', border: '1px solid rgba(99,102,241,0.4)', borderRadius: 6, color: '#a5b4fc', fontSize: '11px', cursor: 'pointer', padding: '4px 8px' }}
        >
          🔄 Random
        </button>
      </div>

      {/* Profile header */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: `linear-gradient(135deg, ${profile.color}30, rgba(0,0,0,0.5))`, border: `2px solid ${profile.color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <RobotAvatar size={24} color={profile.color} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#f8fafc' }}>Usuario Sintético: {profile.name}, {profile.age} años</div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: 2 }}>{profile.persona}</div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div ref={scrollRef} style={{ height: 350, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <AnimatePresence>
          {messages.map((msg) => {
            const isBot = msg.role === 'model';
            return (
              <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                style={{ 
                  display: 'flex', 
                  flexDirection: isBot ? 'row' : 'row-reverse', // Right align for user, Left align for bot
                  gap: 12,
                  alignItems: 'flex-end',
                  alignSelf: isBot ? 'flex-start' : 'flex-end',
                  maxWidth: '85%'
                }}
              >
                {/* Avatar */}
                <div style={{ 
                  width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px',
                  background: isBot ? `linear-gradient(135deg, ${profile.color}30, rgba(0,0,0,0.5))` : 'linear-gradient(135deg, rgba(99,102,241,0.5), rgba(139,92,246,0.5))',
                  border: `1px solid ${isBot ? profile.color + '50' : 'rgba(99,102,241,0.8)'}`
                }}>
                  {isBot ? <RobotAvatar size={18} color={profile.color} /> : <UserAvatar size={18} color="#c7d2fe" />}
                </div>

                {/* Chat Bubble */}
                <div style={{
                  background: isBot ? 'rgba(255,255,255,0.05)' : 'rgba(99,102,241,0.2)',
                  border: `1px solid ${isBot ? 'rgba(255,255,255,0.1)' : 'rgba(99,102,241,0.4)'}`,
                  padding: '12px 16px',
                  borderRadius: isBot ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
                  color: '#f8fafc',
                  fontSize: '13.5px',
                  lineHeight: 1.5,
                  whiteSpace: 'pre-wrap'
                }}>
                  {msg.text}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: 12, alignItems: 'flex-end', alignSelf: 'flex-start' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg, ${profile.color}30, rgba(0,0,0,0.5))`, border: `1px solid ${profile.color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <RobotAvatar size={18} color={profile.color} />
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '16px 16px 16px 4px', display: 'flex', gap: 4, alignItems: 'center' }}>
              {[0,1,2].map(i => <motion.div key={i} animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }} style={{ width: 5, height: 5, borderRadius: '50%', background: profile.color }} />)}
            </div>
          </motion.div>
        )}
      </div>

      {/* Chat Input Footer */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
        <form onSubmit={handleSend} style={{ display: 'flex', gap: 12 }}>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Habla con ${profile.name}...`}
            disabled={isTyping}
            style={{ 
              flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', 
              borderRadius: 100, padding: '10px 16px', color: '#fff', fontSize: '13px', outline: 'none'
            }}
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isTyping}
            style={{ 
              background: input.trim() && !isTyping ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(255,255,255,0.1)', 
              border: 'none', borderRadius: 100, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: input.trim() && !isTyping ? 'pointer' : 'not-allowed', color: '#fff', transition: 'all 0.2s'
            }}
          >
            ➤
          </button>
        </form>
      </div>
    </div>
  );
}
