import React, { useState } from "react";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import Modal from "react-modal";
import { XMarkIcon } from "@heroicons/react/24/solid";

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

function DecorationFormModal({ isOpen, onClose, decoration }) {
  const [formData, setFormData] = useState({
    name: "",
    place_space: "",
    phone: "",
    address: "",
    note: "",
  });
  const [files, setFiles] = useState({
    image_1: null,
    image_2: null,
    image_3: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) =>
    setFiles({ ...files, [e.target.name]: e.target.files[0] });

  const resetForm = () => {
    setFormData({
      name: "",
      place_space: "",
      phone: "",
      address: "",
      note: "",
    });
    setFiles({ image_1: null, image_2: null, image_3: null });
    setSubmitStatus(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    Object.keys(files).forEach((key) => {
      if (files[key]) data.append(key, files[key]);
    });
    try {
      await axios.post(
        `https://akarat-six.vercel.app/app/website/create_decoration_form/${decoration._id}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setSubmitStatus("success");
      setTimeout(handleClose, 2500);
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const overlayVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", damping: 15, stiffness: 200 },
    },
    exit: { opacity: 0, scale: 0.95, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className="modal-content-container"
      overlayElement={(props, contentElement) => (
        <motion.div
          {...props}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        >
          {contentElement}
        </motion.div>
      )}
      closeTimeoutMS={200}
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full mx-auto relative"
      >
        <motion.button
          whileHover={{ scale: 1.2, rotate: 90 }}
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-800"
        >
          <XMarkIcon className="w-6 h-6" />
        </motion.button>
        <AnimatePresence mode="wait">
          {submitStatus === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10 flex flex-col items-center"
            >
              <SuccessIcon />
              <h3 className="text-2xl font-bold text-slate-800 mt-4">
                تم إرسال طلبك بنجاح!
              </h3>
              <p className="text-slate-500 mt-1">
                سنتواصل معك في أقرب وقت. شكراً لك.
              </p>
            </motion.div>
          ) : (
            <motion.div key="form">
              <h2 className="text-3xl font-bold font-brand mb-2 text-center text-slate-800">
                اطلب الآن
              </h2>
              <p className="text-center text-slate-500 mb-6">
                {" "}
                أنت تطلب منتج مشابه لـ{" "}
                <span className="font-bold text-amber-500">
                  {decoration?.name}
                </span>
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="الاسم الكامل"
                  required
                  onChange={handleInputChange}
                  value={formData.name}
                  className="input-field"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="رقم الهاتف"
                  required
                  onChange={handleInputChange}
                  value={formData.phone}
                  className="input-field"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="place_space"
                    placeholder="المساحة التقريبية (م²)"
                    required
                    onChange={handleInputChange}
                    value={formData.place_space}
                    className="input-field"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="العنوان"
                    required
                    onChange={handleInputChange}
                    value={formData.address}
                    className="input-field"
                  />
                </div>

                <textarea
                  name="note"
                  placeholder="هل لديك أي ملاحظات أو طلبات خاصة؟ (اختياري)"
                  onChange={handleInputChange}
                  value={formData.note}
                  className="input-field w-full"
                  rows="3"
                ></textarea>

                <div className="space-y-2 pt-2">
                  <label className="text-sm font-medium text-slate-700">
                    ارفع صور للمكان (اختياري)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="file"
                      name="image_1"
                      onChange={handleFileChange}
                      className="input-file"
                    />
                    <input
                      type="file"
                      name="image_2"
                      onChange={handleFileChange}
                      className="input-file"
                    />
                    <input
                      type="file"
                      name="image_3"
                      onChange={handleFileChange}
                      className="input-file"
                    />
                  </div>
                </div>
                {submitStatus === "error" && (
                  <p className="text-red-600 text-sm text-center">
                    حدث خطأ. يرجى المحاولة مرة أخرى.
                  </p>
                )}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex justify-center mt-4 bg-brand-pink text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:bg-slate-400"
                >
                  {isSubmitting ? <Spinner /> : "تأكيد الطلب"}
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Modal>
  );
}

export default DecorationFormModal;
