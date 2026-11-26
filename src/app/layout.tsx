import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Amiri } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import BackToTop from "@/components/fx/BackToTop";
import CustomCursor from "@/components/fx/CustomCursor";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});
const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zuhoor Blossoms | Luxury Arabic Bodywash",
  description: "Rare botanical extracts, ancient Arabic perfume traditions, and modern skin science.",
  keywords: ["bodywash", "arabic", "luxury", "oud", "rose", "skincare"],
  openGraph: { title: "Zuhoor Blossoms", description: "Luxury Arabic Bodywash", type: "website" },
  twitter: { card: "summary", title: "Zuhoor Blossoms", description: "Luxury Arabic Bodywash" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} ${amiri.variable}`}>
      <body className="font-sans antialiased">
        <Providers>
          <Navbar />
          <main>{children}</main>
          <CartDrawer />
          <BackToTop />
          <CustomCursor />
        </Providers>
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
