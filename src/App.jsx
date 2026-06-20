import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./HomePage";
import TragediesPage from "./TragediesPage";

// NOTE: This file wraps everything in <BrowserRouter>. If your main.jsx
// already wraps <App /> in a <BrowserRouter>, remove the one below to avoid
// a "nested router" warning — only one BrowserRouter should exist per app.

export default function App() {
  return (
    <BrowserRouter>
      {/* Global styles — design tokens (CSS vars), reset, fonts, and the
          small set of utility classes (.btn-primary, .btn-ghost, .nav-link,
          .footer-link, .glass-panel, .sr-only) shared by every page. */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap');

        :root {
          --c-bg: #131314;
          --c-surface-lowest: #0e0e0f;
          --c-surface-low: #1c1b1c;
          --c-surface: #201f20;
          --c-surface-high: #2a2a2b;
          --c-surface-highest: #353436;
          --c-on-surface: #e5e2e3;
          --c-on-surface-variant: #bacbbc;
          --c-primary: #bbffd1;
          --c-primary-container: #14f195;
          --c-on-primary-container: #00693d;
          --c-secondary: #b9f1ff;
          --c-secondary-container: #00e0ff;
          --c-error: #ffb4ab;
          --c-outline: #849587;
          --c-outline-variant: #3b4a3f;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background: var(--c-bg); color: var(--c-on-surface);
          -webkit-font-smoothing: antialiased; overflow-x: hidden; width: 100%;
        }

        ::selection { background: rgba(20,241,149,0.3); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--c-bg); }
        ::-webkit-scrollbar-thumb { background: var(--c-primary-container); border-radius: 2px; }

        .sr-only {
          position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
          overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
        }

        .glass-panel {
          background: rgba(19,19,20,0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
        }

        @keyframes drainFlow { from { background-position: 0 0; } to { background-position: 0 200px; } }
        @keyframes blink { 0% { opacity: 0.2; } 50% { opacity: 1; } 100% { opacity: 0.2; } }

        .nav-link:hover { color: var(--c-on-surface) !important; }
        .footer-link:hover { color: var(--c-primary) !important; }

        .btn-primary {
          font-family: 'Inter', sans-serif; font-weight: 700; font-size: 12px;
          letter-spacing: 0.08em; text-transform: uppercase;
          background: var(--c-primary-container); color: var(--c-bg);
          border: none; border-radius: 2px; padding: 14px 32px; cursor: pointer;
          box-shadow: 0 0 20px rgba(20,241,149,0.3);
          transition: filter 0.2s, transform 0.15s; min-height: 48px;
        }
        .btn-primary:hover { filter: brightness(1.1); }
        .btn-primary:active { transform: scale(0.96); }

        .btn-ghost {
          font-family: 'Inter', sans-serif; font-weight: 700; font-size: 12px;
          letter-spacing: 0.08em; text-transform: uppercase;
          background: transparent; color: var(--c-on-surface);
          border: 1px solid rgba(255,255,255,0.2); border-radius: 2px;
          padding: 14px 28px; cursor: pointer;
          transition: background 0.2s, transform 0.15s; min-height: 48px;
        }
        .btn-ghost:hover { background: rgba(255,255,255,0.05); }
        .btn-ghost:active { transform: scale(0.96); }
      `}</style>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tragedies" element={<TragediesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}