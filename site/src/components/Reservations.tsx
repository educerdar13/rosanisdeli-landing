"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, ChefHat, CheckCircle, Loader, ChevronLeft, ChevronRight } from "lucide-react";

const EVENT_TYPES = [
  "Evento corporativo",
  "Celebración familiar",
  "Cumpleaños",
  "Aniversario",
  "Lanzamiento de producto",
  "Retiro ejecutivo",
  "Otro",
];

const TIME_SLOTS = [
  "13:00", "14:00", "15:00", "16:00",
  "18:00", "19:00", "20:00", "21:00",
];

const DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MONTHS = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",
];

function formatDate(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  time: string;
  guests: string;
  event_type: string;
  notes: string;
}

const initialForm: FormState = {
  name: "", email: "", phone: "",
  time: "", guests: "", event_type: "", notes: "",
};

export default function Reservations() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [step, setStep] = useState<"calendar" | "form">("calendar");
  const [fullDates, setFullDates] = useState<string[]>([]);

  const todayObj = new Date();
  const [currentYear, setCurrentYear] = useState(todayObj.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(todayObj.getMonth());

  const todayStr = formatDate(todayObj.getFullYear(), todayObj.getMonth(), todayObj.getDate());

  const fetchAvailability = useCallback(async () => {
    const month = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}`;
    try {
      const res = await fetch(`/api/availability?month=${month}`);
      const data = await res.json();
      setFullDates(data.fullDates || []);
    } catch { /* ignore */ }
  }, [currentYear, currentMonth]);

  useEffect(() => { fetchAvailability(); }, [fetchAvailability]);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  const handleDateClick = (day: number) => {
    const dateStr = formatDate(currentYear, currentMonth, day);
    if (dateStr < todayStr || fullDates.includes(dateStr)) return;
    setSelectedDate(dateStr);
    setStep("form");
  };

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedDate) return;
    setStatus("sending");

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, date: selectedDate }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setForm(initialForm);
      } else {
        throw new Error(data.error || "Error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="reservas" className="py-32 px-6 md:px-10 bg-[#0F0E0B]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-16 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0, 0, 1] }}
          >
            <span className="block text-[#8B3A2A] tracking-[0.4em] uppercase text-xs mb-6" style={{ fontFamily: "var(--font-dm-sans)" }}>
              Reservaciones
            </span>
            <h2 className="text-[#E8E0D0]" style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.1 }}>
              Agenda tu<br />
              <em style={{ fontStyle: "italic", color: "#C9A96E" }}>experiencia.</em>
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
                { icon: Calendar, text: "Selecciona tu fecha en el calendario" },
                { icon: Users, text: "Desde 10 hasta 500+ invitados" },
                { icon: ChefHat, text: "50% de anticipo para confirmar la fecha" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon size={16} className="text-[#C9A96E] shrink-0" strokeWidth={1.5} />
                  <span className="text-[#6B6459] text-sm" style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}>{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Calendar + Form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.25, 0, 0, 1] }}
          className="grid md:grid-cols-2 gap-0 border border-[rgba(232,224,208,0.06)] bg-[#0A0908]"
        >
          {/* Calendar panel */}
          <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-[rgba(232,224,208,0.06)]">
            <div className="flex items-center justify-between mb-6">
              <button onClick={prevMonth} className="p-2 text-[#6B6459] hover:text-[#C9A96E] transition-colors">
                <ChevronLeft size={18} />
              </button>
              <span className="text-[#E8E0D0] text-sm tracking-widest" style={{ fontFamily: "var(--font-dm-sans)" }}>
                {MONTHS[currentMonth].toUpperCase()} {currentYear}
              </span>
              <button onClick={nextMonth} className="p-2 text-[#6B6459] hover:text-[#C9A96E] transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="grid grid-cols-7 mb-2">
              {DAYS.map(d => (
                <div key={d} className="text-center text-[#3A3835] text-xs py-1" style={{ fontFamily: "var(--font-dm-sans)" }}>{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDayOfWeek }).map((_, i) => <div key={`e-${i}`} />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = formatDate(currentYear, currentMonth, day);
                const isPast = dateStr < todayStr;
                const isFull = fullDates.includes(dateStr);
                const isSelected = selectedDate === dateStr;
                const isToday = dateStr === todayStr;
                return (
                  <button
                    key={day}
                    onClick={() => handleDateClick(day)}
                    disabled={isPast || isFull}
                    className={`
                      aspect-square flex items-center justify-center text-xs rounded transition-all
                      ${isSelected ? "bg-[#C9A96E] text-[#0F0E0B] font-bold" : ""}
                      ${isToday && !isSelected ? "border border-[#C9A96E] text-[#C9A96E]" : ""}
                      ${!isPast && !isFull && !isSelected ? "hover:bg-[#2A2825] text-[#E8E0D0] cursor-pointer" : ""}
                      ${isPast ? "text-[#2A2825] cursor-not-allowed" : ""}
                      ${isFull && !isPast ? "text-[#3A3835] line-through cursor-not-allowed" : ""}
                    `}
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-4 mt-6 text-xs text-[#6B6459]" style={{ fontFamily: "var(--font-dm-sans)" }}>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#C9A96E]" /> Fecha elegida</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded border border-[#C9A96E]" /> Hoy</span>
              <span className="flex items-center gap-1.5 line-through opacity-50">## Sin cupos</span>
            </div>
          </div>

          {/* Right panel */}
          <div className="p-8 md:p-10">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <CheckCircle size={48} className="text-[#C9A96E] mb-6" strokeWidth={1} />
                <h3 className="text-[#E8E0D0] mb-3" style={{ fontFamily: "var(--font-cormorant)", fontSize: "2rem", fontWeight: 400 }}>
                  ¡Solicitud recibida!
                </h3>
                <p className="text-[#6B6459] max-w-sm text-sm" style={{ fontFamily: "var(--font-dm-sans)", lineHeight: 1.8 }}>
                  Te contactamos en menos de 24 horas por WhatsApp y email con la confirmación y el link de pago del anticipo.
                </p>
                <button
                  onClick={() => { setStatus("idle"); setStep("calendar"); setSelectedDate(null); setForm(initialForm); }}
                  className="mt-8 text-[#C9A96E] text-xs tracking-widest uppercase hover:text-[#E8D090] transition-colors"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  Hacer otra solicitud
                </button>
              </div>
            ) : step === "calendar" ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <Calendar size={40} className="text-[#2A2825] mb-4" strokeWidth={1} />
                <p className="text-[#6B6459] text-sm" style={{ fontFamily: "var(--font-dm-sans)", lineHeight: 1.8 }}>
                  Elige una fecha disponible<br />en el calendario para continuar.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {selectedDate && (
                  <div className="flex items-center gap-2 text-[#C9A96E] text-sm mb-6" style={{ fontFamily: "var(--font-dm-sans)" }}>
                    <Calendar size={14} />
                    <span>{new Date(selectedDate + "T12:00").toLocaleDateString("es-MX", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
                    <button type="button" onClick={() => setStep("calendar")} className="ml-auto text-[#6B6459] text-xs hover:text-[#E8E0D0] transition-colors">Cambiar</button>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 mb-4">
                  {[
                    { id: "name", label: "Nombre completo", type: "text", placeholder: "Roberto Garza", colSpan: true },
                    { id: "email", label: "Email", type: "email", placeholder: "tu@correo.com", colSpan: false },
                    { id: "phone", label: "WhatsApp", type: "tel", placeholder: "(81) 1234 5678", colSpan: false },
                  ].map(({ id, label, type, placeholder, colSpan }) => (
                    <div key={id} className={`flex flex-col gap-1.5 ${colSpan ? "col-span-2" : ""}`}>
                      <label htmlFor={id} className="text-[#6B6459] text-xs tracking-widest uppercase" style={{ fontFamily: "var(--font-dm-sans)" }}>{label} *</label>
                      <input
                        id={id} name={id} type={type} required
                        value={form[id as keyof FormState]} onChange={handleChange} placeholder={placeholder}
                        className="bg-transparent border border-[rgba(232,224,208,0.1)] text-[#E8E0D0] px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors placeholder:text-[#3A3630]"
                        style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
                      />
                    </div>
                  ))}

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="time" className="text-[#6B6459] text-xs tracking-widest uppercase" style={{ fontFamily: "var(--font-dm-sans)" }}>Hora *</label>
                    <select id="time" name="time" required value={form.time} onChange={handleChange}
                      className="bg-[#0A0908] border border-[rgba(232,224,208,0.1)] text-[#E8E0D0] px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors appearance-none cursor-pointer"
                      style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
                    >
                      <option value="">Seleccionar</option>
                      {TIME_SLOTS.map(t => <option key={t} value={t} className="bg-[#0A0908]">{t} hrs</option>)}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="guests" className="text-[#6B6459] text-xs tracking-widest uppercase" style={{ fontFamily: "var(--font-dm-sans)" }}>Personas *</label>
                    <input id="guests" name="guests" type="number" required min="1" max="2000"
                      value={form.guests} onChange={handleChange} placeholder="Ej. 50"
                      className="bg-transparent border border-[rgba(232,224,208,0.1)] text-[#E8E0D0] px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors placeholder:text-[#3A3630]"
                      style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
                    />
                  </div>

                  <div className="col-span-2 flex flex-col gap-1.5">
                    <label htmlFor="event_type" className="text-[#6B6459] text-xs tracking-widest uppercase" style={{ fontFamily: "var(--font-dm-sans)" }}>Tipo de evento *</label>
                    <select id="event_type" name="event_type" required value={form.event_type} onChange={handleChange}
                      className="bg-[#0A0908] border border-[rgba(232,224,208,0.1)] text-[#E8E0D0] px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors appearance-none cursor-pointer"
                      style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
                    >
                      <option value="">Selecciona una opción</option>
                      {EVENT_TYPES.map(t => <option key={t} value={t} className="bg-[#0A0908]">{t}</option>)}
                    </select>
                  </div>

                  <div className="col-span-2 flex flex-col gap-1.5">
                    <label htmlFor="notes" className="text-[#6B6459] text-xs tracking-widest uppercase" style={{ fontFamily: "var(--font-dm-sans)" }}>Notas adicionales</label>
                    <textarea id="notes" name="notes" rows={3} value={form.notes} onChange={handleChange}
                      placeholder="Preferencias, alergias, lugar del evento..."
                      className="bg-transparent border border-[rgba(232,224,208,0.1)] text-[#E8E0D0] px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors placeholder:text-[#3A3630] resize-none"
                      style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
                    />
                  </div>
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-xs mb-4" style={{ fontFamily: "var(--font-dm-sans)" }}>
                    Error al enviar. Intenta de nuevo o escríbenos a rosanisdeli@gmail.com
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full inline-flex items-center justify-center gap-3 bg-[#C9A96E] text-[#0F0E0B] hover:bg-[#E8D090] transition-colors duration-300 px-8 py-3.5 text-xs tracking-[0.2em] uppercase disabled:opacity-60"
                  style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
                >
                  {status === "sending" ? (<><Loader size={14} className="animate-spin" /> Enviando...</>) : "Solicitar mi fecha"}
                </button>
                <p className="text-[#3A3630] text-xs mt-3 text-center" style={{ fontFamily: "var(--font-dm-sans)" }}>
                  Respuesta en 24 hrs · Se requiere 50% de anticipo para confirmar
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
