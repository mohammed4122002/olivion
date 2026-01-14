"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import CountUp from "react-countup";
import { motion } from "framer-motion";

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

  const content = lang === "ar" ? aboutAr.about : aboutEn.about;

  if (!content) return null;

  return (
    <section className="py-32 overflow-hidden bg-white" aria-labelledby="about-heading">
      <div className="px-[8%] lg:px-[12%] about">
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
            <h2
              id="about-heading"
              className="text-4xl md:text-7xl font-semibold leading-tight text-black"
            >
              {content.title}{" "}
              <span className="text-[var(--prim)]">{content.titleAccent}</span>{" "}
              {content.titleEnd}
            </h2>
          </motion.div>
        </div>

        {/* شبكة الصور */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[AboutImg1, AboutImg2, AboutImg3].map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className={`about-image group relative rounded-[3rem] overflow-hidden shadow-2xl ${idx === 1 ? "lg:mt-12" : idx === 2 ? "lg:mt-24" : ""
                }`}
            >
              <Image
                src={img}
                alt={lang === "en" ? `Gallery image ${idx + 1}` : `صورة المعرض ${idx + 1}`}
                className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="px-[8%] lg:px-[12%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pt-40 pb-10">
        {content?.stats?.map((stat: any, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="about-card group"
          >
            <div className="text-6xl tracking-tighter font-black mb-8 text-black flex items-baseline gap-1">
              {stat.value !== undefined && stat.value !== null ? (
                <CountUp
                  start={0}
                  end={Number(stat.value)}
                  duration={3}
                  enableScrollSpy
                  scrollSpyOnce={true}
                >
                  {({ countUpRef }) => (
                    <span ref={countUpRef} />
                  )}
                </CountUp>
              ) : (
                <span>0</span>
              )}
              <span className="text-[var(--prim)]">{stat.suffix}</span>
            </div>

            <div className="py-8 border-t border-gray-200">
              <h3 className="mb-4 text-2xl font-bold text-black uppercase tracking-wide">
                {stat.title}
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed">{stat.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default About;

