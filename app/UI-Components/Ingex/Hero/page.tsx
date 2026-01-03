"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// أنماط Swiper
import "swiper/css";

// استيراد الصور
import HeroImg from "@/public/Hero-img.jpg";
import HeroImg2 from "@/public/hero-img2.jpg";
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

  // التعديل هنا: الوصول إلى .hero لأن ملف الـ JSON يبدأ بـ { "hero": { ... } }
  const content = lang === "ar" ? heroAr.hero : heroEn.hero;

  // تأكد من أن البيانات موجودة لتجنب أي خطأ قبل الرندر
  if (!content) return null;

  return (
    <>
      <div className="hero mt-30 lg:mt-0 relative overflow-hidden">
        <div className="hero-bg-elm"></div>
        <div className="hero-bg-elm2"></div>

        <div className="w-full px-[8%] lg:px-[12%] py-10 relative z-10">
          <div className="flex flex-col lg:flex-row gap-10 justify-between items-center">
            <div className="w-full lg:w-1/2 relative">
              <div className="flex flex-col items-start">
                <span className="hero-span border border-gray-400 font-bold py-2 pe-6 rounded-full text-sm lg:text-base">
                  {content.badge}
                </span>

                <h1 className="text-5xl lg:text-8xl font-bold my-6 leading-tight text-black">
                  {content.title}{" "}
                  <span className="text-[var(--prim)]">
                    {content.titleAccent}
                  </span>
                </h1>

                <p className="text-gray-600 text-lg mb-8 max-w-lg">
                  {content.desc}
                </p>

                <Link
                  href="/"
                  aria-label={
                    lang === "en"
                      ? "Get started with our interior design services"
                      : "ابدأ الآن مع خدمات التصميم الداخلي لدينا"
                  }
                  className="inline-flex items-center gap-3 border border-gray-500/50 px-8 py-4 rounded-full font-semibold hover:bg-[var(--prim)] hover:text-white hover:border-transparent transition-all duration-300 cursor-pointer"
                >
                  {content.btn}
                  <i
                    className={`bi ${
                      lang === "en" ? "bi-arrow-right" : "bi-arrow-left"
                    } text-xl`}
                    aria-hidden="true"
                  ></i>
                </Link>
              </div>
            </div>

            <div className="w-full lg:w-1/2 relative">
              <div className="relative w-full h-[400px] lg:h-[600px] z-0">
                <Image
                  src={HeroImg}
                  alt={
                    lang === "en"
                      ? "Elegant interior design with luxury furniture"
                      : "تصميم داخلي أنيق مع أثاث فاخر"
                  }
                  fill
                  priority
                  className="object-cover rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-[8%] lg:px-[12%] pb-20" dir={"ltr"}>
        <Swiper
          slidesPerView={2}
          spaceBetween={40}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          modules={[Autoplay]}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
        >
          {Partners.map((partner, index) => (
            <SwiperSlide
              key={index}
              className="flex justify-center items-center"
            >
              <Image
                src={partner}
                alt={lang === "en" ? "Partner Logo" : "شعار الشركات    "}
                className="partner-img grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500 cursor-pointer"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Hero;
