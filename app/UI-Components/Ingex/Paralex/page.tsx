"use client";
import { useEffect, useState, useRef } from "react";
import { useScroll, motion, useTransform } from "framer-motion";

// استيراد الترجمة
import paralexEn from "@/app/JsonData/en/paralex.json";
import paralexAr from "@/app/JsonData/ar/paralex.json";


const Paralex = () => {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const updateLang = () => setLang(document.documentElement.lang || "en");
    updateLang();
    const observer = new MutationObserver(updateLang);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    return () => observer.disconnect();
  }, []);

  const content = lang === "ar" ? paralexAr : paralexEn;

  return (
    <div className="relative">
      {content.items.map((item: any) => (
        <ParalexSection key={item.id} item={item} lang={lang} />
      ))}
    </div>
  );
};

export default Paralex;

function ParalexSection({ item, lang }: { item: any; lang: string }) {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"], // تم تعديل الـ Offset ليكون أكثر دقة مع الـ Sticky
  });

  // التأثيرات: تصغير الخلفية وتلاشيها تدريجياً عند التمرير للأعلى
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const translateY = useTransform(scrollYProgress, [0, 1], [1, 200]);

  return (
    <div ref={ref} className="h-screen w-full sticky top-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          scale,
          y: translateY,
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${item.bg})`,
          zIndex: item.id *1,
        }}
      >
        <div className="flex flex-col justify-between h-full px-[8%] lg:px-[12%] py-20 text-white">
          {/* الجزء العلوي */}
          <div className="flex justify-between items-center">
            <span className="border border-gray-300 px-6 py-2 rounded-full uppercase text-xs font-bold tracking-[0.2em] backdrop-blur-md bg-black/10">
              {item.tag}
            </span>
            <span className="text-7xl font-bold text-[var(--prim)]" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
              {item.number}
            </span>
          </div>

          {/* الجزء السفلي */}
          <div className="max-w-4xl">
            <h2 className="text-6xl md:text-8xl font-bold leading-[1.1] uppercase tracking-tighter">
              {item.title.split('\n').map((line: string, i: number) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <div className={`mt-8 flex flex-col md:flex-row md:items-center gap-6 text-xl tracking-wide ${lang === 'ar' ? 'md:flex-row-reverse justify-end' : ''}`}>
              <p className="font-light opacity-80 uppercase">{item.location}</p>
              <div className="hidden md:block w-12 h-[1px] bg-[var(--prim)]"></div>
              <p className="text-[var(--prim)] font-black">{item.year}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}