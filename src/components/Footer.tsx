import React from 'react';
import { useLanguage } from '../LanguageContext';

export default function Footer() {
  const { language } = useLanguage();
  
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left flex flex-col md:flex-row items-center md:items-start md:space-x-4">
            <img 
              src="/logo.png" 
              onError={(e) => {
                e.currentTarget.src = "https://ui-avatars.com/api/?name=HGU&background=1e3a8a&color=fff&rounded=true&bold=true";
              }}
              alt="Handong Korean Center Logo" 
              className="w-16 h-16 rounded-full mb-4 md:mb-0 border-2 border-slate-700"
            />
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                {language === 'ko' ? '한동대학교 한국어교실' : 'HGU Korean Class'}
              </h2>
              <p className="text-sm">
                {language === 'ko' 
                  ? '경북 포항시 북구 흥해읍 한동로 558 느헤미야홀 412호' 
                  : 'Room 412, Nehemiah Hall, 558 Handong-ro, Heunghae-eup, Buk-gu, Pohang-si, Gyeongbuk'}
              </p>
            </div>
          </div>
          <div className="text-sm text-center md:text-right">
            <p>Tel: 054-260-3177</p>
            <p>Email: hgukorean@handong.edu</p>
            <p className="mt-4 text-slate-500">
              © {new Date().getFullYear()} Handong Global University. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
