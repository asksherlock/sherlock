import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, 
  Building2, 
  Database, 
  Target, 
  Scale, 
  Share2, 
  Cookie, 
  ShieldCheck, 
  Lock, 
  UserMinus, 
  RefreshCw, 
  Mail 
} from 'lucide-react';
import StarfieldBackground from './StarfieldBackground';

const PolicySection = ({ num, title, icon: Icon, children }) => (
  <motion.section 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5 }}
    style={{ marginBottom: '64px' }}
  >
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '16px', 
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)', 
      paddingBottom: '16px', 
      marginBottom: '24px' 
    }}>
      <div style={{ 
        color: '#22d3ee', 
        fontSize: '18px', 
        fontWeight: 800, 
        fontFamily: '"Space Grotesk", sans-serif',
        background: 'rgba(34, 211, 238, 0.1)',
        padding: '6px 12px',
        borderRadius: '8px'
      }}>
        {num}
      </div>
      <Icon size={22} color="#a78bfa" strokeWidth={1.5} />
      <h2 style={{ 
        fontFamily: '"Space Grotesk", sans-serif',
        fontSize: '22px', 
        fontWeight: 600, 
        color: '#f8fafc', 
        margin: 0, 
        letterSpacing: '-0.01em' 
      }}>
        {title}
      </h2>
    </div>
    <div style={{ 
      color: '#94a3b8', 
      lineHeight: '1.8', 
      fontSize: '16px',
      paddingLeft: '16px' // Indent slightly for visual hierarchy
    }}>
      {children}
    </div>
  </motion.section>
);

