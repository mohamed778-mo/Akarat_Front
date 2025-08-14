
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { MapPinIcon, BuildingOfficeIcon, TagIcon } from '@heroicons/react/24/outline';
import PropertyCard from '../../components/PropertyCard';
import SkeletonCard from '../../components/SkeletonCard';
import EmptyState from '../../components/EmptyState';
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const cardVariants = { hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }, exit: { y: -30, opacity: 0, transition: { duration: 0.3 } } };

function RealEstatePage() {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({ location: '', status_of_sale: '', type: '' });
  const [filterOptions, setFilterOptions] = useState({ locations: [], types: [], statuses: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const debouncedFilters = useDebounce(filters, 500); 
  
  const pageUrl = "http://onlyhelio.egyptge.com/real-estate"; 

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        // ملاحظة: يُفضل إنشاء API endpoint مخصص لهذا الغرض
        // كحل مؤقت، سنقوم بجلب كل شيء مرة واحدة للحصول على الخيارات
        const response = await axios.post('https://akarat-six.vercel.app/app/website/filter_departments', {});
        const allProps = response.data;
        const locations = [...new Set(allProps.map(p => p.location).filter(Boolean))];
        const types = [...new Set(allProps.map(p => p.type).filter(Boolean))];
        const statuses = [...new Set(allProps.map(p => p.status_of_sale).filter(Boolean))];
        setFilterOptions({ locations, types, statuses });
      } catch (err) {
        console.error("Failed to fetch filter options:", err);
      }
    };
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    const fetchFilteredProperties = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post('https://akarat-six.vercel.app/app/website/filter_departments', debouncedFilters);
        const sortedProperties = response.data.sort((a, b) => 
          new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );
        setProperties(sortedProperties);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("عذراً، حدث خطأ أثناء تحميل العقارات. يرجى المحاولة مرة أخرى.");
      } finally {
        setLoading(false);
      }
    };
    fetchFilteredProperties();
  }, [debouncedFilters]);

  const handleFilterChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleResetFilters = () => {
    setFilters({ location: '', status_of_sale: '', type: '' });
  };
  
  const hasActiveFilters = useMemo(() => 
    Object.values(filters).some(value => value !== ''), 
    [filters]
  );

  return (
    <>
      <Helmet>
        <title>تصفح العقارات | شقق وفلل للبيع والإيجار</title>
        <meta name="description" content="اكتشف مجموعة واسعة من العقارات المتاحة للبيع والإيجار. استخدم فلاتر البحث للعثور على شقتك أو فيلتك المثالية اليوم." />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content="تصفح العقارات | شقق وفلل للبيع والإيجار" />
        <meta property="og:description" content="اكتشف مجموعة واسعة من العقارات المتاحة للبيع والإيجار." />
        <meta property="og:url" content={pageUrl} />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "تصفح العقارات",
            "description": "قائمة بالعقارات المتاحة للبيع والإيجار.",
            "url": "${pageUrl}"
          }
        `}</script>
      </Helmet>

      <main className="bg-slate-50 py-12 min-h-screen">
        <div className="container mx-auto max-w-7xl px-6">
          <h1 className="text-4xl font-bold font-brand text-slate-800 mb-8 text-center">تصفح كل العقارات</h1>
          
          <div className="bg-white p-6 rounded-xl shadow-md mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
              {[
                { name: 'location', label: 'كل المواقع', icon: MapPinIcon, options: filterOptions.locations },
                { name: 'type', label: 'كل الأنواع', icon: BuildingOfficeIcon, options: filterOptions.types },
                { name: 'status_of_sale', label: 'كل الحالات', icon: TagIcon, options: filterOptions.statuses }
              ].map(({ name, label, icon, options }) => (
                <div key={name} className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    {React.createElement(icon, { className: "h-5 w-5 text-slate-400" })}
                  </div>
                  <select name={name} value={filters[name]} onChange={handleFilterChange} className="w-full p-3 pl-10 rounded-lg border-slate-300 bg-slate-50 appearance-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400">
                      <option value="">{label}</option>
                      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              ))}
              <button onClick={handleResetFilters} className="w-full bg-slate-800 text-white p-3 rounded-lg hover:bg-slate-700 transition-colors disabled:bg-slate-400" disabled={!hasActiveFilters}>
                إعادة تعيين
              </button>
          </div>

          <div className="mb-8">
              <h2 className="text-2xl font-bold font-brand text-slate-700">
                  {hasActiveFilters ? `نتائج البحث (${properties.length})` : 'أحدث العقارات المضافة'}
              </h2>
          </div>
          
          {error ? <div className="text-center py-20 text-red-500">{error}</div> : 
           <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
           >
            {loading ? 
              Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />) : 
              <AnimatePresence>
                  {properties.length === 0 ? 
                      <EmptyState message="لا توجد عقارات تطابق بحثك. جرّب تغيير فلاتر البحث." /> :
                      properties.map((property) => (
                          <PropertyCard key={property._id} property={property} variants={cardVariants} />
                      ))
                  }
              </AnimatePresence>
            }
           </motion.div>
          }
        </div>
      </main>
    </>
  );
}

export default RealEstatePage;