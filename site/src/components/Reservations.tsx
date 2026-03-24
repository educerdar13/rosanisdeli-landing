"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, ChefHat, CheckCircle, Loader } from "lucide-react";

// ──────────────────────────────────────────────────
// CONFIGURACIÓN
// 1. Crea una cuenta gratis en https://formspree.io
// 2. Crea un nuevo form y copia tu Form ID (ej. "xpzgkdqw")
// 3. Reemplaza FORMSPREE_ID aquí:
const FORMSPREE_ID = "YOUR_FORM_ID"; // ← reemplazar
// 4. En Formspree, activa "Reply-To" en Settings → Notifications
//    para que el cliente reciba confirmación automática
// ──────────────────────────────────────────────────

const eventTypes = [
  "Evento corporativo",
  "Celebración familiar",
  "Cumpleaños",
  "Aniversario",
  "Lanzamiento de producto",
  "Retiro ejecutivo",
  "Otro",
];

const timeSlots = [
  "12:00 pm",
  "1:00 pm",
  "2:00 pm",
  "6:00 pm",
  "7:00 pm",
  "8:00 pm",
  "9:00 pm",
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  eventType: string;
  notes: string;
}

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  guests: "",
  eventType: "",
  notes: "",
};

export default function Reservations() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const today = new Date().toISOString().split("T")[0];

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...form,
          _subject: `Nueva reserva — ${form.eventType} · ${form.date}`,
          _replyto: form.email,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setForm(initialForm);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="reservas" className="py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-16 mb-16">
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
              Reservaciones
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
              Agenda tu
              <br />
              <em style={{ fontStyle: "italic" }}>experiencia.</em>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0, 0, 1] }}
            className="self-end"
          >
            <div className="flex flex-col gap-4">
              {[
                { icon: Calendar, text: "Confirmación en menos de 24 horas" },
                { icon: Users, text: "Desde 10 hasta 500+ invitados" },
                { icon: ChefHat, text: "Menú personalizado incluido en cada cotización" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon size={16} className="text-[#C9A96E] shrink-0" strokeWidth={1.5} />
                  <span
                    className="text-[#6B6459]"
                    style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300, fontSize: "0.9rem" }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.25, 0, 0, 1] }}
          className="border border-[rgba(232,224,208,0.06)] bg-[#0A0908]"
        >
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-24 px-8 text-center">
              <CheckCircle size={48} className="text-[#C9A96E] mb-6" strokeWidth={1} />
              <h3
                className="text-[#E8E0D0] mb-3"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, fontSize: "2rem" }}
              >
                ¡Solicitud recibida!
              </h3>
              <p
                className="text-[#6B6459] max-w-sm"
                style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300, fontSize: "0.9rem", lineHeight: 1.8 }}
              >
                Te hemos enviado un correo de confirmación. Nuestro equipo
                te contactará en menos de 24 horas con tu propuesta personalizada.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-8 text-[#C9A96E] text-xs tracking-widest uppercase hover:text-[#E8D090] transition-colors"
                style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
              >
                Hacer otra solicitud
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Nombre */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-[#6B6459] text-xs tracking-widest uppercase"
                    style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
                  >
                    Nombre completo *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Ej. Roberto Garza"
                    className="bg-transparent border border-[rgba(232,224,208,0.1)] text-[#E8E0D0] px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors placeholder:text-[#3A3630]"
                    style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-[#6B6459] text-xs tracking-widest uppercase"
                    style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
                  >
                    Correo electrónico *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="tu@correo.com"
                    className="bg-transparent border border-[rgba(232,224,208,0.1)] text-[#E8E0D0] px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors placeholder:text-[#3A3630]"
                    style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
                  />
                </div>

                {/* Teléfono */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="phone"
                    className="text-[#6B6459] text-xs tracking-widest uppercase"
                    style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
                  >
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(81) 1234 5678"
                    className="bg-transparent border border-[rgba(232,224,208,0.1)] text-[#E8E0D0] px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors placeholder:text-[#3A3630]"
                    style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
                  />
                </div>

                {/* Tipo de evento */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="eventType"
                    className="text-[#6B6459] text-xs tracking-widest uppercase"
                    style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
                  >
                    Tipo de evento *
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    required
                    value={form.eventType}
                    onChange={handleChange}
                    className="bg-[#0A0908] border border-[rgba(232,224,208,0.1)] text-[#E8E0D0] px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors appearance-none cursor-pointer"
                    style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
                  >
                    <option value="" className="text-[#3A3630]">Selecciona una opción</option>
                    {eventTypes.map((type) => (
                      <option key={type} value={type} className="bg-[#0A0908]">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Fecha */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="date"
                    className="text-[#6B6459] text-xs tracking-widest uppercase"
                    style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
                  >
                    Fecha del evento *
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    required
                    min={today}
                    value={form.date}
                    onChange={handleChange}
                    className="bg-transparent border border-[rgba(232,224,208,0.1)] text-[#E8E0D0] px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors [color-scheme:dark]"
                    style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
                  />
                </div>

                {/* Hora */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="time"
                    className="text-[#6B6459] text-xs tracking-widest uppercase"
                    style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
                  >
                    Hora aproximada
                  </label>
                  <select
                    id="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    className="bg-[#0A0908] border border-[rgba(232,224,208,0.1)] text-[#E8E0D0] px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors appearance-none cursor-pointer"
                    style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
                  >
                    <option value="">Sin preferencia</option>
                    {timeSlots.map((t) => (
                      <option key={t} value={t} className="bg-[#0A0908]">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Invitados */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="guests"
                    className="text-[#6B6459] text-xs tracking-widest uppercase"
                    style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
                  >
                    Número de invitados *
                  </label>
                  <input
                    id="guests"
                    name="guests"
                    type="number"
                    required
                    min="10"
                    max="2000"
                    value={form.guests}
                    onChange={handleChange}
                    placeholder="Ej. 50"
                    className="bg-transparent border border-[rgba(232,224,208,0.1)] text-[#E8E0D0] px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors placeholder:text-[#3A3630]"
                    style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
                  />
                </div>
              </div>

              {/* Notas */}
              <div className="flex flex-col gap-2 mb-8">
                <label
                  htmlFor="notes"
                  className="text-[#6B6459] text-xs tracking-widest uppercase"
                  style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 400 }}
                >
                  Detalles adicionales
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Restricciones alimentarias, preferencias de menú, lugar del evento, presupuesto aproximado..."
                  className="bg-transparent border border-[rgba(232,224,208,0.1)] text-[#E8E0D0] px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors placeholder:text-[#3A3630] resize-none"
                  style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
                />
              </div>

              {/* Error */}
              {status === "error" && (
                <p
                  className="text-red-400 text-xs mb-6"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Hubo un error al enviar. Intenta de nuevo o escríbenos a rosanisdeli@gmail.com
                </p>
              )}

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center gap-3 bg-[#C9A96E] text-[#0F0E0B] hover:bg-[#E8D090] transition-colors duration-300 px-10 py-4 text-xs tracking-[0.2em] uppercase disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
                >
                  {status === "sending" ? (
                    <>
                      <Loader size={14} className="animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Solicitar mi fecha"
                  )}
                </button>
                <p
                  className="text-[#3A3630] text-xs"
                  style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
                >
                  Respuesta garantizada en 24 horas · Sin compromiso
                </p>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
