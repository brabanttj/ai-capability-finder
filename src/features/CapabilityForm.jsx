import { useMemo, useState } from "react";
import {
  DEPARTMENTS,
  CATEGORIES_BY_DEPARTMENT,
  CAPABILITIES,
  TOOLS,
} from "../data/automationCapabilities.js";
import { Modal, Button } from "../components/ui/index.js";
import "./CapabilityForm.css";

const AVAILABLE = TOOLS.filter((t) => t.available);
const TOOL_NAMES = TOOLS.map((t) => t.name);
const HEADER = ["Department", "Category", "Capability", "Author", "URL", ...TOOL_NAMES];
// Existing capabilities for the picker (sorted by department, then name)
const EXISTING = [...CAPABILITIES].sort(
  (a, b) =>
    a.department.localeCompare(b.department) ||
    a.capability.localeCompare(b.capability)
);
const keyOf = (c) => `${c.department}||${c.capability}`;

const csvEscape = (v) => `"${String(v).replace(/"/g, '""')}"`;

export default function CapabilityForm({ onClose }) {
  const [mode, setMode] = useState("existing"); // "existing" | "new"
  const [existingKey, setExistingKey] = useState("");
  const [form, setForm] = useState({
    capability: "",
    department: "",
    category: "",
  });
  const [tool, setTool] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const chosen = useMemo(
    () => EXISTING.find((c) => keyOf(c) === existingKey) || null,
    [existingKey]
  );

  // Effective capability fields (from picker or the new-capability form)
  const eff =
    mode === "existing" && chosen
      ? {
          department: chosen.department,
          category: chosen.category,
          capability: chosen.capability,
        }
      : {
          department: form.department.trim(),
          category: form.category.trim(),
          capability: form.capability.trim(),
        };

  // Category choices are constrained to the taxonomy for the chosen department.
  const catOptions = CATEGORIES_BY_DEPARTMENT[form.department] || [];

  const baseValid = author.trim() && url.trim() && tool;
  const valid =
    mode === "existing"
      ? Boolean(chosen) && baseValid
      : eff.capability && eff.department && eff.category && baseValid;

  const updForm = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const buildRow = () => [
    eff.department,
    eff.category,
    eff.capability,
    author.trim(),
    url.trim(),
    ...TOOL_NAMES.map((n) => (n === tool ? "X" : "")),
  ];
  const downloadCsv = () => {
    const csv = [HEADER.map(csvEscape).join(","), buildRow().map(csvEscape).join(",")].join("\n");
    const dl = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = dl;
    a.download = "capability-guide.csv";
    a.click();
    URL.revokeObjectURL(dl);
  };
  const copyRow = async () => {
    try {
      await navigator.clipboard.writeText(buildRow().join("\t"));
    } catch {
      /* clipboard blocked */
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!valid || submitting) return;
    setSubmitting(true);
    const payload = { ...eff, tools: [tool], author: author.trim(), url: url.trim() };
    let outcome = "local";
    try {
      const res = await fetch("/api/add-capability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const j = await res.json();
        if (j.ok) outcome = j.added ? "created" : "added";
      }
    } catch {
      /* fall back */
    }
    if (outcome === "local") {
      downloadCsv();
      copyRow();
    }
    setResult({ outcome });
    setSubmitting(false);
  };

  const done = Boolean(result);

  return (
    <Modal
      title={done ? "Thanks for sharing" : "Share how you AI"}
      subtitle={
        done
          ? undefined
          : "Add your way of using an AI tool. Fields marked * are required."
      }
      onClose={onClose}
    >
      {done ? (
        <div className="cfm-done">
          <div className="cfm-done__icon" aria-hidden="true">
            {result.outcome === "local" ? "📋" : "✅"}
          </div>
          {result.outcome === "created" && (
            <>
              <p className="cfm-done__title">New capability created</p>
              <p className="cfm-done__sub">
                “{eff.capability}” was added with your guide. Run{" "}
                <code>publish-changes.bat</code> to put it on the live site.
              </p>
            </>
          )}
          {result.outcome === "added" && (
            <>
              <p className="cfm-done__title">Your guide was added</p>
              <p className="cfm-done__sub">
                Your way of using {tool} for “{eff.capability}” is now listed.
                Run <code>publish-changes.bat</code> to publish.
              </p>
            </>
          )}
          {result.outcome === "local" && (
            <>
              <p className="cfm-done__title">Your guide is ready to add</p>
              <p className="cfm-done__sub">
                It's been <strong>downloaded</strong> and <strong>copied to your
                clipboard</strong>. Send it to the site owner (or paste it into
                the workbook), then publish.
              </p>
            </>
          )}
          <div className="cfm-done__actions">
            <Button variant="primary" onClick={onClose}>
              Done
            </Button>
          </div>
        </div>
      ) : (
        <form className="cfm" onSubmit={handleSubmit}>
          <div className="cfm__tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={mode === "existing"}
              className={`cfm__tab${mode === "existing" ? " cfm__tab--on" : ""}`}
              onClick={() => setMode("existing")}
            >
              Add to an existing capability
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "new"}
              className={`cfm__tab${mode === "new" ? " cfm__tab--on" : ""}`}
              onClick={() => setMode("new")}
            >
              Create a new capability
            </button>
          </div>

          {mode === "existing" ? (
            <label className="lt-field">
              <span className="lt-field__label">Capability *</span>
              <select
                className="lt-select"
                value={existingKey}
                onChange={(e) => setExistingKey(e.target.value)}
                required
              >
                <option value="">Choose a capability…</option>
                {EXISTING.map((c) => (
                  <option key={keyOf(c)} value={keyOf(c)}>
                    {c.department} · {c.capability}
                  </option>
                ))}
              </select>
              {chosen && (
                <span className="cfm__hint">
                  {chosen.department} · {chosen.category}
                </span>
              )}
            </label>
          ) : (
            <>
              <label className="lt-field">
                <span className="lt-field__label">Capability / Task *</span>
                <input
                  className="lt-input"
                  value={form.capability}
                  onChange={updForm("capability")}
                  placeholder="e.g. Draft release notes"
                  required
                />
              </label>
              <div className="cfm__grid">
                <label className="lt-field">
                  <span className="lt-field__label">Department *</span>
                  <select
                    className="lt-select"
                    value={form.department}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, department: e.target.value, category: "" }))
                    }
                    required
                  >
                    <option value="">Choose a department…</option>
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="lt-field">
                  <span className="lt-field__label">Category *</span>
                  <select
                    className="lt-select"
                    value={form.category}
                    onChange={updForm("category")}
                    disabled={!form.department}
                    required
                  >
                    <option value="">
                      {form.department ? "Choose a category…" : "Pick a department first"}
                    </option>
                    {catOptions.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </>
          )}

          <div className="lt-field">
            <span className="lt-field__label">AI tool you use for this *</span>
            <div className="cfm__tools">
              {AVAILABLE.map((t) => (
                <label
                  key={t.name}
                  className={`cfm__tool${tool === t.name ? " cfm__tool--on" : ""}`}
                >
                  <input
                    type="radio"
                    name="cfm-tool"
                    checked={tool === t.name}
                    onChange={() => setTool(t.name)}
                  />
                  <span aria-hidden="true">{t.icon}</span> {t.name}
                </label>
              ))}
            </div>
          </div>

          <div className="cfm__grid">
            <label className="lt-field">
              <span className="lt-field__label">Your name *</span>
              <input
                className="lt-input"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Jon Smith"
                required
              />
            </label>
            <label className="lt-field">
              <span className="lt-field__label">Link to your guide *</span>
              <input
                className="lt-input"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://…"
                required
              />
            </label>
          </div>

          <div className="cfm__actions">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="accent" disabled={!valid || submitting}>
              {submitting ? "Submitting…" : "Submit"}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
