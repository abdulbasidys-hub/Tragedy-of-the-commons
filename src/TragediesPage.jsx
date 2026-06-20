import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// ─────────────────────────────────────────────────────────────────────────
// DAILY_LOG — this is the part you'll keep adding to. Each entry is one
// toxic habit / incident observed on-chain. Copy the shape below for new
// entries. `severity` drives the badge color: "Critical" | "High" |
// "Medium" | "Low". `statusIcon` / `actionIcon` are Material Symbols
// Outlined icon names (see fonts.google.com/icons for the full set).
// ─────────────────────────────────────────────────────────────────────────
const DAILY_LOG = [
  {
    id: "log-001",
    severity: "Critical",
    timestamp: "14:22 UTC",
    title: "Coordinated Wash Trading Detected",
    description:
      "Volume on $MOONPUP inflated 480% by a cluster of linked wallets trading back and forth. No real buyers — just the appearance of demand.",
    stats: [
      { label: "Impacted Token", value: "$MOONPUP" },
      { label: "Volume Inflated", value: "+480%" },
    ],
    status: "Unresolved",
    statusIcon: "warning",
  },
  {
    id: "log-002",
    severity: "High",
    timestamp: "09:15 UTC",
    title: "Dev Wallet Goes Dark",
    description:
      "Liquidity provider wallets for $FROGX went silent over a 4-hour window. No communication, no withdrawal notice. Holders are exiting fast.",
    stats: [
      { label: "Impacted Token", value: "$FROGX" },
      { label: "Liquidity Removed", value: "-91.4%" },
    ],
    status: "Monitoring",
    statusIcon: "visibility",
  },
  // Add new entries here — same shape as above.
];

const SEVERITY_STYLES = {
  Critical: { color: "var(--c-error)", bg: "rgba(255,180,171,0.1)", border: "rgba(255,180,171,0.25)" },
  High: { color: "var(--c-secondary-container)", bg: "rgba(0,224,255,0.1)", border: "rgba(0,224,255,0.25)" },
  Medium: { color: "var(--c-primary-container)", bg: "rgba(20,241,149,0.1)", border: "rgba(20,241,149,0.25)" },
  Low: { color: "var(--c-on-surface-variant)", bg: "rgba(186,203,188,0.1)", border: "rgba(186,203,188,0.25)" },
};

const FEED = [
  { time: "14:55", label: "@WhaleAlert", color: "var(--c-primary-container)", text: "50,000 SOL moved from unknown wallet to exchange." },
  { time: "14:50", label: "SYSTEM", color: "var(--c-error)", text: "Spike in low-effort token deploys detected." },
  { time: "14:42", label: "PATTERN", color: "var(--c-secondary-container)", text: "Attention pool now split across 1,200+ active tokens." },
  { time: "14:30", label: "AUDIT", color: "var(--c-secondary-container)", text: "Preliminary report released for $MOONPUP incident." },
  { time: "14:15", label: "NOTE", color: "var(--c-on-surface-variant)", text: "Holding duration trending down for the third day running." },
];

// ─── HOOKS / HELPERS (self-contained — see note at bottom of file) ─────────
function useInView(threshold = 0.1) {
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
        transform: inView ? "translateY(0px)" : "translateY(16px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Icon({ name, size = 16, style = {} }) {
  return (
    <span className="material-symbols-outlined" style={{ fontSize: size, lineHeight: 1, ...style }}>
      {name}
    </span>
  );
}

