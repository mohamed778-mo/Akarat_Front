import React, { useState, useEffect } from "react";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const logoIconUrl = "https://k.top4top.io/p_3503b0wzh1.png";

const socialIcons = {
  facebook: (props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M22.675 0h-21.35C.597 0 0 .598 0 1.333v21.333C0 23.403.597 24 1.325 24h11.495v-9.294H9.847v-3.622h2.973V8.413c0-2.94 1.793-4.548 4.415-4.548 1.255 0 2.336.093 2.65.135v3.07l-1.82.001c-1.428 0-1.703.678-1.703 1.67v2.188h3.406l-.444 3.622h-2.962V24h5.807C23.403 24 24 23.403 24 22.667V1.333C24 .598 23.403 0 22.675 0z" />
    </svg>
  ),
  twitter: (props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.865 9.865 0 0 1-3.127 1.195A4.916 4.916 0 0 0 16.616 3c-2.717 0-4.92 2.203-4.92 4.917 0 .386.045.762.127 1.124C7.728 8.847 4.1 6.884 1.671 3.905a4.822 4.822 0 0 0-.664 2.475c0 1.708.869 3.216 2.188 4.099a4.904 4.904 0 0 1-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827a4.93 4.93 0 0 1-2.224.084c.627 1.956 2.444 3.379 4.6 3.421A9.867 9.867 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.212c9.056 0 14.01-7.506 14.01-14.011 0-.213-.005-.425-.014-.636A10.025 10.025 0 0 0 24 4.557z" />
    </svg>
  ),
  instagram: (props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.332 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.333-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.849c.062-1.366.333 2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0 1.534c-3.17 0-3.552.012-4.803.07-1.042.048-1.608.22-1.983.37-.5.194-.857.427-1.232.802-.375.375-.608.732-.802 1.232-.15.375-.322.941-.37 1.983-.058 1.251-.07 1.633-.07 4.803s.012 3.552.07 4.803c.048 1.042.22 1.608.37 1.983.194.5.427.857.802 1.232.375.375.732.608 1.232.802.375.15.941.322 1.983.37 1.251.058 1.633.07 4.803.07s3.552-.012 4.803-.07c1.042-.048 1.608.22 1.983-.37.5-.194.857.427.802-1.232.375-.375.608-.732.802-1.232.15-.375.322.941.37-1.983.058-1.251.07-1.633.07-4.803s-.012-3.552-.07-4.803c-.048-1.042-.22-1.608-.37-1.983-.194-.5-.427-.857-.802-1.232-.375-.375-.732-.608-1.232-.802-.375-.15-.941-.322-1.983-.37-1.251-.058-1.633-.07-4.803-.07zm0 3.905a4.935 4.935 0 1 0 0 9.87 4.935 4.935 0 0 0 0-9.87zm0 8.147a3.212 3.212 0 1 1 0-6.424 3.212 3.212 0 0 1 0 6.424zm4.993-8.94a1.155 1.155 0 1 1 0-2.31 1.155 1.155 0 0 1 0 2.31z" />
    </svg>
  ),
  linkedin: (props) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0zM7.125 20.452H3.557V9h3.568v11.452zM5.341 7.433c-1.142 0-2.064-.926-2.064-2.065 0-1.142.922-2.065 2.064-2.065 1.141 0 2.063.923 2.063 2.065 0 1.139-.922 2.065-2.063 2.065zM20.452 20.452h-3.566v-5.605c0-1.336-.027-3.055-1.861-3.055-1.861 0-2.146 1.454-2.146 2.957v5.703h-3.566V9h3.422v1.561h.049c.477-.9 1.637-1.85 3.37-1.85 3.602 0 4.27 2.368 4.27 5.449v6.292z" />
    </svg>
  ),
};

function Footer() {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://akarat-six.vercel.app/app/website/get_all_contacts"
        );
        if (response.data && response.data.length > 0) {
          setContactData(response.data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch contact data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContactData();
  }, []);

  const socialLinks = contactData
    ? [
        {
          name: "facebook",
          href: contactData.facebook_link,
          icon: socialIcons.facebook,
          label: "Facebook",
        },
        {
          name: "instagram",
          href: contactData.instagram_link,
          icon: socialIcons.instagram,
          label: "Instagram",
        },
        {
          name: "twitter",
          href: contactData.twitter_link,
          icon: socialIcons.twitter,
          label: "Twitter",
        },
        {
          name: "linkedin",
          href: contactData.linkedin_link,
          icon: socialIcons.linkedin,
          label: "LinkedIn",
        },
      ].filter((link) => link.href)
    : [];

  return (
    <motion.footer
      className="bg-white text-slate-600 border-t border-slate-200"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto max-w-7xl px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img
                className="h-9 w-auto"
                src={logoIconUrl}
                alt="Helioin Logo"
              />
              <span className="text-2xl font-bold uppercase font-brand text-gradient-brand">
                Only Helio
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              نحن لا نبني مجرد هياكل، بل نصنع تجارب حياتية. شغفنا يكمن في دمج
              التصميم المبتكر مع أعلى معايير الجودة.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              روابط سريعة
            </h3>
            <nav className="flex flex-col gap-3">
              <NavLink
                to="/"
                className="hover:text-amber-500 transition-colors"
              >
                الرئيسية
              </NavLink>
              <NavLink
                to="/real-estate"
                className="hover:text-amber-500 transition-colors"
              >
                العقارات
              </NavLink>
              <NavLink
                to="/finishing"
                className="hover:text-amber-500 transition-colors"
              >
                التشطيبات
              </NavLink>
            </nav>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              تواصل معنا
            </h3>
            {loading ? (
              <p className="text-sm">جاري التحميل...</p>
            ) : (
              contactData && (
                <div className="flex flex-col gap-3 text-sm">
                  {contactData.gmail && (
                    <a
                      href={`mailto:${contactData.gmail}`}
                      className="flex items-center gap-3 group"
                    >
                      <EnvelopeIcon className="w-5 h-5 text-slate-400 group-hover:text-amber-500 transition-colors" />
                      <span className="group-hover:text-amber-500 transition-colors">
                        {contactData.gmail}
                      </span>
                    </a>
                  )}
                  {contactData.phone && (
                    <a
                      href={`tel:${contactData.phone}`}
                      className="flex items-center gap-3 group"
                    >
                      <PhoneIcon className="w-5 h-5 text-slate-400 group-hover:text-amber-500 transition-colors" />
                      <span
                        className="group-hover:text-amber-500 transition-colors"
                        dir="ltr"
                      >
                        {contactData.phone}
                      </span>
                    </a>
                  )}
                  {contactData.location && (
                    <div className="flex items-center gap-3">
                      <MapPinIcon className="w-5 h-5 text-slate-400" />
                      <span>{contactData.location}</span>
                    </div>
                  )}
                </div>
              )
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              تابعنا
            </h3>
            {loading ? (
              <p className="text-sm">...</p>
            ) : (
              socialLinks.length > 0 && (
                <motion.div
                  className="flex items-center gap-3"
                  variants={{
                    visible: { transition: { staggerChildren: 0.1 } },
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  {socialLinks.map(({ name, href, icon, label }) => {
                    const Icon = icon;
                    return (
                      <motion.a
                        key={name}
                        href={href}
                        aria-label={label}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center group"
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        whileHover={{
                          scale: 1.1,
                          y: -4,
                          rotate: 5,
                          backgroundColor: "#F59E0B",
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon className="h-5 w-5 text-slate-500 group-hover:text-white transition-colors" />
                      </motion.a>
                    );
                  })}
                </motion.div>
              )
            )}
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Helioin. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
