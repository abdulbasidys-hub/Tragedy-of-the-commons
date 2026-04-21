import { useState, useEffect, useRef } from "react";

const CARDS = [
  {
    id: 1,
    icon: "🐟",
    title: "Overfishing",
    subtitle: "Liquidity drained too early",
    commons: [
      "Fishermen race to catch before others do.",
      "No one waits. Everyone extracts.",
      "The ocean empties faster than it can recover.",
      "Rational individuals. Irrational outcome.",
    ],
    meme: [
      "Every wave dumps at the same time.",
      "No one holds. The chart bleeds.",
      "The pool empties before price can grow.",
    ],
  },
  {
    id: 2,
    icon: "🐄",
    title: "Grazing Land",
    subtitle: "Too many coins, not enough attention",
    commons: [
      "Each herder adds one more cow.",
      "The field looks fine — until it doesn't.",
      "Overgrazing destroys the land for everyone.",
      "Tragedy hides until it's too late.",
    ],
    meme: [
      "500 new tokens launch every day.",
      "Attention is finite. Coins are not.",
      "Every new launch dilutes the last.",
    ],
  },
  {
    id: 3,
    icon: "💨",
    title: "Air Pollution",
    subtitle: "Rugs destroy trust for everyone",
    commons: [
      "One factory pollutes. Everyone breathes it.",
      "Private gain. Public cost.",
      "The damage is invisible until it compounds.",
      "Trust, like air, is shared.",
    ],
    meme: [
      "One rug poisons the ecosystem.",
      "New buyers hesitate. Volume drops for all.",
      "The rug didn't just hurt one — it hurt everyone.",
    ],
  },
  {
    id: 4,
    icon: "🚗",
    title: "Traffic Congestion",
    subtitle: "Market overcrowding",
    commons: [
      "Each car adds seconds to everyone's commute.",
      "Individually rational. Collectively catastrophic.",
      "The road works — until it doesn't.",
      "No single driver causes the gridlock. All of them do.",
    ],
    meme: [
      "Every new memecoin clogs the attention highway.",
      "Buys slow. Charts flatten. Interest dies.",
      "One more launch is one too many.",
    ],
  },
  {
    id: 5,
    icon: "💧",
    title: "Groundwater",
    subtitle: "Capital exhaustion",
    commons: [
      "Invisible resource. Visible destruction.",
      "Drawn faster than it can replenish.",
      "Everyone pumps until the well runs dry.",
      "No one owns it. No one protects it.",
    ],
    meme: [
      "Capital rotates before it can compound.",
      "Profit-taking drains what patience would multiply.",
      "The well was never empty. We just kept pumping.",
    ],
  },
  {
    id: 6,
    icon: "📧",
    title: "Spam",
    subtitle: "Too many low-quality launches",
    commons: [
      "One spam email costs nothing to send.",
      "A billion of them breaks the entire system.",
      "The sender profits. The network suffers.",
      "Volume is the weapon against quality.",
    ],
    meme: [
      "Low-effort launches flood every feed.",
      "Signal disappears in noise.",
      "When everything launches, nothing matters.",
    ],
  },
  {
    id: 7,
    icon: "🏛️",
    title: "Tourism Overload",
    subtitle: "Hype loses meaning",
    commons: [
      "Beautiful place. Too many visitors.",
      "The thing that made it special — gone.",
      "Everyone wants to experience it. Few want to preserve it.",
      "Popularity destroys the reason to visit.",
    ],
    meme: [
      "Every coin promises to be the next one.",
      "Hype repeats until no one believes it.",
      "The signal that used to work — doesn't anymore.",
    ],
  },
  {
    id: 8,
    icon: "📶",
    title: "Shared Wi-Fi",
    subtitle: "Liquidity spreads too thin",
    commons: [
      "One connection. Too many devices.",
      "Each user gets a fraction of what they need.",
      "No one is satisfied. The network strains.",
      "Sharing without limits means no one thrives.",
    ],
    meme: [
      "Capital split across hundreds of coins.",
      "None gets enough to grow.",
      "Thin liquidity. Thin charts. Thin community.",
    ],
  },
  {
    id: 9,
    icon: "💻",
    title: "Open Source",
    subtitle: "Everyone benefits, no one holds",
    commons: [
      "The code is free. The work is not.",
      "Everyone uses it. Few contribute back.",
      "The project lives on contributions it never receives.",
      "Benefit without ownership destroys the incentive to build.",
    ],
    meme: [
      "Everyone waits for others to hold the floor.",
      "Community vibes. No conviction.",
      "The project needed believers. Got spectators.",
    ],
  },
  {
    id: 10,
    icon: "⚔️",
    title: "Arms Race",
    subtitle: "Faster launches, worse outcomes",
    commons: [
      "Both sides build weapons. Neither gains advantage.",
      "Resources consumed. Security unchanged.",
      "The race accelerates. The outcome worsens.",
      "Competing to compete — not to win.",
    ],
    meme: [
      "Launch faster. Market harder. Rug quicker.",
      "Everyone accelerates. No one builds.",
      "The race to be next leaves nothing worth finding.",
    ],
  },
];

