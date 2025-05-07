"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../../node_modules/multi-range-slider-react/lib/multirangeslider.css"; 
import Header from "@/components/Layout/Header";
import Footer from "@/components/Home/Footer";
import { usePathname } from "next/navigation";




const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname =usePathname()
  if (pathname?.startsWith("/dashboard" )){
    return (
      <html lang="es">
         <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >{children}</body>
      </html>
     

    )
  }
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header/>
      
        {children}
       
        <Footer/>
       
      </body>
    </html>
  );
}
