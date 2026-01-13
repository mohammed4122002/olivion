"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// أنماط Swiper
import "swiper/css";

// استيراد الترجمة
import expertiseEn from "@/app/JsonData/en/expertise.json";
import expertiseAr from "@/app/JsonData/ar/expertise.json";

const Expertise = () => {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const updateLang = () => setLang(document.documentElement.lang || "en");
    updateLang();
    const observer = new MutationObserver(updateLang);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    return () => observer.disconnect();
  }, []);

  const content = lang === "ar" ? expertiseAr.expertise : expertiseEn.expertise;

  if (!content) return null;

  return (
    <section dir={lang === "ar" ? "rtl" : "ltr"} className="expertise bg-[#241c18] mt-20 pb-10 md:pb-[35%] px-[8%] lg:px-[12%] relative ">
      
      {/* الرأس (Header) */}
      <div className="flex flex-col  gap-10 md:py-20 pt-10">
        <div className="w-full lg:w-1/3 pt-8">
          <span className="rounded-full title-span border border-gray-400 px-6 py-2 uppercase font-bold text-white text-sm tracking-widest">
            {content.badge}
          </span>
        </div>
        <div className="w-full lg:w-2/3">
          <h2 className={`text-4xl md:text-7xl text-white font-bold leading-tight ${lang === "ar" ? "text-right" : ""}`}>
            {content.title}{" "}
            <span className="text-[var(--prim)]">{content.titleAccent}</span>{" "}
            {content.titleEnd}
          </h2>
        </div>
      </div>

      {/* شبكة الخبرات (Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 relative ">
        {content.items.map((item, index) => (
          <div
            key={item.id}
            className="expertise-card group"
               style={{ marginTop: `${index * 40}px` }}
          >
            <div className="expertise-image relative h-[300px] mb-6 overflow-hidden rounded-2xl border border-gray-700">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="expertise-info">
              <h3 className={`text-2xl text-white border-b border-gray-500/30 pb-4 mb-4 font-medium leading-snug min-h-[4rem] ${lang === "ar" ? "text-right" : ""}`}>
                  {item.title}
                </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* شريط الصور المتحرك (The Absolute Slider) */}
      <div className="expertise-slider  hidden md:block" dir={lang === "ar" ? "rtl" : "ltr"}>
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          modules={[Autoplay]}
          speed={2000}
          className="h-full w-full"
        >
          {content.slides.map((slide: string, i: number) => (
            <SwiperSlide key={i}>
              <div className="relative h-full w-full">
                <Image 
                  src={slide} 
                  alt="Slide item" 
                  fill 
                  className="object-cover animate-scale" // الكلاس المرتبط بـ Keyframes
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </section>
  );
};

export default Expertise;