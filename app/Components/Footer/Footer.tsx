"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import navEn from "@/app/JsonData/en/navLink.json";
import navAr from "@/app/JsonData/ar/navLink.json";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

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
    <footer className={`bg-[#111] text-gray-200 pt-12 pb-8 ${lang === "ar" ? "text-right" : "text-left"}`}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          <div className="w-full md:w-1/3">
            <h3 className="text-2xl font-bold text-white mb-4">Olivion</h3>
            <p className="text-gray-400">Modern digital solutions that craft beautiful experiences.</p>
          </div>

          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold text-white mb-4">{lang === "ar" ? "روابط" : "Links"}</h4>
            <ul className="space-y-2">
              {nav.slice(0, 6).map((item: any) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-400 hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold text-white mb-4">{lang === "ar" ? "تابعنا" : "Follow Us"}</h4>
            <div className="flex gap-3">
              <a href="#" aria-label="facebook" className="p-2 bg-gray-800 rounded text-white"><FaFacebookF /></a>
              <a href="#" aria-label="twitter" className="p-2 bg-gray-800 rounded text-white"><FaTwitter /></a>
              <a href="#" aria-label="instagram" className="p-2 bg-gray-800 rounded text-white"><FaInstagram /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-sm text-gray-500">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <span>© {new Date().getFullYear()} Olivion. {lang === "ar" ? "كل الحقوق محفوظة" : "All rights reserved"}.</span>
            <span className="hidden sm:inline">{lang === "ar" ? "تصميم باحتراف" : "Designed with care."}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;