// ─── INCIDENT CARD ──────────────────────────────────────────────────────────
function LogCard({ entry, index }) {
  const sev = SEVERITY_STYLES[entry.severity] || SEVERITY_STYLES.Medium;
  return (
    <Reveal delay={index * 0.06}>
      <article className="glass-panel incident-card" style={{
        borderRadius: 12, padding: 24, position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 4,
          background: `linear-gradient(to right, ${sev.color}, transparent)`, opacity: 0.6,
        }} />

        <div style={{
          display: "flex", flexWrap: "wrap", justifyContent: "space-between",
          alignItems: "flex-start", gap: 8, marginBottom: 16,
        }}>
          <span style={{
            fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700,
            letterSpacing: "0.06em", textTransform: "uppercase",
            color: sev.color, background: sev.bg,
            border: `1px solid ${sev.border}`, borderRadius: 4,
            padding: "3px 8px",
          }}>
            Severity: {entry.severity}
          </span>
          <span style={{
            fontFamily: "'Inter', sans-serif", fontSize: 11,
            color: "var(--c-on-surface-variant)",
            display: "flex", alignItems: "center", gap: 4,
          }}>
            <Icon name="schedule" size={14} /> {entry.timestamp}
          </span>
        </div>

        <h2 className="incident-title" style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
          fontSize: "clamp(18px, 3vw, 24px)", color: "var(--c-on-surface)",
          marginBottom: 12, transition: "color 0.3s",
        }}>
          {entry.title}
        </h2>

        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: 14, lineHeight: 1.7,
          color: "var(--c-on-surface-variant)", marginBottom: 24,
        }}>
          {entry.description}
        </p>

        <div className="incident-stats" style={{
          borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16,
        }}>
          {entry.stats.map((s) => (
            <div key={s.label}>
              <div style={{
                fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600,
                letterSpacing: "0.05em", textTransform: "uppercase",
                color: "var(--c-on-surface-variant)", marginBottom: 4,
              }}>
                {s.label}
              </div>
              <div style={{
                fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500,
                color: "var(--c-on-surface)",
              }}>
                {s.value}
              </div>
            </div>
          ))}
          <div>
            <div style={{
              fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600,
              letterSpacing: "0.05em", textTransform: "uppercase",
              color: "var(--c-on-surface-variant)", marginBottom: 4,
            }}>
              Status
            </div>
            <div style={{
              fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500,
              color: sev.color, display: "flex", alignItems: "center", gap: 4,
            }}>
              <Icon name={entry.statusIcon || "warning"} size={16} /> {entry.status}
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

