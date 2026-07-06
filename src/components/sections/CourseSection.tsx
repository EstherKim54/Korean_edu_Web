import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../../LanguageContext';
import { CheckCircle2, BookOpen, GraduationCap, Users, Calendar, HeartHandshake } from 'lucide-react';

export default function CourseSection() {
  const { t } = useLanguage();

  const featureIcons = [BookOpen, GraduationCap, Users, CheckCircle2, HeartHandshake, Calendar];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, type: "spring" }}
      className="max-w-6xl mx-auto"
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.course.title}</h2>
        <p className="text-xl text-blue-600 font-medium max-w-3xl mx-auto">{t.course.subtitle}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mb-20 items-center">
        <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
          <p>{t.course.p1}</p>
          <p>{t.course.p2}</p>
          <p>{t.course.p3}</p>
        </div>
        <div className="relative">
          <div className="aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop" 
              alt="Students learning" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100 max-w-xs hidden md:block">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-lg">TOPIK</p>
                <p className="text-sm text-gray-500">Preparation Course</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-20">
        <h3 className="text-2xl font-bold text-gray-900 mb-10 text-center">{t.course.featuresTitle}</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.course.features.map((feature, index) => {
            const Icon = featureIcons[index % featureIcons.length];
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, type: "spring", bounce: 0.4 }}
                whileHover={{ y: -15, scale: 1.1, backgroundColor: "#f8fafc" }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-xl transition-all cursor-pointer"
              >
                <Icon className="w-8 h-8 text-blue-500 mb-4" />
                <p className="text-gray-800 font-medium">{feature}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 border border-blue-100">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.course.scheduleTitle}</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">{t.course.scheduleDesc}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.course.levels.map((level, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-white hover:border-blue-200 transition-colors">
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 font-bold rounded-full text-sm mb-3">
                {level.level}
              </div>
              <p className="text-gray-700 font-medium">{level.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
