/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LanguageProvider } from './LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import IntroSection from './components/sections/IntroSection';
import CourseSection from './components/sections/CourseSection';
import CurriculumSection from './components/sections/CurriculumSection';
import ApplicationSection from './components/sections/ApplicationSection';
import CommunitySection from './components/sections/CommunitySection';
import Footer from './components/Footer';
import { AnimatePresence } from 'motion/react';

function AppContent() {
  const [activeTab, setActiveTab] = useState('intro');

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200 selection:text-blue-900">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main>
        <Hero />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-[80vh]">
          <AnimatePresence mode="wait">
            {activeTab === 'intro' && <IntroSection key="intro" />}
            {activeTab === 'course' && <CourseSection key="course" />}
            {activeTab === 'curriculum' && <CurriculumSection key="curriculum" />}
            {activeTab === 'application' && <ApplicationSection key="application" />}
            {activeTab === 'community' && <CommunitySection key="community" />}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
