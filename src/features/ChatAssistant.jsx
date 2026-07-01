import { useMemo, useRef, useState, useEffect } from "react";
import { CAPABILITIES, TOOLS } from "../data/automationCapabilities.js";
import "./ChatAssistant.css";

/* -------------------------------------------------------------------------
   A lightweight, in-browser assistant. It understands a plain-language
   question and searches the capability + tool catalog to recommend the
   best-matching capabilities, the AI tools enabled for them, and doc links.
   No server or API key required — runs entirely in the browser.
   ------------------------------------------------------------------------- */

const STOP = new Set([
  "the","a","an","i","to","for","of","and","how","do","can","could","what",
  "with","my","me","need","want","help","find","is","are","am","in","on","use",
  "using","which","get","please","you","should","would","like","best","tool",
  "tools","ai","that","this","there","about","give","show","some","any","or",
]);

// Expand a few common words so queries hit the catalog wording.
const SYNONYMS = {
  code: ["code", "coding", "development", "engineering", "developer", "programming"],
  coding: ["code", "development"],
  developer: ["code", "development", "engineering"],
  write: ["writing", "content", "draft", "copy"],
  writing: ["content", "draft", "copy"],
  content: ["content", "copy", "writing"],
  copy: ["copy", "content", "microcopy"],
  hire: ["talent", "candidate", "recruit", "resume"],
  hiring: ["talent", "candidate", "recruit", "resume"],
  recruit: ["talent", "candidate", "sourcing", "resume"],
  resume: ["resume", "candidate", "screening"],
  invoice: ["invoice", "processing"],
  reconcile: ["reconciliation", "close"],
  forecast: ["forecasting", "planning", "revenue"],
  budget: ["planning", "forecasting", "finance"],
  report: ["report", "reporting", "dashboard", "analytics"],
  reports: ["report", "reporting", "dashboard"],
  dashboard: ["dashboard", "reporting", "analytics"],
  data: ["data", "analytics", "pipeline", "quality"],
  analytics: ["analytics", "insight", "reporting"],
  customer: ["customer", "support", "client"],
  support: ["support", "incident", "chatbot", "ticket"],
  ticket: ["ticket", "support", "incident"],
  sales: ["sales", "crm", "pipeline", "lead"],
  lead: ["lead", "outreach", "sales"],
  marketing: ["marketing", "campaign", "creative", "ad"],
  legal: ["legal", "contract", "regulatory", "compliance"],
  security: ["security", "threat", "monitoring"],
  design: ["design", "wireframe", "ux", "usability"],
  test: ["test", "qa", "bug"],
  bug: ["bug", "debug", "test"],
  onboard: ["onboarding", "workflows"],
  onboarding: ["onboarding", "workflows"],
};

function tokenize(s) {
  return s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
}
function keywords(s) {
  const base = tokenize(s).filter((w) => !STOP.has(w) && w.length > 1);
  const expanded = new Set(base);
  base.forEach((w) => (SYNONYMS[w] || []).forEach((x) => expanded.add(x)));
  return [...expanded];
}

const toolByName = new Map(TOOLS.map((t) => [t.name, t]));

// Detect which catalog tools a query mentions (by name or a distinctive word).
function mentionedTools(query) {
  const q = query.toLowerCase();
  return TOOLS.filter((t) => {
    const name = t.name.toLowerCase();
    if (q.includes(name)) return true;
    const first = name.split(" ")[0];
    return first.length > 3 && q.includes(first);
  });
}

function scoreCapability(cap, kws) {
  const cap_ = cap.capability.toLowerCase();
  const desc = cap.description.toLowerCase();
  const cat = cap.category.toLowerCase();
  const dept = cap.department.toLowerCase();
  const tools = cap.tools.join(" ").toLowerCase();
  let score = 0;
  for (const k of kws) {
    if (cap_.includes(k)) score += 5;
    if (desc.includes(k)) score += 3;
    if (cat.includes(k)) score += 2;
    if (dept.includes(k)) score += 2;
    if (tools.includes(k)) score += 1;
  }
  return score;
}

function toolsFor(cap) {
  const set = new Set(cap.tools);
  return TOOLS.filter((t) => set.has(t.name));
}

