import { motion } from 'framer-motion';
import { IconDNA, IconFlow, IconPulse, IconBrain, IconTarget, IconAPI, AnimatedIconWrapper } from './AnimatedIcons';

// --- Clean UI Mockup Components (Antigravity Style) ---

function UserProfileMockup() {
  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
          👤
        </div>
        <div>
          <div style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff' }}>Usuario #A-4821</div>
          <div style={{ fontSize: '14px', color: '#a1a1aa' }}>Ejecutivo 40-50 años</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {[
          { label: 'Frustración', value: '78% — Alta', color: '#ec4899', bar: 78 },
          { label: 'Tech-savvy', value: '45% — Media', color: '#22d3ee', bar: 45 },
          { label: 'Paciencia UX', value: '31% — Baja', color: '#f59e0b', bar: 31 },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: '13px', color: '#a1a1aa', width: 90, flexShrink: 0 }}>{item.label}</span>
            <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
              <motion.div initial={{ width: 0 }} whileInView={{ width: `${item.bar}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1 }} style={{ height: '100%', background: item.color, borderRadius: 2 }} />
            </div>
            <span style={{ fontSize: '13px', color: '#ffffff', fontWeight: 500, width: 80, textAlign: 'right' }}>{item.value}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 32 }}>
        <div style={{ fontSize: '11px', color: '#a1a1aa', letterSpacing: '0.05em', marginBottom: 12, fontWeight: 600 }}>COMPORTAMIENTOS</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['Abandona en paso 3', 'Ignora tooltips', 'Busca atajos'].map(tag => (
            <span key={tag} style={{ fontSize: '13px', padding: '6px 12px', borderRadius: 100, background: 'rgba(255,255,255,0.03)', color: '#d4d4d8', border: '1px solid rgba(255,255,255,0.05)' }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function FlowSimulatorMockup() {
  const steps = [
    { label: 'Landing Page', users: 1000 },
    { label: 'Registro', users: 780 },
    { label: 'Verificación Email', users: 490 },
    { label: 'Completar perfil', users: 212 },
  ];
  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <span style={{ fontSize: '12px', color: '#a1a1aa', fontWeight: 600, letterSpacing: '0.05em' }}>SIMULACIÓN EN TIEMPO REAL</span>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
          <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 500 }}>1k activos</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {steps.map((step, i) => {
          const pct = Math.round((step.users / 1000) * 100);
          const color = i === steps.length - 1 ? '#ef4444' : '#22d3ee';
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ fontSize: '14px', color: '#ffffff', width: 140 }}>{step.label}</div>
              <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 3 }}>
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${pct}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.15 }} style={{ height: '100%', background: color, borderRadius: 3 }} />
              </div>
              <div style={{ fontSize: '14px', color: color, fontWeight: 600, width: 40, textAlign: 'right' }}>{step.users}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function InsightsMockup() {
  return (
    <div style={{ padding: '24px' }}>
      <div style={{ fontSize: '12px', color: '#a1a1aa', fontWeight: 600, letterSpacing: '0.05em', marginBottom: 24 }}>INSIGHTS AUTOMÁTICOS</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {[
          { title: 'Reducir campos de registro de 8 a 3', impact: '+34% conversión', color: '#10b981' },
          { title: 'Añadir indicador de progreso', impact: '+21% retención', color: '#10b981' },
        ].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}>
            <div style={{ fontSize: '18px', color: '#ffffff', fontWeight: 500, marginBottom: 8 }}>{item.title}</div>
            <div style={{ fontSize: '14px', color: item.color, fontWeight: 600 }}>Impacto: {item.impact}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SegmentMockup() {
  return (
    <div style={{ padding: '24px' }}>
      <div style={{ fontSize: '12px', color: '#a1a1aa', fontWeight: 600, letterSpacing: '0.05em', marginBottom: 24 }}>FRICCIONES POR SEGMENTO</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {[
          { name: 'Gen Z Speed', pct: 81, color: '#10b981' },
          { name: 'Millennials Mobile', pct: 52, color: '#6366f1' },
          { name: 'Ejecutivos B2B', pct: 34, color: '#ec4899' },
        ].map((seg, i) => (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: '15px', color: '#ffffff' }}>{seg.name}</span>
              <span style={{ fontSize: '15px', color: seg.color, fontWeight: 600 }}>{seg.pct}% éxito</span>
            </div>
            <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
              <motion.div initial={{ width: 0 }} whileInView={{ width: `${seg.pct}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1 }} style={{ height: '100%', background: seg.color, borderRadius: 2 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Main Features Component ----

const FEATURES = [
  {
    badge: 'Personas Sintéticas',
    title: 'Usuarios con alma, no solo datos',
    desc: 'Genera perfiles hiperrealistas con demografía, emociones, tolerancia a la frustración y patrones de comportamiento específicos para tu industria.',
    tags: ['Demografía exacta', '40+ variables'],
    color: '#6366f1',
    Visual: UserProfileMockup,
    flip: false,
  },
  {
    badge: 'Simulación',
    title: 'Miles de journeys en paralelo',
    desc: 'Ejecuta simulaciones de onboarding o compra con miles de perfiles simultáneos. Cada usuario sintético toma decisiones como un humano real.',
    tags: ['End-to-end', 'No-lineal'],
    color: '#22d3ee',
    Visual: FlowSimulatorMockup,
    flip: true,
  },
  {
    badge: 'Fricciones',
    title: 'Sabe dónde fallan antes de que fallen',
    desc: 'Identifica con precisión los puntos de abandono y confusión. Cada fricción tiene causa raíz documentada e impacto en conversión.',
    tags: ['Causa raíz', 'Impacto ROI'],
    color: '#ec4899',
    Visual: InsightsMockup,
    flip: false,
  },
  {
    badge: 'Segmentación',
    title: 'Cada segmento ve tu producto diferente',
    desc: 'Simula cómo distintos perfiles experimentan tu producto. Descubre quién falla más y exactamente por qué.',
    tags: ['Cohorts automáticos'],
    color: '#f59e0b',
    Visual: SegmentMockup,
    flip: true,
  },
];

export default function Features() {
  return (
    <section id="platform" style={{ padding: '100px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Floating background particles */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 90 }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 100, background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', marginBottom: 20 }}>
            <span style={{ fontSize: '11px', color: '#818cf8', fontWeight: 600, letterSpacing: '0.08em' }}>CAPACIDADES DE LA PLATAFORMA</span>
          </div>
          <h2 style={{ fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 800, lineHeight: 1.15, fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em', marginBottom: 16, background: 'linear-gradient(135deg, #f8fafc, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Todo lo que necesitas para entender<br />a tus usuarios de verdad
          </h2>
        </motion.div>

        {/* Split-layout feature rows */}
        {FEATURES.map((feat, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="feature-row"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 64,
              alignItems: 'center',
              padding: '72px 0',
              borderBottom: i < FEATURES.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
              direction: feat.flip ? 'rtl' : 'ltr',
            }}
          >
            {/* Text side */}
            <div style={{ direction: 'ltr' }}>
              <h3 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 16, color: '#f1f5f9' }}>
                <span style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: feat.color, letterSpacing: '0.1em', marginBottom: 12, textTransform: 'uppercase' }}>
                  {feat.badge}
                </span>
                {feat.title}
              </h3>

              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.8, marginBottom: 28 }}>
                {feat.desc}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {feat.tags.map(tag => (
                  <span key={tag} style={{ fontSize: '12px', padding: '6px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8', fontWeight: 500 }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Visual mockup side */}
            <motion.div style={{ direction: 'ltr' }}
              whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 200 }}
            >
              <div style={{
                position: 'relative',
                padding: '2px',
                borderRadius: 18,
                background: `linear-gradient(135deg, ${feat.color}40, transparent 60%)`,
              }}>
                <div style={{ borderRadius: 16, overflow: 'hidden' }}>
                  <feat.Visual />
                </div>
                {/* Glow */}
                <div style={{
                  position: 'absolute', inset: -20, borderRadius: 30,
                  background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${feat.color}12, transparent)`,
                  zIndex: -1, pointerEvents: 'none',
                }} />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media(max-width:768px){
          .feature-row{grid-template-columns:1fr!important;direction:ltr!important;gap:32px!important}
        }
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.6;transform:scale(1.3)}}
      `}</style>
    </section>
  );
}
