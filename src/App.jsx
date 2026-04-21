import { useState, useEffect, useRef } from "react";

// ─── DATA ──────────────────────────────────────────────────────────────────
const CARDS = [
  {
    id: 1,
    icon: "⟳",
    title: "Overtrading",
    tag: "Liquidity Drain",
    analogy: "Rivers diverted too many times run dry before reaching the sea.",
    meme: "We rotate before anything compounds. Liquidity leaves before price can breathe.",
    color: "#ff3c3c",
  },
  {
    id: 2,
    icon: "◈",
    title: "Attention Fragmentation",
    tag: "Too Many Coins",
    analogy: "A field grazed by too many herds grows nothing for anyone.",
    meme: "500 launches a day means every project starves for focus. Including yours.",
    color: "#ffaa00",
  },
  {
    id: 3,
    icon: "◬",
    title: "Trust Erosion",
    tag: "Rugs & Low Effort",
    analogy: "One factory's smoke poisons air that everyone shares.",
    meme: "Each rug doesn't just kill one coin. It raises the cost of belief for all of us.",
    color: "#ff3c3c",
  },
  {
    id: 4,
    icon: "◯",
    title: "Lack of Conviction",
    tag: "No Holding Culture",
    analogy: "Open land with no stewards slowly becomes wasteland.",
    meme: "Everyone wants the gain. No one wants to carry the weight of holding.",
    color: "#00ff80",
  },
];

const REFLECTION_LINES = ["We chase.", "We rotate.", "We abandon.", "We repeat."];
const SOLUTION_LINES = [
  { text: "Hold longer.", sub: "Time is the asset." },
  { text: "Choose better.", sub: "Fewer. Stronger." },
  { text: "Build together.", sub: "Not against each other." },
  { text: "Let it grow.", sub: "Or keep losing." },
];

// ─── HOOKS ─────────────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
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

// ─── ANIMATED CANVAS BG ────────────────────────────────────────────────────
function HeroBG() {
  const cvs = useRef(null);
  useEffect(() => {
    const c = cvs.current;
    const ctx = c.getContext("2d");
    let id, t = 0;
    const resize = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      const cx = c.width / 2, cy = c.height / 2;
      for (let a = 0; a < 3; a++) {
        const off = (a * Math.PI * 2) / 3;
        ctx.beginPath();
        for (let i = 0; i < 180; i++) {
          const ang = i / 28 + t * 0.006 + off;
          const r = i * 2.1;
          const x = cx + r * Math.cos(ang);
          const y = cy + r * Math.sin(ang) * 0.45;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        const col = a === 0 ? "0,255,128" : a === 1 ? "255,60,60" : "255,255,255";
        ctx.strokeStyle = `rgba(${col},${a === 2 ? 0.04 : 0.07})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      for (let i = 0; i < 6; i++) {
        const y = (c.height / 7) * (i + 1);
        ctx.beginPath();
        for (let x = 0; x <= c.width; x += 6) {
          const w = Math.sin((x / c.width) * Math.PI * 5 + t * 0.009 + i) * 10;
          x === 0 ? ctx.moveTo(x, y + w) : ctx.lineTo(x, y + w);
        }
        ctx.strokeStyle = `rgba(0,255,128,${0.022 + (i % 3) * 0.007})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
      t++;
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);
  return (
    <canvas
      ref={cvs}
      style={{
        position: "fixed", inset: 0,
        width: "100vw", height: "100vh",
        pointerEvents: "none", zIndex: 0, opacity: 0.55,
      }}
    />
  );
}

// ─── REVEAL WRAPPER ────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0px)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── SECTION LABEL ─────────────────────────────────────────────────────────
function Label({ children }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 10,
      fontFamily: "'Space Mono', monospace", fontSize: 9,
      letterSpacing: "0.28em", textTransform: "uppercase",
      color: "rgba(0,255,128,0.55)", marginBottom: 18,
    }}>
      <span style={{
        width: 20, height: 1,
        background: "rgba(0,255,128,0.45)",
        display: "inline-block",
      }} />
      {children}
    </div>
  );
}

