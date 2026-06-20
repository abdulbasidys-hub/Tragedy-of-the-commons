import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// ─── DATA ───────────────────────────────────────────────────────────────────
// Each tragedy's background photo should live at /public/tragedies/<image>.
// See the bottom of this file for the full image checklist.
const TRAGEDIES = [
  {
    id: "drain",
    name: "The Drain",
    tag: "Overtrading — Liquidity Drain",
    description:
      "Liquidity leaves before growth can compound. We call it taking profit. It's really just draining the well faster than it refills.",
    align: "left",
    accent: "var(--c-primary-container)",
    image: "the-drain.jpg",
  },
  {
    id: "crowd",
    name: "The Crowd",
    tag: "Attention Fragmentation — Too Many Coins",
    description:
      "Thousands of tokens launch every week, each fighting for the same finite attention. No project gets enough oxygen to grow.",
    align: "right",
    accent: "var(--c-secondary-container)",
    image: "the-crowd.jpg",
  },
  {
    id: "rug",
    name: "The Rug",
    tag: "Trust Erosion — Rugs & Low Effort",
    description:
      "Every abandoned project poisons the well for the next one. Trust isn't reset per coin. It's shared. And shrinking.",
    align: "left",
    accent: "var(--c-error)",
    image: "the-rug.jpg",
  },
  {
    id: "empty-hand",
    name: "The Empty Hand",
    tag: "Lack of Conviction — No Holding Culture",
    description:
      "Everyone wants the gain. Almost no one carries the weight of holding. So nothing gets the chance to become something.",
    align: "right",
    accent: "var(--c-on-surface-variant)",
    image: "the-empty-hand.jpg",
  },
];

const REFLECTION_LINES = ["We chase.", "We rotate.", "We abandon.", "We repeat."];

// ─── HOOKS / HELPERS (self-contained — see note at bottom of file) ─────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0px)" : "translateY(20px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Label({ children }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600,
      letterSpacing: "0.05em", textTransform: "uppercase",
      color: "var(--c-primary)", marginBottom: 16, opacity: 0.85,
    }}>
      <span style={{ width: 18, height: 1, background: "var(--c-primary-container)", display: "inline-block" }} />
      {children}
    </div>
  );
}

