import React, { useEffect, useState, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

import heroImage1 from "../assets/hero1.jpg";
import heroImage2 from "../assets/hero2.jpg";

function ScrollDownArrow({ targetId }) {
  const handleScroll = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <motion.button
      onClick={handleScroll}
      className="absolute bottom-[-1.5rem] left-1/2 -translate-x-1/2 z-50 w-14 h-14"
      aria-label="التمرير للأسفل"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <motion.span
          className="absolute w-full h-full rounded-full border-2 border-amber-400"
          animate={{ scale: [1, 1.8], opacity: [0.7, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="absolute w-full h-full rounded-full border-2 border-amber-300"
          animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <div className="relative w-full h-full flex items-center justify-center bg-slate-50 rounded-full shadow-lg">
          <motion.svg
            className="w-5 h-5 text-amber-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ y: ["0%", "25%", "0%"] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </motion.svg>
        </div>
      </div>
    </motion.button>
  );
}
ScrollDownArrow.propTypes = { targetId: PropTypes.string.isRequired };

function CurvedDivider() {
  return (
    <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-40">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full h-[100px] fill-slate-50"
      >
        <path d="M600,120 C300,120 200,40 0,60 L0,120 L1200,120 L1200,60 C1000,40 900,120 600,120 Z"></path>
      </svg>
    </div>
  );
}

const RANDOM_CHARS = "ABCDEFGHJKMNPQRSTUVWXYZ123456789";
function DecryptingText({ text }) {
  const [scrambledText, setScrambledText] = useState("");
  const animationFrameRef = useRef();
  const lastUpdateTimeRef = useRef(0);
  const iterationRef = useRef(0);

  useEffect(() => {
    const animate = (currentTime) => {
      if (currentTime - lastUpdateTimeRef.current < 50) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      lastUpdateTimeRef.current = currentTime;

      const newText = text
        .split("")
        .map((_, index) => {
          if (iterationRef.current / 2 > index) return text[index];
          return RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)];
        })
        .join("");

      setScrambledText(newText);

      if (iterationRef.current < text.length * 2) {
        iterationRef.current += 1;
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setScrambledText(text);
      }
    };
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [text]);

  return (
    <h1
      className="relative text-4xl sm:text-6xl font-extrabold uppercase tracking-widest"
      title={text}
    >
      <span className="opacity-0">{text}</span>
      <span className="absolute inset-0" aria-hidden="true">
        {scrambledText}
      </span>
    </h1>
  );
}
DecryptingText.propTypes = { text: PropTypes.string.isRequired };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.8, staggerChildren: 0.25 },
  },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0, filter: "blur(5px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.25, 1, 0.5, 1] },
  },
};

function HelioinSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = useMemo(() => [heroImage1, heroImage2], []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <>
      <Helmet>
        <link rel="preload" as="image" href={heroImage1} />
        <link rel="preload" as="image" href={heroImage2} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Only Helio | روائع معمارية" />
        <meta
          property="og:description"
          content="نحن نصنع روائع معمارية تغير من مفهومك للجمال والوظيفة."
        />
        <meta property="og:image" content={heroImage1} />
      </Helmet>

      <section className="relative h-[88vh] w-full text-white" id="hero">
        <div className="absolute inset-0 z-10 overflow-hidden">
          <AnimatePresence>
            <motion.div
              key={currentImageIndex}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }} // يمكنك تعديل المدة هنا
            />
          </AnimatePresence>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30 z-20"></div>

        <motion.div
          className="relative z-30 flex flex-col justify-center items-center text-center px-4 h-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <DecryptingText text="Only Helio" />
          </motion.div>

          <motion.p
            className="mt-4 max-w-xl text-slate-200 text-lg"
            variants={itemVariants}
          >
            نحن نصنع روائع معمارية تغير من مفهومك للجمال والوظيفة.
          </motion.p>

          <motion.div variants={itemVariants}>
            <Link
              to="/real-estate"
              className="relative mt-8 inline-block border border-amber-400 text-amber-400 py-3 px-8 uppercase text-sm font-semibold rounded-md overflow-hidden group"
            >
              <span className="absolute inset-0 bg-amber-400 z-0 transition-transform duration-300 ease-in-out group-hover:translate-x-0 translate-x-[-101%]"></span>
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                شاهد مشاريعنا
              </span>
            </Link>
          </motion.div>
        </motion.div>

        <CurvedDivider />
        <ScrollDownArrow targetId="next-section" />
      </section>
    </>
  );
}

export default HelioinSection;
