import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { Helmet } from 'react-helmet';

import DecorationFormModal from '../../components/DecorationFormModal';
import DecorCard from '../../components/DecorCard';
import { CubeTransparentIcon } from '@heroicons/react/24/outline';
import SectionTitle from '../../components/SectionTitle';

function DecorPage() {
  const [decorations, setDecorations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDecor, setSelectedDecor] = useState(null);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxSlides, setLightboxSlides] = useState([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchDecorations = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://akarat-six.vercel.app/app/website/get_all_decorations');
        setDecorations(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError("عذراً، حدث خطأ أثناء تحميل الديكورات.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDecorations();
  }, []);
  
  const categories = useMemo(() => {
    if (decorations.length === 0) return [];
    const uniqueCategories = [...new Set(decorations.map(d => d.category))];
    return ['الكل', ...uniqueCategories];
  }, [decorations]);

  const filteredDecorations = useMemo(() => {
    if (selectedCategory === 'الكل') return decorations;
    return decorations.filter(d => d.category === selectedCategory);
  }, [selectedCategory, decorations]);

  const handleOrderClick = (decor) => {
    setSelectedDecor(decor);
    setIsModalOpen(true);
  };

  const handleImageClick = (images, index) => {
    setLightboxSlides(images.map(src => ({ src })));
    setLightboxIndex(index);
    setLightboxOpen(true);
  };
  
  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-xl">جاري تحميل الديكورات...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500 font-bold text-xl">{error}</div>;

  return (
    <>
      <Helmet>
        <title>ديكورات وتحف فنية | أضف لمسة فنية لمشروعك</title>
        <meta name="description" content="اكتشف مجموعة مختارة من الديكورات والتحف التي تضيف لمسة فنية رائعة لمشروعك أو منزلك." />
        <meta name="keywords" content="ديكورات, تحف, تصميم داخلي, ديكور, أفكار ديكور, تصاميم حديثة" />
        <meta property="og:title" content="ديكورات وتحف فنية" />
        <meta property="og:description" content="أضف لمسة فنية فريدة لمشروعك مع مجموعة مختارة من الديكورات والتحف." />
        <meta property="og:image" content="رابط الصورة هنا" />
        <meta property="og:url" content="رابط الصفحة هنا" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ديكورات وتحف فنية" />
        <meta name="twitter:description" content="أضف لمسة فنية لمشروعك مع الديكورات والتحف الرائعة." />
        <meta name="twitter:image" content="رابط الصورة هنا" />
      </Helmet>

      <main className="bg-slate-50">
        <div className="bg-white pt-24 pb-16">
          <motion.div className="container mx-auto max-w-7xl px-6 text-center" initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.7}}>
              <div className="inline-block">
                <SectionTitle>الديكورات والتحف</SectionTitle>
              </div>
              <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto">أضف لمسة فنية فريدة لمساحتك مع مجموعتنا المختارة.</p>
          </motion.div>
        </div>
        
        <div className="container mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="text-center mb-12">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">تصفح حسب الفئة</h3>
            <div className="flex justify-center border-b border-slate-200">
              {categories.map(category => (
                <button 
                  key={category} 
                  onClick={() => setSelectedCategory(category)} 
                  className={`relative px-4 py-3 font-semibold transition-colors duration-300 text-sm md:text-base ${
                    selectedCategory === category ? 'text-amber-500' : 'text-slate-500 hover:text-amber-500'
                  }`}
                >
                  {category}
                  {selectedCategory === category && (
                    <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500" layoutId="underline" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            layout 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
              <AnimatePresence>
                {filteredDecorations.length > 0 ? (
                  filteredDecorations.map(item => (
                    <DecorCard key={item._id} decor={item} onOrderClick={handleOrderClick} onImageClick={handleImageClick} />
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center text-center py-20">
                      <CubeTransparentIcon className="w-16 h-16 text-slate-300 mb-4" />
                      <h3 className="text-xl font-bold text-slate-600">لا توجد منتجات في هذه الفئة بعد</h3>
                      <p className="text-slate-400 mt-1">جرّب اختيار فئة أخرى.</p>
                  </div>
                )}
              </AnimatePresence>
          </motion.div>
        </div>
      </main>

      <AnimatePresence>
        {isModalOpen && <DecorationFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} decoration={selectedDecor} />}
      </AnimatePresence>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxSlides}
        index={lightboxIndex}
        plugins={[Thumbnails, Zoom]}
      />
    </>
  );
}

export default DecorPage;
