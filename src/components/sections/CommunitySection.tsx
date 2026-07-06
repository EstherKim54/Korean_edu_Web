import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../LanguageContext';
import { PenSquare, Lock, X, Image as ImageIcon, FileText, ArrowLeft } from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from 'firebase/firestore';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import DOMPurify from 'dompurify';

interface Post {
  id: string;
  type: 'notice' | 'gallery';
  title: string;
  content: string;
  date: string;
  author: string;
  createdAt?: any;
}

const QUILL_MODULES = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link', 'image', 'video'],
    ['clean']
  ],
};

export default function CommunitySection() {
  const { t } = useLanguage();
  const [activeSubTab, setActiveSubTab] = useState<'notice' | 'gallery'>('notice');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  
  // View state: list | write
  const [view, setView] = useState<'list' | 'write'>('list');
  
  // Write auth modal
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  
  // New post state
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  // Load posts from Firestore
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetchedPosts: Post[] = [];
      querySnapshot.forEach((doc) => {
        fetchedPosts.push({ id: doc.id, ...doc.data() } as Post);
      });
      setPosts(fetchedPosts);
    } catch (e) {
      console.error('Error fetching posts: ', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '412412!!') {
      setShowPasswordModal(false);
      setPassword('');
      setPasswordError(false);
      setView('write');
      setNewTitle('');
      setNewContent('');
    } else {
      setPasswordError(true);
    }
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    try {
      await addDoc(collection(db, 'posts'), {
        type: activeSubTab,
        title: newTitle,
        content: newContent,
        date: new Date().toLocaleDateString(),
        author: 'Admin',
        createdAt: serverTimestamp()
      });
      
      setView('list');
      fetchPosts();
    } catch (e) {
      console.error('Error adding document: ', e);
      alert('Failed to post. Please try again.');
    }
  };

  const currentPosts = posts.filter(p => p.type === activeSubTab);

  if (view === 'write') {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-8"
      >
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setView('list')}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            {t.community.newPostTitle} - {activeSubTab === 'notice' ? t.community.tabNotice : t.community.tabGallery}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
          <form onSubmit={handlePostSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder={t.community.postTitlePlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-xl font-semibold"
                required
              />
            </div>
            
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
              <ReactQuill 
                theme="snow"
                value={newContent}
                onChange={setNewContent}
                modules={QUILL_MODULES}
                className="h-[400px] mb-12"
                placeholder={t.community.postContentPlaceholder}
              />
            </div>
            
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => setView('list')}
                className="px-8 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-lg"
              >
                {t.community.postCancel}
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium text-lg shadow-md hover:shadow-lg"
              >
                {t.community.postSubmit}
              </button>
            </div>
          </form>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12"
    >
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
          {t.community.title}
        </h2>
        <p className="text-lg text-gray-600">
          {t.community.subtitle}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-100 p-4 gap-4">
          <div className="flex p-1 bg-gray-100 rounded-xl space-x-1">
            <button
              onClick={() => setActiveSubTab('notice')}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 ${
                activeSubTab === 'notice' 
                  ? 'bg-white text-blue-700 shadow-sm ring-1 ring-black/5' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{t.community.tabNotice}</span>
            </button>
            <button
              onClick={() => setActiveSubTab('gallery')}
              className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2 ${
                activeSubTab === 'gallery' 
                  ? 'bg-white text-blue-700 shadow-sm ring-1 ring-black/5' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>{t.community.tabGallery}</span>
            </button>
          </div>
          
          <button
            onClick={() => setShowPasswordModal(true)}
            className="flex items-center space-x-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors font-medium shadow-md hover:shadow-lg"
          >
            <PenSquare className="w-4 h-4" />
            <span>{t.community.adminWriteButton}</span>
          </button>
        </div>

        <div className="p-6 min-h-[400px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p>Loading posts...</p>
            </div>
          ) : currentPosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <FileText className="w-12 h-12 mb-4 opacity-20" />
              <p>{t.community.noPosts}</p>
            </div>
          ) : (
            <div className="space-y-6">
              {currentPosts.map((post) => (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  key={post.id} 
                  className="p-6 md:p-8 border border-gray-100 rounded-2xl hover:shadow-lg transition-shadow bg-gray-50/50"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{post.title}</h3>
                  <div className="text-sm text-gray-500 mb-6 flex items-center space-x-4 border-b border-gray-200 pb-4">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>{post.author}</span>
                  </div>
                  <div 
                    className="prose max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
            >
              <button 
                onClick={() => { setShowPasswordModal(false); setPasswordError(false); setPassword(''); }}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full p-2"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="mb-8 flex flex-col items-center text-center pt-4">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 shadow-inner">
                  <Lock className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.community.adminWriteButton}</h3>
                <p className="text-gray-500">{t.community.passwordPrompt}</p>
              </div>

              <form onSubmit={handlePasswordSubmit}>
                <div className="mb-6">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.community.passwordPlaceholder}
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-center text-lg tracking-widest"
                    autoFocus
                  />
                  {passwordError && (
                    <p className="text-red-500 text-sm mt-3 text-center font-medium animate-pulse">{t.community.passwordIncorrect}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  className="w-full py-4 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors font-bold text-lg shadow-lg hover:shadow-xl"
                >
                  {t.community.passwordSubmit}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
