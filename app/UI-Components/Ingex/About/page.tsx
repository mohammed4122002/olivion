"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import CountUp from "react-countup";

// استيراد الصور
import AboutImg1 from "@/public/About-1.jpg";
import AboutImg2 from "@/public/About-2.jpg";
import AboutImg3 from "@/public/About-3.jpg";

// استيراد ملفات الترجمة
import aboutEn from "@/app/JsonData/en/about.json";
import aboutAr from "@/app/JsonData/ar/about.json";

const About = () => {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const updateLang = () => setLang(document.documentElement.lang || "en");
    updateLang();
    const observer = new MutationObserver(updateLang);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });
    return () => observer.disconnect();
  }, []);

  // جلب البيانات بناءً على اللغة
  const content = lang === "ar" ? aboutAr.about : aboutEn.about;

  if (!content) return null;

  return (
    <section className="py-20 overflow-hidden" aria-labelledby="about-heading">
      <div className="px-[8%] lg:px-[12%] about">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-1/3 title pt-8">
            <span className="rounded-full title-span border border-gray-400 px-6 py-2 uppercase font-bold text-sm tracking-widest text-gray-700">
              {content.badge}
            </span>
          </div>
          <div className="w-full lg:w-2/3">
            <h2
              id="about-heading"
              className="text-4xl md:text-7xl font-semibold leading-tight text-black"
            >
              {content.title}{" "}
              <span className="text-[var(--prim)]">{content.titleAccent}</span>{" "}
              {content.titleEnd}
            </h2>
          </div>
        </div>

        {/* شبكة الصور */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-20">
          {[AboutImg1, AboutImg2, AboutImg3].map((img, idx) => (
            <div
              key={idx}
              className={`about-image ${
                idx === 1 ? "lg:pt-10" : idx === 2 ? "lg:pt-20" : ""
              }`}
            >
              <Image
                src={img}
                alt={
                  lang === "en"
                    ? `Gallery image ${idx + 1}`
                    : `صورة المعرض ${idx + 1}`
                }
                className="rounded-3xl shadow-2xl transition-all duration-500 hover:-translate-y-2 object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="px-[8%] lg:px-[12%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pt-24 pb-10">
        {content?.stats?.map(
          (
            stat: {
              value: number;
              suffix: string;
              title: string;
              desc: string;
            },
            index: number
          ) => (
            <div key={index} className="about-card group">
              <div className="text-5xl tracking-wide font-bold mb-6 text-black flex items-center gap-1">
                {/* الحل: إضافة شرط التأكد من وجود القيمة قبل رندرة CountUp */}
                {stat.value !== undefined && stat.value !== null ? (
                  <CountUp
                    start={0}
                    end={Number(stat.value)}
                    duration={3}
                    enableScrollSpy
                    scrollSpyOnce={true} // لمنع تكرار الخطأ عند السكرول
                  />
                ) : (
                  <span>0</span>
                )}

                <span className="text-(--prim)">{stat.suffix}</span>
              </div>

              <div className="about-content py-6 border-t border-gray-400/50">
                <h3 className="mb-3 text-2xl font-bold text-gray-900">
                  {stat.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{stat.desc}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default About;
