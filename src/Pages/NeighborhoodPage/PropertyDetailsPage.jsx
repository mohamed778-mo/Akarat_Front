/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay, EffectFade } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';

import { 
  HomeIcon, CheckCircleIcon, PencilIcon, CalendarDaysIcon, 
  BuildingOfficeIcon, TagIcon, MapPinIcon, PhotoIcon,
  ChevronLeftIcon, ChevronRightIcon
} from '@heroicons/react/24/outline';

const BedIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>;
const BathIcon = ({ className }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.344 1.087-.836l.383-1.437M7.5 14.25V5.106M7.5 14.25a3 3 0 01-3 3h15.75m-12.75-3h11.218c.51 0 .962-.344 1.087-.836l.383-1.437M13.5 5.25V3M13.5 5.25c0 .621.504 1.125 1.125 1.125h1.5c.621 0 1.125-.504 1.125-1.125v-2.25c0-.621-.504-1.125-1.125-1.125h-1.5A1.125 1.125 0 0013.5 3v.75z" /></svg>;

import BookingForm from '../../components/BookingForm';
import InquiryForm from '../../components/InquiryForm';

const fadeInVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
};

const MiniCalendar = ({ availableDates = [] }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const availableDateObjects = availableDates.map(dateStr => parseISO(dateStr));

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 6 }); 
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 6 });

    const days = eachDayOfInterval({ start: startDate, end: endDate });
    const weekDays = ["س", "ح", "ن", "ث", "ر", "خ", "ج"];

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    return (
        <motion.div className="mt-6 p-4 bg-slate-100/50 border border-slate-200 rounded-lg" variants={fadeInVariants}>
            <div className="flex items-center justify-between mb-3 px-2">
                <button onClick={prevMonth} className="p-1 rounded-full hover:bg-slate-200 transition-colors"><ChevronRightIcon className="w-5 h-5 text-slate-600" /></button>
                <span className="font-semibold text-sm text-slate-700">{format(currentMonth, 'MMMM yyyy', { locale: ar })}</span>
                <button onClick={nextMonth} className="p-1 rounded-full hover:bg-slate-200 transition-colors"><ChevronLeftIcon className="w-5 h-5 text-slate-600" /></button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-xs text-center">
                {weekDays.map(day => <div key={day} className="font-bold text-slate-400 py-1">{day}</div>)}
                {days.map((day, i) => {
                    const isAvailable = availableDateObjects.some(d => isSameDay(d, day));
                    return (
                        <div key={i} title={isAvailable ? `متاح للحجز: ${format(day, 'd MMMM')}` : ''} className={`
                            w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200
                            ${!isSameMonth(day, monthStart) ? 'text-slate-300' : 'text-slate-700'}
                            ${isAvailable ? 'bg-green-500 text-white font-bold cursor-pointer hover:scale-110' : ''}
                            ${isSameDay(day, new Date()) && !isAvailable ? 'bg-amber-100 text-amber-700' : ''}
                        `}>
                            {format(day, 'd')}
                        </div>
                    );
})}
            </div>
        </motion.div>
    );
}


