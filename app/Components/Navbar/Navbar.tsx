"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

// تعريف أنواع البيانات
type Navlink = {
  label: string;
  href: string;
  dropdown?: Navlink[];
};

const navLinks: Navlink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/UI-Components/Pages/Services" },
  {
    label: "Projects",
    href: "/UI-Components/Projects",
    dropdown: [
      { label: "Projects", href: "/UI-Components/Projects" },
      { label: "Projects Details", href: "/UI-Components/Projects/2" },
    ],
  },
  {
    label: "Blog",
    href: "#",
    dropdown: [
      { label: "Blog", href: "/UI-Components/Blogs" },
      { label: "Blog Details", href: "/UI-Components/Blogs/2" },
    ],
  },
  {
    label: "Pages",
    href: "#",
    dropdown: [
      { label: "About", href: "/UI-Components/Pages/About" },
      { label: "Team", href: "/UI-Components/Pages/Teams" },
      { label: "Gallery", href: "/UI-Components/Pages/Gallery" },
      { label: "Contact", href: "/UI-Components/Pages/Contact" },
      { label: "Page 404", href: "/UI-Components/Pages/Page404" },
    ],
  },
  { label: "Contact Us", href: "/UI-Components/Pages/Contact" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});
  const [isScrolled, setIsScrolled] = useState(false);

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
      className={`w-full transition-all duration-500 fixed top-0 left-0 z-[100] ${
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
          <nav className="hidden lg:flex space-x-6 ms-10">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label} className="relative group z-50">
                  <button className="flex items-center gap-1 text-xl hover:text-[var(--prim)] transition-all">
                    {link.label} <i className="ri-arrow-down-s-line"></i>
                  </button>
                  <div className="absolute left-0 top-full pt-4 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-white shadow-xl border border-gray-100 rounded-lg min-w-[200px] py-2">
                      {link.dropdown.map((item) => (
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
          <button className="hidden lg:flex items-center gap-2">
            <i className="bi bi-telephone-inbound text-2xl text-[var(--prim)]"></i>
            <div className="flex flex-col items-start leading-tight">
              <span className="text-xs text-gray-500">Call Us now</span>
              <h3 className="font-bold text-[var(--prim)]">91+ (123) 456 789</h3>
            </div>
          </button>
          
          <Link
            href="/UI-Components/Pages/Contact/"
            className="bg-[var(--prim)] text-white font-medium px-6 py-3 rounded-full hover:bg-transparent hover:text-black hover:border-black border border-transparent transition-all duration-300"
          >
            Get a Quote!
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
          {navLinks.map((link) => (
            <div key={link.label} className="border border-gray-100 rounded-lg overflow-hidden">
              {link.dropdown ? (
                <>
                  <button
                    onClick={() => toggleDropdown(link.label)}
                    className="w-full flex justify-between items-center px-4 py-3 text-left font-medium"
                  >
                    {link.label}
                    <i className={`ri-arrow-down-s-line transition-transform ${openDropdowns[link.label] ? 'rotate-180' : ''}`}></i>
                  </button>
                  <div 
                    className={`bg-gray-50 transition-all duration-300 overflow-hidden ${
                      openDropdowns[link.label] ? "max-h-60 py-2" : "max-h-0"
                    }`}
                  >
                    {link.dropdown.map((sub) => (
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
                  className="block px-4 py-3 font-medium"
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