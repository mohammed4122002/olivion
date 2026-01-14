"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import navEn from "@/app/JsonData/en/navLink.json";
import navAr from "@/app/JsonData/ar/navLink.json";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const updateLang = () => setLang(document.documentElement.lang || "en");
    updateLang();
    const observer = new MutationObserver(updateLang);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    return () => observer.disconnect();
  }, []);

  const nav = lang === "ar" ? (navAr as any) : (navEn as any);

  return (
    <footer className={`bg-black text-white pt-24 pb-12 ${lang === "ar" ? "text-right" : "text-left"}`}>
      <div className="px-[8%] lg:px-[12%]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="flex flex-col gap-8">
            <Link href="/" className="text-4xl font-bold Audiowide group">
              Oli<span className="text-[var(--prim)] group-hover:text-white transition-colors">vion</span>
            </Link>
            <p className="text-gray-400 text-lg leading-relaxed max-w-xs">
              {lang === 'en'
                ? "Crafting premium interior spaces that inspire and elevate your lifestyle."
                : "نبتكر مساحات داخلية فاخرة تلهم وترتقي بأسلوب حياتك."}
            </p>
            <div className="flex gap-4">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, backgroundColor: '#caa05c', color: '#000' }}
                  className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 transition-all"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-8 uppercase tracking-widest text-[var(--prim)]">
              {lang === "ar" ? "روابط سريعة" : "Quick Links"}
            </h4>
            <ul className="space-y-4">
              {nav.map((item: any) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-gray-400 hover:text-white hover:translate-x-2 transition-all inline-block text-lg">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-8 uppercase tracking-widest text-[var(--prim)]">
              {lang === "ar" ? "خدماتنا" : "Our Services"}
            </h4>
            <ul className="space-y-4 text-gray-400 text-lg">
              {lang === 'en' ? (
                <>
                  <li className="hover:text-white transition-colors cursor-pointer">Interior Design</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Furniture Planning</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Consultation</li>
                  <li className="hover:text-white transition-colors cursor-pointer">3D Visualization</li>
                </>
              ) : (
                <>
                  <li className="hover:text-white transition-colors cursor-pointer">التصميم الداخلي</li>
                  <li className="hover:text-white transition-colors cursor-pointer">تخطيط الأثاث</li>
                  <li className="hover:text-white transition-colors cursor-pointer">الاستشارات</li>
                  <li className="hover:text-white transition-colors cursor-pointer">التصور ثلاثي الأبعاد</li>
                </>
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-8 uppercase tracking-widest text-[var(--prim)]">
              {lang === "ar" ? "تواصل معنا" : "Contact Info"}
            </h4>
            <div className="space-y-6 text-gray-400 text-lg">
              <div className="flex items-start gap-4">
                <i className="ri-map-pin-line text-[var(--prim)] text-2xl"></i>
                <p>123 Luxury Ave, Dubai, UAE</p>
              </div>
              <div className="flex items-start gap-4">
                <i className="ri-phone-line text-[var(--prim)] text-2xl"></i>
                <p>+971 123 456 789</p>
              </div>
              <div className="flex items-start gap-4">
                <i className="ri-mail-line text-[var(--prim)] text-2xl"></i>
                <p>info@olivion.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-12 text-gray-500 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-lg">
            © {new Date().getFullYear()} <span className="text-white font-bold">Olivion</span>. {lang === "ar" ? "جميع الحقوق محفوظة" : "All rights reserved"}.
          </p>
          <div className="flex gap-8 text-lg">
            <a href="#" className="hover:text-white transition-colors">{lang === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}</a>
            <a href="#" className="hover:text-white transition-colors">{lang === "ar" ? "الشروط والأحكام" : "Terms & Conditions"}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
