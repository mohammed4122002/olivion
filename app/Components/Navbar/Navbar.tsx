"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
// استيراد البيانات من ملفات الـ JSON
import navLinksEn from "../../JsonData/en/navLink.json";
import navLinksAr from "../../JsonData/ar/navLink.json";

const Navbar = () => {
  // حالة اللغة الافتراضية
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});
  const [isScrolled, setIsScrolled] = useState(false);

  // تحديد القائمة والبيانات بناءً على اللغة المختارة
  const navLinks = lang === "en" ? navLinksEn : navLinksAr;

  const translations = {
    callUs: lang === "en" ? "Call Us now" : "اتصل بنا الآن",
    quote: lang === "en" ? "Get a Quote!" : "طلب سعر",
    langToggle: lang === "en" ? "العربية" : "English"
  };

  // تبديل اللغة وتغيير اتجاه الصفحة (RTL/LTR)
  const toggleLanguage = () => {
    setLang((prev) => (prev === "en" ? "ar" : "en"));
  };

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  // منطق فتح وإغلاق القوائم المنسدلة في الجوال
  const toggleDropdown = (label: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full transition-all duration-500 fixed top-0 left-0 z-[100] ${isScrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg py-3"
          : "bg-transparent py-6"
        }`}
    >
      <div className="flex items-center justify-between px-[8%] lg:px-[12%]">
        <div className="flex items-center gap-10">
          {/** Logo */}
          <Link href="/" className="text-3xl lg:text-4xl font-bold Audiowide text-black group">
            Oli<span className="text-[var(--prim)] group-hover:text-black transition-colors">vion</span>
          </Link>

          {/** Desktop Nav */}
          <nav className="hidden lg:flex space-x-8 rtl:space-x-reverse items-center">
            {navLinks.map((link: any) =>
              link.dropdown ? (
                <div key={link.label} className="relative group z-50">
                  <button className="flex items-center gap-1 text-lg font-medium hover:text-[var(--prim)] transition-all">
                    {link.label}<i className="ri-arrow-down-s-line transition-transform group-hover:rotate-180"></i>
                  </button>
                  <div className={`absolute ${lang === 'en' ? 'left-0' : 'right-0'} top-full pt-6 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-4`}>
                    <div className="bg-white/90 backdrop-blur-xl shadow-2xl border border-gray-100 rounded-2xl min-w-[220px] py-4 p-2">
                      {link.dropdown.map((item: any) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[var(--prim)]/10 hover:text-[var(--prim)] transition-all font-medium"
                        >
                          <span className="w-2 h-2 rounded-full bg-[var(--prim)]"></span>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-lg font-medium hover:text-[var(--prim)] transition-all relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--prim)] transition-all group-hover:w-full"></span>
                </Link>
              )
            )}
          </nav>
        </div>

        {/** Right Section */}
        <div className="flex items-center gap-6">
          {/* زر تبديل اللغة */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-full hover:bg-[var(--prim)] transition-all font-bold text-sm shadow-xl"
          >
            <i className="ri-global-line text-lg"></i>
            {translations.langToggle}
          </button>

          <div className="hidden lg:flex items-center gap-3 border-l border-gray-200 pl-6 rtl:border-l-0 rtl:border-r rtl:pr-6 rtl:pl-0">
            <div className="w-12 h-12 rounded-full bg-[var(--prim)]/10 flex items-center justify-center text-[var(--prim)] text-xl">
              <i className="bi bi-telephone-inbound"></i>
            </div>
            <div className="flex flex-col items-start leading-tight">
              <span className="text-[10px] uppercase tracking-widest text-gray-500">{translations.callUs}</span>
              <h3 className="font-bold text-black text-sm">91+ (123) 456 789</h3>
            </div>
          </div>

          <Link
            href="/contact"
            className="hidden sm:block bg-[var(--prim)] text-black font-bold px-8 py-3.5 rounded-full hover:bg-black hover:text-white transition-all duration-500 shadow-lg hover:shadow-[var(--prim)]/20"
          >
            {translations.quote}
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-2xl transition-all ${mobileMenuOpen ? 'bg-black text-white' : ''}`}
          >
            <i className={mobileMenuOpen ? "ri-close-line" : "ri-menu-3-line"}></i>
          </button>
        </div>
      </div>

      {/** Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden shadow-2xl"
          >
            <div className="px-[8%] py-10 space-y-4">
              {navLinks.map((link: any) => (
                <div key={link.label} className="border-b border-gray-50 pb-4">
                  {link.dropdown ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(link.label)}
                        className="w-full flex justify-between items-center py-2 text-xl font-bold text-black"
                      >
                        {link.label}
                        <i className={`ri-arrow-down-s-line transition-transform ${openDropdowns[link.label] ? 'rotate-180 text-[var(--prim)]' : ''}`}></i>
                      </button>
                      <motion.div
                        initial={false}
                        animate={{ height: openDropdowns[link.label] ? "auto" : 0 }}
                        className="overflow-hidden bg-gray-50 rounded-2xl"
                      >
                        <div className="p-4 space-y-3">
                          {link.dropdown.map((sub: any) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              className="block py-2 text-gray-600 font-medium hover:text-[var(--prim)]"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              - {sub.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className="block py-2 text-xl font-bold text-black hover:text-[var(--prim)]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-6">
                <Link
                  href="/contact"
                  className="w-full block text-center bg-[var(--prim)] text-black font-bold px-8 py-5 rounded-2xl"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {translations.quote}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Navbar;
