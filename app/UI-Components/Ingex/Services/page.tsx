"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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
    <section className="px-[8%] lg:px-[12%] py-32 service relative bg-white" aria-labelledby="services-heading">

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row gap-10 mb-20 relative z-10">
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
          <h2 id="services-heading" className="text-4xl md:text-8xl font-semibold leading-tight text-black">
            {content.title}{" "}
            <span className="text-[var(--prim)]">{content.titleAccent}</span>{" "}
            {content.titleEnd}
          </h2>
          <p className="text-gray-400 mt-8 text-xl max-w-2xl leading-relaxed">
            {content.description}
          </p>
        </motion.div>
      </div>

      {/* Services List */}
      <div className="flex flex-col relative z-10">
        {content.items.map((item: any, index: number) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="service-card border-b border-gray-300 cursor-pointer py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-10 group transition-all duration-500"
          >
            <div className="flex flex-col md:flex-row w-full md:w-[65%] gap-6 md:gap-16 items-start md:items-center">
              <h4 className="text-5xl font-light text-gray-300 group-hover:text-[var(--prim)] transition-colors">
                {item.number}
              </h4>
              <div className="service-content">
                <h3 className="mb-4 text-3xl md:text-6xl font-medium transition-colors duration-300 group-hover:text-black">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-lg md:text-xl max-w-xl">
                  {item.desc}
                </p>
              </div>
            </div>

            <div className="overflow-hidden h-[200px] md:h-[250px] w-full md:w-[350px] relative rounded-[2rem] border-2 border-transparent group-hover:border-[var(--prim)] transition-all duration-500">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="service-img object-cover rounded-[2rem] transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 350px"
              />
            </div>

            <div className="text-4xl transition-all duration-300 text-gray-300 group-hover:text-[var(--prim)]">
              <i className={`bi bi-arrow-up-${lang === 'en' ? 'right' : 'left'} group-hover:rotate-45 transition-transform`}></i>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
