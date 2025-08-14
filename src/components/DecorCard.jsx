import React, { useRef, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { PhotoIcon } from '@heroicons/react/24/outline';

const DecorCard = ({ decor, onOrderClick, onImageClick }) => {
  const images = [decor.image_1, decor.image_2, decor.image_3].filter(Boolean);
  const swiperRef = useRef(null);

  useEffect(() => {
    const swiperInstance = swiperRef.current?.swiper;
    
    return () => {
      if (swiperInstance && swiperInstance.destroy) {
        swiperInstance.destroy(true, true);
      }
    };
  }, []); 

  return (
  
    <motion.div 
      layout="position"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.4 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden group flex flex-col"
    >
      <div className="relative h-64 overflow-hidden decor-card-swiper">
        {images.length > 0 ? (
          <Swiper
            ref={swiperRef} 
            modules={[Pagination, Navigation]}
            pagination={{ clickable: true }}
            navigation={true}
            loop={images.length > 1}
            className="h-full w-full"
          >
            {images.map((imgSrc, index) => (
              <SwiperSlide key={imgSrc || index} onClick={() => onImageClick(images, index)} className="cursor-zoom-in">
                <img src={imgSrc} alt={`${decor.name} - ${index + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center text-slate-400">
            <PhotoIcon className="w-12 h-12" />
            <p className="mt-2 text-sm">لا توجد صور</p>
          </div>
        )}
      </div>
      <div className="p-5 text-center flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-lg font-bold text-slate-800 font-brand" title={decor.name}>{decor.name}</h3>
          <p className="text-sm text-slate-500 mt-1 line-clamp-2">{decor.description}</p>
        </div>
        <button onClick={() => onOrderClick(decor)} className="w-full bg-brand-pink text-white font-bold py-2.5 rounded-lg mt-4 transition-all duration-300 hover:bg-opacity-80 hover:shadow-lg hover:shadow-pink-500/30">
          اطلب منتج مشابه
        </button>
      </div>
    </motion.div>
  );
};

export default DecorCard;