// Build the assistant's reply object: { text, results:[cap], tools:[tool] }
function respond(query) {
  const q = query.trim();
  if (!q) return null;

  const lower = q.toLowerCase();
  if (/^(hi|hey|hello|yo|help|what can you do)\b/.test(lower)) {
    return {
      text:
        "Hi! I can help you find the right capability and the AI tools enabled for it. " +
        "Try asking things like “how do I automate invoices?”, “what can I use for writing content?”, " +
        "or “what is Claude enabled for?”",
    };
  }

  const kws = keywords(q);
  const tools = mentionedTools(q);
  const asksDocs = /\b(doc|docs|documentation|guide|how to use|set up|setup|integrat)/i.test(q);

  // Tool-centric question ("what can I use ChatGPT for", "Claude docs")
  if (tools.length && (kws.length === 0 || asksDocs || /\bwhat\b|\bwhich\b|\benabled\b|\bcan\b/i.test(q))) {
    const t = tools[0];
    const caps = CAPABILITIES.filter((c) => c.tools.includes(t.name));
    if (!t.available) {
      return {
        text: `${t.icon} ${t.name} isn't currently available, so it isn't enabled for any capability.`,
      };
    }
    const text = caps.length
      ? `${t.icon} ${t.name} is enabled for ${caps.length} ${caps.length === 1 ? "capability" : "capabilities"}. Here are the top matches:`
      : `${t.icon} ${t.name} is available, but isn't marked for any capability yet.`;
    return { text, results: caps.slice(0, 5), tools: [t] };
  }

  // Capability search
  const ranked = CAPABILITIES.map((c) => ({ c, s: scoreCapability(c, kws) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 4)
    .map((x) => x.c);

  if (!ranked.length) {
    return {
      text:
        "I couldn't find a matching capability. Try describing the task in different words — " +
        "for example “write product docs”, “detect anomalies in data”, or name a team like “Finance”.",
    };
  }
  return {
    text:
      ranked.length === 1
        ? "Here's the capability that best matches:"
        : `Here are ${ranked.length} capabilities that match. Each shows the AI tools enabled for it — click a tool to open its docs.`,
    results: ranked,
  };
}

function ToolChips({ tools }) {
  if (!tools.length) return <div className="ca-notool">No tools enabled yet</div>;
  return (
    <div className="ca-chips">
      {tools.map((t) =>
        t.docUrl ? (
          <a key={t.name} className="ca-chip" href={t.docUrl} target="_blank" rel="noreferrer">
            <span aria-hidden="true">{t.icon}</span> {t.name} <span className="ca-chip__ext">↗</span>
          </a>
        ) : (
          <span key={t.name} className="ca-chip ca-chip--plain">
            <span aria-hidden="true">{t.icon}</span> {t.name}
          </span>
        )
      )}
    </div>
  );
}

function ResultCard({ cap }) {
  return (
    <div className="ca-result">
      <div className="ca-result__title">{cap.capability}</div>
      <div className="ca-result__meta">
        {cap.department} · {cap.category}
      </div>
      <div className="ca-result__desc">{cap.description}</div>
      <ToolChips tools={toolsFor(cap)} />
    </div>
  );
}

const SUGGESTIONS = [
  "How do I automate invoices?",
  "What can I use for writing content?",
  "Help with code",
  "What is Claude enabled for?",
];

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text:
        "👋 Hi! I'm your capability assistant. Describe what you're trying to do and I'll point you to the right capability, the AI tools enabled for it, and their docs.",
    },
  ]);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (open && bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, open]);

  const send = (textArg) => {
    const text = (textArg ?? input).trim();
    if (!text) return;
    const reply = respond(text);
    setMessages((m) => [...m, { role: "user", text }, { role: "assistant", ...reply }]);
    setInput("");
  };

  return (
    <>
      <button
        className={`ca-fab${open ? " ca-fab--open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close assistant" : "Open capability assistant"}
      >
        {open ? "×" : "💬"}
      </button>

      {open && (
        <div className="ca-panel" role="dialog" aria-label="Capability assistant">
          <div className="ca-header">
            <span className="ca-header__dot" aria-hidden="true">🤖</span>
            <div>
              <div className="ca-header__title">Capability Assistant</div>
              <div className="ca-header__sub">Find capabilities, tools &amp; docs</div>
            </div>
            <button className="ca-header__close" onClick={() => setOpen(false)} aria-label="Close">
              ×
            </button>
          </div>

          <div className="ca-body lt-scroll" ref={bodyRef}>
            {messages.map((m, i) => (
              <div key={i} className={`ca-msg ca-msg--${m.role}`}>
                {m.text && <div className="ca-bubble">{m.text}</div>}
                {m.results?.length > 0 && (
                  <div className="ca-results">
                    {m.results.map((c) => (
                      <ResultCard key={`${c.department}|${c.capability}`} cap={c} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {messages.length <= 1 && (
            <div className="ca-suggest">
              {SUGGESTIONS.map((s) => (
                <button key={s} className="ca-suggest__chip" onClick={() => send(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            className="ca-input"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a task or tool…"
              aria-label="Ask the assistant"
            />
            <button type="submit" aria-label="Send" disabled={!input.trim()}>
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
}
