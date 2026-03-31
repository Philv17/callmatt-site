import { useState, useEffect, useRef } from "react";

const PHONE = "(419) 234-8293";
const PHONE_HREF = "tel:4192348293";

const PAGE_DATA = {
  home: {
    seoTitle: "Call Matt | Lawn Care, Landscaping & Detailing in Lima, Ohio",
    metaDescription:
      "Call Matt for affordable lawn care, landscaping, mulching, yard cleanup, pressure washing, and auto detailing in Lima, Ohio. Reliable local service. Free quotes!",
    slug: "/",
  },
  lawnCare: {
    seoTitle: "Lawn Care Services in Lima, Ohio | Call Matt",
    metaDescription:
      "Professional lawn mowing, trimming, edging, and seasonal yard maintenance in Lima, Ohio and Allen County. Dependable, affordable service. Call Matt for a free quote.",
    slug: "/lawn-care-lima-ohio",
  },
  landscaping: {
    seoTitle: "Landscaping Services in Lima, Ohio | Call Matt",
    metaDescription:
      "Quality landscaping, mulching, garden beds, and yard design in Lima, Ohio and Allen County. Call Matt for a free estimate on your next landscaping project.",
    slug: "/landscaping-lima-ohio",
  },
  pressureWashing: {
    seoTitle: "Pressure Washing in Lima, Ohio | Call Matt",
    metaDescription:
      "Affordable pressure washing for driveways, sidewalks, decks, and siding in Lima, Ohio and Allen County. Call Matt to restore your property's curb appeal today.",
    slug: "/pressure-washing-lima-ohio",
  },
  detailing: {
    seoTitle: "Auto & Boat Detailing in Lima, Ohio | Call Matt",
    metaDescription:
      "Professional car detailing and boat detailing in Lima, Ohio. Interior, exterior, and full detail packages. Call Matt for a spotless ride.",
    slug: "/auto-detailing-lima-ohio",
  },
  contact: {
    seoTitle: "Contact Call Matt | Free Quotes in Lima, Ohio",
    metaDescription:
      "Get a free quote from Call Matt for lawn care, landscaping, pressure washing, or detailing in Lima, Ohio. Call or fill out the form — we respond fast.",
    slug: "/contact",
  },
};

const C = {
  forest: "#1a3a2a",
  forestLight: "#24503a",
  sage: "#4a7c59",
  lime: "#8bc34a",
  limeLight: "#a8d86e",
  cream: "#f5f1eb",
  warmWhite: "#faf8f5",
  sand: "#e8e0d4",
  bark: "#3e2c1c",
  barkLight: "#5c4033",
  charcoal: "#2d2d2d",
  white: "#ffffff",
  overlay: "rgba(26, 58, 42, 0.88)",
};

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.lime} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const StarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#f4b400" stroke="none">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
  </svg>
);

const QuoteIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill={C.sage} opacity="0.25">
    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
  </svg>
);

const MowerIcon = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke={C.sage} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="18" width="28" height="14" rx="3"/><circle cx="14" cy="36" r="4"/><circle cx="34" cy="36" r="4"/><path d="M20 18V10h8v8"/><line x1="4" y1="24" x2="8" y2="24"/>
  </svg>
);

const TreeIcon = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke={C.sage} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M24 6L12 22h8l-6 12h20l-6-12h8z"/><line x1="24" y1="34" x2="24" y2="44"/>
  </svg>
);

const SprayIcon = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke={C.sage} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="14" y="20" width="10" height="22" rx="2"/><path d="M19 20V12h10v4"/><path d="M34 10l4-4M34 16h6M34 22l4 4"/><circle cx="34" cy="16" r="2" fill={C.sage}/>
  </svg>
);

const LeafIcon = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke={C.sage} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 40C10 40 12 16 36 8c0 0-4 28-26 32z"/><path d="M10 40c8-8 16-16 26-32"/>
  </svg>
);

