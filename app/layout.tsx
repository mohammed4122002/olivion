import type { Metadata } from "next";
import { Audiowide, Golos_Text, Tajawal } from "next/font/google"; // أضفنا Tajawal للعربية
import "./globals.css";
import Navbar from "./Components/Navbar/Navbar";

// الخط الإنجليزي العريض
const audiowide = Audiowide({
  weight: "400",
  variable: "--font-audiowide",
  subsets: ["latin"],
});

// الخط الإنجليزي للنصوص
const golostext = Golos_Text({
  weight: "400",
  variable: "--font-golostext",
  subsets: ["latin"],
});

// الخط العربي (بديل لـ Cal Sans و Golos عند تحويل اللغة)
const tajawal = Tajawal({
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "Olivion | Digital Agency",
  description: "Modern Digital Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ملاحظة: الـ lang و dir سيتم التحكم بهما ديناميكياً من خلال Navbar 
    // ولكن نضع قيم افتراضية هنا
    <html lang="en" dir="ltr">
      <body
        className={`${audiowide.variable} ${golostext.variable} ${tajawal.variable} antialiased`}
      >
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}