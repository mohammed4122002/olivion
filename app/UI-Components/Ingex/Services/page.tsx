"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

// استيراد ملفات الترجمة
import servicesEn from "@/app/JsonData/en/services.json";
import servicesAr from "@/app/JsonData/ar/services.json";

const Services = () => {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const updateLang = () => setLang(document.documentElement.lang || "en");
    updateLang();
    const observer = new MutationObserver(updateLang);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    return () => observer.disconnect();
  }, []);

  const content = lang === "ar" ? servicesAr.services : servicesEn.services;

  if (!content) return null;

  return (
    // أضفنا كلاس "service" هنا ليفعل الـ ::before والـ ::after من الـ CSS الخاص بك
    <section className="px-[8%] lg:px-[12%] pt-20 pb-60 service relative " aria-labelledby="services-heading">
      
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row gap-10 mb-16 relative z-10">
        <div className="w-full lg:w-1/3 title pt-8">
          <span className="rounded-full title-span border border-gray-400 px-6 py-2 uppercase font-bold text-sm tracking-widest text-gray-700">
            {content.badge}
          </span>
        </div>
        <div className="w-full lg:w-2/3">
          <h2 id="services-heading" className="text-4xl md:text-7xl font-semibold leading-tight text-black">
            {content.title}{" "}
            <span className="text-[var(--prim)]">{content.titleAccent}</span>{" "}
            {content.titleEnd}
          </h2>
          <p className="text-gray-400 mt-6 text-lg max-w-2xl leading-relaxed">
            {content.description}
          </p>
        </div>
      </div>

      {/* Services List */}
      <div className="flex flex-col relative z-10">
        {content.items.map((item) => (
          <div 
            key={item.id} 
            className="service-card border-b border-gray-400 cursor-pointer py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group transition-all duration-500"
          >
            {/* الجزء الأيسر: الرقم والمحتوى */}
            <div className="flex flex-col md:flex-row w-full md:w-[65%] gap-4 md:gap-12 items-start md:items-center">
              <h4 className="text-4xl font-light text-gray-500">
                {item.number}
              </h4>
              <div className="service-content">
                <h3 className="mb-2 text-3xl md:text-5xl font-medium transition-colors duration-300 group-hover:text-[var(--prim)]">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-lg">
                  {item.desc}
                </p>
              </div>
            </div>

            {/* الجزء الأوسط: الصورة (يتم التحكم بظهورها من الـ CSS) */}
            <div className="overflow-hidden h-[180px] md:h-[210px] w-full md:w-[300px] relative rounded-2xl">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="service-img object-cover rounded-2xl border-2 border-black"
                sizes="(max-width: 768px) 100vw, 300px"
              />
            </div>

            {/* الجزء الأيمن: الأيقونة (يتحول شكلها عند الـ hover بناءً على الـ CSS) */}
            <div className="text-3xl transition-all duration-300">
              <i className="bi bi-arrow-up-right"></i>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;