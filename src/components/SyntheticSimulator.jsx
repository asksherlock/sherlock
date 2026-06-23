import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ShuffleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
    <polyline points="16 3 21 3 21 8"></polyline>
    <line x1="4" y1="20" x2="21" y2="3"></line>
    <polyline points="21 16 21 21 16 21"></polyline>
    <line x1="15" y1="15" x2="21" y2="21"></line>
    <line x1="4" y1="4" x2="9" y2="9"></line>
  </svg>
);

const BASE_PROFILES = [
  { name: 'Ejecutivo Financiero', age: 45, persona: 'Ejecutivo evaluando software de gestión de pagos B2B', color: '#6366f1',
    script: [
      { role: 'user', text: 'Para empezar, ¿podrías contarme a qué te dedicas actualmente y cómo es un día normal en tu vida profesional?' },
      { role: 'model', text: 'Claro, soy Director Financiero en una empresa de logística. Mi día consiste en revisar flujos de caja, autorizar pagos y analizar métricas. Es bastante exigente.' },
      { role: 'user', text: 'Entiendo. ¿Cuáles son los mayores retos que enfrentas al gestionar esos pagos y flujos de caja diariamente?' },
      { role: 'model', text: 'La falta de visibilidad en tiempo real. A veces tardamos días en conciliar transferencias internacionales, lo que retrasa todas nuestras operaciones.' }
    ]
  },
  { name: 'Millennial Compradora', age: 28, persona: 'Usuaria frecuente de e-commerce y apps de estilo de vida', color: '#ec4899',
    script: [
      { role: 'user', text: 'Hola, me gustaría saber un poco sobre ti. ¿Cómo describirías tu relación con las compras por internet?' },
      { role: 'model', text: 'Hola. Pues compro casi todo en línea, desde ropa hasta la despensa. Uso mucho el celular porque siempre estoy en movimiento entre el trabajo y mis clases.' },
      { role: 'user', text: 'Perfecto. ¿Qué factores son decisivos para ti al elegir una app nueva para hacer tus compras?' },
      { role: 'model', text: 'Que sea rápida, que tenga un buscador eficiente y, sobre todo, que el costo de envío sea transparente desde el primer click.' }
    ]
  },
  { name: 'Director de TI', age: 52, persona: 'Líder tecnológico buscando integrar múltiples sistemas', color: '#22d3ee',
    script: [
      { role: 'user', text: 'Para iniciar, ¿qué herramientas tecnológicas utilizas actualmente para monitorear la infraestructura de tu empresa?' },
      { role: 'model', text: 'Usamos una combinación de plataformas legacy y cloud, pero ninguna está integrada. Es un dolor de cabeza consolidar todos los reportes.' },
      { role: 'user', text: '¿Qué impacto tiene esa falta de integración en el trabajo diario de tu equipo técnico?' },
      { role: 'model', text: 'Perdemos unas 10 horas semanales solo cruzando datos manualmente, tiempo que deberíamos usar para prevenir caídas del sistema.' }
    ]
  },
  { name: 'Estudiante', age: 21, persona: 'Buscando opciones para administrar sus primeros ingresos', color: '#10b981',
    script: [
      { role: 'user', text: 'Mirando hacia el futuro, ¿tienes alguna meta importante en mente para los próximos meses?' },
      { role: 'model', text: 'Sí, quiero irme de intercambio a Canadá el próximo año. Ahorita estoy intentando organizar mis gastos para poder ahorrar, pero me cuesta.' },
      { role: 'user', text: 'Además de intentar ahorrar, ¿qué herramientas financieras has considerado para manejar tus gastos?' },
      { role: 'model', text: 'Solo uso la tarjeta de débito de la universidad. Pensé en bajar una app de finanzas, pero me da flojera registrar cada gasto a mano.' }
    ]
  },
  { name: 'Abuelo Tech', age: 68, persona: 'Adaptándose a la banca móvil por necesidad', color: '#f59e0b',
    script: [
      { role: 'user', text: 'Cuénteme un poco sobre cómo suele realizar sus pagos de servicios, como la luz o el agua, mes a mes.' },
      { role: 'model', text: 'Normalmente iba al banco o al Oxxo. Pero mis nietos me instalaron una aplicación en el celular para no tener que salir tanto.' },
      { role: 'user', text: '¿Y cómo ha sido su experiencia utilizando esa aplicación hasta ahora?' },
      { role: 'model', text: 'Al principio me dio miedo mandar el dinero a otro lado por error. Las letras son muy chicas, pero ahí voy aprendiendo.' }
    ]
  },
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

  const generateNewProfile = () => {
    setProfile(currentProfile => {
      let newProf = randomFrom(BASE_PROFILES);
      if (newProf.name === currentProfile.name) {
        newProf = BASE_PROFILES.find(p => p.name !== currentProfile.name) || newProf;
      }
      setMessages([]);
      setActiveScript([]);
      setIsGenerating(true);

      setTimeout(() => {
        setActiveScript(newProf.script);
        setIsGenerating(false);
      }, 1500); // Simulate network latency
      
      return newProf;
    });
  };

  useEffect(() => {
    let timeoutId;
    let step = 0;
    let isCancelled = false;

    if (activeScript.length === 0 || isGenerating) return;

    const playNext = () => {
      if (isCancelled) return;
      
      if (step >= activeScript.length) {
        setIsTyping(false);
        // Bucle infinito: cuando termina el chat, espera 4 segundos y carga otro
        timeoutId = setTimeout(() => {
          if (!isCancelled) {
            generateNewProfile();
          }
        }, 4000);
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
          
          timeoutId = setTimeout(playNext, 800); 
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
  }, [activeScript]); // Eliminar isGenerating de la dependencia para evitar dobles bucles

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
        <div style={{ width: 14 }}></div> {/* Espacio invisible para centrar el texto correctamente */}
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
            Generando conexión con usuario sintético...
          </div>
        )}
        <AnimatePresence>
          {messages.map((msg) => {
            const isBot = msg.role === 'model';
            return (
              <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  alignItems: isBot ? 'flex-start' : 'flex-end',
                  alignSelf: isBot ? 'flex-start' : 'flex-end',
                  maxWidth: '85%'
                }}
              >
                {/* Name Label */}
                <div style={{ fontSize: '11px', color: '#818cf8', marginBottom: 6, fontWeight: 600, paddingLeft: isBot ? 44 : 0, paddingRight: isBot ? 0 : 44 }}>
                  {isBot ? `${profile.name} (Usuario Sintético)` : 'Tú (Investigador UX)'}
                </div>

                <div style={{ 
                  display: 'flex', 
                  flexDirection: isBot ? 'row' : 'row-reverse',
                  gap: 12,
                  alignItems: 'flex-end',
                }}>
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
