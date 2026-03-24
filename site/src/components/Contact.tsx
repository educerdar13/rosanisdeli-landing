"use client";

import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  );
}

export default function Contact() {
  return (
    <section id="contacto" className="py-32 px-6 md:px-10 bg-[#0A0908]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0, 0, 1] }}
          >
            <span
              className="block text-[#C9A96E] tracking-[0.4em] uppercase text-xs mb-8"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
            >
              Contáctanos
            </span>
            <h2
              className="text-[#E8E0D0] mb-6"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 300,
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                lineHeight: 1.1,
              }}
            >
              Tu próximo evento
              <br />
              <em style={{ fontStyle: "italic" }}>empieza con un mensaje.</em>
            </h2>
            <p
              className="text-[#6B6459] mb-12"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 300,
                fontSize: "0.95rem",
                lineHeight: 1.8,
              }}
            >
              Cuéntanos qué tienes en mente — la fecha, el número de invitados, el
              tipo de evento. Nosotros nos encargamos del resto.
            </p>

            <div className="flex flex-col gap-6">
              <a
                href="mailto:rosanisdeli@gmail.com"
                className="flex items-center gap-4 text-[#A89D8E] hover:text-[#E8E0D0] transition-colors duration-300 group"
              >
                <div className="w-10 h-10 border border-[rgba(232,224,208,0.08)] flex items-center justify-center group-hover:border-[#C9A96E] transition-colors duration-300">
                  <Mail size={16} className="text-[#C9A96E]" strokeWidth={1.5} />
                </div>
                <span
                  style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300, fontSize: "0.9rem" }}
                >
                  rosanisdeli@gmail.com
                </span>
              </a>

              <a
                href="tel:+528181897529"
                className="flex items-center gap-4 text-[#A89D8E] hover:text-[#E8E0D0] transition-colors duration-300 group"
              >
                <div className="w-10 h-10 border border-[rgba(232,224,208,0.08)] flex items-center justify-center group-hover:border-[#C9A96E] transition-colors duration-300">
                  <Phone size={16} className="text-[#C9A96E]" strokeWidth={1.5} />
                </div>
                <span
                  style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300, fontSize: "0.9rem" }}
                >
                  (81) 8189 7529
                </span>
              </a>

              <a
                href="https://instagram.com/rosanisdeli"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-[#A89D8E] hover:text-[#E8E0D0] transition-colors duration-300 group"
              >
                <div className="w-10 h-10 border border-[rgba(232,224,208,0.08)] flex items-center justify-center group-hover:border-[#C9A96E] transition-colors duration-300">
                  <InstagramIcon size={16} />
                </div>
                <span
                  style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300, fontSize: "0.9rem" }}
                >
                  @rosanisdeli
                </span>
              </a>
            </div>
          </motion.div>

          {/* Right: CTA block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0, 0, 1] }}
            className="border border-[rgba(232,224,208,0.06)] p-10 md:p-14"
          >
            <h3
              className="text-[#E8E0D0] mb-4"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 400,
                fontSize: "1.8rem",
                lineHeight: 1.2,
              }}
            >
              ¿Listo para cotizar?
            </h3>
            <p
              className="text-[#6B6459] mb-10"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 300,
                fontSize: "0.9rem",
                lineHeight: 1.75,
              }}
            >
              Escríbenos directamente. Respondemos en menos de 24 horas con una
              propuesta personalizada.
            </p>

            <div className="flex flex-col gap-4">
              <a
                href="mailto:rosanisdeli@gmail.com?subject=Cotización%20de%20evento&body=Hola%2C%20me%20gustaría%20solicitar%20una%20cotización%20para%20mi%20evento."
                className="flex items-center justify-center bg-[#C9A96E] text-[#0F0E0B] hover:bg-[#E8D090] transition-colors duration-300 px-8 py-4 text-xs tracking-[0.2em] uppercase"
                style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
              >
                Solicitar cotización
              </a>
              <a
                href="mailto:rosanisdeli@gmail.com?subject=Agendar%20evento&body=Hola%2C%20me%20gustaría%20agendar%20un%20evento%20con%20Rosani%27s%20Deli."
                className="flex items-center justify-center border border-[rgba(232,224,208,0.15)] text-[#E8E0D0] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-300 px-8 py-4 text-xs tracking-[0.2em] uppercase"
                style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
              >
                Agendar un evento
              </a>
            </div>

            <p
              className="text-[#6B6459] text-xs mt-8 text-center"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
            >
              Monterrey y área metropolitana
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
