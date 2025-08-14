
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="currentColor" viewBox="0 0 32 32">
        <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.78.72 5.48 2.08 7.88L.54 31.46l7.68-2.02A15.48 15.48 0 0 0 16 31.5c8.56 0 15.5-6.94 15.5-15.5S24.56.5 16 .5zm0 28.2c-2.62 0-5.16-.7-7.36-2.04l-.53-.31-4.56 1.2 1.22-4.44-.34-.55A12.97 12.97 0 0 1 3 16C3 8.83 8.83 3 16 3s13 5.83 13 13-5.83 12.7-13 12.7zm7.26-9.37c-.4-.2-2.36-1.17-2.72-1.3-.36-.13-.63-.2-.9.2-.26.4-1.03 1.3-1.26 1.56-.23.26-.46.3-.86.1-.4-.2-1.7-.63-3.24-2-1.2-1.07-2-2.4-2.23-2.8-.23-.4-.02-.62.17-.82.17-.17.4-.46.6-.69.2-.23.26-.4.4-.66.13-.26.07-.5-.03-.69-.1-.2-.9-2.17-1.23-2.97-.33-.8-.67-.7-.9-.7h-.76c-.26 0-.69.1-1.05.5s-1.38 1.35-1.38 3.3 1.42 3.83 1.62 4.1c.2.26 2.78 4.24 6.74 5.94.94.4 1.67.63 2.24.8.94.3 1.8.26 2.48.16.76-.1 2.36-.96 2.7-1.88.33-.93.33-1.72.23-1.88-.1-.16-.36-.26-.76-.46z" />
    </svg>
);


function WhatsAppButton() {
  const phoneNumber = '201040303547';
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  const containerVariants = {
    rest: {
      width: '56px',
      transition: { type: 'spring', stiffness: 200, damping: 20 }
    },
    hover: {
      width: '210px',
      transition: { type: 'spring', stiffness: 400, damping: 25 }
    }
  };

  const textVariants = {
    rest: {
      opacity: 0,
      x: -20,
      display: 'none',
      transition: { duration: 0.2, ease: 'easeOut' }
    },
    hover: {
      opacity: 1,
      x: 0,
      display: 'inline',
      transition: { duration: 0.3, ease: 'easeIn', delay: 0.1 }
    }
  };

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 flex items-center justify-center bg-green-500 text-white rounded-full shadow-lg cursor-pointer"
      aria-label="تواصل معنا عبر واتساب"
      variants={containerVariants}
      initial="rest"
      whileHover="hover"
      animate="rest"
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-green-500"
        animate={{ scale: [1, 1.6], opacity: [1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", repeatDelay: 0.5 }}
      />
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-green-400"
        animate={{ scale: [1, 1.6], opacity: [1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.5, repeatDelay: 0.5 }}
      />

      <div className="relative z-10 flex items-center justify-center w-full h-full gap-3 px-4">
        <WhatsAppIcon />
        <motion.span 
          className="font-bold text-base whitespace-nowrap"
          variants={textVariants}
        >
          تواصل معنا الآن
        </motion.span>
      </div>

    </motion.a>
  );
}

export default WhatsAppButton;