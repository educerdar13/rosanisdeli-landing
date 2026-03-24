"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <section id="nosotros" className="py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-24 items-center">
          {/* Left: number + title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.25, 0, 0, 1] }}
            className="relative"
          >
            <div className="relative h-[520px] overflow-hidden">
              <Image
                src="/images/dish-4.jpg"
                alt="Chef de Rosani's Deli cortando carne"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E0B60] to-transparent" />
            </div>
            <h2
              className="text-[#E8E0D0] mt-8"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 300,
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                lineHeight: 1.15,
              }}
            >
              Gastronomía sin
              <br />
              <em style={{ fontStyle: "italic" }}>compromisos.</em>
            </h2>
          </motion.div>

          {/* Right: text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0, 0, 1] }}
          >
            <span
              className="block text-[#C9A96E] tracking-[0.4em] uppercase text-xs mb-8"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
            >
              Nuestra historia
            </span>
            <p
              className="text-[#A89D8E] mb-6"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 300,
                fontSize: "1rem",
                lineHeight: 1.85,
              }}
            >
              Rosani&apos;s nació de una obsesión simple: que cada persona que se
              siente a tu mesa viva algo que no olvidará. No empezamos con un
              restaurante — empezamos cocinando para quienes más exigían.
            </p>
            <p
              className="text-[#6B6459]"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 300,
                fontSize: "0.95rem",
                lineHeight: 1.85,
              }}
            >
              Hoy atendemos eventos corporativos de alto nivel y celebraciones
              privadas en Monterrey y el área metropolitana. Cada menú se construye
              con ingredientes de temporada, técnicas precisas y un equipo que conoce
              la diferencia entre servir comida y crear una experiencia.
            </p>

            <div className="grid grid-cols-3 gap-8 mt-14 pt-10 border-t border-[rgba(232,224,208,0.06)]">
              {[
                { num: "200+", label: "Eventos realizados" },
                { num: "98%", label: "Clientes que repiten" },
                { num: "5★", label: "Calificación promedio" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p
                    className="text-[#C9A96E]"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "2rem",
                      fontWeight: 500,
                      lineHeight: 1,
                    }}
                  >
                    {stat.num}
                  </p>
                  <p
                    className="text-[#6B6459] mt-2"
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "0.7rem",
                      fontWeight: 400,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
