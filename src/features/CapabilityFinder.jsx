import { useMemo, useState } from "react";
import {
  CAPABILITIES,
  DEPARTMENTS,
  CATEGORIES_BY_DEPARTMENT,
  DEPARTMENT_META,
  TOOLS,
} from "../data/automationCapabilities.js";
import {
  Card,
  Badge,
  Input,
  Select,
  Button,
  Modal,
} from "../components/ui/index.js";
import "./CapabilityFinder.css";

const ALL = "All";
const FALLBACK_META = { icon: "✨", color: "#0069ba" };

export default function CapabilityFinder() {
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState(ALL);
  const [category, setCategory] = useState(ALL);
  const [selected, setSelected] = useState(null);

  // Category options cascade from the selected department
  const categoryOptions = useMemo(() => {
    if (department === ALL) {
      return [ALL, ...new Set(CAPABILITIES.map((c) => c.category))];
    }
    return [ALL, ...(CATEGORIES_BY_DEPARTMENT[department] ?? [])];
  }, [department]);

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return CAPABILITIES.filter((row) => {
      if (department !== ALL && row.department !== department) return false;
      if (category !== ALL && row.category !== category) return false;
      if (q) {
        const hit =
          row.capability.toLowerCase().includes(q) ||
          row.description.toLowerCase().includes(q) ||
          row.category.toLowerCase().includes(q) ||
          row.department.toLowerCase().includes(q);
        if (!hit) return false;
      }
      return true;
    });
  }, [searchTerm, department, category]);

  // Group filtered results by department for display
  const byDepartment = useMemo(() => {
    const map = new Map();
    for (const row of filtered) {
      if (!map.has(row.department)) map.set(row.department, []);
      map.get(row.department).push(row);
    }
    return Array.from(map, ([dept, rows]) => ({ dept, rows }));
  }, [filtered]);

  const onDepartmentChange = (value) => {
    setDepartment(value);
    setCategory(ALL); // reset category when department changes
  };

  const exportToCSV = () => {
    const headers = ["Department", "Category", "Capability / Task", "Description"];
    const lines = [headers.join(",")];
    filtered.forEach((r) =>
      lines.push(
        [r.department, r.category, r.capability, r.description]
          .map((v) => `"${String(v).replace(/"/g, '""')}"`)
          .join(",")
      )
    );
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ai-automation-capabilities.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="cf">
      {/* Hero */}
      <section className="cf-hero">
        <span className="lt-eyebrow">AI Automation Capabilities</span>
        <h1 className="cf-hero__title cf-hero__title--hook">
          This is how I <em>AI</em>.
        </h1>
        <p className="cf-hero__sub">
          Stop guessing. Explore the AI capabilities available across every
          team, see the tools enabled for each — and share how you AI.
        </p>
        <div className="cf-hero__cta">
          <Button
            variant="accent"
            href="how-to-add.html"
            target="_blank"
            rel="noreferrer"
          >
            ➕ Add a capability
          </Button>
          <span className="cf-hero__cta-note">
            Have a way you use AI? Add it to the list.
          </span>
        </div>
        <div className="cf-stats">
          <Stat value={filtered.length} label="Capabilities" />
          <Stat value={DEPARTMENTS.length} label="Departments" />
          <Stat
            value={categoryOptions.length - 1}
            label="Categories"
            tone="green"
          />
        </div>
      </section>

      {/* Toolbar: search + Department + Category */}
      <Card className="cf-toolbar" id="finder">
        <div className="cf-toolbar__grid">
          <Input
            search
            placeholder="Search capabilities, tasks, or descriptions…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search capabilities"
          />
          <Select
            value={department}
            onChange={(e) => onDepartmentChange(e.target.value)}
            aria-label="Filter by department"
          >
            <option value={ALL}>All Departments</option>
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </Select>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by category"
          >
            {categoryOptions.map((c) => (
              <option key={c} value={c}>
                {c === ALL ? "All Categories" : c}
              </option>
            ))}
          </Select>
        </div>
        <div className="cf-toolbar__foot">
          <span className="cf-count">
            <strong>{filtered.length}</strong> capabilit
            {filtered.length === 1 ? "y" : "ies"} found
          </span>
          <Button variant="secondary" size="sm" onClick={exportToCSV}>
            Export to CSV
          </Button>
        </div>
      </Card>

      {/* Results grouped by department */}
      {byDepartment.length === 0 ? (
        <Card className="cf-empty-results">
          <div className="cf-empty__icon" aria-hidden="true">
            🔍
          </div>
          <p className="cf-empty__title">No capabilities match your filters</p>
          <p className="cf-empty__sub">
            Try clearing the search or choosing a different department.
          </p>
        </Card>
      ) : (
        byDepartment.map(({ dept, rows }) => {
          const meta = DEPARTMENT_META[dept] || FALLBACK_META;
          return (
            <section key={dept} className="cf-dept">
              <div className="cf-dept__head">
                <span
                  className="cf-dept__icon"
                  style={{ background: `${meta.color}1a`, color: meta.color }}
                >
                  {meta.icon}
                </span>
                <h2 className="cf-dept__name">{dept}</h2>
                <span className="cf-dept__count">{rows.length}</span>
              </div>
              <div className="cf-grid">
                {rows.map((row) => (
                  <CapabilityCard
                    key={`${row.department}|${row.capability}`}
                    row={row}
                    accent={meta.color}
                    onSelect={() => setSelected(row)}
                  />
                ))}
              </div>
            </section>
          );
        })
      )}

      {selected && (
        <CapabilityModal capability={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

function CapabilityCard({ row, accent, onSelect }) {
  return (
    <Card
      pad={false}
      interactive
      className="cap-card"
      style={{ borderTop: `3px solid ${accent}` }}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      <button
        type="button"
        className="cap-card__tool-btn"
        aria-label={`View tools for ${row.capability}`}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        🔧
      </button>
      <div className="cap-card__body">
        <span className="cap-card__cat">{row.category}</span>
        <h3 className="cap-card__title">{row.capability}</h3>
        <p className="cap-card__desc">{row.description}</p>
      </div>
    </Card>
  );
}

function ToolRow({ tool, enabled }) {
  return (
    <div className={`lt-tool${enabled ? "" : " lt-tool--off"}`}>
      <div className="lt-tool__info">
        <span className="lt-tool__icon">{tool.icon}</span>
        <div>
          <div className="lt-tool__name">{tool.name}</div>
          <div className="lt-tool__cat">{tool.category}</div>
        </div>
      </div>
      <div className="lt-tool__actions">
        {enabled ? (
          <>
            <Badge tone="success">Enabled</Badge>
            {tool.docUrl && (
              <Button
                variant="primary"
                size="sm"
                href={tool.docUrl}
                target="_blank"
                rel="noreferrer"
              >
                View docs ↗
              </Button>
            )}
          </>
        ) : (
          <Badge tone="neutral">Not enabled</Badge>
        )}
      </div>
    </div>
  );
}

function CapabilityModal({ capability, onClose }) {
  const meta = DEPARTMENT_META[capability.department] || FALLBACK_META;
  const enabledNames = new Set(capability.tools);
  const enabledTools = TOOLS.filter((t) => enabledNames.has(t.name));

  return (
    <Modal
      title={capability.capability}
      subtitle={`${meta.icon} ${capability.department} · ${capability.category}`}
      onClose={onClose}
    >
      <section className="cm-section">
        <h4 className="cm-section__title">Description</h4>
        <p className="cm-desc">{capability.description}</p>
      </section>

      <section className="cm-section">
        <h4 className="cm-section__title">
          Enabled AI tools for this capability{" "}
          <span className="cm-count">{enabledTools.length}</span>
        </h4>
        {enabledTools.length > 0 ? (
          <div className="cm-tools">
            {enabledTools.map((tool) => (
              <ToolRow key={tool.name} tool={tool} enabled />
            ))}
          </div>
        ) : (
          <p className="cm-desc">No AI tools are enabled for this capability yet.</p>
        )}
      </section>

      <section className="cm-callout">
        <strong>💡 How to use enabled tools</strong>
        <ol>
          <li>Pick an enabled AI tool from the list above.</li>
          <li>Click <em>View docs</em> to open its integration guide.</li>
          <li>Follow the setup steps for your use case.</li>
          <li>Start automating this capability.</li>
        </ol>
      </section>
    </Modal>
  );
}

function Stat({ value, label, tone }) {
  return (
    <div className="cf-stat">
      <span
        className={`cf-stat__value${tone === "green" ? " cf-stat__value--green" : ""}`}
      >
        {value}
      </span>
      <span className="cf-stat__label">{label}</span>
    </div>
  );
}
