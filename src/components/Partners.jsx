import React, { useState, useEffect } from "react";
import axios from "axios";
import PartnerCard from "./PartnerCard";

const API_URL = "https://akarat-six.vercel.app/app/website/get_all_partners";

function Partners() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await axios.get(API_URL);
        setPartners(response.data);
      } catch (err) {
        console.error("خطأ في جلب بيانات الشركاء:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  if (loading) {
    return (
      <section className="bg-slate-50 py-20 text-center">
        <p className="text-slate-500">جاري تحميل بيانات الشركاء...</p>
      </section>
    );
  }

  return (
    <section className="bg-slate-50 py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-brand">
            شركاء النجاح
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            نفخر بالتعاون مع نخبة من أفضل الشركات لتحقيق رؤى عملائنا.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {partners.map((partner) => (
            <PartnerCard key={partner._id} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Partners;