const CarIcon = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke={C.sage} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 28l4-12h28l4 12"/><rect x="4" y="28" width="40" height="10" rx="3"/><circle cx="14" cy="38" r="3"/><circle cx="34" cy="38" r="3"/><path d="M14 16h20"/>
  </svg>
);

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Header({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const nav = [
    { label: "Home", key: "home" },
    { label: "Lawn Care", key: "lawnCare" },
    { label: "Landscaping", key: "landscaping" },
    { label: "Pressure Washing", key: "pressureWashing" },
    { label: "Detailing", key: "detailing" },
    { label: "Contact", key: "contact" },
  ];

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? C.forest : "transparent",
      backdropFilter: scrolled ? "blur(10px)" : "none",
      transition: "all 0.35s ease",
      borderBottom: scrolled ? `1px solid ${C.forestLight}` : "1px solid transparent",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        <div onClick={() => { setPage("home"); setMenuOpen(false); window.scrollTo(0, 0); }} style={{ cursor: "pointer", display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, fontWeight: 800, color: C.white, letterSpacing: "-0.5px" }}>Call Matt</span>
          <span style={{ fontSize: 11, color: C.limeLight, fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase" }}>Lima, OH</span>
        </div>

        <nav style={{ display: "flex", alignItems: "center", gap: 22 }} className="desktop-nav">
          {nav.map(n => (
            <span key={n.key} onClick={() => { setPage(n.key); window.scrollTo(0, 0); }} style={{
              cursor: "pointer", fontSize: 13, fontWeight: page === n.key ? 700 : 500,
              color: page === n.key ? C.limeLight : "rgba(255,255,255,0.85)",
              borderBottom: page === n.key ? `2px solid ${C.lime}` : "2px solid transparent",
              paddingBottom: 4, transition: "all 0.2s",
              fontFamily: "'DM Sans', sans-serif",
            }}>{n.label}</span>
          ))}
          <a href={PHONE_HREF} style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: C.lime, color: C.forest, padding: "10px 18px",
            borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: "none",
            fontFamily: "'DM Sans', sans-serif",
          }}>
            <PhoneIcon /> {PHONE}
          </a>
        </nav>

        <div className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ color: C.white, cursor: "pointer" }}>
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </div>
      </div>

      {menuOpen && (
        <div style={{
          position: "fixed", top: 72, left: 0, right: 0, bottom: 0,
          background: C.forest, padding: "32px 24px", display: "flex", flexDirection: "column", gap: 8,
        }}>
          {nav.map(n => (
            <span key={n.key} onClick={() => { setPage(n.key); setMenuOpen(false); window.scrollTo(0, 0); }} style={{
              cursor: "pointer", fontSize: 20, fontWeight: 600, color: C.white,
              padding: "14px 0", borderBottom: `1px solid ${C.forestLight}`,
              fontFamily: "'DM Sans', sans-serif",
            }}>{n.label}</span>
          ))}
          <a href={PHONE_HREF} style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
            background: C.lime, color: C.forest, padding: "16px 24px", marginTop: 16,
            borderRadius: 10, fontWeight: 700, fontSize: 18, textDecoration: "none",
            fontFamily: "'DM Sans', sans-serif",
          }}>
            <PhoneIcon /> Call Now — {PHONE}
          </a>
        </div>
      )}
    </header>
  );
}

function HeroBanner({ headline, sub, showBadges = false }) {
  const [ref, vis] = useInView(0.1);
  return (
    <section ref={ref} style={{
      position: "relative", minHeight: 520, display: "flex", alignItems: "center",
      background: `linear-gradient(145deg, ${C.forest} 0%, ${C.forestLight} 50%, ${C.sage} 100%)`,
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "rgba(139,195,74,0.08)" }} />
      <div style={{ position: "absolute", bottom: -40, left: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(139,195,74,0.06)" }} />
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle at 20% 80%, rgba(139,195,74,0.12) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.04) 0%, transparent 40%)",
      }} />

      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "120px 24px 80px", width: "100%",
        position: "relative", zIndex: 2,
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(36px, 6vw, 64px)",
          fontWeight: 800, color: C.white, lineHeight: 1.1, maxWidth: 700, marginBottom: 20,
        }}>
          {headline}
        </h1>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(16px, 2.5vw, 20px)",
          color: "rgba(255,255,255,0.85)", maxWidth: 560, lineHeight: 1.6, marginBottom: 32,
        }}>
          {sub}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
          <a href={PHONE_HREF} style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: C.lime, color: C.forest, padding: "16px 32px",
            borderRadius: 10, fontWeight: 700, fontSize: 17, textDecoration: "none",
            fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 20px rgba(139,195,74,0.3)",
          }}>
            <PhoneIcon /> Call Now for a Free Quote
          </a>
          <a href="#services" onClick={e => { e.preventDefault(); document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }); }} style={{
            display: "inline-flex", alignItems: "center",
            background: "rgba(255,255,255,0.12)", color: C.white, padding: "16px 28px",
            borderRadius: 10, fontWeight: 600, fontSize: 16, textDecoration: "none",
            fontFamily: "'DM Sans', sans-serif", border: "1px solid rgba(255,255,255,0.2)",
          }}>
            View Our Services
          </a>
        </div>

        {showBadges && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 36 }}>
            {["Locally Owned & Operated", "Free Estimates", "Serving Allen County"].map((b, i) => (
              <span key={i} style={{
                display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.8)",
                fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
              }}>
                <CheckIcon /> {b}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ServiceCard({ icon, title, desc, link, setPage }) {
  const [ref, vis] = useInView(0.15);
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onClick={() => { setPage(link); window.scrollTo(0, 0); }}
      style={{
        background: C.white, borderRadius: 14, padding: 32, cursor: "pointer",
        border: `1px solid ${hovered ? C.sage : C.sand}`,
        boxShadow: hovered ? "0 12px 40px rgba(26,58,42,0.12)" : "0 2px 12px rgba(0,0,0,0.04)",
        transform: vis ? (hovered ? "translateY(-4px)" : "translateY(0)") : "translateY(20px)",
        opacity: vis ? 1 : 0,
        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
      <div style={{ marginBottom: 16 }}>{icon}</div>
      <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 700, color: C.forest, marginBottom: 10 }}>{title}</h3>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#666", lineHeight: 1.6, marginBottom: 16 }}>{desc}</p>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: C.sage }}>Learn More →</span>
    </div>
  );
}

function ReviewCard({ name, text, service, stars = 5 }) {
  const [ref, vis] = useInView(0.15);
  return (
    <div ref={ref} style={{
      background: C.white, borderRadius: 14, padding: 28,
      border: `1px solid ${C.sand}`, position: "relative",
      boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
      opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
    }}>
      <div style={{ position: "absolute", top: 20, right: 24 }}><QuoteIcon /></div>
      <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>
        {Array.from({ length: stars }).map((_, i) => <StarIcon key={i} />)}
      </div>
      {service && (
        <span style={{
          display: "inline-block", fontFamily: "'DM Sans', sans-serif", fontSize: 11,
          fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase",
          color: C.sage, background: `${C.sage}12`, padding: "4px 10px",
          borderRadius: 6, marginBottom: 12,
        }}>{service}</span>
      )}
      <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: C.charcoal,
        lineHeight: 1.7, fontStyle: "italic", marginBottom: 16, position: "relative",
      }}>
        "{text}"
      </p>
      <div style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: C.forest,
        paddingTop: 12, borderTop: `1px solid ${C.sand}`,
      }}>
        — {name}
      </div>
    </div>
  );
}

