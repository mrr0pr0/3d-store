import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "3D Store - Modern Furniture & Decor",
  description: "Shop the latest 3D printed furniture and home decor",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <div className="relative flex min-h-screen flex-col bg-background">
            <Header />
            <div className="container flex-1 items-start md:grid md:grid-cols-[250px_1fr] md:gap-6 lg:grid-cols-[300px_1fr] lg:gap-10">
              <Sidebar />
              <main className="relative py-6 lg:gap-10 lg:py-8">
                <div className="mx-auto w-full min-w-0">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}