const REFLECTION_LINES = ["We chase.", "We rotate.", "We abandon.", "We repeat."];
const SOLUTION_LINES = ["Hold longer.", "Choose better.", "Build together.", "Let something grow."];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimatedLine({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView(0.3);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function HeroCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    let t = 0;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Spiral arms
      for (let arm = 0; arm < 3; arm++) {
        ctx.beginPath();
        const armOffset = (arm * Math.PI * 2) / 3;
        for (let i = 0; i < 200; i++) {
          const angle = (i / 30) + t * 0.008 + armOffset;
          const r = i * 1.9;
          const x = cx + r * Math.cos(angle);
          const y = cy + r * Math.sin(angle) * 0.5;
          const alpha = (1 - i / 200) * 0.18;
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.strokeStyle = arm === 0 ? `rgba(0,255,128,${0.12})` : arm === 1 ? `rgba(255,60,60,${0.10})` : `rgba(255,255,255,${0.06})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Flowing horizontal lines
      for (let i = 0; i < 8; i++) {
        const y = (canvas.height / 9) * (i + 1);
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 4) {
          const wave = Math.sin((x / canvas.width) * Math.PI * 4 + t * 0.012 + i * 0.8) * 12;
          if (x === 0) ctx.moveTo(x, y + wave);
          else ctx.lineTo(x, y + wave);
        }
        ctx.strokeStyle = `rgba(0,255,128,${0.04 + (i % 3) * 0.01})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      t++;
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.7 }}
    />
  );
}

function Card({ card, index }) {
  const [open, setOpen] = useState(false);
  const [ref, inView] = useInView(0.1);
  return (
    <div
      ref={ref}
      onClick={() => setOpen(!open)}
      style={{
        background: open ? "rgba(0,255,128,0.04)" : "rgba(255,255,255,0.025)",
        border: open ? "1px solid rgba(0,255,128,0.35)" : "1px solid rgba(255,255,255,0.08)",
        borderRadius: 2,
        cursor: "pointer",
        transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateX(0)" : "translateX(-20px)",
        transitionDelay: `${(index % 5) * 0.07}s`,
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "18px 24px",
        position: "relative",
      }}>
        <span style={{ fontSize: 22, minWidth: 32, textAlign: "center", filter: open ? "none" : "grayscale(0.5)" }}>{card.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 13,
            color: open ? "#00ff80" : "rgba(255,255,255,0.85)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontWeight: 700,
            transition: "color 0.3s",
          }}>
            {card.title}
          </div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.05em",
            marginTop: 2,
          }}>
            {card.subtitle}
          </div>
        </div>
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 11,
          color: open ? "#00ff80" : "rgba(255,255,255,0.2)",
          transition: "transform 0.3s, color 0.3s",
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
        }}>
          +
        </div>
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 2,
          background: open ? "#00ff80" : "transparent",
          transition: "background 0.3s",
        }} />
      </div>

      {/* Expanded content */}
      <div style={{
        maxHeight: open ? 400 : 0,
        overflow: "hidden",
        transition: "max-height 0.45s cubic-bezier(0.4,0,0.2,1)",
      }}>
        <div style={{ padding: "0 24px 22px 72px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 9,
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}>
              THE COMMONS
            </div>
            {card.commons.map((line, i) => (
              <div key={i} style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.65,
                marginBottom: 4,
              }}>
                {line}
              </div>
            ))}
          </div>
          <div>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 9,
              color: "rgba(255,60,60,0.6)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}>
              IN MEMECOINS
            </div>
            {card.meme.map((line, i) => (
              <div key={i} style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.65,
                marginBottom: 4,
                borderLeft: "2px solid rgba(255,60,60,0.4)",
                paddingLeft: 10,
              }}>
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontFamily: "'Space Mono', monospace",
      fontSize: 10,
      letterSpacing: "0.25em",
      textTransform: "uppercase",
      color: "rgba(0,255,128,0.5)",
      marginBottom: 20,
      display: "flex",
      alignItems: "center",
      gap: 12,
    }}>
      <span style={{ display: "inline-block", width: 24, height: 1, background: "rgba(0,255,128,0.4)" }} />
      {children}
    </div>
  );
}

