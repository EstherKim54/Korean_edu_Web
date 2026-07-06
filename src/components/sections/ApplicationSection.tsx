import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../../LanguageContext';
import { CheckCircle, ArrowRight, Info, Laptop, FileText, Mail, CreditCard, FileCheck, Plane, GraduationCap } from 'lucide-react';

export default function ApplicationSection() {
  const { t } = useLanguage();

  const procedureIcons = [Laptop, FileText, Mail, CreditCard, FileCheck, Plane, GraduationCap];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto"
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.application.title}</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-blue-600 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <CheckCircle className="w-6 h-6 mr-2 text-blue-200" />
            {t.application.eligibilityTitle}
          </h3>
          <p className="text-blue-50 leading-relaxed text-lg">
            {t.application.eligibility}
          </p>
        </div>

        <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm">
          <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center">
            <Laptop className="w-6 h-6 mr-2 text-blue-600" />
            {t.application.methodTitle}
          </h3>
          <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-gray-100">
            <span className="font-medium text-gray-800">{t.application.method}</span>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
              Apply Now <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>

      <div className="mb-20">
        <h3 className="text-2xl font-bold text-gray-900 mb-10 text-center">{t.application.procedureTitle}</h3>
        
        <div className="relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-blue-100 -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4 relative z-10">
            {t.application.procedures.map((proc, index) => {
              const Icon = procedureIcons[index % procedureIcons.length];
              return (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, type: "spring", bounce: 0.5 }}
                  whileHover={{ scale: 1.15, y: -10 }}
                  className="flex flex-row md:flex-col items-center cursor-pointer"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white border-4 border-blue-100 flex items-center justify-center shadow-sm mb-0 md:mb-4 shrink-0 z-10 relative">
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                      {index + 1}
                    </div>
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                  </div>
                  
                  {/* Connecting line for mobile */}
                  {index < t.application.procedures.length - 1 && (
                    <div className="md:hidden w-1 h-8 bg-blue-100 mx-auto my-1" />
                  )}
                  
                  <div className="ml-4 md:ml-0 text-left md:text-center">
                    <p className="text-sm font-bold text-gray-800">{proc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8">
        <div className="flex items-start space-x-4">
          <Info className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
          <div className="space-y-3">
            {t.application.notes.map((note, index) => (
              <p key={index} className="text-sm text-amber-900 leading-relaxed">
                • {note}
              </p>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
