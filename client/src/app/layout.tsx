import type { Metadata } from "next";
import { Inter, Nunito, Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthProvider from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import Providers from "./providers";
import Script from "next/script";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Deep LMS",
  description: "Deep LMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${openSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex flex-col h-screen">
        <Providers>
          <Toaster position="top-right" />
          <AuthProvider>
            <Navbar />
            <div className="flex-1">
              {children}
            </div>
            <Footer />
          </AuthProvider>
        </Providers>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
