"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import testimonialEn from "@/app/JsonData/en/testimonial.json";
import testimonialAr from "@/app/JsonData/ar/testimonial.json";

const Testimonial = () => {
    const [lang, setLang] = useState("en");

    useEffect(() => {
        const updateLang = () => setLang(document.documentElement.lang || "en");
        updateLang();
        const observer = new MutationObserver(updateLang);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
        return () => observer.disconnect();
    }, []);

    const content = lang === "ar" ? testimonialAr.testimonial : testimonialEn.testimonial;

    if (!content) return null;

    return (
        <section className="py-32 px-[8%] lg:px-[12%] bg-[#fcfcfc] overflow-hidden">
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

            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                    768: { slidesPerView: 2 }
                }}
                className="testimonial-swiper !pb-20"
            >
                {content.items.map((item: any) => (
                    <SwiperSlide key={item.id}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-white p-12 rounded-[3rem] shadow-xl border border-gray-50 relative h-full"
                        >
                            <div className="text-[var(--prim)] text-6xl mb-8 opacity-20">
                                <i className="ri-double-quotes-l"></i>
                            </div>
                            <p className="text-xl md:text-2xl text-gray-600 mb-10 italic leading-relaxed">
                                "{item.content}"
                            </p>
                            <div className="flex items-center gap-5">
                                <div className="w-16 h-16 rounded-full overflow-hidden relative border-2 border-[var(--prim)]">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                        unoptimized // Use unoptimized for placeholder images
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-xl text-black">{item.name}</h4>
                                    <p className="text-[var(--prim)] font-medium">{item.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Testimonial;