function SectionHeading({ label, title, subtitle, light = false }) {
  const [ref, vis] = useInView(0.1);
  return (
    <div ref={ref} style={{
      textAlign: "center", marginBottom: 48,
      opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.7s ease",
    }}>
      {label && <span style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700,
        letterSpacing: "2.5px", textTransform: "uppercase",
        color: light ? C.limeLight : C.sage, marginBottom: 10, display: "block",
      }}>{label}</span>}
      <h2 style={{
        fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px, 4vw, 42px)",
        fontWeight: 800, color: light ? C.white : C.forest, lineHeight: 1.2, marginBottom: 14,
      }}>{title}</h2>
      {subtitle && <p style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: light ? "rgba(255,255,255,0.75)" : "#777",
        maxWidth: 560, margin: "0 auto", lineHeight: 1.6,
      }}>{subtitle}</p>}
    </div>
  );
}

function CTABanner({ setPage }) {
  return (
    <section style={{
      background: `linear-gradient(135deg, ${C.forest} 0%, ${C.sage} 100%)`,
      padding: "64px 24px", textAlign: "center",
    }}>
      <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, color: C.white, marginBottom: 14 }}>
        Ready to Get Started?
      </h2>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: "rgba(255,255,255,0.8)", marginBottom: 28, maxWidth: 480, margin: "0 auto 28px" }}>
        Get a free, no-obligation quote today. Proudly serving Lima, Ohio and Allen County.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14 }}>
        <a href={PHONE_HREF} style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          background: C.lime, color: C.forest, padding: "16px 32px",
          borderRadius: 10, fontWeight: 700, fontSize: 17, textDecoration: "none",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          <PhoneIcon /> Call Matt Now
        </a>
        <span onClick={() => { setPage("contact"); window.scrollTo(0, 0); }} style={{
          display: "inline-flex", alignItems: "center", cursor: "pointer",
          background: "rgba(255,255,255,0.15)", color: C.white, padding: "16px 28px",
          borderRadius: 10, fontWeight: 600, fontSize: 16, textDecoration: "none",
          fontFamily: "'DM Sans', sans-serif", border: "1px solid rgba(255,255,255,0.25)",
        }}>
          Request a Quote Online
        </span>
      </div>
    </section>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    setSent(true);
  };

  const inputStyle = {
    width: "100%", padding: "14px 16px", borderRadius: 8,
    border: `1px solid ${C.sand}`, fontFamily: "'DM Sans', sans-serif",
    fontSize: 15, background: C.warmWhite, outline: "none", boxSizing: "border-box",
  };

  if (sent) {
    return (
      <div style={{ textAlign: "center", padding: 48 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
        <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 24, color: C.forest, marginBottom: 10 }}>Message Sent!</h3>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#666" }}>Matt will get back to you shortly — usually within a few hours.</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <input style={inputStyle} placeholder="Your Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input style={inputStyle} placeholder="Phone Number *" type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
      </div>
      <input style={inputStyle} placeholder="Email Address" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <select style={{ ...inputStyle, color: form.service ? C.charcoal : "#999" }} value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
        <option value="">Select a Service</option>
        <option>Lawn Mowing</option>
        <option>Lawn Care & Maintenance</option>
        <option>Landscaping</option>
        <option>Mulching</option>
        <option>Yard Cleanup</option>
        <option>Pressure Washing</option>
        <option>Auto Detailing</option>
        <option>Boat Detailing</option>
        <option>Other</option>
      </select>
      <textarea style={{ ...inputStyle, minHeight: 100, resize: "vertical" }} placeholder="Tell us about your project..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
      <button onClick={handleSubmit} style={{
        background: C.lime, color: C.forest, padding: "16px 32px",
        borderRadius: 10, fontWeight: 700, fontSize: 16, border: "none",
        cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
        boxShadow: "0 4px 16px rgba(139,195,74,0.25)",
      }}>
        Get Your Free Quote
      </button>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#999", textAlign: "center" }}>
        We typically respond within a few hours.
      </p>
    </div>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ background: C.forest, padding: "56px 24px 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 40, marginBottom: 40 }}>
          <div>
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 24, fontWeight: 800, color: C.white, display: "block", marginBottom: 8 }}>Call Matt</span>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
              Lawn care, landscaping, pressure washing, and detailing services for homes and businesses across Lima, Ohio and Allen County.
            </p>
          </div>
          <div>
            <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: C.limeLight, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 16 }}>Services</h4>
            {[
              { key: "lawnCare", label: "Lawn Care" },
              { key: "landscaping", label: "Landscaping" },
              { key: "pressureWashing", label: "Pressure Washing" },
              { key: "detailing", label: "Auto & Boat Detailing" },
            ].map(item => (
              <span key={item.key} onClick={() => { setPage(item.key); window.scrollTo(0, 0); }} style={{
                display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                color: "rgba(255,255,255,0.7)", marginBottom: 10, cursor: "pointer",
              }}>
                {item.label}
              </span>
            ))}
          </div>
          <div>
            <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: C.limeLight, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 16 }}>Service Area</h4>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
              Lima, OH • Shawnee • Elida • Cridersville • Ada • Delphos • Wapakoneta • Russells Point • Allen County
            </p>
          </div>
          <div>
            <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: C.limeLight, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 16 }}>Contact</h4>
            <a href={PHONE_HREF} style={{ display: "flex", alignItems: "center", gap: 8, color: C.white, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 10 }}>
              <PhoneIcon /> {PHONE}
            </a>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.6)" }}>Lima, Ohio & Allen County</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>Mon–Sat: 7:00 AM – 7:00 PM</p>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${C.forestLight}`, paddingTop: 24, textAlign: "center" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
            © {new Date().getFullYear()} Call Matt — Lawn Care, Landscaping & Detailing — Lima, Ohio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function HomePage({ setPage }) {
  return (
    <>
      <HeroBanner
        headline={<>Lima's Trusted Lawn Care, Landscaping & Detailing</>}
        sub="Affordable, dependable service for homeowners and businesses across Lima, Ohio and Allen County. From weekly mowing to a spotless ride — just call Matt."
        showBadges
      />

      <section id="services" style={{ background: C.cream, padding: "80px 24px" }}>
        <SectionHeading label="What We Do" title="Services for Your Property & Your Ride" subtitle="Yard work, landscaping, pressure washing, and professional detailing — all from one reliable local pro." />
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 24 }}>
          <ServiceCard icon={<MowerIcon />} title="Lawn Mowing & Care" desc="Weekly mowing, trimming, edging, and seasonal lawn maintenance to keep your yard looking sharp all season long." link="lawnCare" setPage={setPage} />
          <ServiceCard icon={<TreeIcon />} title="Landscaping & Mulching" desc="Garden beds, mulch installation, shrub planting, and landscape design to boost your curb appeal." link="landscaping" setPage={setPage} />
          <ServiceCard icon={<SprayIcon />} title="Pressure Washing" desc="Driveways, sidewalks, decks, patios, and siding — we'll make your property look brand new." link="pressureWashing" setPage={setPage} />
          <ServiceCard icon={<CarIcon />} title="Auto & Boat Detailing" desc="Interior and exterior detailing for cars, trucks, and boats. Professional results at affordable prices." link="detailing" setPage={setPage} />
          <ServiceCard icon={<LeafIcon />} title="Yard Cleanup" desc="Spring and fall cleanup, leaf removal, debris hauling, and storm damage cleanup. We'll handle the mess." link="contact" setPage={setPage} />
        </div>
      </section>

      <section style={{ background: C.warmWhite, padding: "80px 24px" }}>
        <SectionHeading label="Why Call Matt" title="What Makes Us Different" />
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 32 }}>
          {[
            { title: "Local & Reliable", text: "Matt lives and works right here in Lima. When you call, you get Matt — not a call center, not a random crew. He shows up on time, every time." },
            { title: "Honest, Fair Pricing", text: "No hidden fees or surprise charges. You get a straightforward quote before any work starts. Free estimates on every job." },
            { title: "Quality You Can See", text: "Clean lines, neat edges, and properties that look their best. Whether it's your yard or your vehicle, the results speak for themselves." },
          ].map((item, i) => {
            const [ref, vis] = useInView(0.15);
            return (
              <div key={i} ref={ref} style={{
                textAlign: "center", padding: 24,
                opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.6s ease ${i * 0.15}s`,
              }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: `${C.sage}15`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <CheckIcon />
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: C.forest, marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#666", lineHeight: 1.6 }}>{item.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section style={{ background: C.cream, padding: "80px 24px" }}>
        <SectionHeading label="5-Star Reviews" title="What Our Customers Say" subtitle="Real reviews from real customers in the Lima, Ohio area." />
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          <ReviewCard name="Dalton Brenner" service="Detailing" text="Matt is the best detailer in Lima! He got my vehicle in quickly, and had it cleaner than I ever could have imagined. Very professional, honest, and clearly takes pride in his work!" stars={5} />
          <ReviewCard name="Matt Paulik" service="Detailing" text="I've had Matt detail my car 7 times now. Very professional, always available, and very detail oriented. Gets my car done in a timely manner and it always looks great. Highly recommend!" stars={5} />
          <ReviewCard name="Rachel Boggs" service="Detailing" text="Handled my detail quickly, professionally, and did an amazing job! I'll definitely be returning when my car is due for another detail." stars={5} />
        </div>
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#777" }}>
            The same attention to detail Matt brings to vehicles goes into every lawn and landscaping job.{" "}
            <a href={PHONE_HREF} style={{ color: C.sage, fontWeight: 700, textDecoration: "none" }}>Call Matt today</a> and see for yourself.
          </p>
        </div>
      </section>

      <section style={{ background: C.warmWhite, padding: "64px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 800, color: C.forest, marginBottom: 14 }}>
            Proudly Serving Lima, Ohio &amp; Allen County
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#666", lineHeight: 1.7 }}>
            Call Matt provides lawn care, landscaping, pressure washing, and detailing services throughout Lima, Ohio and nearby communities including Shawnee, Elida, Cridersville, Ada, Delphos, Wapakoneta, Russells Point, and the greater Allen County area. Whether you need weekly mowing, a landscape refresh, or a full vehicle detail — we're just a phone call away.
          </p>
        </div>
      </section>

      <CTABanner setPage={setPage} />
    </>
  );
}

function LawnCarePage({ setPage }) {
  return (
    <>
      <HeroBanner headline={<>Lawn Care Services in Lima, Ohio</>} sub="Weekly mowing, trimming, edging, and seasonal maintenance — your lawn deserves a pro who shows up every time." />

      <section style={{ background: C.warmWhite, padding: "80px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <SectionHeading label="Lawn Care Services" title="Keep Your Lawn Looking Its Best, All Season Long" />
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: C.charcoal, lineHeight: 1.8 }}>
            <p style={{ marginBottom: 20 }}>A well-maintained lawn is the foundation of a great-looking property. Call Matt provides reliable, professional lawn care to homeowners and businesses across Lima, Ohio and Allen County who want a yard they can be proud of — without doing it themselves.</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, fontWeight: 700, color: C.forest, marginBottom: 16, marginTop: 40 }}>Our Lawn Care Services in Lima, OH</h2>
            {[
              { title: "Weekly & Bi-Weekly Lawn Mowing", text: "Consistent, clean cuts at the right height for your grass type. We mow, trim, edge, and blow every visit. Serving residential and commercial properties throughout Lima and Allen County." },
              { title: "Trimming & Edging", text: "Crisp edges along sidewalks, driveways, and garden beds that give your Lima property that finished, professional look." },
              { title: "Seasonal Lawn Maintenance", text: "From spring startup to fall aeration, we handle the seasonal tasks that keep Ohio lawns healthy year-round." },
              { title: "Yard Cleanup & Leaf Removal", text: "Spring debris, fallen leaves, storm damage — we clean it all up so your yard is ready for any season. Available across Lima, Shawnee, Elida, and surrounding areas." },
            ].map((s, i) => {
              const [ref, vis] = useInView(0.1);
              return (
                <div key={i} ref={ref} style={{ background: C.white, borderRadius: 12, padding: 24, marginBottom: 16, border: `1px solid ${C.sand}`, opacity: vis ? 1 : 0, transform: vis ? "translateX(0)" : "translateX(-20px)", transition: `all 0.5s ease ${i * 0.1}s` }}>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: C.forest, marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ margin: 0, color: "#555" }}>{s.text}</p>
                </div>
              );
            })}
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, fontWeight: 700, color: C.forest, marginBottom: 16, marginTop: 40 }}>Why Lima Homeowners Choose Call Matt for Lawn Care</h2>
            <p style={{ marginBottom: 20 }}>You've got options for lawn care in Lima, Ohio — but not every company treats your property like their own. Matt is a local pro who shows up on time, communicates clearly, and delivers consistent results week after week. No contracts, no surprises — just a great-looking lawn.</p>
            <p style={{ marginBottom: 20 }}>Whether you need a one-time mow or a full-season lawn care plan, Call Matt has you covered. We work with homeowners and businesses throughout Lima, Shawnee, Elida, Cridersville, and the surrounding Allen County area.</p>
            <p>
              Need more than mowing?{" "}
              <span onClick={() => { setPage("landscaping"); window.scrollTo(0, 0); }} style={{ color: C.sage, fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}>Check out our landscaping services</span>,{" "}
              <span onClick={() => { setPage("pressureWashing"); window.scrollTo(0, 0); }} style={{ color: C.sage, fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}>pressure washing</span>, or{" "}
              <span onClick={() => { setPage("detailing"); window.scrollTo(0, 0); }} style={{ color: C.sage, fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}>auto detailing</span>{" "}
              to give your property and vehicle a complete refresh.
            </p>
          </div>
        </div>
      </section>
      <CTABanner setPage={setPage} />
    </>
  );
}

function LandscapingPage({ setPage }) {
  return (
    <>
      <HeroBanner headline={<>Landscaping Services in Lima, Ohio</>} sub="From mulching and garden beds to full landscape design — create a yard you'll love coming home to." />

      <section style={{ background: C.warmWhite, padding: "80px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <SectionHeading label="Landscaping Services" title="Boost Your Curb Appeal with Professional Landscaping" />
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: C.charcoal, lineHeight: 1.8 }}>
            <p style={{ marginBottom: 20 }}>Your home's landscaping is the first thing people notice. Whether you're looking to refresh tired garden beds, add mulch for a cleaner look, or plan a full landscape project, Call Matt delivers quality landscaping services that Lima, Ohio homeowners and businesses can count on.</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, fontWeight: 700, color: C.forest, marginBottom: 16, marginTop: 40 }}>Landscaping Services in Lima & Allen County</h2>
            {[
              { title: "Mulch Installation", text: "Fresh mulch transforms your beds instantly. We provide professional mulching with quality materials that keep weeds down and moisture in. One of our most popular services in the Lima area." },
              { title: "Garden Bed Design & Planting", text: "New garden beds, shrub planting, and seasonal flowers — designed to complement your home and thrive in Ohio's climate." },
              { title: "Landscape Design & Renovation", text: "Ready for a bigger change? We'll work with you to plan and install a landscape that fits your vision, your property, and your budget." },
              { title: "Hardscape Edging & Borders", text: "Clean stone, brick, or natural edging to define your beds and walkways for a polished, finished look." },
            ].map((s, i) => {
              const [ref, vis] = useInView(0.1);
              return (
                <div key={i} ref={ref} style={{ background: C.white, borderRadius: 12, padding: 24, marginBottom: 16, border: `1px solid ${C.sand}`, opacity: vis ? 1 : 0, transform: vis ? "translateX(0)" : "translateX(-20px)", transition: `all 0.5s ease ${i * 0.1}s` }}>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: C.forest, marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ margin: 0, color: "#555" }}>{s.text}</p>
                </div>
              );
            })}
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, fontWeight: 700, color: C.forest, marginBottom: 16, marginTop: 40 }}>Lima's Go-To Landscaping Pro</h2>
            <p style={{ marginBottom: 20 }}>Big landscaping companies come with big price tags and impersonal service. Call Matt keeps it simple — you deal directly with Matt, get a fair price upfront, and watch your property transform. We've helped homeowners across Lima, Shawnee, Elida, and greater Allen County create outdoor spaces they love.</p>
            <p style={{ marginBottom: 20 }}>Whether it's a simple mulch refresh or a full front-yard redesign, every job gets the same attention to detail.</p>
            <p>
              Looking for regular lawn maintenance too?{" "}
              <span onClick={() => { setPage("lawnCare"); window.scrollTo(0, 0); }} style={{ color: C.sage, fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}>See our lawn care services</span>{" "}
              or{" "}
              <span onClick={() => { setPage("contact"); window.scrollTo(0, 0); }} style={{ color: C.sage, fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}>request a free quote</span>{" "}
              to get started.
            </p>
          </div>
        </div>
      </section>
      <CTABanner setPage={setPage} />
    </>
  );
}

function PressureWashingPage({ setPage }) {
  return (
    <>
      <HeroBanner headline={<>Pressure Washing in Lima, Ohio</>} sub="Driveways, sidewalks, decks, patios, siding — we'll make your property look brand new. Affordable rates, fast results." />

      <section style={{ background: C.warmWhite, padding: "80px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <SectionHeading label="Pressure Washing" title="Restore Your Property's Curb Appeal" />
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: C.charcoal, lineHeight: 1.8 }}>
            <p style={{ marginBottom: 20 }}>Years of dirt, algae, mildew, and grime can make even a beautiful property look neglected. Call Matt's pressure washing services bring surfaces back to life — fast and affordably. Serving homeowners and businesses throughout Lima, Ohio and Allen County.</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, fontWeight: 700, color: C.forest, marginBottom: 16, marginTop: 40 }}>Pressure Washing Services in Lima, OH</h2>
            {[
              { title: "Driveways & Sidewalks", text: "Remove oil stains, mildew, dirt, and discoloration from concrete and asphalt surfaces. One of the fastest ways to improve your Lima home's curb appeal." },
              { title: "Decks & Patios", text: "Restore the natural look of wood, composite, stone, and paver surfaces. Perfect prep before staining or sealing." },
              { title: "House Siding & Exteriors", text: "Vinyl, brick, and painted surfaces cleaned safely with the right pressure and technique for your home." },
              { title: "Fences & Retaining Walls", text: "Bring weathered fences and walls back to life without the cost of replacement." },
            ].map((s, i) => {
              const [ref, vis] = useInView(0.1);
              return (
                <div key={i} ref={ref} style={{ background: C.white, borderRadius: 12, padding: 24, marginBottom: 16, border: `1px solid ${C.sand}`, opacity: vis ? 1 : 0, transform: vis ? "translateX(0)" : "translateX(-20px)", transition: `all 0.5s ease ${i * 0.1}s` }}>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: C.forest, marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ margin: 0, color: "#555" }}>{s.text}</p>
                </div>
              );
            })}
            <p style={{ marginTop: 32 }}>
              Pair pressure washing with our{" "}
              <span onClick={() => { setPage("landscaping"); window.scrollTo(0, 0); }} style={{ color: C.sage, fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}>landscaping</span>,{" "}
              <span onClick={() => { setPage("lawnCare"); window.scrollTo(0, 0); }} style={{ color: C.sage, fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}>lawn care</span>, or{" "}
              <span onClick={() => { setPage("detailing"); window.scrollTo(0, 0); }} style={{ color: C.sage, fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}>detailing services</span>{" "}
              for a complete property refresh.
            </p>
          </div>
        </div>
      </section>
      <CTABanner setPage={setPage} />
    </>
  );
}

function DetailingPage({ setPage }) {
  return (
    <>
      <HeroBanner headline={<>Auto & Boat Detailing in Lima, Ohio</>} sub="Professional interior and exterior detailing for cars, trucks, SUVs, and boats. Your ride deserves the same care we give every lawn." />

      <section style={{ background: C.warmWhite, padding: "80px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <SectionHeading label="Detailing Services" title="A Spotless Ride, Every Time" />
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: C.charcoal, lineHeight: 1.8 }}>
            <p style={{ marginBottom: 20 }}>Matt has been detailing cars and boats in the Lima, Ohio area for years — and the 5-star reviews speak for themselves. Whether your daily driver needs a deep clean or your boat needs to shine before hitting the lake, Call Matt delivers professional results at a fair price.</p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, fontWeight: 700, color: C.forest, marginBottom: 16, marginTop: 40 }}>Detailing Services in Lima & Allen County</h2>
            {[
              { title: "Exterior Detailing", text: "Hand wash, clay bar treatment, polish, and wax. We'll remove road grime, water spots, and oxidation to bring back that showroom shine." },
              { title: "Interior Detailing", text: "Deep cleaning of seats, carpets, dash, door panels, and all surfaces. Leather conditioning, stain removal, and odor elimination included." },
              { title: "Full Detail Packages", text: "Complete interior and exterior service for vehicles that need the works. The most popular choice for customers across Lima and Allen County." },
              { title: "Boat Detailing", text: "Hull cleaning, oxidation removal, waxing, and interior cleaning. Get your boat looking great before — or after — a season on the water." },
            ].map((s, i) => {
              const [ref, vis] = useInView(0.1);
              return (
                <div key={i} ref={ref} style={{ background: C.white, borderRadius: 12, padding: 24, marginBottom: 16, border: `1px solid ${C.sand}`, opacity: vis ? 1 : 0, transform: vis ? "translateX(0)" : "translateX(-20px)", transition: `all 0.5s ease ${i * 0.1}s` }}>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 700, color: C.forest, marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ margin: 0, color: "#555" }}>{s.text}</p>
                </div>
              );
            })}
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, fontWeight: 700, color: C.forest, marginBottom: 16, marginTop: 40 }}>Lima's Most Reviewed Detailer</h2>
            <p style={{ marginBottom: 20 }}>Don't take our word for it — our detailing customers consistently leave 5-star reviews. Matt's attention to detail is what built this business, and it's the same care he brings to every lawn, landscape, and pressure washing job.</p>
            <p style={{ marginBottom: 20 }}>Mobile detailing available throughout Lima, Shawnee, Elida, Cridersville, and the greater Allen County area. Call for pricing — we'll come to you.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginTop: 32, marginBottom: 32 }}>
              <ReviewCard name="Dalton Brenner" text="Matt is the best detailer in Lima! He got my vehicle in quickly, and had it cleaner than I ever could have imagined. Very professional and honest!" stars={5} />
              <ReviewCard name="Matt Paulik" text="I've had Matt detail my car 7 times now. Very professional, always available, and very detail oriented. It always looks great. Highly recommend!" stars={5} />
            </div>
            <p>
              While you're here — check out our{" "}
              <span onClick={() => { setPage("lawnCare"); window.scrollTo(0, 0); }} style={{ color: C.sage, fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}>lawn care</span>,{" "}
              <span onClick={() => { setPage("landscaping"); window.scrollTo(0, 0); }} style={{ color: C.sage, fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}>landscaping</span>, and{" "}
              <span onClick={() => { setPage("pressureWashing"); window.scrollTo(0, 0); }} style={{ color: C.sage, fontWeight: 700, cursor: "pointer", textDecoration: "underline" }}>pressure washing</span>{" "}
              services too.
            </p>
          </div>
        </div>
      </section>
      <CTABanner setPage={setPage} />
    </>
  );
}

function ContactPage({ setPage }) {
  return (
    <>
      <HeroBanner headline={<>Get a Free Quote</>} sub="Call, text, or fill out the form below. Matt responds fast — usually within a few hours." />

      <section style={{ background: C.warmWhite, padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48 }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 700, color: C.forest, marginBottom: 20 }}>Contact Call Matt</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#666", lineHeight: 1.7, marginBottom: 28 }}>Ready to get started? Whether you need lawn mowing, landscaping, mulching, yard cleanup, pressure washing, or vehicle detailing in Lima, Ohio — we're here to help. Fill out the form or give Matt a call directly.</p>
            <a href={PHONE_HREF} style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", background: C.forest, color: C.white, padding: "18px 24px", borderRadius: 12, fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
              <PhoneIcon /> {PHONE}
            </a>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#666", lineHeight: 1.8, marginTop: 24 }}>
              <p><strong style={{ color: C.forest }}>Service Area:</strong> Lima, Ohio and surrounding communities including Shawnee, Elida, Cridersville, Ada, Delphos, Wapakoneta, Russells Point, and all of Allen County.</p>
              <p style={{ marginTop: 8 }}><strong style={{ color: C.forest }}>Hours:</strong> Monday–Saturday, 7:00 AM – 7:00 PM</p>
              <p style={{ marginTop: 8 }}><strong style={{ color: C.forest }}>Services:</strong> Lawn care, landscaping, mulching, yard cleanup, pressure washing, auto detailing, boat detailing</p>
            </div>
          </div>
          <div style={{ background: C.white, borderRadius: 14, padding: 32, border: `1px solid ${C.sand}`, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 700, color: C.forest, marginBottom: 20 }}>Request a Free Quote</h3>
            <ContactForm />
          </div>
        </div>
      </section>
      <CTABanner setPage={setPage} />
    </>
  );
}

function FloatingCallButton() {
  return (
    <a href={PHONE_HREF} className="floating-call-btn" style={{
      position: "fixed", bottom: 20, right: 20, zIndex: 999,
      width: 60, height: 60, borderRadius: "50%",
      background: C.lime, color: C.forest,
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 4px 20px rgba(139,195,74,0.4)",
      textDecoration: "none",
    }}>
      <PhoneIcon />
    </a>
  );
}

export default function CallMattWebsite() {
  const [page, setPage] = useState("home");

  return (
    <div style={{ minHeight: "100vh", background: C.warmWhite }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700;800&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        body { -webkit-font-smoothing: antialiased; }
        .desktop-nav { display: flex !important; }
        .mobile-menu-btn { display: none !important; }
        .floating-call-btn { display: none !important; }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          .floating-call-btn { display: flex !important; }
        }

        input:focus, select:focus, textarea:focus {
          border-color: ${C.sage} !important;
          box-shadow: 0 0 0 3px rgba(74, 124, 89, 0.15) !important;
        }

        ::selection {
          background: ${C.sage};
          color: white;
        }
      `}</style>

      <Header page={page} setPage={setPage} />

      {page === "home" && <HomePage setPage={setPage} />}
      {page === "lawnCare" && <LawnCarePage setPage={setPage} />}
      {page === "landscaping" && <LandscapingPage setPage={setPage} />}
      {page === "pressureWashing" && <PressureWashingPage setPage={setPage} />}
      {page === "detailing" && <DetailingPage setPage={setPage} />}
      {page === "contact" && <ContactPage setPage={setPage} />}

      <Footer setPage={setPage} />
      <FloatingCallButton />
    </div>
  );
}
