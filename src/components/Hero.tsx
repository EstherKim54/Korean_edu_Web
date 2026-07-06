import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import { ChevronDown } from 'lucide-react';

const BACKGROUND_IMAGES = [
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2000&auto=format&fit=crop", // University campus
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000&auto=format&fit=crop", // Students
  "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2000&auto=format&fit=crop", // People talking
];

export default function Hero() {
  const { t } = useLanguage();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight - 80, behavior: 'smooth' });
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-slate-900 flex items-center justify-center">
      {/* Dynamic Background Slider - Optimized for Mobile */}
      <div className="absolute inset-0 z-0 bg-slate-900">
        <AnimatePresence mode="sync">
          <motion.img
            key={currentImage}
            src={BACKGROUND_IMAGES[currentImage]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
        
        {/* Simple Gradient Overlay for Text Readability (No heavy mix-blend modes) */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-blue-900/50 to-slate-900/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8, rotateX: 45 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6 drop-shadow-2xl">
            <span className="block text-blue-200 mb-2">{t.hero.title1}</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-300">
              {t.hero.title2}
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, type: "spring", bounce: 0.4 }}
          className="text-lg md:text-2xl text-blue-50 mb-10 max-w-2xl mx-auto font-medium drop-shadow-lg"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.5 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, type: "spring", bounce: 0.6 }}
        >
          <button 
            onClick={scrollToContent}
            className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-300 bg-blue-600 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 hover:bg-blue-500 hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] hover:-translate-y-2"
          >
            <span className="text-lg">{t.hero.cta}</span>
            <ChevronDown className="ml-3 w-6 h-6 group-hover:animate-bounce" />
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/70"
      >
        <span className="text-xs tracking-widest uppercase mb-2 font-bold">Scroll</span>
        <motion.div 
          animate={{ y: [0, 15, 0], opacity: [0.3, 1, 0.3] }} 
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-1 h-16 bg-gradient-to-b from-white to-transparent rounded-full"
        />
      </motion.div>
    </div>
  );
}
