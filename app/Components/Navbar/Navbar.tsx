"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={` w-full transition-all duration-500 fixed top-0 left-0 z-[100] ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-white lg:bg-transparent py-5"
      }`}
    >
      <div className="flex items-center justify-between px-[8%] lg:px-[12%]">
        <div className="flex items-center gap-5">
          {/** Logo */}
          <Link href="/" className="text-4xl lg:text-5xl font-bold Audiowide text-black">
            Oli<span className="text-[var(--prim)]">vion</span>
          </Link>

          {/** Desktop Nav */}
          <nav className="hidden lg:flex space-x-5 rtl:space-x-reverse ms-10">
            {navLinks.map((link: any) =>
              link.dropdown ? (
                <div key={link.label} className="relative group z-50">
                  <button className="flex items-center gap-1 text-xl hover:text-[var(--prim)] transition-all">
                    {link.label}<i className="ri-arrow-down-s-line "></i>
                  </button>
                  <div className={`absolute ${lang === 'en' ? 'left-0' : 'right-0'} top-full pt-4 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300`}>
                    <div className="bg-white shadow-xl border border-gray-100 rounded-lg min-w-[200px] py-2">
                      {link.dropdown.map((item: any) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block px-4 py-2 hover:bg-gray-50 hover:text-[var(--prim)] transition-all"
                        >
                          <i className="bi bi-gear text-xs me-2"></i> {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xl hover:text-[var(--prim)] transition-all"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>

        {/** Right Section */}
        <div className="flex items-center gap-4">
          {/* زر تبديل اللغة */}
          <button 
            onClick={toggleLanguage}
            className="px-3 py-1 border border-[var(--prim)] text-[var(--prim)] rounded-md hover:bg-[var(--prim)] hover:text-white transition-all font-bold text-sm"
          >
            {translations.langToggle}
          </button>

          <button className="hidden lg:flex items-center gap-2">
            <i className="bi bi-telephone-inbound text-2xl text-[var(--prim)]"></i>
            <div className="flex flex-col items-start leading-tight">
              <span className="text-xs text-gray-500">{translations.callUs}</span>
              <h3 className="font-bold text-[var(--prim)]">91+ (123) 456 789</h3>
            </div>
          </button>
          
          <Link
            href="/UI-Components/Pages/Contact/"
            className="bg-[var(--prim)] text-white font-medium px-6 py-3 rounded-full hover:bg-transparent hover:text-black hover:border-black border border-transparent transition-all duration-300"
          >
            {translations.quote}
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-3xl"
          >
            <i className={mobileMenuOpen ? "ri-close-line" : "ri-menu-3-line"}></i>
          </button>
        </div>
      </div>

      {/** Mobile Menu */}
      <div
        className={`lg:hidden bg-white border-t border-gray-100 transition-all duration-500 overflow-hidden ${
          mobileMenuOpen ? "max-h-[80vh] opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="px-[8%] space-y-3">
          {navLinks.map((link: any) => (
            <div key={link.label} className="border border-gray-100 rounded-lg overflow-hidden">
              {link.dropdown ? (
                <>
                  <button
                    onClick={() => toggleDropdown(link.label)}
                    className="w-full flex justify-between items-center px-4 py-3 text-left rtl:text-right font-medium"
                  >
                    {link.label}
                    <i className={`ri-arrow-down-s-line transition-transform ${openDropdowns[link.label] ? 'rotate-180' : ''}`}></i>
                  </button>
                  <div 
                    className={`bg-gray-50 transition-all duration-300 overflow-hidden ${
                      openDropdowns[link.label] ? "max-h-60 py-2" : "max-h-0"
                    }`}
                  >
                    {link.dropdown.map((sub: any) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="block px-8 py-2 text-gray-600 hover:text-[var(--prim)]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={link.href}
                  className="block px-4 py-3 font-medium rtl:text-right"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;