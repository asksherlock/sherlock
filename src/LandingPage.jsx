import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Clients from './components/Clients';
import AboutSherlock from './components/AboutSherlock';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Comparison from './components/Comparison';
import FAQ from './components/FAQ';
import Pricing from './components/Pricing';
import CTA from './components/CTA';
import Footer from './components/Footer';
import FloatingRobot from './components/FloatingRobot';
import StarfieldBackground from './components/StarfieldBackground';
import Medusae from './components/medusae/Medusae';

export default function LandingPage() {
  const bottomSectionRef = useRef(null);
  const isBottomVisible = useInView(bottomSectionRef, { margin: "-20% 0px -20% 0px" });

  return (
    <div style={{ background: '#000000', color: '#f8fafc', minHeight: '100vh', fontFamily: '"Inter", sans-serif', position: 'relative' }}>
      
      {/* 1. Destellos a lo lejos (Capa 1) */}
      <StarfieldBackground />

      {/* 2. Medusae Particles - Fondo fijo global que solo aparece en las secciones finales */}
      <div style={{ 
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1, 
        opacity: isBottomVisible ? 1 : 0, transition: 'opacity 1s ease', pointerEvents: 'none' 
      }}>
        <Medusae 
          style={{ width: '100%', height: '100%' }} 
          config={{
            cursor: { radius: 0.065, strength: 3, dragFactor: 0.015 },
            halo: { outerOscFrequency: 2.6, outerOscAmplitude: 0.76, outerOscJitterStrength: 0.025, outerOscJitterSpeed: 0.3, radiusBase: 2.4, radiusAmplitude: 0.5, shapeAmplitude: 0.75, rimWidth: 1.8, outerStartOffset: 0.4, outerEndOffset: 2.2, scaleX: 1.3, scaleY: 1 },
            particles: { baseSize: 0.016, activeSize: 0.044, blobScaleX: 1, blobScaleY: 0.6, rotationSpeed: 0.1, rotationJitter: 0.2, cursorFollowStrength: 1, oscillationFactor: 1, colorBase: "#0000ff", colorOne: "#4285f5", colorTwo: "#eb4236", colorThree: "#faba03" },
            background: { color: "#000000" }
          }} 
        />
      </div>
      
      {/* 5. Mascot Robot appears later */}
      <FloatingRobot />
      
      {/* Container for content to ensure it sits above the robot/background when needed */}
      <div style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
        {/* Re-enable pointer events for interactive elements */}
        <div style={{ pointerEvents: 'auto' }}>
          
          <Navbar />
          
          <Hero />
          
          {/* Social Proof Logobar */}
          <Clients />
          
          {/* El Manifiesto (Who we are) */}
          <AboutSherlock />
          
          {/* Cómo funciona */}
          <HowItWorks />
          
          {/* Capacidades (Redesigned) */}
          <Features />
          
          <Comparison />
          
          {/* Contenedor interactivo final transparente para mostrar partículas */}
          <div ref={bottomSectionRef} style={{ position: 'relative', zIndex: 5 }}>
            <Pricing />
            <CTA />
            <FAQ />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