// ─── NAV — doc reference header: logo + links (active) + Connect Wallet ───
function Nav() {
  return (
    <nav className="glass-panel" style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      borderBottom: "1px solid rgba(255,255,255,0.1)",
    }}>
      <div style={{
        display: "flex", justifyContent: "center", alignItems: "center",
        flexWrap: "wrap", gap: 28, minHeight: 64, maxWidth: 1440,
        margin: "0 auto", padding: "10px 24px",
      }}>
        <Link to="/" className="nav-link" style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 14,
          color: "var(--c-on-surface-variant)", textDecoration: "none",
        }}>
          The Struggle
        </Link>
        <Link to="/tragedies" style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14,
          color: "var(--c-primary-container)", textDecoration: "none",
          borderBottom: "2px solid var(--c-primary-container)", paddingBottom: 4,
        }}>
          The Tragedies
        </Link>
      </div>
    </nav>
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
export default function TragediesPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-weight: normal; font-style: normal;
          display: inline-block; white-space: nowrap; word-wrap: normal;
          direction: ltr; vertical-align: middle;
        }

        .tragedies-grid { display: grid; grid-template-columns: minmax(0,2fr) minmax(260px,1fr); gap: 24px; }
        @media (max-width: 860px) { .tragedies-grid { grid-template-columns: 1fr; } }

        .incident-stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        @media (min-width: 640px) { .incident-stats { grid-template-columns: repeat(3, 1fr); } }

        .incident-card { transition: border-color 0.3s; }
        .incident-card:hover { border-color: rgba(20,241,149,0.3); }
        .incident-card:hover .incident-title { color: var(--c-primary); }

        .feed-row { padding: 10px 8px; border-radius: 8px; transition: background 0.2s; cursor: pointer; }
        .feed-row:nth-child(even) { background: rgba(255,255,255,0.02); }
        .feed-row:hover { background: rgba(255,255,255,0.05); }
      `}</style>

      <Nav />
      <main style={{ paddingTop: 96, paddingBottom: 96, maxWidth: 1320, margin: "0 auto" }}>
        <header style={{
          display: "flex", flexWrap: "wrap", justifyContent: "space-between",
          alignItems: "flex-end", gap: 20, padding: "0 24px 32px",
          borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: 40,
        }}>
          <div>
            <h1 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
              fontSize: "clamp(28px, 5vw, 40px)", color: "var(--c-on-surface)", marginBottom: 10,
            }}>
              Incident Logs
            </h1>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--c-on-surface-variant)",
              maxWidth: 560, lineHeight: 1.6,
            }}>
              Real-time monitoring of toxic habits and systemic failures across the
              memecoin ecosystem. Logged as they happen — illustrative entries, not financial advice.
            </p>
          </div>
          <div className="glass-panel" style={{
            display: "flex", alignItems: "center", gap: 10,
            borderRadius: 8, padding: "10px 16px",
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: "50%",
              background: "var(--c-error)", animation: "blink 2s infinite",
            }} />
            <span style={{
              fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700,
              letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--c-error)",
            }}>
              System Active
            </span>
          </div>
        </header>

        <div className="tragedies-grid" style={{ padding: "0 24px" }}>
          {/* Feed — add new entries to DAILY_LOG at the top of this file */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
            {DAILY_LOG.map((entry, i) => <LogCard key={entry.id} entry={entry} index={i} />)}
          </div>

          {/* Sidebar */}
          <aside style={{
            display: "flex", flexDirection: "column", gap: 20,
            position: "sticky", top: 96, alignSelf: "flex-start",
          }}>
            <Reveal>
              <div className="glass-panel" style={{ borderRadius: 12, padding: 20 }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 8, marginBottom: 16,
                  borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 12,
                }}>
                  <Icon name="data_usage" size={18} style={{ color: "var(--c-primary)" }} />
                  <h3 style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15,
                    color: "var(--c-on-surface)",
                  }}>
                    Network Telemetry
                  </h3>
                </div>
                <div style={{
                  background: "rgba(0,0,0,0.3)", borderRadius: 8, padding: 14,
                  border: "1px solid rgba(255,255,255,0.05)",
                }}>
                  <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10,
                  }}>
                    <span style={{
                      fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600,
                      letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--c-on-surface-variant)",
                    }}>
                      Hope Index
                    </span>
                    <span style={{
                      fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, color: "var(--c-error)",
                    }}>
                      Despair
                    </span>
                  </div>
                  <div style={{
                    width: "100%", height: 8, borderRadius: 4,
                    background: "var(--c-surface-highest)", overflow: "hidden",
                  }}>
                    <div style={{
                      width: "25%", height: "100%", borderRadius: 4,
                      background: "linear-gradient(to right, var(--c-error), var(--c-secondary-container), var(--c-primary-container))",
                    }} />
                  </div>
                  <div style={{
                    display: "flex", justifyContent: "space-between", marginTop: 8,
                    fontFamily: "'Inter', sans-serif", fontSize: 10, color: "var(--c-on-surface-variant)",
                  }}>
                    <span>0</span><span style={{ color: "var(--c-on-surface)" }}>24/100</span><span>100</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="glass-panel" style={{ borderRadius: 12, padding: 20 }}>
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  marginBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 12,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Icon name="rss_feed" size={18} style={{ color: "var(--c-on-surface-variant)" }} />
                    <h3 style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15,
                      color: "var(--c-on-surface)",
                    }}>
                      Live Comm Feed
                    </h3>
                  </div>
                  <span style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: "var(--c-primary-container)", animation: "blink 2s infinite",
                  }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", maxHeight: 300, overflowY: "auto" }}>
                  {FEED.map((item, i) => (
                    <div key={i} className="feed-row" style={{ display: "flex", gap: 10 }}>
                      <span style={{
                        fontFamily: "'Inter', sans-serif", fontSize: 10,
                        color: "var(--c-on-surface-variant)", flexShrink: 0, paddingTop: 1,
                      }}>
                        {item.time}
                      </span>
                      <p style={{
                        fontFamily: "'Inter', sans-serif", fontSize: 12, lineHeight: 1.5,
                        color: "var(--c-on-surface)",
                      }}>
                        <span style={{ color: item.color, fontWeight: 700 }}>{item.label}: </span>
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}

// Note: useInView / Reveal are duplicated rather than imported from
// HomePage.jsx or App.jsx to avoid circular imports (App.jsx imports this
// file). Colors are shared safely via CSS variables defined once in
// App.jsx's global <style>.