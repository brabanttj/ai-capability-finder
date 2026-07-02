import { useState } from "react";
import { DEPARTMENTS } from "../data/automationCapabilities.js";
import { Modal, Button } from "../components/ui/index.js";
import "./CapabilityForm.css";

const HEADER = ["Submitted", "Request", "Department", "Details"];
const csvEscape = (v) => `"${String(v).replace(/"/g, '""')}"`;

export default function RequestForm({ onClose }) {
  const [form, setForm] = useState({ request: "", department: "", details: "" });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const valid = form.request.trim();
  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const buildRow = () => [
    new Date().toISOString().slice(0, 10),
    form.request.trim(),
    form.department.trim(),
    form.details.trim(),
  ];
  const downloadCsv = () => {
    const csv = [HEADER.map(csvEscape).join(","), buildRow().map(csvEscape).join(",")].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "capability-request.csv";
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
      const res = await fetch("/api/request-capability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok && (await res.json()).ok) mode = "server";
    } catch {
      /* fall back */
    }
    if (mode === "local") {
      downloadCsv();
      copyRow();
    }
    setResult({ mode });
    setSubmitting(false);
  };

  return (
    <Modal
      title={result ? "Request received" : "Request a capability"}
      subtitle={
        result
          ? undefined
          : "Wish AI could do something that isn't here yet? Tell us — it helps prioritize what to enable next."
      }
      onClose={onClose}
    >
      {result ? (
        <div className="cfm-done">
          <div className="cfm-done__icon" aria-hidden="true">
            {result.mode === "server" ? "✅" : "📋"}
          </div>
          {result.mode === "server" ? (
            <>
              <p className="cfm-done__title">Logged to the backlog</p>
              <p className="cfm-done__sub">
                “{form.request}” was added to the <strong>Requests</strong> tab of
                the master workbook for the team to review.
              </p>
            </>
          ) : (
            <>
              <p className="cfm-done__title">Your request is ready to send</p>
              <p className="cfm-done__sub">
                It's been <strong>downloaded</strong> and <strong>copied to your
                clipboard</strong>. Send it to the site owner (or paste it into the
                Requests tab of the workbook) so it can be prioritized.
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
          <label className="lt-field">
            <span className="lt-field__label">What do you wish AI could do? *</span>
            <input
              className="lt-input"
              value={form.request}
              onChange={upd("request")}
              placeholder="e.g. Auto-summarize weekly team standups"
              required
            />
          </label>

          <label className="lt-field">
            <span className="lt-field__label">Your department</span>
            <select
              className="lt-select"
              value={form.department}
              onChange={upd("department")}
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
            <span className="lt-field__label">Details</span>
            <textarea
              className="lt-input cfm__textarea"
              value={form.details}
              onChange={upd("details")}
              placeholder="What's the task, and how would AI help?"
              rows={3}
            />
          </label>

          <div className="cfm__actions">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="accent" disabled={!valid || submitting}>
              {submitting ? "Sending…" : "Submit request"}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
