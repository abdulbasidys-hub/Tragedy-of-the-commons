/**
 * ============================================================
 * REMOTE SKILLS LEARNING HUB
 * "Learn to earn from the comfort of your home"
 *
 * Pages: Home | How Surveys Work | Get Started | Testimonials
 *
 * TO CUSTOMIZE:
 *  1. Search "YOUR_WHATSAPP_NUMBER" → replace with e.g. 2348012345678
 *  2. Search "YOUR_YOUTUBE_VIDEO_ID" → replace with your YouTube video ID
 *     (the part after ?v= in the YouTube URL)
 *  3. Replace placeholder text where marked with // EDIT:
 *  4. Replace ScreenshotSlot boxes with <img> tags when ready
 * ============================================================
 */

import { useState, useEffect } from "react";

// ─────────────────────────────────────────────────────────────
// CONFIG — Edit these in one place, they apply everywhere
// ─────────────────────────────────────────────────────────────
const WA_NUMBER   = "YOUR_WHATSAPP_NUMBER"; // EDIT: e.g. 2348012345678
const WA_MESSAGE  = encodeURIComponent("Hi, I'm interested in learning about online surveys. Please guide me."); // EDIT preset message
const YT_VIDEO_ID = "YOUR_YOUTUBE_VIDEO_ID"; // EDIT: YouTube video ID (part after ?v=)
const SITE_TAG    = "Learn to earn from the comfort of your home";

const waLink = (msg = WA_MESSAGE) => `https://wa.me/${WA_NUMBER}?text=${msg}`;

