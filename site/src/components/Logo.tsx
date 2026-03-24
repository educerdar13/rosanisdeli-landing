// Rosani's Deli wordmark — approximates the brand logo
// Replace with <Image src="/images/logo.png" ... /> once you export the logo PNG
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-start leading-none ${className}`}>
      <span
        className="tracking-[0.18em] uppercase text-[#E8E0D0]"
        style={{
          fontFamily: "var(--font-cormorant), serif",
          fontWeight: 600,
          fontSize: "1.5rem",
          letterSpacing: "0.2em",
        }}
      >
        ROS
        <span style={{ color: "#8B3A2A" }}>✦</span>
        NI&apos;S
      </span>
      <span
        className="text-[#6B6459] tracking-[0.45em] uppercase"
        style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontWeight: 300,
          fontSize: "0.5rem",
          letterSpacing: "0.45em",
        }}
      >
        DELI
      </span>
    </div>
  );
}
