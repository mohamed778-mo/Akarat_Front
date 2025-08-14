// src/pages/NeighborhoodPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { BuildingOffice2Icon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

import PropertyCard from '../../components/PropertyCard'; 
const PropertyCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md animate-pulse">
    <div className="w-full h-48 bg-slate-200 rounded-t-lg"></div>
    <div className="p-4 space-y-3">
      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
      <div className="h-3 bg-slate-200 rounded w-1/2"></div>
      <div className="h-3 bg-slate-200 rounded w-1/4"></div>
    </div>
  </div>
);

// UX: مكون الهيكل العظمي للصفحة كاملة
const PageSkeleton = () => (
  <div className="container mx-auto max-w-7xl px-6 py-12">
    <div className="mb-12">
      <div className="h-10 bg-slate-300 rounded w-1/3 mb-3 animate-pulse"></div>
      <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => <PropertyCardSkeleton key={i} />)}
    </div>
  </div>
);


function NeighborhoodPage() {
  const { neighborhoodId } = useParams();

  const [properties, setProperties] = useState([]);
  const [neighborhoodName, setNeighborhoodName] = useState(''); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const pageUrl = `http://onlyhelio.egyptge.com/neighborhood/${neighborhoodId}`; 

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!neighborhoodId) {
      setError("لم يتم تحديد الحي المطلوب.");
      setLoading(false);
      return;
    }

    const fetchProperties = async () => {
      setLoading(true);
      setError(null);
      const API_URL = `https://akarat-six.vercel.app/app/website/get_all_departments_in_neighborhood/${neighborhoodId}`;
      try {
        const response = await axios.get(API_URL);
        const data = response.data;
        setProperties(data);
        
        if (data && data.length > 0 && data[0].neighborhood && data[0].neighborhood.name) {
          setNeighborhoodName(data[0].neighborhood.name);
        } else {
          setNeighborhoodName('الحي المحدد'); 
        }
      } catch (err) {
        console.error("Failed to fetch properties:", err);
        setError("عذراً، لم نتمكن من تحميل العقارات لهذا الحي.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [neighborhoodId]);

  // SEO:
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `عقارات للبيع في ${neighborhoodName}`,
    "description": `تصفح أفضل العقارات والشقق المتاحة للبيع في حي ${neighborhoodName}.`,
    "url": pageUrl,
    "itemListElement": properties.map((prop, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": prop.name || `عقار في ${neighborhoodName}`,
        "url": `${pageUrl}/${prop._id}`, 
        "image": prop.images ? prop.images[0] : ''
      }
    }))
  };

  if (loading) {
    return <PageSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-24 flex flex-col items-center justify-center">
        <ExclamationTriangleIcon className="w-16 h-16 text-red-400 mb-4" />
        <h2 className="text-2xl font-bold text-slate-700">حدث خطأ</h2>
        <p className="text-red-500 mt-2">{error}</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`عقارات للبيع في حي ${neighborhoodName || '...'}`}</title>
        <meta name="description" content={`اكتشف أفضل الشقق والعقارات المتاحة للبيع في حي ${neighborhoodName}. عروض حصرية وأسعار مميزة.`} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={`عقارات للبيع في حي ${neighborhoodName}`} />
        <meta property="og:description" content={`اكتشف أفضل الشقق والعقارات المتاحة للبيع في حي ${neighborhoodName}.`} />
        <meta property="og:url" content={pageUrl} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <main className="bg-slate-50 py-12 min-h-screen">
        <div className="container mx-auto max-w-7xl px-6">
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold font-brand text-slate-800">
              العقارات المتاحة في {neighborhoodName}
            </h1>
            <p className="text-slate-500 mt-2">تصفح أحدث الوحدات المتوفرة في هذا الحي.</p>
          </motion.div>

          {properties.length === 0 ? (
            <div className="text-center bg-white p-12 rounded-lg shadow-sm flex flex-col items-center">
              <BuildingOffice2Icon className="w-16 h-16 text-slate-400 mb-4" />
              <h2 className="text-2xl font-bold text-slate-700">لا توجد نتائج</h2>
              <p className="text-slate-500 mt-2">لا توجد عقارات متاحة للعرض في هذا الحي حالياً. يرجى المحاولة لاحقاً.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default NeighborhoodPage;