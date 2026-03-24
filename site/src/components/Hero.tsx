"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background — replace with real hero photo once available */}
      <div className="absolute inset-0">
        <Image
          src="/images/prep-1.jpg"
          alt="Chef de Rosani's Deli cortando carne a la parrilla"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          style={{ filter: "blur(1px) brightness(0.45)" }}
        />
        {/* Multi-layer overlay for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, #0F0E0B 0%, #0F0E0BCC 35%, #0F0E0B66 65%, #0F0E0B44 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Decorative texture line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #C9A96E40, transparent)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pb-24 pt-40 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0, 0, 1] }}
          >
            <span
              className="inline-block text-[#C9A96E] tracking-[0.4em] uppercase text-xs mb-8"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
            >
              Monterrey, México
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0, 0, 1] }}
            className="text-[#E8E0D0] mb-6"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 300,
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            El sabor que
            <br />
            <em style={{ fontStyle: "italic", fontWeight: 400 }}>no se improvisa.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.25, 0, 0, 1] }}
            className="text-[#C8BFB0] mb-12 max-w-lg"
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontWeight: 300,
              fontSize: "1.05rem",
              lineHeight: 1.75,
            }}
          >
            Catering y experiencias gastronómicas de alto nivel para empresas y familias
            que exigen algo más que comida. Cada evento, diseñado desde cero.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.38, ease: [0.25, 0, 0, 1] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#contacto"
              className="inline-flex items-center justify-center bg-[#C9A96E] text-[#0F0E0B] hover:bg-[#E8D090] transition-colors duration-300 px-8 py-4 text-xs tracking-[0.2em] uppercase"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
            >
              Solicitar cotización
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center justify-center border border-[rgba(232,224,208,0.25)] text-[#E8E0D0] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-300 px-8 py-4 text-xs tracking-[0.2em] uppercase"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
            >
              Agendar un evento
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 right-10 hidden md:flex flex-col items-center gap-3"
        aria-hidden="true"
      >
        <span
          className="text-[#6B6459] tracking-[0.3em] uppercase text-[10px]"
          style={{ fontFamily: "var(--font-dm-sans)", writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-[#6B6459] to-transparent" />
      </motion.div>
    </section>
  );
}
