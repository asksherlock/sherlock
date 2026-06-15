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
  const [isTyping, setIsTyping] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeScript, setActiveScript] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    generateNewProfile();
  }, []);

  const generateNewProfile = async () => {
    if (isGenerating) return;
    
    let newProf = randomFrom(BASE_PROFILES);
    if (newProf.name === profile.name) {
      newProf = BASE_PROFILES.find(p => p.name !== profile.name) || newProf;
    }
    setProfile(newProf);
    setMessages([]);
    setActiveScript([]);
    setIsGenerating(true);

    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      const prompt = `Eres un simulador de entrevistas de UX. Genera la transcripción de una entrevista entre un "Investigador UX" (role: "user") y un "Usuario Sintético" (role: "model") con este perfil: Nombre: ${newProf.name}, Edad: ${newProf.age}, Situación: "${newProf.persona}".
La entrevista debe ser profunda y detallada, de exactamente 6 a 8 mensajes alternados (empezando por el investigador).
El investigador indaga sobre un problema. El usuario responde de manera muy realista, frustrada o constructiva según su perfil, en español de México.
Responde ÚNICAMENTE con un JSON Array válido. Ejemplo: [{"role": "user", "text": "Hola, ¿qué tal?"}, {"role": "model", "text": "Bien."}]`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          temperature: 0.8,
          responseMimeType: "application/json",
        }
      });

      const scriptData = JSON.parse(response.text);
      setActiveScript(scriptData);
    } catch (error) {
      console.error("Error generating script:", error);
      setActiveScript([
        { role: 'user', text: 'Hola, notamos un problema en tu sesión.' },
        { role: 'model', text: 'Sí, la plataforma está fallando. Necesito ayuda rápida.' }
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    let timeoutId;
    let step = 0;
    let isCancelled = false;

    if (activeScript.length === 0 || isGenerating) return;

    const playNext = () => {
      if (isCancelled || step >= activeScript.length) {
        setIsTyping(false);
        return;
      }
      
      const msg = activeScript[step];
      const isBot = msg.role === 'model';
      
      setIsTyping(true);
      const typingDelay = isBot ? Math.random() * 1500 + 1500 : Math.random() * 1000 + 800; 

      timeoutId = setTimeout(() => {
        if (!isCancelled) {
          setIsTyping(false);
          setMessages(prev => [...prev, { ...msg, id: Date.now().toString() + step }]);
          step++;
          
          if (step < activeScript.length) {
            timeoutId = setTimeout(playNext, 800); 
          }
        }
      }, typingDelay);
    };

    setMessages([]);
    setIsTyping(false);
    timeoutId = setTimeout(playNext, 1000);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [activeScript, isGenerating]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div style={{
      background: 'rgba(4,4,10,0.85)', backdropFilter: 'blur(24px)', border: '1px solid rgba(99,102,241,0.2)',
      borderRadius: '20px', overflow: 'hidden', boxShadow: '0 0 60px rgba(99,102,241,0.12), 0 0 120px rgba(139,92,246,0.06)',
      width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column'
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
      <div ref={scrollRef} style={{ height: 400, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {isGenerating && (
          <div style={{ textAlign: 'center', color: '#a5b4fc', fontSize: '13px', fontStyle: 'italic', padding: '20px' }}>
            Gemini está generando una entrevista aleatoria en tiempo real...
          </div>
        )}
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
    </div>
  );
}
