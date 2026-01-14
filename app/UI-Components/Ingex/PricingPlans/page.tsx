"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import pricingEn from "@/app/JsonData/en/pricing.json";
import pricingAr from "@/app/JsonData/ar/pricing.json";

const PricingPlans = () => {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const updateLang = () => setLang(document.documentElement.lang || "en");
    updateLang();
    const observer = new MutationObserver(updateLang);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    return () => observer.disconnect();
  }, []);

  const content = lang === "ar" ? pricingAr.pricing : pricingEn.pricing;

  if (!content) return null;

  return (
    <section className='px-[8%] lg:px-[12%] py-32 bg-white relative overflow-hidden'>
      <div className="flex flex-col lg:flex-row gap-10 mb-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/3 title pt-8"
        >
          <span className="rounded-full title-span border border-gray-400 px-6 py-2 uppercase font-bold text-sm tracking-widest text-gray-700">
            {content.badge}
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full lg:w-2/3"
        >
          <h2 className="text-4xl md:text-7xl font-semibold leading-tight text-black">
            {content.title}{" "}
            <span className="text-[var(--prim)]">{content.titleAccent}</span>{" "}
            {content.titleEnd}
          </h2>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Promo Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pricing-wrap h-full min-h-[400px] rounded-[2.5rem] p-10 flex flex-col justify-end"
        >
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight text-white mb-6">
            {content.promoTitle}{" "}
            <span className="text-[var(--prim)]">{content.promoAccent}</span>{" "}
            {content.promoEnd}
          </h2>
          <div className="w-20 h-1 bg-[var(--prim)] rounded-full"></div>
        </motion.div>

        {/* Pricing Cards */}
        {content.plans.map((plan: any, index: number) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className={`group p-10 rounded-[2.5rem] border-2 transition-all duration-500 flex flex-col justify-between ${index === 1 ? 'bg-black text-white border-black scale-105 shadow-2xl z-10' : 'bg-gray-50 border-gray-100 hover:border-[var(--prim)]'
              }`}
          >
            <div>
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black">{plan.price}</span>
                    <span className="text-gray-500 font-medium">/project</span>
                  </div>
                </div>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${index === 1 ? 'bg-[var(--prim)] text-black' : 'bg-white text-[var(--prim)] border border-gray-100'
                  }`}>
                  <i className={`bi ${index === 0 ? 'bi-lightning-charge' : 'bi-gem'}`}></i>
                </div>
              </div>

              <ul className="space-y-4 mb-10">
                {plan.features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-center gap-3">
                    <i className="bi bi-check2-circle text-[var(--prim)] text-xl"></i>
                    <span className={`text-lg ${index === 1 ? 'text-gray-300' : 'text-gray-600'}`}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button className={`w-full py-5 rounded-2xl font-bold text-lg transition-all duration-300 ${index === 1 ? 'bg-white text-black hover:bg-[var(--prim)] hover:text-white' : 'bg-black text-white hover:bg-[var(--prim)] hover:text-white'
              }`}>
              {plan.btn}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default PricingPlans;
