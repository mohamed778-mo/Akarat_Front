import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  PhotoIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  ArrowsPointingOutIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  InformationCircleIcon, 
} from "@heroicons/react/24/outline";

const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);
const SuccessIcon = () => (
  <svg
    className="w-20 h-20 text-green-500"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    {" "}
    <motion.circle
      cx="12"
      cy="12"
      r="11"
      stroke="currentColor"
      strokeWidth="1.5"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    />{" "}
    <motion.path
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 13l3 3 7-7"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
    />{" "}
  </svg>
);

const AnimatedInputField = ({
  id,
  name,
  type,
  placeholder,
  required,
  value,
  onChange,
  icon: Icon,
}) => (
  <motion.div
    className="relative"
    variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } }}
  >
    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
      {Icon && <Icon className="h-5 w-5 text-slate-400" />}
    </div>
    <input
      type={type}
      name={name}
      id={id}
      required={required}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="input-field pl-12"
    />
  </motion.div>
);

function AddPropertyPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    space: "",
    location: "",
    client_name: "",
    client_phone: "",
    client_gmail: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const fileInputRef = useRef(null);

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      alert("يرجى رفع صورة للعقار.");
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus(null);
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    data.append("image", imageFile);
    try {
      await axios.post(
        "https://akarat-six.vercel.app/app/website/create_realestate_form",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setSubmitStatus("success");
    } catch (error) {
      console.error("Failed to submit property:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-center p-4">
        <SuccessIcon />
        <h2 className="text-3xl font-bold text-slate-800 mt-4">
          تم استلام طلبك بنجاح!
        </h2>
        <p className="text-slate-500 mt-2 max-w-md">
          شكراً لك. سيقوم أحد خبرائنا بمراجعة البيانات والتواصل معك في أقرب وقت
          ممكن لمناقشة الخطوات التالية.
        </p>
      </div>
    );
  }

  return (
    <main className="bg-slate-50 py-12 md:py-20">
      <div className="container mx-auto max-w-4xl px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-brand text-slate-900">
              اعرض عقارك معنا
            </h1>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
              املأ النموذج التالي لتقديم طلب عرض عقارك. فريقنا سيقوم بمراجعته
              والتواصل معك.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: 0.2, staggerChildren: 0.15 },
              },
            }}
            className="bg-white p-8 md:p-10 rounded-2xl shadow-xl space-y-10"
          >
            <motion.div
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-slate-800 border-b pb-4">
                1. تفاصيل العقار
              </h2>
              <AnimatedInputField
                id="name"
                name="name"
                type="text"
                placeholder="اسم العقار (مثال: فيلا بالتجمع الخامس)"
                required
                value={formData.name}
                onChange={handleInputChange}
                icon={BuildingOfficeIcon}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatedInputField
                  id="location"
                  name="location"
                  type="text"
                  placeholder="الموقع / الحي"
                  required
                  value={formData.location}
                  onChange={handleInputChange}
                  icon={MapPinIcon}
                />
                <AnimatedInputField
                  id="space"
                  name="space"
                  type="text"
                  placeholder="المساحة (م²)"
                  required
                  value={formData.space}
                  onChange={handleInputChange}
                  icon={ArrowsPointingOutIcon}
                />
              </div>
              <motion.div
                className="relative"
                variants={{
                  hidden: { opacity: 0, x: -30 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <div className="pointer-events-none absolute top-4 left-0 flex items-center pl-4">
                  <ChatBubbleLeftRightIcon className="h-5 w-5 text-slate-400" />
                </div>
                <textarea
                  name="description"
                  id="description"
                  rows="4"
                  required
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="اكتب وصفاً جذاباً للعقار..."
                  className="input-field pl-12 pt-3"
                ></textarea>
              </motion.div>
            </motion.div>

            <motion.div
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-slate-800 border-b pb-4">
                2. صورة العقار
              </h2>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center cursor-pointer hover:border-amber-500 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                onClick={() => fileInputRef.current.click()}
              >
                <input
                  type="file"
                  name="image"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                  required
                />
                {imagePreview ? (
                  <div className="relative group">
                    <img
                      src={imagePreview}
                      alt="معاينة العقار"
                      className="mx-auto max-h-60 rounded-lg shadow-md"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white font-semibold">تغيير الصورة</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-slate-500">
                    <PhotoIcon className="w-16 h-16 text-slate-400" />
                    <p className="mt-4 font-semibold text-lg">
                      ارفع صورة واضحة للعقار
                    </p>
                    <p className="text-sm text-slate-400">
                      اسحب وأفلت أو انقر للاختيار
                    </p>
                  </div>
                )}
              </motion.div>
            </motion.div>

            <motion.div
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-slate-800 border-b pb-4">
                3. بيانات التواصل الخاصة بك
              </h2>
              <AnimatedInputField
                id="client_name"
                name="client_name"
                type="text"
                placeholder="الاسم الكامل"
                required
                value={formData.client_name}
                onChange={handleInputChange}
                icon={UserIcon}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatedInputField
                  id="client_phone"
                  name="client_phone"
                  type="tel"
                  placeholder="رقم الهاتف"
                  required
                  value={formData.client_phone}
                  onChange={handleInputChange}
                  icon={PhoneIcon}
                />
                <AnimatedInputField
                  id="client_gmail"
                  name="client_gmail"
                  type="email"
                  placeholder="البريد الإلكتروني"
                  required
                  value={formData.client_gmail}
                  onChange={handleInputChange}
                  icon={EnvelopeIcon}
                />
              </div>
            </motion.div>

            <motion.div
              className="bg-blue-50 text-blue-800 p-4 rounded-lg flex items-start gap-3"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <InformationCircleIcon className="w-6 h-6 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold">تنويه هام</h4>
                <p className="text-sm">
                  بإرسال هذا الطلب، فإنك توافق على مراجعة بيانات عقارك من قبل
                  فريقنا. سيتم التواصل معك لمناقشة تفاصيل العرض والرسوم المطبقة
                  قبل نشر الإعلان.
                </p>
              </div>
            </motion.div>

            <AnimatePresence>
              {submitStatus === "error" && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="text-red-600 bg-red-50 p-3 rounded-lg text-sm text-center"
                >
                  حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{
                scale: 1.02,
                y: -3,
                boxShadow: "0 10px 20px -5px rgb(236 72 153 / 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex justify-center bg-brand-pink text-white font-bold py-3.5 rounded-lg shadow-lg shadow-pink-500/30 transition-all disabled:bg-slate-400"
            >
              {isSubmitting ? <Spinner /> : "إرسال الطلب"}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </main>
  );
}

export default AddPropertyPage;