function PropertyDetailsPage() {
    const { propertyId } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
    
    useEffect(() => {
        if (!propertyId) return;
        window.scrollTo(0, 0);
        const fetchProperty = async () => {
          setLoading(true);
          const API_URL = `https://akarat-six.vercel.app/app/website/get_department/${propertyId}`;
          try {
            const response = await axios.get(API_URL);
            setTimeout(() => {
                setProperty(response.data);
                setLoading(false);
            }, 800);
          } catch (err) {
            setError("لم يتم العثور على العقار المطلوب.");
            setLoading(false);
          }
        };
        fetchProperty();
    }, [propertyId]);
      
    if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500">جاري تحضير التفاصيل...</p>
    </div>
    );
    if (error) return <div className="text-center py-40 text-red-500">{error}</div>;
    if (!property) return null;
    
    const allImages = [property.image_1, property.image_2, property.image_3, property.image_4].filter(Boolean);
    const availableDates = property.available_dates || []; 

    return (
    <>
      <main className="bg-slate-50 py-12 md:py-20">
        <div className="container mx-auto max-w-7xl px-6">
          <motion.div 
            className="relative h-[60vh] max-h-[550px] w-full rounded-2xl shadow-2xl overflow-hidden mb-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Swiper
              modules={[Pagination, Navigation, Autoplay, EffectFade]}
              pagination={{ clickable: true }}
              navigation={true}
              loop={allImages.length > 1}
              speed={800}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              className="h-full w-full"
            >
              {allImages.length > 0 ? allImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <img src={image} alt={`${property.title} - ${index + 1}`} className="w-full h-full object-cover" />
                </SwiperSlide>
              )) : (
                <SwiperSlide className="bg-slate-200 flex items-center justify-center">
                    <PhotoIcon className="w-24 h-24 text-slate-300"/>
                </SwiperSlide>
              )}
            </Swiper>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-12"
            variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="lg:col-span-2 space-y-10">
              <motion.section variants={fadeInVariants}>
                <h1 className="text-4xl md:text-5xl font-bold font-brand text-slate-900">{property.title}</h1>
                <p className="text-3xl font-semibold text-brand-purple mt-4">{Number(property.price).toLocaleString()} جنيه</p>
                {property.designer && <p className="flex items-center gap-2 mt-3 text-slate-500"><PencilIcon className="w-5 h-5" /><span>تصميم وتنفيذ: <span className="font-semibold">{property.designer}</span></span></p>}
              </motion.section>

              <motion.section variants={fadeInVariants}>
                <h2 className="text-3xl font-bold font-brand mb-4">الوصف</h2>
                <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed whitespace-pre-line">{property.description}</div>
              </motion.section>

              <motion.section variants={fadeInVariants}>
                <h2 className="text-3xl font-bold font-brand mb-6">المميزات</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {property.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-slate-700">
                      <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>
            </div>

            <motion.div className="lg:col-span-1" variants={fadeInVariants}>
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200/50 sticky top-28">
                <h3 className="text-xl font-bold font-brand mb-6 text-center border-b pb-4">تفاصيل العقار</h3>
                <div className="space-y-4">
                    {[
                        { label: 'الحالة', value: property.status_of_sale, icon: TagIcon },
                        { label: 'النوع', value: property.type, icon: BuildingOfficeIcon },
                        { label: 'الحي', value: property.neighborhood_name, icon: MapPinIcon },
                        { label: 'المساحة', value: `${property.space} م²`, icon: HomeIcon },
                        { label: 'غرف النوم', value: property.number_of_bedrooms, icon: BedIcon },
                        { label: 'الحمامات', value: property.number_of_bathrooms, icon: BathIcon },
                    ].map(item => (
                        <div key={item.label} className="flex justify-between items-center text-base p-2 rounded-lg hover:bg-slate-100 transition-colors">
                            <span className="text-slate-500 flex items-center gap-2"><item.icon className="w-5 h-5" /> {item.label}</span>
                            <span className="font-bold">{item.value}</span>
                        </div>
                    ))}
                </div>
                
                {property.installment && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                    <h4 className="font-bold text-green-800 flex items-center justify-center gap-2"><CalendarDaysIcon className="w-5 h-5" /><span>متاح للتقسيط</span></h4>
                    {property.note && <p className="text-sm text-green-700 mt-2">{property.note}</p>}
                  </div>
                )}

                

                <div className="mt-8 space-y-3">
                    <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }} onClick={() => setIsBookingModalOpen(true)} className="w-full bg-brand-pink text-white font-bold py-3.5 rounded-lg shadow-lg shadow-pink-500/20 hover:shadow-xl hover:shadow-pink-500/30 transition-all">احجز موعداً للمعاينة</motion.button>
                    <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }} onClick={() => setIsInquiryModalOpen(true)} className="w-full bg-amber-500 text-slate-900 font-bold py-3.5 rounded-lg shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 transition-all">إرسال استفسار</motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <AnimatePresence>
        {isBookingModalOpen && <BookingForm isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} propertyId={propertyId} availableDates={availableDates} />}
        {isInquiryModalOpen && <InquiryForm isOpen={isInquiryModalOpen} onClose={() => setIsInquiryModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

export default PropertyDetailsPage;