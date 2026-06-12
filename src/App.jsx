import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Clients from './components/Clients';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Comparison from './components/Comparison';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import FloatingRobot from './components/FloatingRobot';
import StarfieldBackground from './components/StarfieldBackground';

export default function App() {
  return (
    <div style={{ background: '#000000', color: '#f8fafc', minHeight: '100vh', fontFamily: '"Inter", sans-serif', position: 'relative' }}>
      
      {/* 1. Destellos a lo lejos (Capa 1) */}
      <StarfieldBackground />
      
      {/* 5. Mascot Robot appears later */}
      <FloatingRobot />
      
      {/* Container for content to ensure it sits above the robot/background when needed */}
      <div style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
        {/* Re-enable pointer events for interactive elements */}
        <div style={{ pointerEvents: 'auto' }}>
          
          {/* 5. Top Tab Navbar appears later */}
          <Navbar />
          
          <Hero />
          <Features />
          <HowItWorks />
          <Comparison />
          <Clients />
          <Testimonials />
          <CTA />
          <FAQ />
          <Footer />
        </div>
      </div>
    </div>
  );
}
