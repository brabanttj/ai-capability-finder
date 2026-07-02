import { useEffect, useState } from "react";
import { CAPABILITIES, DEPARTMENTS, TOOLS } from "../data/automationCapabilities.js";
import CapabilityForm from "./CapabilityForm.jsx";
import RequestForm from "./RequestForm.jsx";
import "./InteractiveHero.css";

/* Each word begins its own sentence, revealed on hover/focus. */
const WORDS = [
  { text: "This", accent: "var(--lt-blue)", frag: "This is the living map of AI capabilities across every team." },
  { text: "is", accent: "var(--lt-teal)", frag: "Is it approved? Each capability shows the tools enabled for it." },
  { text: "how", accent: "var(--lt-green)", frag: "How your teams turn AI into everyday work." },
  { text: "I", accent: "var(--lt-teal-darken)", frag: "I point you to the right capability — and its docs." },
  { text: "AI", accent: "var(--lt-green-vivid)", frag: "AI you can actually use today — and share how you use it." },
];

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
  const [hint, setHint] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);
  const typed = useTypewriter(active != null ? WORDS[active].frag : "", active != null);
  const toolsAvail = TOOLS.filter((t) => t.available).length;

  // Auto-cycle a color "wave" across the words until the user interacts.
  useEffect(() => {
    if (engaged) return undefined;
    const id = setInterval(
      () => setHint((h) => (h + 1) % (WORDS.length + 2)),
      850
    );
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
              className={`hw${active === i ? " hw--on" : ""}${
                !engaged && hint === i ? " hw--hint" : ""
              }`}
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
          {CAPABILITIES.length} capabilities · {DEPARTMENTS.length} departments ·{" "}
          {toolsAvail} AI tools
        </div>
      </div>

      {formOpen && <CapabilityForm onClose={() => setFormOpen(false)} />}
      {requestOpen && <RequestForm onClose={() => setRequestOpen(false)} />}
    </section>
  );
}
