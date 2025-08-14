import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { PhoneIcon, XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";

const logoIconUrl = "https://k.top4top.io/p_3503b0wzh1.png";

const navLinks = [
  { name: "الرئيسية", to: "/" },
  { name: "العقارات", to: "/real-estate" },
  { name: "التشطيبات", to: "/finishing" },
  { name: "الديكورات", to: "/decorations" },
  { name: "اضافة عقار", to: "/add-property" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mobileMenuVariants = {
    hidden: { x: "100%" },
    visible: { x: "0%", transition: { type: "tween", ease: "circOut" } },
    exit: { x: "100%", transition: { type: "tween", ease: "circIn" } },
  };

  const navLinksContainerVariants = {
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
  };

  const navLinkItemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white/80 backdrop-blur-lg font-sans transition-all duration-300 ${
          isScrolled ? "shadow-md border-b border-slate-200/80 py-1" : "py-2"
        }`}
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex-1 flex justify-start">
              <NavLink to="/" className="flex items-center gap-2">
                <img
                  className="h-9 w-auto"
                  src={logoIconUrl}
                  alt="Helioin Logo"
                />
                <span className="text-xl font-bold uppercase tracking-wider hidden sm:block font-brand text-gradient-brand">
                  Helioin
                </span>
              </NavLink>
            </div>

            <nav className="hidden md:flex items-center justify-center gap-10">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.to}
                  className="relative group py-2"
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`text-base font-semibold transition-colors duration-300 ${
                          isActive
                            ? "text-brand-purple"
                            : "text-slate-600 group-hover:text-black"
                        }`}
                      >
                        {link.name}
                      </span>
                      <div
                        className={`absolute bottom-0 left-0 h-0.5 bg-brand-purple transition-all duration-300 ease-out ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      ></div>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="hidden md:flex flex-1 items-center justify-end">
              <motion.a
                href="tel:+201040303547"
                className="relative overflow-hidden border border-brand-pink text-brand-pink font-bold py-2 px-5 rounded-full text-sm flex items-center gap-2 group transition-colors duration-300 hover:text-white"
                whileHover="hover"
                initial="rest"
                animate="rest"
              >
                <motion.div
                  className="absolute inset-0 bg-brand-pink z-0"
                  variants={{ rest: { x: "101%" }, hover: { x: "0%" } }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
                <PhoneIcon className="w-4 h-4 relative z-10" />
                <span className="relative z-10">تواصل معنا</span>
              </motion.a>
            </div>

            <div className="md:hidden flex-1 flex justify-end">
              <button
                onClick={() => setIsOpen(true)}
                className="p-1 rounded-md text-slate-800"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 md:hidden"
            />

            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white shadow-lg flex flex-col p-6 md-hidden z-[70]"
            >
              <div className="flex justify-between items-center mb-10">
                <h3 className="font-brand text-lg font-bold">القائمة</h3>
                <button onClick={() => setIsOpen(false)} className="p-1">
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <motion.nav
                variants={navLinksContainerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-start gap-y-6"
              >
                {navLinks.map((link) => (
                  <motion.div key={link.name} variants={navLinkItemVariants}>
                    <NavLink
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `text-xl font-semibold w-full block py-2 ${
                          isActive ? "text-brand-purple" : "text-slate-700"
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  </motion.div>
                ))}
              </motion.nav>

              <motion.a
                href="tel:+201040303547"
                variants={navLinkItemVariants}
                className="mt-auto w-full bg-brand-pink text-white font-bold py-3 px-6 rounded-lg text-base flex items-center justify-center gap-2"
              >
                <PhoneIcon className="w-5 h-5" />
                <span>تواصل معنا</span>
              </motion.a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
