function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  );
}
import Logo from "./Logo";

const footerLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Galería", href: "#galeria" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(232,224,208,0.06)] py-16 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Logo className="mb-5" />
            <p
              className="text-[#6B6459] max-w-xs"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontWeight: 300,
                fontSize: "0.85rem",
                lineHeight: 1.8,
              }}
            >
              Catering y experiencias gastronómicas de alto nivel.
              <br />
              Monterrey, México.
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <p
              className="text-[#E8E0D0] mb-5 tracking-widest uppercase text-xs"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
            >
              Navegación
            </p>
            <ul className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[#6B6459] hover:text-[#E8E0D0] transition-colors duration-300 text-sm"
                    style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p
              className="text-[#E8E0D0] mb-5 tracking-widest uppercase text-xs"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 500 }}
            >
              Contacto
            </p>
            <div className="flex flex-col gap-2 mb-6">
              <a
                href="mailto:rosanisdeli@gmail.com"
                className="text-[#6B6459] hover:text-[#E8E0D0] transition-colors duration-300 text-sm"
                style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
              >
                rosanisdeli@gmail.com
              </a>
              <a
                href="tel:+528181897529"
                className="text-[#6B6459] hover:text-[#E8E0D0] transition-colors duration-300 text-sm"
                style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
              >
                (81) 8189 7529
              </a>
            </div>
            <a
              href="https://instagram.com/rosanisdeli"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Rosani's Deli"
              className="inline-flex items-center gap-2 text-[#6B6459] hover:text-[#C9A96E] transition-colors duration-300"
            >
              <InstagramIcon size={16} />
              <span
                style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300, fontSize: "0.85rem" }}
              >
                @rosanisdeli
              </span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[rgba(232,224,208,0.04)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-[#3A3630] text-xs"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
          >
            © {new Date().getFullYear()} Rosani&apos;s Deli. Todos los derechos reservados.
          </p>
          <p
            className="text-[#3A3630] text-xs text-center"
            style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 300 }}
          >
            Built with Claude Web Builder by{" "}
            <a
              href="https://tododeia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#6B6459] transition-colors duration-300"
            >
              Tododeia
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