// ─── CARD ──────────────────────────────────────────────────────────────────
function Card({ card, index }) {
  const [open, setOpen] = useState(false);
  const [ref, inView] = useInView(0.08);
  return (
    <div
      ref={ref}
      onClick={() => setOpen(o => !o)}
      style={{
        background: open ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${open ? "rgba(0,255,128,0.28)" : "rgba(255,255,255,0.07)"}`,
        cursor: "pointer",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.55s ease ${index * 0.08}s, transform 0.55s ease ${index * 0.08}s, background 0.28s, border-color 0.28s`,
        WebkitTapHighlightColor: "transparent",
        userSelect: "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Left accent bar */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 2,
        background: open ? card.color : "transparent",
        transition: "background 0.28s",
      }} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 22px" }}>
        <span style={{
          fontFamily: "'Space Mono', monospace", fontSize: 18,
          color: open ? card.color : "rgba(255,255,255,0.28)",
          transition: "color 0.28s", minWidth: 28, textAlign: "center", lineHeight: 1,
        }}>
          {card.icon}
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: "'Space Mono', monospace", fontWeight: 700,
            fontSize: "clamp(13px, 3.5vw, 15px)",
            color: open ? "white" : "rgba(255,255,255,0.72)",
            transition: "color 0.28s", letterSpacing: "0.04em",
          }}>
            {card.title}
          </div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 10,
            color: "rgba(255,255,255,0.26)", marginTop: 3,
            letterSpacing: "0.08em", textTransform: "uppercase",
          }}>
            {card.tag}
          </div>
        </div>
        <div style={{
          fontFamily: "'Space Mono', monospace", fontSize: 18,
          color: open ? "#00ff80" : "rgba(255,255,255,0.18)",
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform 0.28s, color 0.28s",
          lineHeight: 1, minWidth: 18, textAlign: "center",
        }}>
          +
        </div>
      </div>

      {/* Body */}
      <div style={{
        maxHeight: open ? 200 : 0,
        overflow: "hidden",
        transition: "max-height 0.4s cubic-bezier(.4,0,.2,1)",
      }}>
        <div style={{ padding: "0 22px 22px 66px" }}>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(12px, 3.2vw, 14px)",
            color: "rgba(255,255,255,0.35)", lineHeight: 1.7,
            marginBottom: 12, fontStyle: "italic",
          }}>
            {card.analogy}
          </div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(12px, 3.2vw, 14px)",
            color: "rgba(255,255,255,0.68)", lineHeight: 1.7,
            borderLeft: `2px solid ${card.color}44`, paddingLeft: 14,
          }}>
            {card.meme}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ──────────────────────────────────────────────────────────────
