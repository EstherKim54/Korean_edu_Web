import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { Globe, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tabs = [
    { id: 'intro', label: t.nav.intro },
    { id: 'course', label: t.nav.course },
    { id: 'curriculum', label: t.nav.curriculum },
    { id: 'application', label: t.nav.application },
    { id: 'community', label: t.nav.community },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'ko' ? 'en' : 'ko');
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => setActiveTab('intro')}
          >
            <motion.img 
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              src="/logo.png" 
              onError={(e) => {
                // Fallback to a placeholder if the user hasn't uploaded logo.png yet
                e.currentTarget.src = "https://ui-avatars.com/api/?name=HGU&background=1e3a8a&color=fff&rounded=true&bold=true";
              }}
              alt="Handong Korean Center Logo" 
              className="w-10 h-10 md:w-12 md:h-12 mr-3 rounded-full shadow-lg border-2 border-white/20"
            />
            <div className={cn(
              "font-bold text-xl md:text-2xl tracking-tight transition-colors duration-300",
              isScrolled ? "text-blue-900" : "text-white"
            )}>
              {language === 'ko' ? '한동대학교 한국어교실' : 'HGU Korean Class'}
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  window.scrollTo({ top: window.innerHeight - 100, behavior: 'smooth' });
                }}
                className={cn(
                  'text-sm font-medium transition-colors relative py-2',
                  isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white/90 hover:text-white',
                  activeTab === tab.id && (isScrolled ? 'text-blue-600' : 'text-white font-semibold')
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className={cn(
                      "absolute -bottom-1 left-0 right-0 h-0.5",
                      isScrolled ? "bg-blue-600" : "bg-white"
                    )}
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
            
            <button
              onClick={toggleLanguage}
              className={cn(
                "flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors border",
                isScrolled 
                  ? "border-gray-200 text-gray-700 hover:bg-gray-100" 
                  : "border-white/30 text-white hover:bg-white/10"
              )}
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'ko' ? 'EN' : 'KO'}</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleLanguage}
              className={cn(
                "flex items-center space-x-1 px-2 py-1 mr-4 rounded-full text-xs font-medium border",
                isScrolled 
                  ? "border-gray-200 text-gray-700" 
                  : "border-white/30 text-white"
              )}
            >
              <Globe className="w-3 h-3" />
              <span>{language === 'ko' ? 'EN' : 'KO'}</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "p-2 rounded-md",
                isScrolled ? "text-gray-900" : "text-white"
              )}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: window.innerHeight - 100, behavior: 'smooth' });
                  }}
                  className={cn(
                    'block w-full text-left px-3 py-3 rounded-md text-base font-medium',
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
