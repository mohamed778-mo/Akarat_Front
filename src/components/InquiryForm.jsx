import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";

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

const PaperPlaneIcon = () => (
  <svg
    className="w-20 h-20 text-amber-500"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <motion.path
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 8.25L21 3l-5.25 18L12 15.75l-2.25 2.25L12 15.75 3 8.25z"
      initial={{ pathLength: 0, opacity: 0, rotate: -20 }}
      animate={{ pathLength: 1, opacity: 1, rotate: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    />
    <motion.path
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 15.75L21 3"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
    />
  </svg>
);

function InquiryForm({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const resetForm = () => {
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      message: "",
    });
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
    const API_URL = `https://akarat-six.vercel.app/app/website/create_request`;
    try {
      await axios.post(API_URL, formData);
      setSubmitStatus("success");
      setTimeout(handleClose, 2800);
    } catch (error) {
      console.error("Inquiry failed:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", damping: 15, stiffness: 200 },
    },
    exit: { opacity: 0, scale: 0.95, y: -50, transition: { duration: 0.3 } },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className="modal-content-container"
      overlayClassName="fixed inset-0 bg-black/70 z-[70] flex items-center justify-center p-4"
      contentLabel="Inquiry Form Modal"
      closeTimeoutMS={300}
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-auto relative"
      >
        <motion.button
          whileHover={{ scale: 1.2, rotate: 90 }}
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 transition-colors"
        >
          <XMarkIcon className="w-6 h-6" />
        </motion.button>

        <AnimatePresence mode="wait">
          {submitStatus === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-10 flex flex-col items-center"
            >
              <PaperPlaneIcon />
              <h3 className="text-2xl font-bold text-slate-800 mt-4">
                تم إرسال رسالتك!
              </h3>
              <p className="text-slate-500 mt-1">
                سوف نرد على استفسارك في أقرب وقت. شكراً لتواصلك معنا.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-3xl font-bold font-brand mb-6 text-center text-slate-800">
                إرسال استفسار
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="first_name_inquiry"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      الاسم الأول
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      id="first_name_inquiry"
                      required
                      value={formData.first_name}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="last_name_inquiry"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      الاسم الأخير
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      id="last_name_inquiry"
                      required
                      value={formData.last_name}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email_inquiry"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email_inquiry"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone_inquiry"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone_inquiry"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message_inquiry"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    رسالتك
                  </label>
                  <textarea
                    name="message"
                    id="message_inquiry"
                    rows="4"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="input-field"
                  ></textarea>
                </div>

                <AnimatePresence>
                  {submitStatus === "error" && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="text-red-600 bg-red-50 p-3 rounded-lg text-sm text-center flex items-center justify-center gap-2"
                    >
                      <ExclamationTriangleIcon className="w-5 h-5" />
                      حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex justify-center mt-4 bg-amber-500 text-slate-900 font-bold py-3 rounded-lg shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 transition-all disabled:bg-slate-400 disabled:shadow-none"
                >
                  {isSubmitting ? <Spinner /> : "إرسال الاستفسار"}
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Modal>
  );
}

export default InquiryForm;
