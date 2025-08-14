// src/components/BookingForm.jsx

import React, { useState, useMemo } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';
// ** سنبقي على format و isValid فقط من date-fns **
import { format, isValid } from 'date-fns'; 
import { ar } from 'date-fns/locale';

// ... (Spinner و SuccessIcon و Modal.setAppElement كما هي) ...
const Spinner = () => ( <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>);
const SuccessIcon = () => ( <svg className="w-20 h-20 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><motion.circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, ease: 'easeOut' }} /><motion.path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 13l3 3 7-7" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }} /></svg>);

function BookingForm({ isOpen, onClose, propertyId, availableDates = [] }) {
    const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '', phone: '', date: '', note: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [error, setError] = useState('');

    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const resetForm = () => { /* ... */ setFormData({ first_name: '', last_name: '', email: '', phone: '', date: '', note: '' }); setSubmitStatus(null); setError(''); };
    const handleClose = () => { /* ... */ resetForm(); onClose(); };
    const handleSubmit = async (e) => { /* ... (الكود كما هو) ... */ e.preventDefault(); setIsSubmitting(true); setError(''); setSubmitStatus(null); const API_URL = ` http://localhost:5000/app/website/create_booking/${propertyId}`; try { await axios.post(API_URL, formData); setSubmitStatus('success'); setTimeout(handleClose, 2500); } catch (error) { console.error('Booking failed:', error); setSubmitStatus('error'); setError('حدث خطأ. يرجى التأكد من بياناتك والمحاولة مرة أخرى.'); } finally { setIsSubmitting(false); } };

    // ===================== هذا هو السطر الذي تم تعديله =====================
    const validAndFormattedDates = useMemo(() => {
        return availableDates
            // ** التغيير هنا: استخدام new Date() بدلاً من parseISO() **
            .map(dateStr => ({ original: dateStr, parsed: new Date(dateStr) }))
            .filter(dateObj => isValid(dateObj.parsed)) // نتأكد أن التاريخ صالح
            .map(dateObj => ({
                value: dateObj.original, // القيمة التي سترسل للباك-إند
                label: format(dateObj.parsed, 'eeee, d MMMM yyyy', { locale: ar }) // النص الذي سيراه المستخدم
            }));
    }, [availableDates]);
    // ======================================================================

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 50 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 15, stiffness: 200 } },
        exit: { opacity: 0, scale: 0.95, y: -50, transition: { duration: 0.3 } }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleClose}
            className="modal-content-container"
            overlayClassName="fixed inset-0 bg-black/70 z-[70] flex items-center justify-center p-4"
            contentLabel="Booking Form Modal"
            closeTimeoutMS={300}
            ariaHideApp={false}
        >
            <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-auto relative"
            >
                {/* ... (بقية الكود JSX كما هو تماماً) ... */}
                <motion.button whileHover={{ scale: 1.2, rotate: 90 }} onClick={handleClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 transition-colors z-10">
                    <XMarkIcon className="w-6 h-6" />
                </motion.button>
                <AnimatePresence mode="wait">
                    {submitStatus === 'success' ? (
                        <motion.div key="success" /* ... */>
                           {/* ... */}
                        </motion.div>
                    ) : (
                        <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <h2 className="text-3xl font-bold font-brand mb-6 text-center text-slate-800">طلب معاينة عقار</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* ... (حقول الاسم والإيميل والهاتف) ... */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="first_name" className="label-style">الاسم الأول</label>
                                        <input type="text" name="first_name" id="first_name" required value={formData.first_name} onChange={handleInputChange} className="input-field" />
                                    </div>
                                    <div>
                                        <label htmlFor="last_name" className="label-style">الاسم الأخير</label>
                                        <input type="text" name="last_name" id="last_name" required value={formData.last_name} onChange={handleInputChange} className="input-field" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="label-style">البريد الإلكتروني</label>
                                    <input type="email" name="email" id="email" required value={formData.email} onChange={handleInputChange} className="input-field" />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="label-style">رقم الهاتف</label>
                                    <input type="tel" name="phone" id="phone" required value={formData.phone} onChange={handleInputChange} className="input-field" />
                                </div>
                                
                                <div>
                                    <label htmlFor="date" className="label-style">
                                        اختر تاريخًا متاحًا
                                    </label>
                                    <select
                                        name="date"
                                        id="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        required
                                        className="input-field"
                                    >
                                        <option value="" disabled>-- حدد موعدًا من القائمة --</option>
                                        {validAndFormattedDates.length > 0 ? (
                                            validAndFormattedDates.map(date => (
                                                <option key={date.value} value={date.value}>
                                                    {date.label}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="" disabled>لا توجد مواعيد متاحة حالياً</option>
                                        )}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="note" className="label-style">ملاحظات (اختياري)</label>
                                    <textarea name="note" id="note" rows="3" value={formData.note} onChange={handleInputChange} className="input-field"></textarea>
                                </div>

                                <AnimatePresence>
                                    {error && (
                                        <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="text-red-600 bg-red-50 p-3 rounded-lg text-sm text-center flex items-center justify-center gap-2">
                                            <ExclamationTriangleIcon className="w-5 h-5" />
                                            {error}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                                <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full flex justify-center mt-4 bg-brand-pink text-white font-bold py-3.5 rounded-lg shadow-lg shadow-pink-500/20 hover:shadow-xl hover:shadow-pink-500/30 transition-all disabled:bg-slate-400 disabled:shadow-none">
                                    {isSubmitting ? <Spinner /> : 'إرسال الطلب'}
                                </motion.button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </Modal>
    );
}

export default BookingForm;