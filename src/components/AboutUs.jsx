import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Helmet } from 'react-helmet-async';

import {
  BuildingOffice2Icon, MapIcon, ArrowUpIcon, ArrowDownIcon,
  ArrowLeftIcon, ArrowRightIcon, HomeIcon, BookOpenIcon,
} from "@heroicons/react/24/outline";

import aboutImage from '../assets/about1.jpg';

gsap.registerPlugin(ScrollTrigger);


const TreeIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M12 2C10.34 2 9 3.34 9 5c0 .41.08.8.21 1.16C7.33 6.54 6 8.13 6 10c0 1.48.81 2.75 2 3.45V17h2v5h4v-5h2v-3.55c1.19-.7 2-1.97 2-3.45 0-1.87-1.33-3.46-3.21-3.84.13-.36.21-.75.21-1.16 0-1.66-1.34-3-3-3z" />
  </svg>
);

const FeatureCard = ({ icon, text, variants }) => (
  <motion.div
    className="bg-white p-4 rounded-lg shadow-md border border-slate-200 group"
    variants={variants}
    whileHover={{ y: -5, scale: 1.05 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    {React.cloneElement(icon, { 
      className: `${icon.props.className} group-hover:scale-110 transition-transform duration-300` 
    })}
    <p className="font-semibold text-slate-700 text-sm md:text-base">{text}</p>
  </motion.div>
);

function AboutUs() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%', 
          toggleActions: 'play none none none', 
        },
      });

      tl.from('.title-anim', { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out' })
        .from('.subtitle-anim', { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out' }, '-=0.6');

      tl.from('.right-col-anim', { opacity: 0, x: 50, duration: 1, ease: 'power3.out' }, '-=0.5')
        .from('.left-col-anim', { opacity: 0, x: -50, duration: 1, ease: 'power3.out' }, '<');
      
      tl.from('.img-bg-anim', { scale: 0.5, opacity: 0, rotation: -5, duration: 1, ease: 'elastic.out(1, 0.75)' }, '-=0.8')
       .from('.img-anim', { scale: 1.1, opacity: 0, duration: 0.8, ease: 'power2.inOut' }, '<+=0.2');

    }, sectionRef);

    return () => ctx.revert();
    
  }, []);

  const smallCardsContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } } };
  const smallCardItem = { hidden: { y: 20, opacity: 0, scale: 0.9 }, visible: { y: 0, opacity: 1, scale: 1 } };

  return (
    <>
      <Helmet>
        <title>عن هليوبوليس الجديدة | المستقبل العقاري في شرق القاهرة</title>
        <meta name="description" content="اكتشف كل ما يخص مدينة هليوبوليس الجديدة: الموقع، الحدود، والمميزات. تعرف على سبب كونها المحور المستقبلي للاستثمار العقاري في مصر." />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "نبذة عن هليوبوليس الجديدة",
            "description": "معلومات شاملة حول مدينة هليوبوليس الجديدة، الامتداد الطبيعي لمصر الجديدة والمستقبل العقاري الواعد في شرق القاهرة.",
            "mainEntity": {
              "@type": "Place",
              "name": "هليوبوليس الجديدة",
              "description": "مدينة سكنية جديدة في شرق القاهرة، تأسست بقرار جمهوري وتتميز بموقع استراتيجي بين طريقي الإسماعيلية والسويس."
            }
          }
        `}</script>
      </Helmet>

      <section id="next-section" className="bg-slate-50 py-20 md:py-28 overflow-x-hidden" ref={sectionRef}>
        <div className="container mx-auto max-w-7xl px-6">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-brand title-anim">
              هليوبوليس الجديدة
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto subtitle-anim">
              الامتداد الطبيعي لضاحية مصر الجديدة ومحور المستقبل العقاري في شرق القاهرة.
            </p>
          </div>

          <article className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            <div className="flex flex-col gap-8 mt-4 right-col-anim">
              <motion.div className="bg-white p-6 rounded-xl shadow-md border border-slate-200" whileHover={{ y: -8, boxShadow: "0px 10px 30px -5px rgba(0,0,0,0.1)" }}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-brand-purple/10 p-3 rounded-lg"><BuildingOffice2Icon className="w-7 h-7 text-brand-purple" /></div>
                  <h3 className="text-2xl font-bold text-slate-800">التعريف الرسمي</h3>
                </div>
                <p className="text-slate-600 leading-relaxed pr-1">تأسست بموجب القرار الجمهوري رقم 193 لسنة 1995. بمساحة <strong>5885 فدان</strong>، وهي تابعة لشركة مصر الجديدة للإسكان والتعمير.</p>
              </motion.div>

              <motion.div className="bg-white p-6 rounded-xl shadow-md border border-slate-200" whileHover={{ y: -8, boxShadow: "0px 10px 30px -5px rgba(0,0,0,0.1)" }}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-brand-orange/10 p-3 rounded-lg"><MapIcon className="w-7 h-7 text-brand-orange" /></div>
                  <h3 className="text-2xl font-bold text-slate-800">الموقع والحدود</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-slate-600">
                  <div className="flex items-center gap-3"><ArrowUpIcon className="text-slate-400 w-5 h-5" /><span><strong>شمالاً:</strong> طريق الإسماعيلية</span></div>
                  <div className="flex items-center gap-3"><ArrowDownIcon className="text-slate-400 w-5 h-5" /><span><strong>جنوباً:</strong> طريق السويس</span></div>
                  <div className="flex items-center gap-3"><ArrowLeftIcon className="text-slate-400 w-5 h-5" /><span><strong>شرقاً:</strong> مدينة بدر</span></div>
                  <div className="flex items-center gap-3"><ArrowRightIcon className="text-slate-400 w-5 h-5" /><span><strong>غرباً:</strong> مدينة الشروق</span></div>
                </div>
              </motion.div>
            </div>

            <div className="flex flex-col gap-8 left-col-anim">
              <div className="relative">
                <div className="absolute -top-3 -right-3 w-full h-full bg-slate-200 rounded-lg transform rotate-2 z-0 img-bg-anim"></div>
                <img 
                  src={aboutImage} 
                  alt="مخطط مدينة هليوبوليس الجديدة يظهر المناطق السكنية والخضراء"
                  className="relative w-full h-auto object-cover rounded-lg shadow-2xl z-10 img-anim"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <motion.div 
                className="grid grid-cols-3 gap-4 text-center"
                variants={smallCardsContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
              >
                <FeatureCard text="مناطق سكنية" variants={smallCardItem} icon={<HomeIcon className="w-7 h-7 text-brand-purple mx-auto mb-2" />} />
                <FeatureCard text="مناطق ترفيهية" variants={smallCardItem} icon={<TreeIcon className="w-7 h-7 text-green-500 mx-auto mb-2" />} />
                <FeatureCard text="مناطق تعليمية" variants={smallCardItem} icon={<BookOpenIcon className="w-7 h-7 text-brand-orange mx-auto mb-2" />} />
              </motion.div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

export default AboutUs;