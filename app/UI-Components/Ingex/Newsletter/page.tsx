"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import newsletterEn from "@/app/JsonData/en/newsletter.json";
import newsletterAr from "@/app/JsonData/ar/newsletter.json";

const Newsletter = () => {
    const [lang, setLang] = useState("en");

    useEffect(() => {
        const updateLang = () => setLang(document.documentElement.lang || "en");
        updateLang();
        const observer = new MutationObserver(updateLang);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
        return () => observer.disconnect();
    }, []);

    const content = lang === "ar" ? newsletterAr.newsletter : newsletterEn.newsletter;

    if (!content) return null;

    return (
        <section className="py-20 px-[8%] lg:px-[12%] pb-40">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-black rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden"
            >
                {/* Background Decorations */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--prim)] opacity-20 blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        {content.title}
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl mb-12">
                        {content.subtitle}
                    </p>

                    <form className="flex flex-col md:flex-row gap-4 bg-white/10 p-2 rounded-3xl md:rounded-full border border-white/20 backdrop-blur-md">
                        <input
                            type="email"
                            placeholder={content.placeholder}
                            className="flex-1 bg-transparent px-8 py-4 text-white outline-none placeholder:text-gray-500 text-lg"
                            required
                        />
                        <button className="bg-[var(--prim)] text-black font-bold px-10 py-4 rounded-2xl md:rounded-full hover:bg-white transition-all duration-300 transform hover:scale-105 active:scale-95">
                            {content.btn}
                        </button>
                    </form>

                    <p className="text-gray-500 mt-8 text-sm">
                        {lang === 'en' ? '* We respect your privacy. No spam.' : '* نحن نحترم خصوصيتك. لا رسائل مزعجة.'}
                    </p>
                </div>
            </motion.div>
        </section>
    );
};

export default Newsletter;
