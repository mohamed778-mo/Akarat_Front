import React, { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Helmet } from "react-helmet-async";
import {
  PaintBrushIcon,
  BuildingOffice2Icon,
  HomeIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    id: 1,
    title: "التصميم الديكوري",
    description:
      "نخلق مساحات داخلية تعكس ذوقك الرفيع وتجمع بين الجمال والوظيفة العملية.",
    to: "/decorations",
    bgColor: "bg-purple-500",
    iconColor: "text-purple-500",
    icon: PaintBrushIcon,
  },
  {
    id: 2,
    title: "التشطيبات المتكاملة",
    description:
      "نقدم حلول تشطيبات عالية الجودة باستخدام أفضل المواد، مع إشراف كامل لضمان التنفيذ المثالي.",
    to: "/finishing",
    bgColor: "bg-pink-500",
    iconColor: "text-pink-500",
    icon: BuildingOffice2Icon,
  },
  {
    id: 3,
    title: "تسويق العقارات",
    description:
      "نساعدك على الوصول لأفضل الفرص الاستثمارية وعرض عقارك بأفضل صورة للسوق.",
    to: "/real-estate",
    bgColor: "bg-amber-500",
    iconColor: "text-amber-500",
    icon: HomeIcon,
  },
];

const ServiceCard = ({ service }) => {
  const Icon = service.icon;
  return (
    <Link
      to={service.to}
      className="service-card block"
      aria-label={`اعرف المزيد عن ${service.title}`}
    >
      <motion.article
        className="group p-8 rounded-2xl relative overflow-hidden bg-white shadow-xl border border-transparent h-full"
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        <motion.div
          className={`absolute inset-0 z-0 ${service.bgColor}`}
          variants={{ rest: { y: "100%" }, hover: { y: "0%" } }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
        <div className="relative z-10 flex flex-col h-full">
          <motion.div
            className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 bg-white shadow-md"
            variants={{
              rest: {
                scale: 1,
                rotate: 0,
                backgroundColor: "rgba(255, 255, 255, 1)",
              },
              hover: {
                scale: 1.15,
                rotate: -15,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <Icon
              className={`w-10 h-10 ${service.iconColor} group-hover:text-white transition-colors duration-300`}
            />
          </motion.div>
          <div className="flex-grow">
            <motion.h3
              className="text-xl font-bold text-slate-800 mb-2"
              variants={{
                rest: { color: "#1e293b" },
                hover: { color: "#ffffff" },
              }}
              transition={{ duration: 0.3 }}
            >
              {service.title}
            </motion.h3>
            <motion.p
              className="text-slate-500 leading-relaxed"
              variants={{
                rest: { color: "#64748b" },
                hover: { color: "#e2e8f0" },
              }}
              transition={{ duration: 0.3 }}
            >
              {service.description}
            </motion.p>
          </div>
          <motion.div
            className="mt-auto pt-4 text-sm font-semibold flex items-center gap-2 text-white"
            variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <span>اعرف المزيد</span>
            <motion.div variants={{ rest: { x: 0 }, hover: { x: 5 } }}>
              <ArrowRightIcon className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>
      </motion.article>
    </Link>
  );
};

function Services() {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(max-width: 1023px)", () => {
        gsap.from(".title-group > *", {
          scrollTrigger: { trigger: ".title-group", start: "top 85%" },
          opacity: 0,
          y: 40,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
        });
        gsap.from(".service-card", {
          scrollTrigger: { trigger: ".cards-container", start: "top 80%" },
          opacity: 0,
          y: 50,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
        });
      });

      mm.add("(min-width: 1024px)", () => {
        const cards = gsap.utils.toArray(".service-card");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${cards.length * 600}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        tl.set(cards, {
          x: (i) =>
            cardsContainerRef.current.offsetWidth / 2 -
            (cards[i].offsetLeft + cards[i].offsetWidth / 2),
          y: (i) =>
            cardsContainerRef.current.offsetHeight / 2 -
            (cards[i].offsetTop + cards[i].offsetHeight / 2) +
            50,
          scale: 0.7,
          rotation: () => gsap.utils.random(-10, 10),
          opacity: 1,
        });

        tl.to(".title-group", {
          y: -50,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
        }).to(
          cards,
          {
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            stagger: 0.1,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.2"
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // SEO:
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "خدماتنا المتكاملة",
    description:
      "نقدم حلولاً مبتكرة في التصميم الديكوري، التشطيبات المتكاملة، وتسويق العقارات لتحويل رؤيتك إلى واقع ملموس.",
    itemListElement: servicesData.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        url: `http://onlyhelio.egyptge.com${service.to}`,
      },
    })),
  };

  return (
    <>
      <Helmet>
        <title>خدماتنا | تصميم، تشطيبات، وتسويق عقاري</title>
        <meta
          name="description"
          content="اكتشف خدماتنا المتكاملة التي تشمل التصميم الداخلي، التشطيبات الفاخرة، والتسويق العقاري الاحترافي. حلول مبتكرة لتحويل رؤيتك إلى واقع."
        />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <section
        ref={sectionRef}
        className="bg-slate-50 py-20 md:py-28 overflow-hidden"
      >
        <div className="container mx-auto max-w-7xl px-6 relative">
          <div className="text-center mb-16 md:mb-24 title-group">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-brand">
              خدماتنا المتكاملة
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
              نقدم حلولاً مبتكرة لتحويل رؤيتك إلى واقع ملموس.
            </p>
          </div>

          <div
            ref={cardsContainerRef}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 cards-container"
          >
            {servicesData.map((service) => (
              <ServiceCard service={service} key={service.id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Services;
