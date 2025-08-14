import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const arrowContainerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.2,
      repeat: Infinity,
    },
  },
};

const arrowVariants = {
  animate: {
    y: [-10, 10, -10],
    opacity: [0, 1, 0],
    transition: {
      duration: 1.5,
      ease: "easeInOut",
    },
  },
};

const ArrowSvg = () => (
  <motion.svg
    className="w-6 h-6 text-amber-500 absolute"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    variants={arrowVariants}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19 9l-7 7-7-7"
    ></path>
  </motion.svg>
);

function ScrollDownArrow({ targetId }) {
  const handleScroll = () => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.button
      onClick={handleScroll}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50"
      aria-label="التمرير للأسفل"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      <div
        className="relative w-14 h-14 flex items-center justify-center 
                    bg-slate-50 border-2 border-amber-400 rounded-full"
      >
        <motion.div
          className="w-full h-full relative flex justify-center"
          variants={arrowContainerVariants}
          initial="initial"
          animate="animate"
        >
          <ArrowSvg />
          <ArrowSvg />
          <ArrowSvg />
        </motion.div>
      </div>
    </motion.button>
  );
}

export default ScrollDownArrow;
