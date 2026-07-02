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
const HEADER = ["Department", "Category", "Capability", "Description", ...TOOL_NAMES];
const ALL_CATEGORIES = [...new Set(CAPABILITIES.map((c) => c.category))].sort();

function csvEscape(v) {
  return `"${String(v).replace(/"/g, '""')}"`;
}

export default function CapabilityForm({ onClose }) {
  const [form, setForm] = useState({
    capability: "",
    department: "",
    category: "",
    description: "",
  });
  const [tools, setTools] = useState(() => new Set());
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null); // { mode: "server" | "local" }

  const catSuggestions = useMemo(() => {
    const forDept = form.department && CATEGORIES_BY_DEPARTMENT[form.department];
    return forDept && forDept.length ? forDept : ALL_CATEGORIES;
  }, [form.department]);

  const valid =
    form.capability.trim() && form.department.trim() && form.description.trim();

  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const toggleTool = (name) =>
    setTools((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });

  const buildRow = () => [
    form.department.trim(),
    form.category.trim(),
    form.capability.trim(),
    form.description.trim(),
    ...TOOL_NAMES.map((n) => (tools.has(n) ? "X" : "")),
  ];

  const downloadCsv = () => {
    const row = buildRow();
    const csv = [HEADER.map(csvEscape).join(","), row.map(csvEscape).join(",")].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "new-capability.csv";
    a.click();
    URL.revokeObjectURL(url);
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
    let mode = "local";
    try {
      const res = await fetch("/api/add-capability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, tools: [...tools] }),
      });
      if (res.ok && (await res.json()).ok) mode = "server";
    } catch {
      /* no local endpoint — fall back */
    }
    if (mode === "local") {
      downloadCsv();
      copyRow();
    }
    setResult({ mode });
    setSubmitting(false);
  };

  const title = result ? "Thanks for sharing" : "Share how you AI";
  const subtitle = result
    ? undefined
    : "Add a capability to the finder. Fields marked * are required.";

  return (
    <Modal title={title} subtitle={subtitle} onClose={onClose}>
      {result ? (
        <div className="cfm-done">
          <div className="cfm-done__icon" aria-hidden="true">
            {result.mode === "server" ? "✅" : "📋"}
          </div>
          {result.mode === "server" ? (
            <>
              <p className="cfm-done__title">Added to the spreadsheet</p>
              <p className="cfm-done__sub">
                “{form.capability}” was written to <code>ai_automation_master.xlsx</code>.
                Run <code>publish-changes.bat</code> to put it on the live site.
              </p>
            </>
          ) : (
            <>
              <p className="cfm-done__title">Your capability is ready to add</p>
              <p className="cfm-done__sub">
                It's been <strong>downloaded as a CSV</strong> and{" "}
                <strong>copied to your clipboard</strong>. Paste it as a new row on
                the <strong>Capabilities</strong> tab of{" "}
                <code>ai_automation_master.xlsx</code> (or send it to the site
                owner), then publish.
              </p>
              <div className="cfm-done__actions">
                <Button variant="secondary" size="sm" onClick={downloadCsv}>
                  Download CSV again
                </Button>
                <Button variant="secondary" size="sm" onClick={copyRow}>
                  Copy row again
                </Button>
              </div>
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
          <label className="lt-field">
            <span className="lt-field__label">Capability / Task *</span>
            <input
              className="lt-input"
              value={form.capability}
              onChange={upd("capability")}
              placeholder="e.g. Draft release notes"
              required
            />
          </label>

          <div className="cfm__grid">
            <label className="lt-field">
              <span className="lt-field__label">Department *</span>
              <input
                className="lt-input"
                list="cfm-departments"
                value={form.department}
                onChange={upd("department")}
                placeholder="e.g. Product Management"
                required
              />
              <datalist id="cfm-departments">
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d} />
                ))}
              </datalist>
            </label>

            <label className="lt-field">
              <span className="lt-field__label">Category</span>
              <input
                className="lt-input"
                list="cfm-categories"
                value={form.category}
                onChange={upd("category")}
                placeholder="e.g. Execution"
              />
              <datalist id="cfm-categories">
                {catSuggestions.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </label>
          </div>

          <label className="lt-field">
            <span className="lt-field__label">Description *</span>
            <textarea
              className="lt-input cfm__textarea"
              value={form.description}
              onChange={upd("description")}
              placeholder="One line on what this automates"
              rows={2}
              required
            />
          </label>

          <div className="lt-field">
            <span className="lt-field__label">
              AI tools enabled ({tools.size} selected)
            </span>
            <div className="cfm__tools">
              {AVAILABLE.map((t) => (
                <label
                  key={t.name}
                  className={`cfm__tool${tools.has(t.name) ? " cfm__tool--on" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={tools.has(t.name)}
                    onChange={() => toggleTool(t.name)}
                  />
                  <span aria-hidden="true">{t.icon}</span> {t.name}
                </label>
              ))}
            </div>
          </div>

          <div className="cfm__actions">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="accent" disabled={!valid || submitting}>
              {submitting ? "Submitting…" : "Submit capability"}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
