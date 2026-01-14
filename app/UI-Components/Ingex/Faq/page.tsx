"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import faqEn from "@/app/JsonData/en/faq.json";
import faqAr from "@/app/JsonData/ar/faq.json";

const Faq = () => {
    const [lang, setLang] = useState("en");
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    useEffect(() => {
        const updateLang = () => setLang(document.documentElement.lang || "en");
        updateLang();
        const observer = new MutationObserver(updateLang);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
        return () => observer.disconnect();
    }, []);

    const content = lang === "ar" ? faqAr.faq : faqEn.faq;

    if (!content) return null;

    return (
        <section className="py-32 px-[8%] lg:px-[12%] bg-white">
            <div className="flex flex-col lg:flex-row gap-20">
                <div className="w-full lg:w-1/3">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="rounded-full title-span border border-gray-400 px-6 py-2 uppercase font-bold text-sm tracking-widest text-gray-700 mb-8 inline-block">
                            {content.badge}
                        </span>
                        <h2 className="text-4xl md:text-6xl font-semibold leading-tight text-black mb-6">
                            {content.title} <span className="text-[var(--prim)]">{content.titleAccent}</span>
                        </h2>
                        <p className="text-gray-500 text-lg leading-relaxed">
                            We answer some of the most common questions our clients ask us. If you have more questions, feel free to contact us.
                        </p>
                    </motion.div>
                </div>

                <div className="w-full lg:w-2/3 space-y-4">
                    {content.items.map((item: any, index: number) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`rounded-3xl border transition-all duration-300 ${activeIndex === index ? 'border-[var(--prim)] bg-gray-50' : 'border-gray-100 hover:border-gray-300'
                                }`}
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full flex justify-between items-center p-8 text-left rtl:text-right"
                            >
                                <span className="text-xl md:text-2xl font-bold text-black">{item.question}</span>
                                <span className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${activeIndex === index ? 'bg-[var(--prim)] text-white rotate-180' : 'bg-gray-100 text-black'
                                    }`}>
                                    <i className="ri-arrow-down-s-line"></i>
                                </span>
                            </button>
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-8 pt-0 text-lg text-gray-600 border-t border-gray-100 mt-2">
                                            {item.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Faq;
