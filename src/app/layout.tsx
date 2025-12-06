import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider } from "@/hooks/useCart";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Loading } from "@/components/ui/loading";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "StyleShop - Premium Fashion & Lifestyle",
  description: "Discover our curated collection of premium fashion and lifestyle products. Where every piece tells a story of quality, comfort, and contemporary design.",
  keywords: "fashion, lifestyle, premium, clothing, accessories, shoes, electronics",
  authors: [{ name: "StyleShop Team" }],
  openGraph: {
    title: "StyleShop - Premium Fashion & Lifestyle",
    description: "Discover our curated collection of premium fashion and lifestyle products.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`min-h-screen bg-white antialiased ${inter.variable} font-sans`}>
        <AuthProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <Suspense fallback={<div className="h-16 bg-white border-b" />}>
                <Navbar />
              </Suspense>
              <main className="flex-1">
                <Suspense fallback={<Loading size="lg" text="Loading page..." className="min-h-screen" />}>
                  {children}
                </Suspense>
              </main>
              <Suspense fallback={<div className="h-32 bg-gray-50" />}>
                <Footer />
              </Suspense>
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
