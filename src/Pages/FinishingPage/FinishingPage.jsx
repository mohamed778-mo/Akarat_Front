import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Helmet, HelmetProvider } from 'react-helmet-async'; // تم التحديث لاستخدام react-helmet-async
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { 
  CheckCircleIcon, ArrowLeftIcon, LightBulbIcon, PencilSquareIcon, PaintBrushIcon 
} from '@heroicons/react/24/outline';


const Spinner = () => <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>;

const fadeInVariants = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } } };

const ourServices = [
  { icon: LightBulbIcon, title: 'استشارة هندسية', description: 'نقدم استشارات دقيقة لمساعدتك في اتخاذ أفضل القرارات لمشروعك، من التخطيط الأولي إلى التنفيذ.' },
  { icon: PencilSquareIcon, title: 'تصميم داخلي وخارجي', description: 'نصمم مساحات فريدة تعكس هويتك وتلبي احتياجاتك، مع الاهتمام بأدق التفاصيل الجمالية والوظيفية.' },
  { icon: PaintBrushIcon, title: 'تشطيب متكامل', description: 'نتولى مشروعك من الألف إلى الياء، ونضمن لك تشطيبات فاخرة بجودة عالية وتسليم في الوقت المحدد.' }
];



function FinishingPage() {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '', location: '', service: '', space: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const formRef = useRef(null);
  const pageUrl = "http://onlyhelio.egyptge.com/finishing"; 

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://akarat-six.vercel.app/app/website/get_all_finishes');
        if (response.data && response.data.length > 0) {
          setPageData(response.data[0]); 
        } else {
          setError("لم يتم العثور على بيانات التشطيبات.");
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("عذراً، حدث خطأ أثناء تحميل الصفحة.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      await axios.post('https://akarat-six.vercel.app/app/website/create_finish_form', formData);
      setSubmitStatus('success');
      setFormData({ name: '', phone: '', location: '', service: '', space: '' });
      setTimeout(() => setSubmitStatus(null), 4000);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleServiceOrderClick = (serviceTitle) => {
    setFormData(prev => ({ ...prev, service: serviceTitle }));
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50">جاري التحميل...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-red-500">{error}</div>;
  if (!pageData) return null;

  const { 
    finishies: finishes = [], 
    main_image, main_image_2, main_image_3, main_image_4, 
    process = [] 
  } = pageData;
  
  const projectsImages = [main_image, main_image_2, main_image_3, main_image_4].filter(Boolean);
  
  // SEO: 
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "خدمات التشطيب الداخلي والخارجي",
    "provider": {
      "@type": "Organization",
      "name": "Helioin", 
      "url": "http://onlyhelio.egyptge.com" 
    },
    "areaServed": {
      "@type": "Country",
      "name": "Egypt" 
    },
    "description": "نقدم خدمات تشطيب متكاملة، من التصميم الداخلي والخارجي إلى التنفيذ بجودة عالية، لتحويل المساحات إلى أماكن تنبض بالحياة.",
    "name": "خدمات التشطيب الفاخرة"
  };

  return (
    <>
      <Helmet>
        <title>خدمات تشطيب فاخرة وتصميم داخلي | اسم شركتك</title>
        <meta name="description" content="نقدم خدمات تشطيب متكاملة وتصميم داخلي وخارجي. نحول رؤيتك إلى واقع ملموس بجودة فائقة واهتمام بأدق التفاصيل. اطلب عرض سعر الآن." />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content="خدمات تشطيب فاخرة وتصميم داخلي | اسم شركتك" />
        <meta property="og:description" content="نقدم خدمات تشطيب متكاملة وتصميم داخلي وخارجي. نحول رؤيتك إلى واقع ملموس بجودة فائقة." />
        <meta property="og:image" content={main_image} /> {/* SEO: صورة جذابة للمشاركة */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={pageUrl} />
        <meta property="twitter:title" content="خدمات تشطيب فاخرة وتصميم داخلي | اسم شركتك" />
        <meta property="twitter:description" content="نقدم خدمات تشطيب متكاملة وتصميم داخلي وخارجي. نحول رؤيتك إلى واقع ملموس بجودة فائقة." />
        <meta property="twitter:image" content={main_image} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <main className="bg-slate-50">
        {/* --- Hero Section --- */}
        <header className="relative bg-black text-white pt-32 pb-20">
          <img src={main_image} alt="تصميم داخلي فاخر لغرفة معيشة" className="absolute inset-0 w-full h-full object-cover opacity-30" loading="eager" />
          <motion.div className="relative container mx-auto max-w-7xl px-6 text-center z-10" initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} transition={{duration: 0.8}}>
              <h1 className="text-4xl md:text-6xl font-bold font-brand">خدمات التشطيب الفاخرة</h1>
              <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">نحول المساحات الفارغة إلى أماكن تنبض بالحياة. اكتشف كيف يمكننا تحقيق رؤيتك.</p>
          </motion.div>
        </header>
        
        <div className="container mx-auto max-w-7xl px-6 py-20 md:py-28 space-y-28">
          
          <section>
            <motion.div variants={fadeInVariants} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 font-brand mb-12">خدماتنا</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {ourServices.map((service, index) => (
                      <motion.div 
                        key={service.title} 
                        className="bg-white p-8 rounded-2xl shadow-xl text-center flex flex-col" 
                        initial={{ opacity: 0, y: 30 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.5, delay: index * 0.1 }} 
                        viewport={{ once: true }}
                      >
                          <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6">
                            <service.icon className="w-10 h-10 text-amber-500" />
                          </div>
                          <div className="flex-grow">
                            <h3 className="text-xl font-bold text-slate-800 mb-2">{service.title}</h3>
                            <p className="text-slate-500 leading-relaxed mb-6">{service.description}</p>
                          </div>
                          <button 
                            onClick={() => handleServiceOrderClick(service.title)} 
                            className="mt-auto bg-amber-500 text-white font-semibold py-2.5 px-6 rounded-lg transition-transform duration-200 hover:scale-105 hover:bg-amber-600"
                          >
                            اطلب هذه الخدمة الآن
                          </button>
                      </motion.div>
                  ))}
              </div>
            </motion.div>
          </section>

          {process.length > 0 && (
            <section>
              <motion.div variants={fadeInVariants} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
                <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 font-brand mb-12">عمليتنا في خطوات بسيطة</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {process.map(step => ( 
                        <motion.div key={step._id} className="flex flex-col items-center" initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} transition={{duration: 0.5}}>
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md mb-4">
                              <img src={step.icon_image} alt={step.name} className="w-10 h-10" loading="lazy" decoding="async" />
                            </div>
                            <h3 className="font-bold text-lg">{step.name}</h3>
                            <p className="text-sm text-slate-500">{step.description}</p>
                        </motion.div> 
                    ))}
                </div>
              </motion.div>
            </section>
          )}

          {finishes.length > 0 && (
            <section>
              <motion.div variants={fadeInVariants} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
                  <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 font-brand mb-12">أمثلة على خدماتنا</h2>
                  <div className="space-y-16">
                  {finishes.map((pkg, index) => (
                      <motion.div key={pkg._id} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`} initial={{opacity: 0, x: index % 2 === 1 ? 50 : -50}} whileInView={{opacity: 1, x: 0}} viewport={{ once: true, amount: 0.3 }} transition={{duration: 0.7}}>
                          <div className="lg:w-1/2">
                            <img src={pkg.image} alt={pkg.name} className="rounded-lg shadow-xl w-full h-[400px] object-cover" loading="lazy" decoding="async"/>
                          </div>
                          <div className="lg:w-1/2">
                              <h3 className="text-3xl font-bold text-slate-800 font-brand mb-4">{pkg.name}</h3>
                              {Array.isArray(pkg.properties) && (<ul className="space-y-3">{pkg.properties.map((prop, i) => (<li key={i} className="flex items-center gap-3"><CheckCircleIcon className="w-5 h-5 text-green-500" /><span>{prop}</span></li>))}</ul>)}
                          </div>
                      </motion.div>
                  ))}
                  </div>
              </motion.div>
            </section>
          )}
        </div>
        
        {projectsImages.length > 0 && (
          <section className="bg-white py-20 md:py-28">
            <motion.div className="container mx-auto max-w-7xl px-6" variants={fadeInVariants} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
                <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 font-brand mb-12">معرض أعمالنا</h2>
                <Swiper
                    modules={[Autoplay, EffectFade, Navigation, Pagination]}
                    effect="fade" fadeEffect={{ crossFade: true }} navigation={true} pagination={{ clickable: true }}
                    autoplay={{ delay: 3500, disableOnInteraction: false }} loop={projectsImages.length > 1}
                    className="h-[60vh] max-h-[550px] w-full rounded-2xl shadow-2xl"
                >
                    {projectsImages.map((src, index) => ( 
                      <SwiperSlide key={index}>
                        <img src={src} alt={`مثال من أعمال التشطيبات ${index + 1}`} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                      </SwiperSlide> 
                    ))}
                </Swiper>
            </motion.div>
          </section>
        )}
        
        <section ref={formRef} className="container mx-auto max-w-7xl px-6 py-20 md:py-28">
          <motion.div variants={fadeInVariants} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="bg-white p-8 md:p-12 rounded-lg shadow-xl max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-slate-900 font-brand text-center mb-8">اطلب عرض سعر لمشروعك</h3>
            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" name="name" placeholder="الاسم الكامل" value={formData.name} onChange={handleInputChange} required className="input-field md:col-span-2" aria-label="الاسم الكامل" />
              <input type="tel" name="phone" placeholder="رقم الموبايل" value={formData.phone} onChange={handleInputChange} required className="input-field" aria-label="رقم الموبايل" />
              <input type="text" name="location" placeholder="عنوان العقار" value={formData.location} onChange={handleInputChange} required className="input-field" aria-label="عنوان العقار" />
              <input type="text" name="space" placeholder="المساحة (م²)" value={formData.space} onChange={handleInputChange} required className="input-field" aria-label="المساحة بالمتر المربع" />
              <select name="service" value={formData.service} onChange={handleInputChange} required className="input-field text-slate-500" aria-label="اختر الخدمة المطلوبة">
                <option value="" disabled>اختر الخدمة المطلوبة</option>
                {ourServices.map(service => (<option key={service.title} value={service.title}>{service.title}</option>))}
              </select>
              <AnimatePresence>
                  {submitStatus && (
                      <motion.div initial={{opacity: 0, height: 0}} animate={{opacity: 1, height: 'auto'}} exit={{opacity: 0, height: 0}} className="md:col-span-2 text-center text-sm p-3 rounded-md" style={{ color: submitStatus === 'success' ? '#16a34a' : '#dc2626', backgroundColor: submitStatus === 'success' ? '#f0fdf4' : '#fef2f2' }}>
                          {submitStatus === 'success' ? 'تم إرسال طلبك بنجاح! سنتواصل معك قريباً.' : 'حدث خطأ. يرجى المحاولة مرة أخرى.'}
                      </motion.div>
                  )}
              </AnimatePresence>
              <motion.button type="submit" disabled={isSubmitting} whileHover={{scale: 1.03}} whileTap={{scale: 0.98}} className="md:col-span-2 w-full bg-brand-pink text-white font-bold py-3 rounded-lg hover:bg-opacity-90 flex items-center justify-center gap-2 disabled:bg-slate-400">
                {isSubmitting ? <Spinner /> : <span>إرسال الطلب</span>}
                {!isSubmitting && <ArrowLeftIcon className="w-5 h-5" />}
              </motion.button>
            </form>
          </motion.div>
        </section>
      </main>
    </>
  );
}

export default FinishingPage;