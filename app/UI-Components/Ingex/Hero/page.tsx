"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

// أنماط Swiper
import "swiper/css";

// استيراد الصور
import HeroImg from "@/public/Hero-img.jpg";
import partner1 from "@/public/partner1.svg";
import partner2 from "@/public/partner2.svg";
import partner3 from "@/public/partner3.svg";
import partner4 from "@/public/partner4.svg";
import partner5 from "@/public/partner5.svg";
import partner6 from "@/public/partner6.svg";

// استيراد ملفات الترجمة
import heroEn from "@/app/JsonData/en/hero.json";
import heroAr from "@/app/JsonData/ar/hero.json";

const Partners = [partner1, partner2, partner3, partner4, partner5, partner6];

const Hero = () => {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const updateLang = () => {
      const currentLang = document.documentElement.lang || "en";
      setLang(currentLang);
    };

    updateLang();
    const observer = new MutationObserver(updateLang);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });

    return () => observer.disconnect();
  }, []);

  const content = lang === "ar" ? heroAr.hero : heroEn.hero;

  if (!content) return null;

  return (
    <>
      <div className="hero min-h-screen pt-32 lg:pt-0 relative overflow-hidden flex items-center">
        <div className="hero-bg-elm animate-pulse"></div>
        <div className="hero-bg-elm2 animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="w-full px-[8%] lg:px-[12%] relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, x: lang === 'en' ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="flex flex-col items-start">
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="hero-span border border-gray-400 font-bold py-2 pe-6 rounded-full text-sm lg:text-base mb-6"
                >
                  {content.badge}
                </motion.span>

                <motion.h1 
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.4 }}
                   className="text-5xl lg:text-8xl font-bold mb-8 leading-tight text-black"
                >
                  {content.title}{" "}
                  <span className="text-[var(--prim)] relative inline-block">
                    {content.titleAccent}
                    <motion.span 
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ delay: 1, duration: 0.8 }}
                      className="absolute bottom-2 left-0 h-2 bg-[var(--prim)]/20 -z-10"
                    />
                  </span>
                </motion.h1>

                <motion.p 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.6 }}
                   className="text-gray-600 text-lg md:text-xl mb-10 max-w-xl leading-relaxed"
                >
                  {content.desc}
                </motion.p>

                <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: 0.8 }}
                >
                  <Link
                    href="/"
                    aria-label={
                      lang === "en"
                        ? "Get started with our interior design services"
                        : "ابدأ الآن مع خدمات التصميم الداخلي لدينا"
                    }
                    className="group relative inline-flex items-center gap-4 bg-black text-white px-10 py-5 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:pr-14"
                  >
                    <span className="relative z-10">{content.btn}</span>
                    <i
                      className={`bi ${
                        lang === "en" ? "bi-arrow-right" : "bi-arrow-left"
                      } text-xl relative z-10 transition-transform group-hover:translate-x-2`}
                      aria-hidden="true"
                    ></i>
                    <div className="absolute inset-0 bg-[var(--prim)] translate-y-full transition-transform duration-300 group-hover:translate-y-0"></div>
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1, ease: "easeOut" }}
               className="w-full lg:w-1/2 relative"
            >
              <div className="relative w-full h-[450px] lg:h-[650px] z-0 group">
                <Image
                  src={HeroImg}
                  alt={
                    lang === "en"
                      ? "Elegant interior design with luxury furniture"
                      : "تصميم داخلي أنيق مع أثاث فاخر"
                  }
                  fill
                  priority
                  className="object-cover rounded-[2rem] lg:rounded-[4rem] shadow-2xl transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[var(--prim)] rounded-full -z-10 hidden lg:block animate-bounce" style={{ animationDuration: '3s' }}></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="px-[8%] lg:px-[12%] pb-20 mt-10" dir={"ltr"}>
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 1 }}
        >
          <Swiper
            slidesPerView={2}
            spaceBetween={60}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            modules={[Autoplay]}
            breakpoints={{
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
            className="flex items-center"
          >
            {Partners.map((partner, index) => (
              <SwiperSlide
                key={index}
                className="flex justify-center items-center py-5"
              >
                <Image
                  src={partner}
                  alt={lang === "en" ? "Partner Logo" : "شعار الشركات"}
                  className="partner-img grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-500 cursor-pointer max-h-12 w-auto"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </>
  );
};

export default Hero;