// ─────────────────────────────────────────────────────────────
// GLOBAL STYLES
// ─────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,700;1,500&family=Outfit:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg:         #f9f8f5;
      --surface:    #ffffff;
      --border:     #e5e1d8;
      --ink:        #1a1917;
      --ink-muted:  #5c5750;
      --ink-light:  #9b958f;
      --green:      #2a6048;
      --green-lt:   #d5ebe1;
      --green-dk:   #1e4535;
      --wa:         #25d366;
      --wa-dk:      #1aab52;
      --radius:     10px;
      --shadow:     0 2px 14px rgba(0,0,0,0.07);
      --shadow-md:  0 6px 28px rgba(0,0,0,0.11);
      --max-w:      1040px;
      --font-head:  'Lora', Georgia, serif;
      --font-body:  'Outfit', system-ui, sans-serif;
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: var(--font-body);
      background: var(--bg);
      color: var(--ink);
      line-height: 1.65;
      -webkit-font-smoothing: antialiased;
    }

    /* Layout */
    .wrap { max-width: var(--max-w); margin: 0 auto; padding: 0 1.5rem; }
    .sec  { padding: 4.5rem 0; }
    .sec-sm { padding: 2.5rem 0; }

    /* Typography */
    h1, h2, h3 { font-family: var(--font-head); line-height: 1.2; color: var(--ink); }
    h1 { font-size: clamp(1.9rem, 4.5vw, 3rem); font-weight: 700; }
    h2 { font-size: clamp(1.4rem, 3vw, 2.1rem); font-weight: 600; }
    h3 { font-size: 1.05rem; font-weight: 600; }
    p  { color: var(--ink-muted); line-height: 1.75; font-size: 0.97rem; }

    .tag {
      display: inline-block;
      font-size: 0.7rem; font-weight: 600; letter-spacing: 0.13em;
      text-transform: uppercase; color: var(--green);
      margin-bottom: 0.6rem;
    }

    /* Cards */
    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 1.5rem;
      box-shadow: var(--shadow);
      transition: transform 0.22s, box-shadow 0.22s;
    }
    .card:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); }
    .card-accent { border-top: 3px solid var(--green); }

    /* Grids — desktop defaults */
    .g2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; }
    .g3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }

    /* Buttons */
    .btn {
      display: inline-flex; align-items: center; justify-content: center; gap: 0.45rem;
      padding: 0.72rem 1.6rem; border-radius: var(--radius);
      font-family: var(--font-body); font-size: 0.92rem; font-weight: 500;
      cursor: pointer; border: none; text-decoration: none;
      transition: all 0.2s; line-height: 1; white-space: nowrap;
    }
    .btn-green  { background: var(--green); color: #fff; }
    .btn-green:hover  { background: var(--green-dk); transform: translateY(-1px); }
    .btn-wa     { background: var(--wa); color: #fff; }
    .btn-wa:hover     { background: var(--wa-dk); transform: translateY(-1px); }
    .btn-ghost  { background: transparent; color: var(--ink); border: 1.5px solid var(--border); }
    .btn-ghost:hover  { border-color: var(--green); color: var(--green); }
    .btn-lg     { padding: 0.9rem 2rem; font-size: 1rem; }

    /* Divider */
    hr.div { border: none; border-top: 1px solid var(--border); }

    /* ── NAVBAR ── */
    .nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 300;
      background: rgba(249,248,245,0.97);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border);
    }

    /* Desktop: brand left, links right, single row */
    .nav-inner {
      display: flex; align-items: center; justify-content: space-between;
      height: 60px;
    }
    .nav-brand { display: flex; flex-direction: column; cursor: pointer; }
    .nav-brand-name {
      font-family: var(--font-head); font-size: 1rem; font-weight: 700;
      color: var(--ink); line-height: 1.2;
    }
    .nav-brand-name span { color: var(--green); }
    .nav-brand-tag { font-size: 0.62rem; color: var(--ink-light); }

    /* Desktop nav links */
    .nav-menu { display: flex; align-items: center; gap: 0.1rem; }
    .nav-btn {
      padding: 0.38rem 0.85rem; border-radius: 7px;
      font-size: 0.85rem; font-weight: 500; color: var(--ink-muted);
      cursor: pointer; transition: all 0.18s;
      border: none; background: none; font-family: var(--font-body);
      white-space: nowrap;
    }
    .nav-btn:hover, .nav-btn.active { color: var(--green); background: var(--green-lt); }

    /* Hamburger — hidden on desktop, shown on mobile */
    .nav-ham {
      display: none; background: none; border: none;
      cursor: pointer; font-size: 1.4rem; color: var(--ink);
      padding: 0.3rem; line-height: 1;
    }

    /* Mobile-only title row (brand full-width + hamburger) */
    .nav-mobile-row {
      display: none; /* hidden on desktop */
      align-items: center; justify-content: space-between;
      padding: 0.65rem 1.5rem;
    }

    /* Mobile drawer — nav links stacked */
    .nav-drawer {
      display: none; flex-direction: column; gap: 0.15rem;
      padding: 0.5rem 1.5rem 1rem;
      border-top: 1px solid var(--border);
      background: var(--bg);
    }
    .nav-drawer.open { display: flex; }
    .nav-drawer .nav-btn { text-align: left; padding: 0.6rem 0.85rem; font-size: 0.9rem; }

    /* ── HERO ── */
    .hero {
      padding: 7.5rem 0 4.5rem;
      background: linear-gradient(155deg, #eef6f1 0%, var(--bg) 65%);
      border-bottom: 1px solid var(--border);
    }
    .hero-grid { display: grid; grid-template-columns: 1fr 380px; gap: 3rem; align-items: center; }
    .hero h1 { margin-bottom: 0.9rem; }
    .hero h1 em { font-style: italic; color: var(--green); }
    .hero-sub { font-size: 1rem; margin-bottom: 1.8rem; }
    .hero-btns { display: flex; gap: 0.75rem; flex-wrap: wrap; }

    /* Hero side panel */
    .hero-panel {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 14px; padding: 1.6rem; box-shadow: var(--shadow-md);
    }
    .hero-panel-title {
      font-family: var(--font-head); font-size: 0.95rem; font-weight: 600;
      margin-bottom: 1rem; padding-bottom: 0.7rem;
      border-bottom: 1px solid var(--border); color: var(--ink);
    }
    .check-item { display: flex; align-items: flex-start; gap: 0.6rem; margin-bottom: 0.8rem; }
    .check-icon {
      width: 20px; height: 20px; border-radius: 50%;
      background: var(--green-lt); color: var(--green);
      font-size: 0.65rem; display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; margin-top: 0.15rem; font-weight: 700;
    }
    .check-text { font-size: 0.86rem; color: var(--ink-muted); line-height: 1.5; }
    .check-text strong { color: var(--ink); }

    /* ── PAGE HEADER ── */
    .ph {
      padding: 7rem 0 3rem;
      background: linear-gradient(150deg, #eef6f1 0%, var(--bg) 70%);
      border-bottom: 1px solid var(--border);
      text-align: center;
    }
    .ph h1 { margin-bottom: 0.6rem; }
    .ph p { max-width: 520px; margin: 0 auto; }

    /* ── MYTH CARDS ── */
    .myth { border-radius: var(--radius); overflow: hidden; border: 1px solid var(--border); }
    .myth-top    { background: #fef2f2; padding: 1rem 1.25rem; }
    .myth-bottom { background: #f0fdf4; padding: 1rem 1.25rem; }
    .myth-lbl { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.3rem; }
    .myth-lbl.r { color: #dc2626; }
    .myth-lbl.g { color: var(--green); }
    .myth-top p  { font-size: 0.87rem; color: #7f1d1d; }
    .myth-bottom p { font-size: 0.87rem; color: #14532d; }

    /* ── VIDEO EMBED ── */
    .video-wrap {
      position: relative; padding-bottom: 56.25%; height: 0;
      overflow: hidden; border-radius: var(--radius);
      box-shadow: var(--shadow-md); background: #000;
    }
    .video-wrap iframe {
      position: absolute; top: 0; left: 0;
      width: 100%; height: 100%; border: none;
    }

    /* ── SCREENSHOT PLACEHOLDER ── */
    .ss-slot {
      background: var(--surface); border: 2px dashed var(--border);
      border-radius: var(--radius); padding: 2.5rem 1.5rem; text-align: center;
    }
    .ss-slot .ss-icon { font-size: 2rem; margin-bottom: 0.5rem; }
    .ss-slot .ss-lbl { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-muted); }
    .ss-slot .ss-hint { font-size: 0.76rem; margin-top: 0.3rem; color: var(--ink-light); }

    /* ── TESTIMONIAL ── */
    .tc {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: var(--radius); padding: 1.4rem; box-shadow: var(--shadow);
    }
    .tc-stars { color: #f59e0b; font-size: 0.85rem; margin-bottom: 0.6rem; }
    .tc-quote { font-size: 0.88rem; color: var(--ink-muted); font-style: italic; margin-bottom: 0.9rem; line-height: 1.65; }
    .tc-name  { font-weight: 600; font-size: 0.84rem; color: var(--ink); }
    .tc-role  { font-size: 0.75rem; color: var(--ink-light); margin-top: 0.1rem; }

    /* ── CTA BAND ── */
    .cta-band {
      background: var(--green); border-radius: var(--radius);
      padding: 2.5rem 2rem; text-align: center;
    }
    .cta-band h2 { color: #fff; margin-bottom: 0.6rem; }
    .cta-band p  { color: rgba(255,255,255,0.82); max-width: 400px; margin: 0 auto 1.5rem; font-size: 0.95rem; }

    /* ── FOOTER ── */
    footer { background: var(--ink); padding: 2.5rem 0 2rem; }
    .footer-inner { display: flex; flex-direction: column; align-items: center; gap: 1.2rem; text-align: center; }
    .f-brand { font-family: var(--font-head); font-size: 1rem; font-weight: 700; color: #fff; }
    .f-brand span { color: #86efac; }
    .f-tag { font-size: 0.68rem; color: rgba(255,255,255,0.38); }
    .f-links { display: flex; gap: 1.4rem; flex-wrap: wrap; justify-content: center; }
    .f-link {
      font-size: 0.8rem; color: rgba(255,255,255,0.42);
      background: none; border: none; cursor: pointer;
      font-family: var(--font-body); transition: color 0.2s;
    }
    .f-link:hover { color: #fff; }
    .f-disc { font-size: 0.72rem; max-width: 500px; color: rgba(255,255,255,0.26); line-height: 1.6; }
    .f-copy { font-size: 0.7rem; color: rgba(255,255,255,0.22); }

    /* ── RESPONSIVE — Tablet ── */
    @media (max-width: 860px) {
      .hero-grid { grid-template-columns: 1fr; }
      .hero { padding: 6.5rem 0 3.5rem; }
      .g3 { grid-template-columns: repeat(2, 1fr); }
      .g2 { grid-template-columns: 1fr; }
    }

    /* ── RESPONSIVE — Mobile ── */
    @media (max-width: 640px) {
      /* Desktop nav row hidden; mobile row shown instead */
      .nav-inner   { display: none !important; }
      .nav-mobile-row { display: flex !important; }
      .nav-ham     { display: flex !important; align-items: center; }
      /* Grids go single column */
      .g3 { grid-template-columns: 1fr; }
      .g2 { grid-template-columns: 1fr; }
      .sec { padding: 3rem 0; }
      .sec-sm { padding: 2rem 0; }
      .hero { padding: 5.5rem 0 3rem; }
      .ph { padding: 5.5rem 0 2.5rem; }
      /* Ensure headings are always visible on mobile */
      h1, h2, h3 { color: var(--ink) !important; display: block !important; visibility: visible !important; }
    }
  `}</style>
);

// ─────────────────────────────────────────────────────────────
// REUSABLE COMPONENTS
// ─────────────────────────────────────────────────────────────

const WaBtn = ({ label = "Chat on WhatsApp", size = "", msg = WA_MESSAGE }) => (
  <a className={`btn btn-wa ${size === "lg" ? "btn-lg" : ""}`}
     href={waLink(msg)} target="_blank" rel="noopener noreferrer">
    💬 {label}
  </a>
);

const Sec = ({ children, id = "", sm = false }) => (
  <section className={sm ? "sec-sm" : "sec"} id={id}>
    <div className="wrap">{children}</div>
  </section>
);

const ScreenshotSlot = ({ label, hint }) => (
  <div className="ss-slot">
    <div className="ss-icon">🖼️</div>
    <div className="ss-lbl">{label}</div>
    {hint && <p className="ss-hint">{hint}</p>}
  </div>
);

const TestiCard = ({ name, role, quote, stars = 5 }) => (
  <div className="tc">
    <div className="tc-stars">{"★".repeat(stars)}{"☆".repeat(5 - stars)}</div>
    <p className="tc-quote">"{quote}"</p>
    <div className="tc-name">{name}</div>
    <div className="tc-role">{role}</div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────
const Navbar = ({ page, go }) => {
  const [open, setOpen] = useState(false);
  const links = [
    { id: "home",         label: "Home" },
    { id: "how-it-works", label: "How It Works" },
    { id: "testimonials", label: "Testimonials" },
    { id: "get-started",  label: "Get Started" },
  ];
  const nav = (id) => { go(id); setOpen(false); };

  const Brand = ({ onClick }) => (
    <div className="nav-brand" onClick={onClick}>
      <div className="nav-brand-name">Remote Skills <span>Learning Hub</span></div>
      <div className="nav-brand-tag">{SITE_TAG}</div>
    </div>
  );

  return (
    <nav className="nav">
      {/* ── Desktop row (hidden on mobile) ── */}
      <div className="wrap">
        <div className="nav-inner">
          <Brand onClick={() => nav("home")} />
          <div className="nav-menu">
            {links.map(l => (
              <button key={l.id}
                className={`nav-btn ${page === l.id ? "active" : ""}`}
                onClick={() => nav(l.id)}>{l.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile top row: title + hamburger (shown only on mobile) ── */}
      <div className="nav-mobile-row">
        <Brand onClick={() => nav("home")} />
        <button className="nav-ham" onClick={() => setOpen(o => !o)} aria-label="Menu">
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* ── Mobile drawer: nav links only ── */}
      <div className={`nav-drawer ${open ? "open" : ""}`}>
        {links.map(l => (
          <button key={l.id}
            className={`nav-btn ${page === l.id ? "active" : ""}`}
            onClick={() => nav(l.id)}>{l.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

// ─────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────
const Footer = ({ go }) => (
  <footer>
    <div className="wrap">
      <div className="footer-inner">
        <div>
          <div className="f-brand">Remote Skills <span>Learning Hub</span></div>
          <div className="f-tag">{SITE_TAG}</div>
        </div>
        <div className="f-links">
          <button className="f-link" onClick={() => go("home")}>Home</button>
          <button className="f-link" onClick={() => go("how-it-works")}>How It Works</button>
          <button className="f-link" onClick={() => go("testimonials")}>Testimonials</button>
          <button className="f-link" onClick={() => go("get-started")}>Get Started</button>
          {/* EDIT: Add real pages when ready */}
        </div>
        <p className="f-disc">
          This website is for educational purposes. Earnings from online surveys vary by individual
          and platform. We do not guarantee any specific income. Always read each platform's terms before participating.
        </p>
        <div className="f-copy">© {new Date().getFullYear()} Remote Skills Learning Hub. All rights reserved.</div>
      </div>
    </div>
  </footer>
);

// ─────────────────────────────────────────────────────────────
// PAGE: HOME
// ─────────────────────────────────────────────────────────────
const Home = ({ go }) => (
  <>
    <section className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <div>
            {/* EDIT: Main headline */}
            <h1>Start Earning Online<br/>with <em>Paid Surveys</em></h1>
            {/* EDIT: Keep this short — 1–2 sentences */}
            <p className="hero-sub">
              Discover how online surveys work, what to realistically expect,
              and how to get started the right way — with personal guidance.
            </p>
            <div className="hero-btns">
              <button className="btn btn-green" onClick={() => go("how-it-works")}>
                See How It Works →
              </button>
              <WaBtn label="Get Access Now" size="lg" />
            </div>
          </div>

          {/* EDIT: Checklist items on the right panel */}
          <div className="hero-panel">
            <div className="hero-panel-title">✅ What you'll get</div>
            {[
              ["A clear understanding", "of how online surveys actually work"],
              ["Proof it works",        "real results, not empty promises"],
              ["Step-by-step access",   "to the right platforms and tools"],
              ["Personal guidance",     "via WhatsApp at your own pace"],
            ].map(([bold, rest], i) => (
              <div className="check-item" key={i}>
                <div className="check-icon">✓</div>
                <div className="check-text"><strong>{bold}</strong> {rest}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* SHORT INTRO */}
    <Sec>
      <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
        <span className="tag">What This Is</span>
        <h2 style={{ marginBottom: "0.9rem" }}>A real opportunity, explained honestly</h2>
        {/* EDIT: 2–3 sentence intro */}
        <p>
          Online surveys are one of the simplest ways to earn from your phone or computer.
          This site explains how they work, shows you real proof, and connects you with
          someone who will guide you through the process personally.
        </p>
      </div>
    </Sec>

    <hr className="div" />

    {/* 3 NAVIGATION CARDS */}
    <Sec>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <span className="tag">Explore</span>
        <h2>Where do you want to start?</h2>
      </div>
      <div className="g3">
        {[
          {
            icon: "📊", title: "How It Works",
            desc: "Understand surveys, how platforms pay, and what's realistic — honestly explained.", // EDIT
            btn: <button className="btn btn-ghost" onClick={() => go("how-it-works")}>Learn More →</button>
          },
          {
            icon: "⭐", title: "See Proof",
            desc: "Real results from real people. No fabricated claims — just honest evidence.", // EDIT
            btn: <button className="btn btn-ghost" onClick={() => go("testimonials")}>View Proof →</button>
          },
          {
            icon: "💬", title: "Get Started",
            desc: "Ready to begin? Get personal, step-by-step guidance directly on WhatsApp.", // EDIT
            btn: <WaBtn label="Chat on WhatsApp" />
          },
        ].map((c, i) => (
          <div className="card card-accent" key={i}>
            <div style={{ fontSize: "1.5rem", marginBottom: "0.55rem" }}>{c.icon}</div>
            <h3 style={{ marginBottom: "0.4rem" }}>{c.title}</h3>
            <p style={{ fontSize: "0.87rem", marginBottom: "1.1rem" }}>{c.desc}</p>
            {c.btn}
          </div>
        ))}
      </div>
    </Sec>

    {/* TESTIMONIAL PREVIEW */}
    <hr className="div" />
    <Sec>
      <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
        <span className="tag">Results</span>
        <h2>People are already doing this</h2>
      </div>
      {/* REPLACE WITH REAL TESTIMONIALS */}
      <div className="g3">
        {[
          { name: "[Name]", role: "[Location]", quote: "Replace with a real testimonial. Short and specific works best.", stars: 5 },
          { name: "[Name]", role: "[Location]", quote: "Replace with a real testimonial. Mention what changed for this person.", stars: 5 },
          { name: "[Name]", role: "[Location]", quote: "Replace with a real testimonial. Authentic feedback builds more trust.", stars: 4 },
        ].map((t, i) => <TestiCard key={i} {...t} />)}
      </div>
      <div style={{ textAlign: "center", marginTop: "1.75rem" }}>
        <button className="btn btn-ghost" onClick={() => go("testimonials")}>Read all testimonials →</button>
      </div>
    </Sec>

    {/* BOTTOM CTA */}
    <Sec sm>
      <div className="cta-band">
        {/* EDIT: CTA headline and subtext */}
        <h2>Ready to get started?</h2>
        <p>Send a message on WhatsApp and we'll walk you through everything personally.</p>
        <WaBtn label="Message Us on WhatsApp" size="lg" />
      </div>
    </Sec>
  </>
);

// ─────────────────────────────────────────────────────────────
// PAGE: HOW IT WORKS
// ─────────────────────────────────────────────────────────────
const HowItWorks = ({ go }) => (
  <>
    <div className="ph">
      <div className="wrap">
        <span className="tag">Education</span>
        <h1>How Online Surveys Work</h1>
        <p>A clear, honest overview — no hype, no exaggerated promises.</p>
      </div>
    </div>

    {/* VIDEO */}
    <Sec id="video">
      <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
        <span className="tag">Watch First</span>
        {/* EDIT: Video section title */}
        <h2>See it explained in this video</h2>
        {/* EDIT: Short description of the video */}
        <p style={{ maxWidth: "480px", margin: "0.5rem auto 0" }}>
          This short video walks you through how survey platforms work and what to expect.
        </p>
      </div>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        {/* YOUTUBE VIDEO — set YT_VIDEO_ID in config at top of file */}
        <div className="video-wrap">
          <iframe
            src={`https://www.youtube.com/embed/${YT_VIDEO_ID}`}
            title="How Online Surveys Work"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </Sec>

    <hr className="div" />

    {/* WHAT ARE SURVEYS */}
    <Sec id="what">
      <span className="tag">Section 1</span>
      <h2 style={{ marginBottom: "0.9rem" }}>What are online surveys?</h2>
      {/* EDIT: Your own explanation — 2–3 paragraphs */}
      <p style={{ maxWidth: "680px", marginBottom: "1rem" }}>
        Companies and research firms pay to collect opinions from real people. Instead of hiring
        market researchers, they use survey platforms to reach regular users who share their
        thoughts on products, services, and everyday habits.
      </p>
      <p style={{ maxWidth: "680px", marginBottom: "2rem" }}>
        As a participant, you sign up on these platforms, complete surveys that match your profile,
        and earn rewards — usually points that convert to cash, gift cards, or mobile money.
      </p>
      {/* PLACE SCREENSHOT OF SURVEY PLATFORM DASHBOARD HERE */}
      <ScreenshotSlot
        label="PLACE SCREENSHOT OF SURVEY PLATFORM DASHBOARD HERE"
        hint="e.g. a screenshot showing the survey list or earnings dashboard"
      />
    </Sec>

    <hr className="div" />

    {/* HOW PAYMENT WORKS */}
    <Sec id="payment">
      <span className="tag">Section 2</span>
      <h2 style={{ marginBottom: "0.9rem" }}>How do platforms pay you?</h2>
      {/* EDIT: Your own explanation */}
      <p style={{ maxWidth: "680px", marginBottom: "1.5rem" }}>
        Most platforms use a points system. Every completed survey adds points to your account,
        which you redeem for PayPal, bank transfer, or mobile money once you hit the minimum
        withdrawal threshold. Payment timelines vary — typically 3 to 14 days after a request.
      </p>
      <div className="g3">
        {/* EDIT: These 3 cards */}
        {[
          { icon: "⭐", title: "Points System",      body: "Earn points per survey. Redeem when you hit the minimum payout amount." },
          { icon: "💳", title: "Cash Withdrawals",   body: "Most platforms support PayPal, bank transfer, or mobile money." },
          { icon: "⏱️", title: "Realistic Timelines", body: "Consistent daily effort matters more than speed. Set realistic expectations." },
        ].map((c, i) => (
          <div className="card" key={i}>
            <div style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>{c.icon}</div>
            <h3 style={{ marginBottom: "0.4rem" }}>{c.title}</h3>
            <p style={{ fontSize: "0.87rem" }}>{c.body}</p>
          </div>
        ))}
      </div>
    </Sec>

    <hr className="div" />

    {/* MYTHS VS REALITY */}
    <Sec id="myths">
      <span className="tag">Section 3</span>
      <h2 style={{ marginBottom: "0.8rem" }}>Common myths — and the truth</h2>
      <p style={{ maxWidth: "580px", marginBottom: "2rem" }}>
        There's a lot of misinformation online. Here is an honest look at what surveys can and cannot do.
      </p>
      {/* EDIT: Myths and realities below */}
      <div className="g3">
        {[
          {
            myth: "You can replace a full-time income with surveys alone.",
            real: "Surveys work best as a side income. Results depend on consistency and platform choice."
          },
          {
            myth: "All survey websites are scams.",
            real: "Many are legitimate. The key is knowing which platforms are trustworthy — that's what the guide covers."
          },
          {
            myth: "You get paid for every survey you start.",
            real: "Platforms screen participants. You earn only when you qualify and complete a full survey."
          },
        ].map((m, i) => (
          <div className="myth" key={i}>
            <div className="myth-top"><div className="myth-lbl r">✗ Myth</div><p>{m.myth}</p></div>
            <div className="myth-bottom"><div className="myth-lbl g">✓ Reality</div><p>{m.real}</p></div>
          </div>
        ))}
      </div>
    </Sec>

    {/* NEXT CTA */}
    <Sec sm>
      <div className="cta-band">
        <h2>Want to get started?</h2>
        <p>Read our short guide, then reach out directly on WhatsApp for personal support.</p>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn btn-green btn-lg" onClick={() => go("get-started")}>How to Get Started →</button>
          <WaBtn label="Get Access Now" size="lg" />
        </div>
      </div>
    </Sec>
  </>
);

// ─────────────────────────────────────────────────────────────
// PAGE: GET STARTED
// ─────────────────────────────────────────────────────────────
const GetStarted = () => (
  <>
    <div className="ph">
      <div className="wrap">
        <span className="tag">Get Started</span>
        <h1>How to Get Started</h1>
        <p>Everything you need to know before your first survey — in plain language.</p>
      </div>
    </div>

    <Sec>
      {/* EDIT: 2–3 paragraphs ONLY. This is a funnel — keep it focused. */}
      <div style={{ maxWidth: "660px", margin: "0 auto" }}>
        <p style={{ marginBottom: "1.25rem", fontSize: "1rem" }}>
          {/* EDIT: Paragraph 1 */}
          Getting started with online surveys doesn't require any technical skills or upfront investment.
          All you need is a smartphone or computer, an email address, and the willingness to be consistent.
          The biggest mistake beginners make is joining random platforms without guidance — which leads to
          wasted time and very little to show for it.
        </p>
        <p style={{ marginBottom: "1.25rem", fontSize: "1rem" }}>
          {/* EDIT: Paragraph 2 */}
          That's exactly why this guide exists. Instead of figuring it out alone, you get direct access
          to platforms that actually pay, a clear setup process, and someone available on WhatsApp to
          answer your questions in real time.
        </p>
        <p style={{ fontSize: "1rem" }}>
          {/* EDIT: Paragraph 3 — optional, delete if not needed */}
          If you're ready to take that first step, tap the button below. You'll be connected directly
          and walked through everything at your own pace — no pressure, no rush.
        </p>
      </div>

      {/* PLACE SCREENSHOT OF SURVEY WEBSITE HERE */}
      <div style={{ maxWidth: "660px", margin: "2.5rem auto 0" }}>
        <ScreenshotSlot
          label="PLACE SCREENSHOT OF SURVEY WEBSITE HERE"
          hint="e.g. homepage or sign-up page of the recommended platform"
        />
      </div>
    </Sec>

    {/* WHATSAPP CTA — the only real action on this page */}
    <Sec sm>
      <div className="cta-band" style={{ maxWidth: "580px", margin: "0 auto" }}>
        <h2>Ready? Let's talk.</h2>
        {/* EDIT: Adjust this message to match your style */}
        <p>
          Send a message on WhatsApp and get personal, step-by-step guidance to begin.
          Response time is usually within a few hours.
        </p>
        {/* Preset WhatsApp message for this page */}
        <WaBtn
          label="Start on WhatsApp"
          size="lg"
          msg={encodeURIComponent("Hi! I've read through the site and I'm ready to get started with online surveys. Please guide me.")}
        />
      </div>
    </Sec>
  </>
);

// ─────────────────────────────────────────────────────────────
// PAGE: TESTIMONIALS
// ─────────────────────────────────────────────────────────────

// EDIT: Replace ALL placeholder data with real testimonials before publishing
const TESTIS = [
  { name: "[Name]", role: "[Location]", quote: "Replace with a real testimonial. Specific and genuine works better than vague praise.", stars: 5 },
  { name: "[Name]", role: "[Location]", quote: "Replace with a real testimonial. Mention the platform used or how long it took.", stars: 5 },
  { name: "[Name]", role: "[Location]", quote: "Replace with a real testimonial. A mix of honest reviews builds more trust.", stars: 4 },
  { name: "[Name]", role: "[Location]", quote: "Replace with a real testimonial. What changed for this person after getting the guide?", stars: 5 },
  { name: "[Name]", role: "[Location]", quote: "Replace with a real testimonial. Short and authentic is better than long and vague.", stars: 5 },
  { name: "[Name]", role: "[Location]", quote: "Replace with a real testimonial. What were they struggling with before?", stars: 4 },
];

const Testimonials = () => (
  <>
    <div className="ph">
      <div className="wrap">
        <span className="tag">Proof</span>
        {/* EDIT: Page title */}
        <h1>What People Are Saying</h1>
        {/* EDIT: Short page description */}
        <p>Real feedback from people who followed the guide and got started.</p>
      </div>
    </div>

    {/* TESTIMONIAL CARDS — REPLACE WITH REAL TESTIMONIALS */}
    <Sec>
      <div className="g3">
        {TESTIS.map((t, i) => <TestiCard key={i} {...t} />)}
      </div>
    </Sec>

    <hr className="div" />

    {/* PAYMENT PROOF SCREENSHOTS */}
    <Sec id="proof">
      <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
        <span className="tag">Payment Proof</span>
        {/* EDIT: Proof section title */}
        <h2>Proof of earnings</h2>
        {/* EDIT: Short intro text */}
        <p style={{ maxWidth: "460px", margin: "0.5rem auto 0" }}>
          Real screenshots showing successful payouts. Replace the boxes below with your own images.
        </p>
      </div>
      <div className="g3">
        {/* PLACE PAYMENT PROOF SCREENSHOT HERE */}
        <ScreenshotSlot label="PAYMENT PROOF SCREENSHOT" hint="e.g. payment confirmation email or app notification" />
        {/* PLACE WITHDRAWAL PROOF SCREENSHOT HERE */}
        <ScreenshotSlot label="WITHDRAWAL PROOF SCREENSHOT" hint="e.g. bank alert or mobile money receipt" />
        {/* OPTIONAL 3RD PROOF SCREENSHOT */}
        <ScreenshotSlot label="ADDITIONAL PROOF (OPTIONAL)" hint="e.g. earnings dashboard or account balance" />
      </div>
    </Sec>

    {/* BOTTOM CTA */}
    <Sec sm>
      <div className="cta-band">
        <h2>Convinced? Let's get you started.</h2>
        {/* EDIT: CTA text */}
        <p>Reach out on WhatsApp and we'll guide you through the process personally.</p>
        <WaBtn label="Get Access on WhatsApp" size="lg" />
      </div>
    </Sec>
  </>
);

// ─────────────────────────────────────────────────────────────
// SCROLL TO TOP ON PAGE CHANGE
// ─────────────────────────────────────────────────────────────
const useScrollTop = (page) => {
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);
};

// ─────────────────────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  useScrollTop(page);
  const go = (p) => setPage(p);

  const Page = () => {
    switch (page) {
      case "home":         return <Home go={go} />;
      case "how-it-works": return <HowItWorks go={go} />;
      case "testimonials": return <Testimonials />;
      case "get-started":  return <GetStarted />;
      default:             return <Home go={go} />;
    }
  };

  return (
    <>
      <GlobalStyles />
      <Navbar page={page} go={go} />
      <main style={{ paddingTop: "60px" }} id="main-content">
        <style>{`@media(max-width:640px){#main-content{padding-top:80px}}`}</style>
        <Page />
      </main>
      <Footer go={go} />
    </>
  );
}