export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const infRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background: #070707;
          color: #fff;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          overflow-x: hidden;
          width: 100%;
        }
        #root { width: 100%; }

        ::selection { background: rgba(0,255,128,0.2); }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #070707; }
        ::-webkit-scrollbar-thumb { background: rgba(0,255,128,0.22); }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes glowPulse {
          0%, 100% { text-shadow: none; }
          50%       { text-shadow: 0 0 70px rgba(0,255,128,0.16); }
        }
        @keyframes scrollDrop {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          60%       { transform: translateY(9px); opacity: 0.12; }
        }

        .btn-primary {
          font-family: 'Space Mono', monospace;
          font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
          border: 1px solid rgba(0,255,128,0.5); background: transparent;
          color: #00ff80; padding: 15px 36px; cursor: pointer;
          transition: all 0.26s; min-height: 48px; min-width: 120px;
          position: relative; overflow: hidden;
        }
        .btn-primary::after {
          content: ''; position: absolute; inset: 0;
          background: rgba(0,255,128,0.07);
          transform: translateX(-101%); transition: transform 0.26s;
        }
        .btn-primary:hover::after,
        .btn-primary:active::after { transform: translateX(0); }
        .btn-primary:hover { box-shadow: 0 0 28px rgba(0,255,128,0.1); }

        .btn-ghost {
          font-family: 'Space Mono', monospace;
          font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;
          border: 1px solid rgba(255,255,255,0.11); background: transparent;
          color: rgba(255,255,255,0.42); padding: 15px 28px; cursor: pointer;
          transition: all 0.26s; min-height: 48px; min-width: 100px;
        }
        .btn-ghost:hover { border-color: rgba(255,255,255,0.32); color: rgba(255,255,255,0.8); }
      `}</style>

      <HeroBG />

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section style={{
        position: "relative", zIndex: 1,
        width: "100%", minHeight: "100vh",
        display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        textAlign: "center", padding: "100px 20px 80px",
        overflow: "hidden",
      }}>
        {/* Dot grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />
        {/* Vignette */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 30%, #070707 82%)",
        }} />

        <div style={{
          position: "relative", zIndex: 1,
          maxWidth: 660, width: "100%",
          transform: `translateY(${scrollY * 0.1}px)`,
        }}>
          <div style={{
            fontFamily: "'Space Mono', monospace", fontSize: 10,
            letterSpacing: "0.28em", textTransform: "uppercase",
            color: "rgba(0,255,128,0.5)", marginBottom: 30,
            animation: "fadeUp 0.85s ease 0.1s both",
          }}>
            Solana · 2025
          </div>

          <h1 style={{
            fontFamily: "'Space Mono', monospace", fontWeight: 700,
            fontSize: "clamp(40px, 10vw, 96px)", lineHeight: 0.98,
            letterSpacing: "-0.028em", marginBottom: 22,
            animation: "fadeUp 0.85s ease 0.28s both, glowPulse 5s ease 1.8s infinite",
          }}>
            Tragedy<br />
            <span style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.28)" }}>
              of the
            </span>
            <br />Commons
          </h1>

          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "clamp(15px, 4.5vw, 22px)",
            color: "rgba(255,60,60,0.85)", letterSpacing: "0.05em",
            marginBottom: 12,
            animation: "fadeUp 0.85s ease 0.46s both",
          }}>
            We are the problem.
          </div>

          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(13px, 3.5vw, 16px)",
            color: "rgba(255,255,255,0.3)", marginBottom: 50,
            animation: "fadeUp 0.85s ease 0.6s both",
          }}>
            When everyone extracts, nothing grows.
          </div>

          <div style={{ animation: "fadeUp 0.85s ease 0.74s both" }}>
            <button
              className="btn-primary"
              onClick={() => infRef.current?.scrollIntoView({ behavior: "smooth" })}
            >
              See the Pattern
            </button>
          </div>
        </div>

        {/* Corner marks */}
        {[
          { top: 18, left: 18, borderTop: "1px solid rgba(255,255,255,0.09)", borderLeft: "1px solid rgba(255,255,255,0.09)" },
          { top: 18, right: 18, borderTop: "1px solid rgba(255,255,255,0.09)", borderRight: "1px solid rgba(255,255,255,0.09)" },
          { bottom: 18, left: 18, borderBottom: "1px solid rgba(255,255,255,0.09)", borderLeft: "1px solid rgba(255,255,255,0.09)" },
          { bottom: 18, right: 18, borderBottom: "1px solid rgba(255,255,255,0.09)", borderRight: "1px solid rgba(255,255,255,0.09)" },
        ].map((s, i) => (
          <div key={i} style={{ position: "absolute", width: 18, height: 18, ...s }} />
        ))}

        {/* Scroll cue */}
        <div style={{
          position: "absolute", bottom: 26, left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          opacity: scrollY > 60 ? 0 : 0.32, transition: "opacity 0.4s",
          pointerEvents: "none",
        }}>
          <div style={{
            fontFamily: "'Space Mono', monospace", fontSize: 9,
            letterSpacing: "0.22em", textTransform: "uppercase",
          }}>scroll</div>
          <div style={{
            width: 1, height: 26,
            background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)",
            animation: "scrollDrop 2s ease infinite",
          }} />
        </div>
      </section>

      {/* ══ INFOGRAPHIC ═══════════════════════════════════════════ */}
      <section ref={infRef} style={{
        position: "relative", zIndex: 1,
        width: "100%", padding: "100px 0",
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 20px" }}>
          <Reveal><Label>The Pattern</Label></Reveal>
          <Reveal delay={0.08}>
            <h2 style={{
              fontFamily: "'Space Mono', monospace", fontWeight: 700,
              fontSize: "clamp(22px, 5.5vw, 40px)", lineHeight: 1.15, marginBottom: 4,
            }}>
              Four problems.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 style={{
              fontFamily: "'Space Mono', monospace", fontWeight: 700,
              fontSize: "clamp(22px, 5.5vw, 40px)", lineHeight: 1.15, marginBottom: 10,
              color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.25)",
            }}>
              All self-inflicted.
            </h2>
          </Reveal>
          <Reveal delay={0.22}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(13px, 3.5vw, 15px)",
              color: "rgba(255,255,255,0.3)", marginBottom: 48, lineHeight: 1.7,
            }}>
              Not the market. Not the devs. Us.
            </p>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {CARDS.map((card, i) => <Card key={card.id} card={card} index={i} />)}
          </div>
        </div>
      </section>

      {/* ══ THIN DIVIDER ══════════════════════════════════════════ */}
      <div style={{
        position: "relative", zIndex: 1,
        width: "100%", height: 1,
        background: "rgba(255,255,255,0.06)",
      }} />

      {/* ══ REFLECTION ════════════════════════════════════════════ */}
      <section style={{
        position: "relative", zIndex: 1,
        width: "100%", padding: "100px 0", overflow: "hidden",
      }}>
        {/* Ghost bg word */}
        <div style={{
          position: "absolute", left: "50%", top: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "'Space Mono', monospace", fontWeight: 700,
          fontSize: "clamp(80px, 22vw, 200px)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.025)",
          whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none",
          letterSpacing: "-0.03em",
        }}>
          WE
        </div>

        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 20px", textAlign: "center" }}>
          <Reveal><Label>Reflection</Label></Reveal>
          <Reveal delay={0.1}>
            <h2 style={{
              fontFamily: "'Space Mono', monospace", fontWeight: 700,
              fontSize: "clamp(18px, 4vw, 30px)",
              color: "rgba(255,255,255,0.45)", marginBottom: 52,
            }}>
              The Pattern is Clear
            </h2>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {REFLECTION_LINES.map((line, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div style={{
                  fontFamily: "'Space Mono', monospace", fontWeight: 700,
                  fontSize: "clamp(28px, 8.5vw, 76px)", lineHeight: 1.08,
                  letterSpacing: "-0.025em",
                  color: i % 2 === 0 ? "rgba(255,255,255,0.9)" : "rgba(255,60,60,0.62)",
                }}>
                  {line}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.62}>
            <div style={{
              marginTop: 48, paddingTop: 30,
              borderTop: "1px solid rgba(255,255,255,0.07)",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(13px, 3.5vw, 15px)",
              color: "rgba(255,255,255,0.28)", lineHeight: 1.75,
            }}>
              And we wonder why nothing reaches billions.
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ SOLUTION ══════════════════════════════════════════════ */}
      <section style={{
        position: "relative", zIndex: 1, width: "100%",
        padding: "100px 0",
        borderTop: "1px solid rgba(0,255,128,0.07)",
        borderBottom: "1px solid rgba(0,255,128,0.07)",
        background: "rgba(0,255,128,0.016)",
      }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 20px" }}>
          <Reveal><Label>Change</Label></Reveal>
          <Reveal delay={0.1}>
            <h2 style={{
              fontFamily: "'Space Mono', monospace", fontWeight: 700,
              fontSize: "clamp(22px, 5.5vw, 40px)", color: "#00ff80", marginBottom: 48,
            }}>
              Break the Cycle
            </h2>
          </Reveal>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 2,
          }}>
            {SOLUTION_LINES.map((item, i) => (
              <Reveal key={i} delay={i * 0.09}>
                <div style={{
                  background: "rgba(0,255,128,0.03)",
                  border: "1px solid rgba(0,255,128,0.09)",
                  padding: "26px 22px",
                }}>
                  <div style={{
                    fontFamily: "'Space Mono', monospace", fontWeight: 700,
                    fontSize: "clamp(15px, 4vw, 19px)", color: "#00ff80",
                    marginBottom: 8,
                  }}>
                    {item.text}
                  </div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 11,
                    color: "rgba(255,255,255,0.28)", letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}>
                    {item.sub}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.45}>
            <div style={{
              marginTop: 36,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(12px, 3vw, 13px)",
              color: "rgba(255,255,255,0.2)", letterSpacing: "0.07em",
            }}>
              One decision compounds. Every time.
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ COIN ══════════════════════════════════════════════════ */}
      <section style={{
        position: "relative", zIndex: 1, width: "100%",
        padding: "100px 0",
      }}>
        <div style={{
          maxWidth: 700, margin: "0 auto",
          padding: "0 20px", textAlign: "center",
        }}>
          <Reveal><Label>The Token</Label></Reveal>

          <Reveal delay={0.08}>
            <div style={{
              width: 70, height: 70, borderRadius: "50%",
              border: "1.5px solid rgba(0,255,128,0.32)",
              margin: "0 auto 26px",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 40px rgba(0,255,128,0.06), inset 0 0 20px rgba(0,255,128,0.03)",
            }}>
              <div style={{
                fontFamily: "'Space Mono', monospace", fontSize: 22,
                color: "rgba(0,255,128,0.65)", lineHeight: 1,
              }}>∞</div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <h2 style={{
              fontFamily: "'Space Mono', monospace", fontWeight: 700,
              fontSize: "clamp(17px, 4vw, 24px)", letterSpacing: "0.03em",
              marginBottom: 14,
            }}>
              Tragedy of the Commons
            </h2>
          </Reveal>

          <Reveal delay={0.22}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(13px, 3.5vw, 15px)",
              color: "rgba(255,255,255,0.32)", lineHeight: 1.8,
              maxWidth: 360, margin: "0 auto 42px",
            }}>
              A memecoin built on awareness.<br />
              A reminder that change starts with behavior.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 14,
              background: "rgba(255,255,255,0.022)",
              border: "1px solid rgba(255,255,255,0.07)",
              padding: "13px 20px", marginBottom: 26,
              maxWidth: "100%", overflow: "hidden",
            }}>
              <span style={{
                fontFamily: "'Space Mono', monospace", fontSize: 9,
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.22)", whiteSpace: "nowrap",
              }}>CA</span>
              <span style={{
                fontFamily: "'Space Mono', monospace", fontSize: 11,
                color: "rgba(255,255,255,0.38)", letterSpacing: "0.04em",
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>
                Coming Soon · TBD
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.38}>
            <div style={{
              display: "flex", gap: 10,
              justifyContent: "center", flexWrap: "wrap",
            }}>
              <button className="btn-primary">Buy</button>
              <button className="btn-ghost">Chart</button>
              <button className="btn-ghost">Community</button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ FOOTER ════════════════════════════════════════════════ */}
      <footer style={{
        position: "relative", zIndex: 1, width: "100%",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "30px 20px",
      }}>
        <div style={{
          maxWidth: 700, margin: "0 auto",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: 10,
        }}>
          <div style={{
            fontFamily: "'Space Mono', monospace", fontSize: 9,
            letterSpacing: "0.18em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.16)",
          }}>
            Tragedy of the Commons · Solana
          </div>
          <div style={{
            fontFamily: "'Space Mono', monospace", fontSize: 9,
            letterSpacing: "0.1em", color: "rgba(255,255,255,0.1)",
          }}>
            Not financial advice. This is a mirror.
          </div>
        </div>
      </footer>
    </>
  );
}