export default function PrivacyPolicy() {
  // Scroll to top when loaded
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: '#000000', color: '#f8fafc', minHeight: '100vh', fontFamily: '"Inter", sans-serif', position: 'relative' }}>
      {/* Fondo de estrellas */}
      <StarfieldBackground />
      
      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Navigation / Back Button */}
        <nav style={{ padding: '32px 48px' }}>
          <Link to="/" style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            color: '#94a3b8', 
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: 500,
            transition: 'color 0.2s ease',
            background: 'rgba(255,255,255,0.03)',
            padding: '10px 20px',
            borderRadius: '100px',
            border: '1px solid rgba(255,255,255,0.05)',
            backdropFilter: 'blur(8px)'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = '#f8fafc';
            e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = '#94a3b8';
            e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
          }}
          >
            <ChevronLeft size={18} />
            Volver al inicio
          </Link>
        </nav>

        {/* Content Container (Giant Frosted Glass Canvas) */}
        <div style={{ padding: '0 48px 120px 48px', maxWidth: '1400px', margin: '0 auto' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ 
              background: 'rgba(10, 10, 15, 0.65)', 
              backdropFilter: 'blur(24px)', 
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.05)', 
              borderRadius: '32px', 
              padding: '64px 8%',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)'
            }}
          >
            {/* Header */}
            <div style={{ marginBottom: '80px', textAlign: 'center' }}>
              <p style={{ 
                display: 'inline-block',
                background: 'rgba(34, 211, 238, 0.1)',
                color: '#22d3ee',
                padding: '8px 16px',
                borderRadius: '100px',
                fontSize: '13px', 
                marginBottom: '24px', 
                fontWeight: 700,
                letterSpacing: '0.1em'
              }}>
                ACTUALIZADO: 23 DE SEPTIEMBRE DE 2025
              </p>
              <h1 style={{ 
                fontFamily: '"Space Grotesk", sans-serif',
                fontSize: 'min(6vw, 64px)', 
                fontWeight: 800, 
                marginBottom: '24px', 
                letterSpacing: '-0.03em',
                background: 'linear-gradient(to right, #ffffff, #a78bfa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Aviso de Privacidad
              </h1>
              <p style={{ color: '#cbd5e1', fontSize: '18px', lineHeight: '1.7', fontWeight: 400, maxWidth: '800px', margin: '0 auto' }}>
                Este aviso aplica a los sitios, micrositios, formularios, chatbots y canales digitales de <strong>Ask-Sherlock</strong> (en lo sucesivo, "Ask-Sherlock", "nosotros" o "la Empresa").
              </p>
            </div>

            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <PolicySection num="01" title="Identidad y domicilio del responsable" icon={Building2}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                  <div>
                    <p style={{ marginBottom: '12px' }}><strong>Responsable:</strong> Ask-Sherlock, S.A.S. de C.V.</p>
                    <p style={{ marginBottom: '12px' }}><strong>RFC:</strong> IIC170616HI0</p>
                    <p><strong>Domicilio:</strong> Calle Santorini #9, Col. Ex-Hacienda Mayorazgo, Puebla, Puebla, C.P. 72480, México.</p>
                  </div>
                  <div>
                    <strong style={{ color: '#f8fafc' }}>Contacto de privacidad:</strong>
                    <ul style={{ paddingLeft: '24px', margin: '12px 0 0 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <li>Correo: <a href="mailto:contacto@ask-sherlock.com" style={{ color: '#38bdf8', textDecoration: 'none' }}>contacto@ask-sherlock.com</a></li>
                      <li>Teléfono/WhatsApp: <span style={{ color: '#f8fafc' }}>+52 55 3439 3708</span></li>
                    </ul>
                  </div>
                </div>
              </PolicySection>

              <PolicySection num="02" title="Datos personales que recabamos" icon={Database}>
                <p style={{ marginBottom: '20px' }}>Podemos obtener, directa o indirectamente, los siguientes datos personales:</p>
                <ul style={{ paddingLeft: '24px', margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '16px' }}>
                  <li><strong style={{ color: '#f8fafc' }}>Identificación y contacto:</strong> nombre, correo electrónico, teléfono, empresa, cargo, país/ciudad.</li>
                  <li><strong style={{ color: '#f8fafc' }}>Profesionales/comerciales:</strong> giro, tamaño de empresa, intereses, historial de interacción.</li>
                  <li><strong style={{ color: '#f8fafc' }}>De navegación/tecnología:</strong> IP, identificadores, cookies, páginas visitadas, tiempo, UTM.</li>
                  <li><strong style={{ color: '#f8fafc' }}>Transaccionales:</strong> información de facturación (procesada por tercero certificado).</li>
                  <li><strong style={{ color: '#f8fafc' }}>Audiovisuales/sonoros:</strong> grabaciones voluntarias en webinars o reuniones virtuales.</li>
                  <li><strong style={{ color: '#a78bfa' }}>Datos sensibles:</strong> No solicitamos datos sensibles. Si los proporcionas, procuraremos su supresión.</li>
                </ul>
              </PolicySection>

              <PolicySection num="03" title="Finalidades del tratamiento" icon={Target}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
                  <div>
                    <h3 style={{ fontSize: '16px', color: '#f8fafc', fontWeight: 600, margin: '0 0 16px 0' }}>Finalidades primarias (necesarias):</h3>
                    <ul style={{ paddingLeft: '24px', margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <li>Gestionar tu relación con Ask-Sherlock: registro, accesos, certificados y proyectos.</li>
                      <li>Atención comercial y soporte: cotizaciones, implementación y mejora de servicios.</li>
                      <li>Cumplimiento de obligaciones contractuales, fiscales, contables y regulatorias.</li>
                      <li>Seguridad y prevención de fraude.</li>
                    </ul>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', color: '#f8fafc', fontWeight: 600, margin: '0 0 16px 0' }}>Finalidades secundarias (opcionales):</h3>
                    <ul style={{ paddingLeft: '24px', margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                      <li>Marketing, remarketing y analítica: newsletters, encuestas y publicidad.</li>
                      <li>Elaboración de casos de éxito y testimonios (previa autorización).</li>
                    </ul>
                    <p style={{ margin: 0, padding: '16px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.2)', fontSize: '14px', color: '#e2e8f0' }}>
                      Para negar finalidades secundarias, envía un correo a <strong style={{ color: '#38bdf8' }}>contacto@ask-sherlock.com</strong>.
                    </p>
                  </div>
                </div>
              </PolicySection>

              <PolicySection num="04" title="Fundamento legal y consentimiento" icon={Scale}>
                <p style={{ margin: 0 }}>El tratamiento se realiza conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (México). El consentimiento se obtiene al proporcionar tus datos, participar en formularios, o continuar navegando. Cuando sea requerido, solicitaremos tu consentimiento expreso.</p>
              </PolicySection>

              <PolicySection num="05" title="Transferencias y encargados" icon={Share2}>
                <p style={{ marginBottom: '16px' }}>Podemos transferir o remitir datos a:</p>
                <ul style={{ paddingLeft: '24px', margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                  <li>Proveedores (plataformas de email, CRM, pagos, analítica) con acuerdos de confidencialidad.</li>
                  <li>Autoridades competentes, cuando lo exija la ley o requerimiento fundado.</li>
                  <li>Clientes o aliados sólo para ejecutar proyectos con tu previo consentimiento.</li>
                </ul>
                <p style={{ margin: 0, color: '#a78bfa', fontSize: '15px' }}>Verificamos que las transferencias internacionales mantengan estándares de protección.</p>
              </PolicySection>

              <PolicySection num="06" title="Cookies y tecnologías similares" icon={Cookie}>
                <p style={{ marginBottom: '16px' }}>Usamos cookies, web beacons y UTM para:</p>
                <ul style={{ paddingLeft: '24px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                  <li>Recordar preferencias y mejorar tu experiencia.</li>
                  <li>Medir desempeño de campañas, fuentes de tráfico y acciones de conversión.</li>
                  <li>Personalizar contenidos y publicidad.</li>
                </ul>
                <p style={{ margin: 0, color: '#f8fafc' }}>Al continuar navegando después del aviso de cookies, consientes su uso. Puedes deshabilitarlas en tu navegador.</p>
              </PolicySection>

              <PolicySection num="07" title="Derechos ARCO y otros derechos" icon={ShieldCheck}>
                <p style={{ marginBottom: '24px', fontSize: '16px', color: '#f8fafc' }}>Tienes derecho a Acceder, Rectificar, Cancelar u Oponerte al tratamiento de tus datos y revocar tu consentimiento.</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                  <div>
                    <h4 style={{ color: '#22d3ee', margin: '0 0 12px 0', fontSize: '16px' }}>Medios para ejercerlos:</h4>
                    <p style={{ marginBottom: '12px', fontSize: '15px' }}>Envía una solicitud a <strong>contacto@ask-sherlock.com</strong> con:</p>
                    <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '15px' }}>
                      <li>Nombre completo y medio para comunicarte.</li>
                      <li>Documento que acredite identidad y descripción clara del derecho.</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 style={{ color: '#a78bfa', margin: '0 0 12px 0', fontSize: '16px' }}>Plazos de respuesta:</h4>
                    <p style={{ fontSize: '15px', marginBottom: '12px' }}>Te responderemos en un máximo de <strong>20 días hábiles</strong>; si procede, se hará efectivo dentro de 15 días hábiles.</p>
                    <p style={{ fontSize: '14px', margin: 0, fontStyle: 'italic' }}>Puedes inscribirte en el REPEP (PROFECO) para limitar publicidad.</p>
                  </div>
                </div>
              </PolicySection>

              <PolicySection num="08" title="Conservación y seguridad" icon={Lock}>
                <p style={{ margin: 0 }}>Conservaremos tus datos el tiempo necesario para cumplir las finalidades y plazos legales aplicables. Implementamos estrictas medidas administrativas, técnicas y físicas para proteger tu información contra cualquier uso no autorizado.</p>
              </PolicySection>

              <PolicySection num="09" title="Tratamiento de datos de menores" icon={UserMinus}>
                <p style={{ margin: 0 }}>Nuestros servicios se dirigen a mayores de edad. Si identificamos datos de menores, los eliminaremos razonablemente pronto, salvo autorización de tutor.</p>
              </PolicySection>

              <PolicySection num="10" title="Cambios al Aviso de Privacidad" icon={RefreshCw}>
                <p style={{ margin: 0 }}>Podremos actualizar este Aviso por cambios operativos o legales. Las modificaciones se publicarán aquí y entrarán en vigor a partir de su publicación.</p>
              </PolicySection>

              <PolicySection num="11" title="Mecanismos de contacto y quejas" icon={Mail}>
                <p style={{ margin: 0 }}>Para cualquier duda, contáctanos en <strong style={{ color: '#38bdf8' }}>contacto@ask-sherlock.com</strong> o al <strong style={{ color: '#f8fafc' }}>+52 55 3439 3708</strong>. Si consideras que tu derecho ha sido vulnerado, puedes acudir al INAI.</p>
              </PolicySection>

              {/* Footer Copyright area */}
              <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
                <p style={{ marginBottom: '16px', color: '#94a3b8', fontWeight: 600, fontFamily: '"Space Grotesk", sans-serif', fontSize: '18px' }}>2026 © Ask-Sherlock® The AI Sprint Agency.</p>
                <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto' }}>
                  Ask-Sherlock Innovation Consulting Group S.A.S. de C.V. es responsable del tratamiento de tus datos para gestionar servicios y comunicaciones. Para finalidades de marketing puedes negar tu consentimiento escribiendo a contacto@ask-sherlock.com. Puedes ejercer tus derechos ARCO y conocer el Aviso completo en este sitio.
                </p>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
