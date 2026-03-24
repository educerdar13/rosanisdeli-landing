"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  );
}
import Logo from "./Logo";

const links = [
  { label: "Servicios", href: "#servicios" },
  { label: "Galería", href: "#galeria" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Reservas", href: "#reservas" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0F0E0B]/95 backdrop-blur-sm border-b border-[rgba(232,224,208,0.08)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <a href="#" aria-label="Rosani's Deli — inicio">
          <Logo />
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[#6B6459] hover:text-[#E8E0D0] transition-colors duration-300 text-sm tracking-widest uppercase"
                style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-6">
          <a
            href="https://instagram.com/rosanisdeli"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de Rosani's Deli"
            className="text-[#6B6459] hover:text-[#C9A96E] transition-colors duration-300"
          >
            <InstagramIcon size={18} />
          </a>
          <a
            href="#contacto"
            className="border border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#0F0E0B] transition-all duration-300 px-5 py-2 text-xs tracking-widest uppercase"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
          >
            Cotizar
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[#E8E0D0] p-2"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-[#0F0E0B] border-t border-[rgba(232,224,208,0.08)] px-6 pb-8 pt-6">
          <ul className="flex flex-col gap-6 mb-8">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-[#E8E0D0] text-xl tracking-widest uppercase"
                  style={{ fontFamily: "var(--font-cormorant)", fontWeight: 500 }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="block border border-[#C9A96E] text-[#C9A96E] text-center py-3 text-xs tracking-widest uppercase"
          >
            Solicitar cotización
          </a>
        </div>
      )}
    </header>
  );
}
