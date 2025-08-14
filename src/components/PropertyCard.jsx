import React from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

// Icons
import {
  HomeIcon,
  BuildingLibraryIcon,
  BeakerIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";

const getStatusBadge = (status) => {
  switch (status) {
    case "ايجار":
      return { text: "للإيجار", color: "bg-blue-500" };
    case "بيع":
      return { text: "للبيع", color: "bg-brand-purple" };
    default:
      return { text: status, color: "bg-slate-500" };
  }
};

function PropertyCard({ property, variants }) {
  if (!property) return null;

  const {
    _id,
    title = "عقار مميز",
    type = "غير محدد",
    status_of_sale,
    price = 0,
    space,
    number_of_bedrooms,
    number_of_bathrooms,
  } = property;

  const allImages = [
    property.image_1,
    property.image_2,
    property.image_3,
    property.image_4,
  ].filter(Boolean);
  const hasMultipleImages = allImages.length > 1;
  const statusInfo = getStatusBadge(status_of_sale);
  const formattedPrice = new Intl.NumberFormat("ar-EG", {
    style: "currency",
    currency: "EGP",
    minimumFractionDigits: 0,
  }).format(price);

  const propertyStats = [
    { icon: HomeIcon, value: space, unit: "م²", label: "المساحة" },
    {
      icon: BuildingLibraryIcon,
      value: number_of_bedrooms,
      unit: "غرف",
      label: "غرف النوم",
    },
    {
      icon: BeakerIcon,
      value: number_of_bathrooms,
      unit: "حمامات",
      label: "الحمامات",
    },
  ].filter((stat) => stat.value > 0);

  return (
    <Link to={`/property/${_id}`}>
      <motion.div
        className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col group h-full"
        variants={variants}
        whileHover={{
          y: -8,
          boxShadow:
            "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <div className="relative h-56 overflow-hidden">
          <Swiper
            modules={[Pagination, Navigation, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: `.swiper-button-next-${_id}`,
              prevEl: `.swiper-button-prev-${_id}`,
            }}
            loop={hasMultipleImages}
            className="h-full w-full"
            key={_id}
          >
            {allImages.length > 0 ? (
              allImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`صورة للعقار: ${title} (${index + 1})`}
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <div className="w-full h-full bg-slate-200 flex flex-col items-center justify-center text-slate-400">
                  <PhotoIcon className="w-12 h-12" />
                  <p className="mt-2 text-sm">لا توجد صور</p>
                </div>
              </SwiperSlide>
            )}
          </Swiper>

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {hasMultipleImages && (
            <>
              <button
                aria-label="الصورة السابقة"
                className={`swiper-button-prev-${_id} absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/70 text-slate-800 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 hover:bg-white disabled:hidden`}
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <button
                aria-label="الصورة التالية"
                className={`swiper-button-next-${_id} absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/70 text-slate-800 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 hover:bg-white disabled:hidden`}
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </>
          )}

          <div className="absolute top-4 left-4 z-10">
            {status_of_sale && (
              <span
                className={`text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg ${statusInfo.color}`}
              >
                {statusInfo.text}
              </span>
            )}
          </div>
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <p className="text-sm text-brand-pink font-semibold mb-1">{type}</p>
          <h3
            className="text-xl font-bold text-slate-800 font-brand mb-4 truncate"
            title={title}
          >
            {title}
          </h3>

          {propertyStats.length > 0 && (
            <div className="grid grid-cols-3 gap-2 text-sm text-slate-600 border-t border-b border-slate-100 py-4">
              {propertyStats.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1.5 text-center"
                  title={item.label}
                >
                  <item.icon className="w-6 h-6 text-slate-400" />
                  <span className="text-xs font-medium">
                    {item.value} {item.unit}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-auto pt-4 flex justify-between items-center">
            <div>
              <p className="text-xs text-slate-500">السعر يبدأ من</p>
              <p className="font-bold text-lg text-brand-purple">
                {formattedPrice}
              </p>
            </div>
            <div className="bg-amber-400 text-slate-900 font-semibold text-sm px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all duration-300 group-hover:bg-amber-500 group-hover:pl-5">
              عرض التفاصيل
              <ArrowLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default PropertyCard;
