import React, { Suspense, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FloatingRobot from './components/FloatingRobot';
import StarfieldBackground from './components/StarfieldBackground';

// Lazy load below-the-fold components
const Clients = React.lazy(() => import('./components/Clients'));
const AboutSherlock = React.lazy(() => import('./components/AboutSherlock'));
const Features = React.lazy(() => import('./components/Features'));
const HowItWorks = React.lazy(() => import('./components/HowItWorks'));
const Comparison = React.lazy(() => import('./components/Comparison'));
const FAQ = React.lazy(() => import('./components/FAQ'));
const Pricing = React.lazy(() => import('./components/Pricing'));
const CTA = React.lazy(() => import('./components/CTA'));
const Footer = React.lazy(() => import('./components/Footer'));
const Medusae = React.lazy(() => import('./components/medusae/Medusae'));

// Wrapper to only render/fetch when near the viewport
const LazySection = ({ children, height = '30vh' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "400px 0px" });
  return (
    <div ref={ref} style={{ minHeight: isInView ? 'auto' : height }}>
      {isInView && <Suspense fallback={<div style={{ height }} />}>{children}</Suspense>}
    </div>
  );
};

export default function LandingPage() {
  const bottomSectionRef = useRef(null);
  const isBottomVisible = useInView(bottomSectionRef, { margin: "-20% 0px -20% 0px" });

  return (
    <div style={{ background: '#000000', color: '#f8fafc', minHeight: '100vh', fontFamily: '"Inter", sans-serif', position: 'relative' }}>
      
      {/* Capa 1: Destellos a lo lejos */}
      <StarfieldBackground />

      {/* Capa 2: Medusae Particles - Se carga diferido cuando se acerca al final */}
      <div style={{ 
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1, 
        opacity: isBottomVisible ? 1 : 0, transition: 'opacity 1s ease', pointerEvents: 'none' 
      }}>
        {isBottomVisible && (
          <Suspense fallback={null}>
            <Medusae 
              style={{ width: '100%', height: '100%' }} 
              config={{
                cursor: { radius: 0.065, strength: 3, dragFactor: 0.015 },
                halo: { outerOscFrequency: 2.6, outerOscAmplitude: 0.76, outerOscJitterStrength: 0.025, outerOscJitterSpeed: 0.3, radiusBase: 2.4, radiusAmplitude: 0.5, shapeAmplitude: 0.75, rimWidth: 1.8, outerStartOffset: 0.4, outerEndOffset: 2.2, scaleX: 1.3, scaleY: 1 },
                particles: { baseSize: 0.016, activeSize: 0.044, blobScaleX: 1, blobScaleY: 0.6, rotationSpeed: 0.1, rotationJitter: 0.2, cursorFollowStrength: 1, oscillationFactor: 1, colorBase: "#0000ff", colorOne: "#4285f5", colorTwo: "#eb4236", colorThree: "#faba03" },
                background: { color: "#000000" }
              }} 
            />
          </Suspense>
        )}
      </div>
      
      {/* Mascot Robot */}
      <FloatingRobot />
      
      {/* Contenedor interactivo */}
      <div style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
        <div style={{ pointerEvents: 'auto' }}>
          
          {/* Sincrónico (Carga Inicial) */}
          <Navbar />
          <Hero />
          
          {/* Asincrónico (Lazy Loading) */}
          <LazySection height="15vh"><Clients /></LazySection>
          <LazySection height="40vh"><AboutSherlock /></LazySection>
          <LazySection height="60vh"><HowItWorks /></LazySection>
          <LazySection height="80vh"><Features /></LazySection>
          <LazySection height="60vh"><Comparison /></LazySection>
          
          {/* Bottom container */}
          <div ref={bottomSectionRef} style={{ position: 'relative', zIndex: 5 }}>
            <LazySection height="50vh"><Pricing /></LazySection>
            <LazySection height="50vh"><CTA /></LazySection>
            <LazySection height="40vh"><FAQ /></LazySection>
            <LazySection height="30vh"><Footer /></LazySection>
          </div>
        </div>
      </div>
    </div>
  );
}