// ─── TRAGEDY SECTION (full-bleed photo + light fade) ───────────────────────
function TragedySection({ tragedy, index }) {
  const isLeft = tragedy.align === "left";
  return (
    <section
      id={`tragedy-${tragedy.id}`}
      data-tragedy={tragedy.name}
      className="tragedy-section"
      style={{
        position: "relative", minHeight: "92vh",
        display: "flex", alignItems: "center", overflow: "hidden",
        backgroundColor: "var(--c-surface-lowest)",
        backgroundImage: `url('/tragedies/${tragedy.image}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        borderTop: index === 0 ? "1px solid rgba(255,255,255,0.05)" : "none",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <span className="sr-only">Background image: {tragedy.name} — {tragedy.tag}</span>

      {/* Fade only covers the first 40% nearest the text — the rest of the
          photo stays fully visible, not hidden behind a solid wash. */}
      <div style={{
        position: "absolute", inset: 0,
        background: isLeft
          ? "linear-gradient(to right, var(--c-bg) 0%, rgba(19,19,20,0.75) 20%, rgba(19,19,20,0.12) 40%)"
          : "linear-gradient(to left, var(--c-bg) 0%, rgba(19,19,20,0.75) 20%, rgba(19,19,20,0.12) 40%)",
      }} />

      <div
        className="tragedy-row"
        data-align={tragedy.align}
        style={{
          position: "relative", zIndex: 1, width: "100%",
          maxWidth: 1320, margin: "0 auto", padding: "0 24px", display: "flex",
        }}
      >
        <Reveal style={{ maxWidth: 480 }}>
          <div style={{
            fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600,
            letterSpacing: "0.08em", textTransform: "uppercase",
            color: tragedy.accent, marginBottom: 14,
          }}>
            {tragedy.tag}
          </div>
          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
            fontSize: "clamp(32px, 6vw, 56px)", letterSpacing: "-0.02em",
            color: "var(--c-on-surface)", marginBottom: 18, lineHeight: 1.05,
            textShadow: "0 2px 24px rgba(0,0,0,0.5)",
          }}>
            {tragedy.name}
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 400,
            fontSize: "clamp(15px, 2.5vw, 18px)", lineHeight: 1.65,
            color: "var(--c-on-surface-variant)",
            textShadow: "0 2px 16px rgba(0,0,0,0.6)",
          }}>
            {tragedy.description}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── NAV — minimal homepage header: centered links, no logo, no wallet ─────
// "The Struggle" → homepage (active here). "The Tragedies" → the Daily Log.
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className="glass-panel" style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? "rgba(19,19,20,0.85)" : "rgba(19,19,20,0.6)",
      borderBottom: "1px solid rgba(255,255,255,0.1)",
      transition: "background 0.3s",
    }}>
      <div style={{
        display: "flex", justifyContent: "center", alignItems: "center",
        flexWrap: "wrap", gap: 28, minHeight: 64, maxWidth: 1440,
        margin: "0 auto", padding: "10px 24px",
      }}>
        <Link to="/" style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14,
          color: "var(--c-primary-container)", textDecoration: "none",
          borderBottom: "2px solid var(--c-primary-container)", paddingBottom: 4,
        }}>
          The Struggle
        </Link>
        <Link to="/tragedies" className="nav-link" style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 14,
          color: "var(--c-on-surface-variant)", textDecoration: "none",
        }}>
          The Tragedies
        </Link>
      </div>
    </nav>
  );
}

// ─── HERO ───────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="struggle" style={{
      position: "relative", minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      textAlign: "center", padding: "120px 24px 80px",
      overflow: "hidden", background: "var(--c-bg)",
    }}>
      <div style={{
        position: "absolute", top: "18%", left: "15%",
        width: "42%", paddingBottom: "42%",
        background: "rgba(20,241,149,0.05)", borderRadius: "50%",
        filter: "blur(120px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "15%", right: "15%",
        width: "32%", paddingBottom: "32%",
        background: "rgba(0,224,255,0.05)", borderRadius: "50%",
        filter: "blur(100px)", pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 760, width: "100%" }}>
        <Reveal>
          <h1 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
            fontSize: "clamp(40px, 8vw, 76px)", lineHeight: 1.04,
            letterSpacing: "-0.02em", marginBottom: 28,
            background: "linear-gradient(135deg, var(--c-primary) 0%, var(--c-secondary-container) 100%)",
            WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Tragedy of the Commons
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <div style={{ position: "relative", maxWidth: 440, margin: "0 auto 40px" }}>
            <div style={{
              position: "absolute", inset: -1, borderRadius: 8,
              background: "linear-gradient(90deg, var(--c-primary-container), var(--c-secondary-container))",
              opacity: 0.25, filter: "blur(8px)",
            }} />
            <div className="glass-panel" style={{
              position: "relative", background: "rgba(5,5,5,0.7)",
              borderRadius: 8, padding: "14px 20px",
            }}>
              <div style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 700,
                fontSize: "clamp(11px, 3vw, 13px)", letterSpacing: "0.08em",
                color: "var(--c-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              }}>
                CA · COMING SOON · TBD
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.22}>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 400,
            fontSize: "clamp(15px, 3vw, 19px)", lineHeight: 1.6,
            color: "var(--c-on-surface-variant)", maxWidth: 580, margin: "0 auto 16px",
          }}>
            Someone has to lose for someone to win. We call it the market.
            It's really just shared depletion — and we are the ones depleting it.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
            fontSize: "clamp(16px, 3.5vw, 20px)", color: "var(--c-error)",
            marginBottom: 44, letterSpacing: "-0.005em",
          }}>
            We are the problem.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── REFLECTION ─────────────────────────────────────────────────────────────
function Reflection() {
  return (
    <section style={{
      position: "relative", padding: "100px 24px", textAlign: "center",
      background: "var(--c-bg)", borderBottom: "1px solid rgba(255,255,255,0.05)",
    }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <Reveal><Label>The Pattern</Label></Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 36 }}>
          {REFLECTION_LINES.map((line, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
                fontSize: "clamp(26px, 6vw, 48px)", lineHeight: 1.1,
                color: i % 2 === 0 ? "var(--c-on-surface)" : "var(--c-primary)",
              }}>
                {line}
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.5}>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "clamp(14px, 3vw, 17px)",
            color: "var(--c-on-surface-variant)", borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 28,
          }}>
            And we wonder why nothing reaches billions.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── CTA ────────────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section style={{ padding: "100px 24px", maxWidth: 1320, margin: "0 auto" }}>
      <Reveal>
        <div className="glass-panel" style={{
          position: "relative", overflow: "hidden",
          borderRadius: 16, padding: "64px 32px", textAlign: "center",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 560, margin: "0 auto" }}>
            <Label>Change</Label>
            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
              fontSize: "clamp(26px, 5vw, 38px)", color: "var(--c-on-surface)", marginBottom: 18,
            }}>
              Break the Cycle
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: "clamp(14px, 3vw, 17px)",
              color: "var(--c-on-surface-variant)", lineHeight: 1.7, marginBottom: 40,
            }}>
              Stop being exit liquidity. Hold longer. Choose better. Build together.
              Change starts with behavior — not the next chart.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn-primary">Buy</button>
              <button className="btn-ghost">Chart</button>
              <button className="btn-ghost">Community</button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ─── FOOTER ─────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      padding: "32px 24px", borderTop: "1px solid rgba(255,255,255,0.05)",
      background: "var(--c-bg)", textAlign: "center",
    }}>
      <div style={{
        fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 13,
        color: "var(--c-on-surface-variant)",
      }}>
        Tragedy of the Commons © 2026
      </div>
    </footer>
  );
}

// ─── PAGE ───────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      {/* Page-specific layout rule: alternating left/right tragedy sections,
          collapsing to left-aligned on mobile for readability. */}
      <style>{`
        .tragedy-row[data-align="left"]  { justify-content: flex-start; text-align: left; }
        .tragedy-row[data-align="right"] { justify-content: flex-end;   text-align: right; }
        @media (max-width: 640px) {
          .tragedy-row[data-align="right"] { justify-content: flex-start; text-align: left; }
        }
        /* iOS Safari ignores background-attachment: fixed inside scroll
           containers — this just falls back to a normal scrolling image
           there, so no visual breakage, just no parallax. */
      `}</style>

      <Nav />
      <main>
        <Hero />
        <div id="tragedies">
          {TRAGEDIES.map((t, i) => <TragedySection key={t.id} tragedy={t} index={i} />)}
        </div>
        <Reflection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

// Note: useInView / Reveal / Label are duplicated (not imported from
// App.jsx) to avoid a circular import — App.jsx imports HomePage. Colors
// are shared safely via CSS variables defined once in App.jsx.

// ─────────────────────────────────────────────────────────────────────────
// IMAGE CHECKLIST — drop these four files in /public/tragedies/:
//   the-drain.jpg        → Overtrading / Liquidity Drain
//   the-crowd.jpg        → Attention Fragmentation / Too Many Coins
//   the-rug.jpg          → Trust Erosion / Rugs & Low Effort
//   the-empty-hand.jpg   → Lack of Conviction / No Holding Culture
// Recommended: 1920px+ on the longest side, JPG/WebP, under ~300KB each.
// Landscape or square both work — backgroundSize:"cover" crops to fill.
// Until a file exists, the section falls back to a solid dark color
// (var(--c-surface-lowest)) rather than breaking.
// ─────────────────────────────────────────────────────────────────────────