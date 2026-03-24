"use client";

import { motion } from "framer-motion";
import { UtensilsCrossed, Users, Star } from "lucide-react";

const services = [
  {
    icon: UtensilsCrossed,
    title: "Catering Corporativo",
    description:
      "Comidas de negocios, lanzamientos de producto, retiros ejecutivos. Menús a la medida, montaje profesional y atención que cuida cada detalle.",
    detail: "Desde 20 personas",
  },
  {
    icon: Users,
    title: "Experiencias Familiares",
    description:
      "Cumpleaños, aniversarios, celebraciones íntimas. Llevamos la experiencia de un restaurante de primer nivel directamente a tu espacio.",
    detail: "Desde 10 personas",
  },
  {
    icon: Star,
    title: "Servicio Personalizado",
    description:
      "Sin paquetes genéricos. Cada menú se diseña en función del evento, la temporada y los gustos del anfitrión. Calidad sin concesiones.",
    detail: "Siempre a la medida",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-16 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0, 0, 1] }}
          >
            <span
              className="block text-[#C9A96E] tracking-[0.4em] uppercase text-xs mb-6"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
            >
              Lo que hacemos
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
              Tres formas de
              <br />
              <em style={{ fontStyle: "italic" }}>vivir Rosani&apos;s</em>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0, 0, 1] }}
            className="self-end text-[#6B6459]"
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontWeight: 300,
              fontSize: "1rem",
              lineHeight: 1.8,
            }}
          >
            No somos un servicio de catering estándar. Somos el equipo que hace
            que tus invitados hablen del evento semanas después. Cada presentación,
            cada corte, cada sabor — pensado con intención.
          </motion.p>
        </div>

        {/* Service cards */}
        <div className="grid md:grid-cols-3 gap-px bg-[rgba(232,224,208,0.06)]">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.25, 0, 0, 1] }}
                className="bg-[#0F0E0B] p-10 md:p-12 group hover:bg-[#1A1815] transition-colors duration-500"
              >
                <div className="mb-8">
                  <Icon
                    size={24}
                    className="text-[#8B3A2A] group-hover:text-[#C9A96E] transition-colors duration-500"
                    strokeWidth={1.5}
                  />
                </div>
                <h3
                  className="text-[#E8E0D0] mb-4"
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontWeight: 500,
                    fontSize: "1.6rem",
                    lineHeight: 1.2,
                  }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-[#6B6459] mb-8"
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontWeight: 300,
                    fontSize: "0.9rem",
                    lineHeight: 1.8,
                  }}
                >
                  {service.description}
                </p>
                <span
                  className="text-[#C9A96E] text-xs tracking-widest uppercase"
                  style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
                >
                  {service.detail}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
