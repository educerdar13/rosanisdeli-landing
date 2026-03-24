import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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

export const metadata: Metadata = {
  title: "Rosani's Deli — El sabor que no se improvisa",
  description:
    "Catering y experiencias gastronómicas de alto nivel para familias y empresas en Monterrey. Servicio personalizado, cortes premium y menús diseñados a la medida.",
  keywords: [
    "catering monterrey",
    "experiencias gastronómicas",
    "catering corporativo monterrey",
    "eventos privados monterrey",
    "rosani's deli",
  ],
  openGraph: {
    title: "Rosani's Deli — El sabor que no se improvisa",
    description:
      "Catering y experiencias gastronómicas de alto nivel para familias y empresas en Monterrey.",
    type: "website",
    locale: "es_MX",
    siteName: "Rosani's Deli",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${cormorant.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0F0E0B] text-[#E8E0D0]">{children}</body>
    </html>
  );
}
