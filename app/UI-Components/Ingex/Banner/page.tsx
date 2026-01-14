"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Banner = () => {
    const [lang, setLang] = useState("en");

    useEffect(() => {
        const updateLang = () => setLang(document.documentElement.lang || "en");
        updateLang();
        const observer = new MutationObserver(updateLang);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
        return () => observer.disconnect();
    }, []);

    return (
        <section className="py-20 px-[8%] lg:px-[12%]">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden flex items-center justify-center text-center px-6"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/banner-bg.jpg')", filter: "brightness(0.6)" }}
                ></div>

                <div className="relative z-10 max-w-4xl">
                    <h2 className="text-4xl md:text-7xl font-bold text-white mb-10 leading-tight">
                        {lang === 'en'
                            ? "Ready to Start Your Interior Project?"
                            : "هل أنت مستعد لبدء مشروعك التصميمي؟"}
                    </h2>
                    <Link
                        href="/contact"
                        className="inline-block bg-[var(--prim)] text-black font-black px-12 py-6 rounded-full text-xl hover:bg-white hover:scale-110 transition-all duration-300"
                    >
                        {lang === 'en' ? "Get in Touch" : "تواصل معنا الآن"}
                    </Link>
                </div>
            </motion.div>
        </section>
    );
};

export default Banner;
