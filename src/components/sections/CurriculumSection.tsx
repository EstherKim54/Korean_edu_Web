import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../../LanguageContext';
import { Clock, CalendarDays, Users, Award, CreditCard } from 'lucide-react';

export default function CurriculumSection() {
  const { t } = useLanguage();

  const structureIcons = [CalendarDays, Clock, Clock, Clock, Users, Award, CreditCard];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto"
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.curriculum.title}</h2>
      </div>

      <div className="mb-20">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
          <CalendarDays className="w-6 h-6 mr-3 text-blue-600" />
          {t.curriculum.scheduleTableTitle}
        </h3>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-200">
                  {t.curriculum.tableHeaders.map((header, index) => (
                    <th key={index} className="px-6 py-4 text-sm font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {t.curriculum.tableData.map((row, index) => (
                  <motion.tr 
                    key={index} 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, backgroundColor: "#eff6ff" }}
                    className="transition-colors cursor-pointer bg-white"
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">{row.term}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{row.apply}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-pre-line">{row.deadline.replace(' / ', '\n')}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-pre-line">{row.announce.replace(' / ', '\n')}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-pre-line">{row.tuition.replace(' / ', '\n')}</td>
                    <td className="px-6 py-4 text-sm font-medium text-blue-700">{row.period}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4 space-y-1 text-sm text-gray-500">
          <p>{t.curriculum.tableNote1}</p>
          <p>{t.curriculum.tableNote2}</p>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
          <Clock className="w-6 h-6 mr-3 text-blue-600" />
          {t.curriculum.structureTitle}
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.curriculum.structureData.map((item, index) => {
            const Icon = structureIcons[index % structureIcons.length];
            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-gray-900">{item.label}</h4>
                </div>
                <p className="text-gray-600 whitespace-pre-line mt-auto">{item.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