export default function App() {
  const heroRef = useRef(null);
  const infographicRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToInfographic = () => {
    infographicRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{
      background: "#080808",
      color: "white",
      fontFamily: "'DM Sans', sans-serif",
      minHeight: "100vh",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;700&family=Space+Grotesk:wght@700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: rgba(0,255,128,0.25); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080808; }
        ::-webkit-scrollbar-thumb { background: rgba(0,255,128,0.3); border-radius: 2px; }
        html { scroll-behavior: smooth; }
        
        .cta-btn {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          border: 1px solid rgba(0,255,128,0.5);
          background: transparent;
          color: #00ff80;
          padding: 14px 32px;
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        .cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(0,255,128,0.08);
          transform: translateX(-100%);
          transition: transform 0.3s;
        }
        .cta-btn:hover::before { transform: translateX(0); }
        .cta-btn:hover { border-color: #00ff80; box-shadow: 0 0 20px rgba(0,255,128,0.15); }

        .ghost-btn {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          border: 1px solid rgba(255,255,255,0.15);
          background: transparent;
          color: rgba(255,255,255,0.5);
          padding: 12px 24px;
          cursor: pointer;
          transition: all 0.3s;
        }
        .ghost-btn:hover { border-color: rgba(255,255,255,0.4); color: white; }

        @media (max-width: 680px) {
          .cards-expanded-grid { grid-template-columns: 1fr !important; }
          .hero-title { font-size: clamp(36px, 12vw, 80px) !important; }
          .coin-address { font-size: 10px !important; }
        }
      `}</style>

      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "80px 24px",
          overflow: "hidden",
        }}
      >
        <HeroCanvas />

        {/* Grid overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }} />

        {/* Vignette */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 40%, #080808 85%)",
          pointerEvents: "none",
        }} />

        {/* Scroll parallax wrapper */}
        <div style={{
          position: "relative",
          zIndex: 2,
          transform: `translateY(${scrollY * 0.15}px)`,
        }}>
          {/* Pre-title */}
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(0,255,128,0.6)",
            marginBottom: 28,
            animation: "fadeUp 1s ease 0.2s both",
          }}>
            <style>{`
              @keyframes fadeUp {
                from { opacity: 0; transform: translateY(16px); }
                to { opacity: 1; transform: translateY(0); }
              }
              @keyframes pulse-glow {
                0%, 100% { text-shadow: 0 0 20px rgba(0,255,128,0.1); }
                50% { text-shadow: 0 0 40px rgba(0,255,128,0.25), 0 0 80px rgba(0,255,128,0.08); }
              }
            `}</style>
            Solana · Commons Theory · 2025
          </div>

          {/* Main title */}
          <h1
            className="hero-title"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "clamp(42px, 8vw, 88px)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: 24,
              animation: "fadeUp 1s ease 0.4s both",
              animation: "fadeUp 1s ease 0.4s both, pulse-glow 4s ease 2s infinite",
            }}
          >
            Tragedy of<br />
            <span style={{
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.4)",
            }}>
              the Commons
            </span>
          </h1>

          {/* Subtitle */}
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "clamp(18px, 3vw, 26px)",
            color: "rgba(255,60,60,0.9)",
            letterSpacing: "0.05em",
            marginBottom: 16,
            animation: "fadeUp 1s ease 0.6s both",
          }}>
            We are the problem.
          </div>

          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.04em",
            marginBottom: 52,
            animation: "fadeUp 1s ease 0.8s both",
          }}>
            When everyone extracts, nothing grows.
          </div>

          <div style={{ animation: "fadeUp 1s ease 1s both" }}>
            <button className="cta-btn" onClick={scrollToInfographic}>
              See the Pattern
            </button>
          </div>
        </div>

        {/* Corner marks */}
        {[
          { top: 20, left: 20 },
          { top: 20, right: 20 },
          { bottom: 20, left: 20 },
          { bottom: 20, right: 20 },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 20,
              height: 20,
              ...pos,
              borderTop: i < 2 ? "1px solid rgba(255,255,255,0.12)" : undefined,
              borderBottom: i >= 2 ? "1px solid rgba(255,255,255,0.12)" : undefined,
              borderLeft: i % 2 === 0 ? "1px solid rgba(255,255,255,0.12)" : undefined,
              borderRight: i % 2 === 1 ? "1px solid rgba(255,255,255,0.12)" : undefined,
            }}
          />
        ))}

        {/* Scroll indicator */}
        <div style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          opacity: scrollY > 50 ? 0 : 0.4,
          transition: "opacity 0.4s",
        }}>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 9,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            scroll
          </div>
          <div style={{
            width: 1,
            height: 32,
            background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)",
            animation: "scrollPulse 2s ease infinite",
          }}>
            <style>{`
              @keyframes scrollPulse {
                0% { transform: scaleY(0); transform-origin: top; }
                50% { transform: scaleY(1); transform-origin: top; }
                51% { transform: scaleY(1); transform-origin: bottom; }
                100% { transform: scaleY(0); transform-origin: bottom; }
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* ─── INFOGRAPHIC ─── */}
      <section
        ref={infographicRef}
        style={{
          maxWidth: 860,
          margin: "0 auto",
          padding: "120px 24px",
        }}
      >
        <AnimatedLine>
          <SectionLabel>The Pattern</SectionLabel>
        </AnimatedLine>

        <AnimatedLine delay={0.1}>
          <h2 style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "clamp(26px, 4vw, 42px)",
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: 12,
          }}>
            Ten Commons.
          </h2>
        </AnimatedLine>
        <AnimatedLine delay={0.2}>
          <h2 style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "clamp(26px, 4vw, 42px)",
            fontWeight: 700,
            lineHeight: 1.2,
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.35)",
            marginBottom: 48,
          }}>
            One Behavior.
          </h2>
        </AnimatedLine>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {CARDS.map((card, i) => (
            <Card key={card.id} card={card} index={i} />
          ))}
        </div>
      </section>

      {/* ─── DIVIDER ─── */}
      <div style={{
        maxWidth: 860,
        margin: "0 auto",
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        opacity: 0.15,
      }}>
        <div style={{ flex: 1, height: 1, background: "white" }} />
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: "0.2em" }}>○</div>
        <div style={{ flex: 1, height: 1, background: "white" }} />
      </div>

      {/* ─── REFLECTION ─── */}
      <section style={{
        maxWidth: 860,
        margin: "0 auto",
        padding: "120px 24px",
        textAlign: "center",
      }}>
        <AnimatedLine>
          <SectionLabel style={{ justifyContent: "center" }}>Reflection</SectionLabel>
        </AnimatedLine>

        <AnimatedLine delay={0.1}>
          <h2 style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "clamp(22px, 3.5vw, 36px)",
            marginBottom: 64,
            color: "rgba(255,255,255,0.6)",
          }}>
            The Pattern is Clear
          </h2>
        </AnimatedLine>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          marginBottom: 64,
        }}>
          {REFLECTION_LINES.map((line, i) => (
            <AnimatedLine key={i} delay={0.15 * i}>
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "clamp(28px, 6vw, 64px)",
                fontWeight: 700,
                lineHeight: 1.1,
                color: i % 2 === 0 ? "white" : "rgba(255,60,60,0.7)",
                letterSpacing: "-0.02em",
              }}>
                {line}
              </div>
            </AnimatedLine>
          ))}
        </div>

        <AnimatedLine delay={0.6}>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(14px, 2vw, 18px)",
            color: "rgba(255,255,255,0.35)",
            lineHeight: 1.7,
            maxWidth: 480,
            margin: "0 auto",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: 32,
          }}>
            And we wonder why nothing reaches billions.
          </div>
        </AnimatedLine>
      </section>

      {/* ─── SOLUTION ─── */}
      <section style={{
        background: "rgba(0,255,128,0.025)",
        borderTop: "1px solid rgba(0,255,128,0.1)",
        borderBottom: "1px solid rgba(0,255,128,0.1)",
      }}>
        <div style={{
          maxWidth: 860,
          margin: "0 auto",
          padding: "120px 24px",
          textAlign: "center",
        }}>
          <AnimatedLine>
            <SectionLabel>Change</SectionLabel>
          </AnimatedLine>

          <AnimatedLine delay={0.1}>
            <h2 style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "clamp(22px, 3.5vw, 36px)",
              marginBottom: 64,
              color: "#00ff80",
            }}>
              Break the Cycle
            </h2>
          </AnimatedLine>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 2,
            maxWidth: 560,
            margin: "0 auto 64px",
          }}>
            {SOLUTION_LINES.map((line, i) => (
              <AnimatedLine key={i} delay={0.1 * i}>
                <div style={{
                  background: "rgba(0,255,128,0.04)",
                  border: "1px solid rgba(0,255,128,0.12)",
                  padding: "32px 24px",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "clamp(14px, 2vw, 18px)",
                  color: "#00ff80",
                  letterSpacing: "0.04em",
                }}>
                  {line}
                </div>
              </AnimatedLine>
            ))}
          </div>

          <AnimatedLine delay={0.5}>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15,
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.06em",
            }}>
              One decision compounds. Every time.
            </div>
          </AnimatedLine>
        </div>
      </section>

      {/* ─── COIN ─── */}
      <section style={{
        maxWidth: 860,
        margin: "0 auto",
        padding: "120px 24px",
        textAlign: "center",
      }}>
        <AnimatedLine>
          <SectionLabel>The Token</SectionLabel>
        </AnimatedLine>

        {/* Coin visual */}
        <AnimatedLine delay={0.1}>
          <div style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            border: "2px solid rgba(0,255,128,0.4)",
            margin: "0 auto 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 40px rgba(0,255,128,0.08), inset 0 0 30px rgba(0,255,128,0.04)",
            position: "relative",
          }}>
            <div style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              border: "1px solid rgba(0,255,128,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Space Mono', monospace",
              fontSize: 20,
            }}>
              ∞
            </div>
          </div>
        </AnimatedLine>

        <AnimatedLine delay={0.2}>
          <h2 style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "clamp(20px, 3vw, 32px)",
            fontWeight: 700,
            marginBottom: 16,
            letterSpacing: "0.02em",
          }}>
            Tragedy of the Commons
          </h2>
        </AnimatedLine>

        <AnimatedLine delay={0.3}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15,
            color: "rgba(255,255,255,0.4)",
            lineHeight: 1.75,
            maxWidth: 420,
            margin: "0 auto 48px",
          }}>
            A memecoin built on awareness.<br />
            A reminder that change starts with behavior.
          </p>
        </AnimatedLine>

        {/* Contract address */}
        <AnimatedLine delay={0.4}>
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 2,
            padding: "14px 24px",
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 32,
            maxWidth: "100%",
          }}>
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 9,
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              minWidth: "fit-content",
            }}>
              CA
            </span>
            <span
              className="coin-address"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 12,
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.05em",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              Coming Soon · TBD
            </span>
          </div>
        </AnimatedLine>

        {/* CTA buttons */}
        <AnimatedLine delay={0.5}>
          <div style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}>
            <button className="cta-btn">
              Buy
            </button>
            <button className="ghost-btn">
              Chart
            </button>
            <button className="ghost-btn">
              Community
            </button>
          </div>
        </AnimatedLine>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "40px 24px",
        textAlign: "center",
      }}>
        <div style={{
          maxWidth: 860,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.15em",
            color: "rgba(255,255,255,0.2)",
            textTransform: "uppercase",
          }}>
            Tragedy of the Commons · Solana
          </div>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.15)",
          }}>
            Not financial advice. This is a mirror.
          </div>
        </div>
      </footer>
    </div>
  );
}
