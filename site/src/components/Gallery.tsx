"use client";

import { motion } from "framer-motion";
import Image from "next/image";


export default function Gallery() {
  return (
    <section id="galeria" className="py-32 px-6 md:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0, 0, 1] }}
          className="mb-16"
        >
          <span
            className="block text-[#C9A96E] tracking-[0.4em] uppercase text-xs mb-6"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
          >
            Galería
          </span>
          <h2
            className="text-[#E8E0D0]"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 300,
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              lineHeight: 1.1,
            }}
          >
            Cada plato,
            <br />
            <em style={{ fontStyle: "italic" }}>una decisión.</em>
          </h2>
        </motion.div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-12 grid-rows-2 gap-3 h-[600px] md:h-[700px]">
          {/* Large left image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0, 0, 1] }}
            className="col-span-12 md:col-span-7 row-span-2 overflow-hidden relative"
          >
            <Image src="/images/prep-1.jpg" alt="Chef cortando carne a la parrilla en Rosani's Deli" fill className="object-cover object-center" sizes="(max-width: 768px) 100vw, 58vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E0B30] to-transparent" />
            <div
              className="absolute bottom-6 left-6 text-[#E8E0D0] opacity-20 select-none pointer-events-none"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "4rem",
                fontWeight: 300,
              }}
            >
              01
            </div>
          </motion.div>

          {/* Top right image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: [0.25, 0, 0, 1] }}
            className="col-span-12 md:col-span-5 row-span-1 overflow-hidden relative"
          >
            <Image src="/images/dish-1.jpg" alt="Brisket con puré de papa en plato con orilla dorada" fill className="object-cover object-center" sizes="(max-width: 768px) 100vw, 42vw" />
          </motion.div>

          {/* Bottom right image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0, 0, 1] }}
            className="col-span-12 md:col-span-5 row-span-1 overflow-hidden relative"
          >
            <Image src="/images/dish-2.jpg" alt="Ensalada de arúgula con betabel y pistachos en tazón de madera" fill className="object-cover object-center" sizes="(max-width: 768px) 100vw, 42vw" />
          </motion.div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-3 gap-3 mt-3">
          {[
            { alt: "Brisket rebanado", imgSrc: "/images/dish-3.jpg" },
            { alt: "Platos servidos para el evento", imgSrc: "/images/dish-4.jpg" },
            { alt: "Carne en parrilla con fuego", imgSrc: "/images/dish-5.jpg" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.25, 0, 0, 1] }}
              className="h-48 overflow-hidden relative"
            >
              <Image src={item.imgSrc} alt={item.alt} fill className="object-cover object-center" sizes="33vw" />
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center text-[#6B6459] text-xs tracking-widest uppercase mt-10"
          style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
        >
          Sigue nuestro trabajo en{" "}
          <a
            href="https://instagram.com/rosanisdeli"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#C9A96E] hover:text-[#E8D090] transition-colors"
          >
            @rosanisdeli
          </a>
        </motion.p>
      </div>
    </section>
  );
}
