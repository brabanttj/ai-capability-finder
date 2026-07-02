import { useEffect, useState } from "react";
import { CAPABILITIES, DEPARTMENTS, TOOLS } from "../data/automationCapabilities.js";
import CapabilityForm from "./CapabilityForm.jsx";
import RequestForm from "./RequestForm.jsx";
import "./InteractiveHero.css";

/* Each word begins its own sentence, revealed on hover/focus. */
const WORDS = [
  { text: "This", accent: "var(--lt-blue)", frag: "This is the living map of AI capabilities across every team." },
  { text: "is", accent: "var(--lt-teal)", frag: "Is it approved? Each capability shows the tools enabled for it." },
  { text: "how", accent: "var(--lt-green)", frag: "How do you become AI-first? Start here." },
  { text: "I", accent: "var(--lt-teal-darken)", frag: "I match your task to the AI tools that already do it — docs included." },
  { text: "AI", accent: "var(--lt-green-vivid)", frag: "AI you can actually use today — and share how you use it." },
];

/* Animated count-up (0 → target) with an ease-out; respects reduced motion. */
function CountUp({ to, duration = 1200 }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setN(to);
      return undefined;
    }
    let raf;
    let start;
    const step = (ts) => {
      if (start === undefined) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return <>{n}</>;
}

function useTypewriter(text, on, speed = 18) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!on || !text) {
      setOut("");
      return;
    }
    let i = 0;
    setOut("");
    const id = setInterval(() => {
      i += 1;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, on, speed]);
  return out;
}

export default function InteractiveHero() {
  const [active, setActive] = useState(null);
  const [engaged, setEngaged] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);
  const typed = useTypewriter(active != null ? WORDS[active].frag : "", active != null);
  const toolsAvail = TOOLS.filter((t) => t.available).length;

  // Auto-highlight each word in sentence order (showing its reveal, like hover)
  // until the user interacts.
  useEffect(() => {
    if (engaged) return undefined;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }
    let i = 0;
    setActive(0);
    const id = setInterval(() => {
      i = (i + 1) % WORDS.length;
      setActive(i);
    }, 3200);
    return () => clearInterval(id);
  }, [engaged]);

  const set = (i) => {
    setEngaged(true);
    setActive(i);
  };
  const clear = (i) => setActive((a) => (a === i ? null : a));

  return (
    <section className="hero" aria-label="This is how I AI">
      <div className="hero__inner">
        <h1 className="hero__title">
          {WORDS.map((w, i) => (
            <span
              key={w.text}
              className={`hw${active === i ? " hw--on" : ""}`}
              style={{ "--accent": w.accent }}
              tabIndex={0}
              role="button"
              aria-label={w.frag}
              onMouseEnter={() => set(i)}
              onMouseLeave={() => clear(i)}
              onFocus={() => set(i)}
              onBlur={() => clear(i)}
              onClick={() => {
                setEngaged(true);
                setActive((a) => (a === i ? null : i));
              }}
            >
              {w.text}
            </span>
          ))}
          <span className="hero__period">.</span>
        </h1>

        <p
          className={`hero__reveal${active != null ? " hero__reveal--on" : ""}`}
          style={active != null ? { color: WORDS[active].accent } : undefined}
          aria-live="polite"
        >
          {active != null ? (
            <>
              {typed}
              <span className="hero__caret" />
            </>
          ) : null}
        </p>

        <div className="hero__cta">
          <button
            type="button"
            className="hero__share"
            onClick={() => setFormOpen(true)}
          >
            <span className="hero__share-ic" aria-hidden="true">✦</span>
            Share how you AI
          </button>
          <button
            type="button"
            className="hero__request"
            onClick={() => setRequestOpen(true)}
          >
            Request a capability
          </button>
        </div>

        <div className="hero__stats">
          {[
            { value: CAPABILITIES.length, label: "capabilities", color: "var(--lt-blue)" },
            { value: DEPARTMENTS.length, label: "departments", color: "var(--lt-teal)" },
            { value: toolsAvail, label: "AI tools", color: "var(--lt-green)" },
          ].map((s) => (
            <div className="hero__stat" key={s.label} style={{ "--stat": s.color }}>
              <span className="hero__stat-num">
                <CountUp to={s.value} />
              </span>
              <span className="hero__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {formOpen && <CapabilityForm onClose={() => setFormOpen(false)} />}
      {requestOpen && <RequestForm onClose={() => setRequestOpen(false)} />}
    </section>
  );
}
