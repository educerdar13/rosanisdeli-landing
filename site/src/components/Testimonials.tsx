"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Contratamos a Rosani's para la cena anual de nuestra empresa. Llegaron a un nivel que no esperábamos. Nuestros directivos todavía hablan de ese brisket.",
    author: "Roberto Garza",
    role: "Director Comercial, Grupo Industrial Noreste",
  },
  {
    quote:
      "El cumpleaños de mis papás fue algo diferente este año. No hubo un solo momento de estrés. Ellos manejaron todo y la comida fue simplemente increíble.",
    author: "Sofía Méndez",
    role: "Cliente particular, Monterrey",
  },
  {
    quote:
      "Hemos trabajado con varios caterings y Rosani's es el único que entiende que el detalle importa. La presentación, el sabor, el trato — todo al mismo nivel.",
    author: "Carlos Ibarra",
    role: "CEO, Constructora Ibarra",
  },
];

export default function Testimonials() {
  return (
    <section className="py-32 px-6 md:px-10 bg-[#0A0908]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0, 0, 1] }}
          className="mb-20 text-center"
        >
          <span
            className="block text-[#C9A96E] tracking-[0.4em] uppercase text-xs mb-6"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
          >
            Lo que dicen
          </span>
          <h2
            className="text-[#E8E0D0]"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 300,
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              lineHeight: 1.15,
            }}
          >
            La mejor crítica es
            <br />
            <em style={{ fontStyle: "italic" }}>que regresen.</em>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.25, 0, 0, 1] }}
              className="border border-[rgba(232,224,208,0.06)] p-10 bg-[#0F0E0B]"
            >
              {/* Quote mark */}
              <div
                className="text-[#8B3A2A] mb-6"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "3rem",
                  lineHeight: 1,
                  fontWeight: 300,
                }}
                aria-hidden="true"
              >
                &ldquo;
              </div>
              <p
                className="text-[#A89D8E] mb-8"
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontWeight: 300,
                  fontSize: "0.9rem",
                  lineHeight: 1.85,
                }}
              >
                {t.quote}
              </p>
              <div className="border-t border-[rgba(232,224,208,0.06)] pt-6">
                <p
                  className="text-[#E8E0D0]"
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontWeight: 500,
                    fontSize: "0.85rem",
                  }}
                >
                  {t.author}
                </p>
                <p
                  className="text-[#6B6459]"
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontWeight: 300,
                    fontSize: "0.75rem",
                    marginTop: "2px",
                  }}
                >
                  {t.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
