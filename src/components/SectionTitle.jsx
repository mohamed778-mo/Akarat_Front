import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const SectionTitle = ({ children, className }) => {
  const line1Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeInOut",
        delay: 0.3,
      },
    },
  };

  const line2Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 1.0,
      },
    },
  };

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } },
      }}
    >
      <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-brand">
        {children}
      </h2>

      <motion.svg
        className="absolute bottom-[-10px] left-0 w-full h-auto"
        viewBox="0 0 345 12"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M2 5.5C41.2857 2.16667 215.8 -4.1 343 5.5"
          fill="transparent"
          stroke="#D4AF37"
          strokeWidth="3"
          strokeLinecap="round"
          variants={line1Variants}
        />
        <motion.path
          d="M2 8C65.1429 11.8333 241.2 5.2 343 8"
          fill="transparent"
          stroke="#D4AF37"
          strokeWidth="2"
          strokeLinecap="round"
          variants={line2Variants}
        />
      </motion.svg>
    </motion.div>
  );
};

export default SectionTitle;
