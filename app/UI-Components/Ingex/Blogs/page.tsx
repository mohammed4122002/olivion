"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import blogsEn from "@/app/JsonData/en/blogs.json";
import blogsAr from "@/app/JsonData/ar/blogs.json";

const Blogs = () => {
    const [lang, setLang] = useState("en");

    useEffect(() => {
        const updateLang = () => setLang(document.documentElement.lang || "en");
        updateLang();
        const observer = new MutationObserver(updateLang);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
        return () => observer.disconnect();
    }, []);

    const content = lang === "ar" ? blogsAr.blogs : blogsEn.blogs;

    if (!content) return null;

    return (
        <section className="py-32 px-[8%] lg:px-[12%] bg-[#fcfcfc]">
            <div className="flex flex-col lg:flex-row gap-10 mb-20 items-end">
                <div className="w-full lg:w-1/3">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="rounded-full title-span border border-gray-400 px-6 py-2 uppercase font-bold text-sm tracking-widest text-gray-700 mb-8 inline-block">
                            {content.badge}
                        </span>
                        <h2 className="text-4xl md:text-7xl font-semibold leading-tight text-black">
                            {content.title} <span className="text-[var(--prim)]">{content.titleAccent}</span>
                        </h2>
                    </motion.div>
                </div>
                <div className="w-full lg:w-2/3 flex justify-end">
                    <Link href="/blog" className="text-xl font-bold border-b-2 border-black pb-1 hover:text-[var(--prim)] hover:border-[var(--prim)] transition-all">
                        {lang === 'en' ? 'View All Posts' : 'عرض كل المقالات'}
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {content.items.map((item: any, index: number) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className="group cursor-pointer"
                    >
                        <div className="relative h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden mb-8 shadow-lg">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                unoptimized
                            />
                            <div className="absolute top-8 left-8 bg-white px-6 py-2 rounded-full font-bold text-sm text-black">
                                {item.date}
                            </div>
                        </div>
                        <div className="px-4">
                            <h3 className="text-3xl md:text-4xl font-bold mb-6 group-hover:text-[var(--prim)] transition-colors leading-tight">
                                {item.title}
                            </h3>
                            <Link href={item.link} className="inline-flex items-center gap-2 text-lg font-bold uppercase tracking-widest text-gray-500 group-hover:text-black transition-all">
                                {lang === 'en' ? 'Read More' : 'اقرأ المزيد'}
                                <i className={`ri-arrow-${lang === 'en' ? 'right' : 'left'}-line text-xl`}></i>
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Blogs;
