import { useMemo, useState } from "react";
import {
  CAPABILITIES,
  DEPARTMENTS,
  CATEGORIES_BY_DEPARTMENT,
  DEPARTMENT_META,
  TOOLS,
  REQUESTS,
} from "../data/automationCapabilities.js";
import {
  Card,
  Badge,
  Input,
  Select,
  Button,
  Modal,
} from "../components/ui/index.js";
import InteractiveHero from "./InteractiveHero.jsx";
import RequestsBoard from "./RequestsBoard.jsx";
import { usageId, baseCount, loadVoted, saveVoted } from "../lib/votes.js";
import "./CapabilityFinder.css";

const ALL = "All";
const FALLBACK_META = { icon: "✨", color: "#0069ba" };

export default function CapabilityFinder() {
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState(ALL);
  const [category, setCategory] = useState(ALL);
  const [sort, setSort] = useState("department");
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState("capabilities"); // "capabilities" | "requests"
  const [voted, setVoted] = useState(() => loadVoted());

  // Upvotes live on individual "ways" (usage entries). A capability's score
  // is the sum of its ways' upvotes.
  const wayCount = (cap, tool, u) => {
    const id = usageId(cap.department, cap.capability, tool, u.url);
    return baseCount(id) + (voted.has(id) ? 1 : 0);
  };
  const toggleWay = (cap, tool, u) => {
    const id = usageId(cap.department, cap.capability, tool, u.url);
    setVoted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      saveVoted(next);
      return next;
    });
  };
  const capabilityTotal = (cap) => {
    let sum = 0;
    for (const [tool, ways] of Object.entries(cap.usage || {})) {
      for (const u of ways) sum += wayCount(cap, tool, u);
    }
    return sum;
  };
  const documentedTools = (cap) =>
    TOOLS.filter((t) => (cap.usage?.[t.name] || []).length > 0);

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

  // Flat list sorted by summed way-upvotes, for the "Most popular" sort
  const popular = useMemo(
    () =>
      [...filtered].sort(
        (a, b) =>
          capabilityTotal(b) - capabilityTotal(a) ||
          a.capability.localeCompare(b.capability)
      ),
    [filtered, voted]
  );

  const onDepartmentChange = (value) => {
    setDepartment(value);
    setCategory(ALL); // reset category when department changes
  };

  const hasFilters =
    searchTerm || department !== ALL || category !== ALL || sort !== "department";
  const clearAll = () => {
    setSearchTerm("");
    setDepartment(ALL);
    setCategory(ALL);
    setSort("department");
  };

  return (
    <>
      <InteractiveHero />
      <div className="cf">
        <div className="cf-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={view === "capabilities"}
            className={`cf-tab${view === "capabilities" ? " cf-tab--on" : ""}`}
            onClick={() => setView("capabilities")}
          >
            Capabilities
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === "requests"}
            className={`cf-tab${view === "requests" ? " cf-tab--on" : ""}`}
            onClick={() => setView("requests")}
          >
            Requests <span className="cf-tab__n">{REQUESTS.length}</span>
          </button>
        </div>

        {view === "requests" ? (
          <RequestsBoard />
        ) : (
          <>
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
          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort by"
          >
            <option value="department">Sort: Department</option>
            <option value="popular">Sort: Most popular</option>
          </Select>
        </div>
        {hasFilters && (
          <div className="cf-chips">
            {searchTerm && (
              <button className="cf-chip" onClick={() => setSearchTerm("")}>
                “{searchTerm}” <span aria-hidden="true">×</span>
              </button>
            )}
            {department !== ALL && (
              <button className="cf-chip" onClick={() => onDepartmentChange(ALL)}>
                {department} <span aria-hidden="true">×</span>
              </button>
            )}
            {category !== ALL && (
              <button className="cf-chip" onClick={() => setCategory(ALL)}>
                {category} <span aria-hidden="true">×</span>
              </button>
            )}
            {sort !== "department" && (
              <button className="cf-chip" onClick={() => setSort("department")}>
                Most popular <span aria-hidden="true">×</span>
              </button>
            )}
            <button className="cf-chip cf-chip--clear" onClick={clearAll}>
              Clear all
            </button>
          </div>
        )}
      </Card>

      {/* Results */}
      {filtered.length === 0 ? (
        <Card className="cf-empty-results">
          <div className="cf-empty__icon" aria-hidden="true">
            🔍
          </div>
          <p className="cf-empty__title">No capabilities match your filters</p>
          <p className="cf-empty__sub">
            Try clearing the search or choosing a different department.
          </p>
        </Card>
      ) : sort === "popular" ? (
        <section className="cf-dept">
          <div className="cf-dept__head">
            <span className="cf-dept__icon" style={{ background: "#0069ba1a", color: "#0069ba" }}>
              🔥
            </span>
            <h2 className="cf-dept__name">Most popular</h2>
            <span className="cf-dept__count">{popular.length}</span>
          </div>
          <div className="cf-grid">
            {popular.map((row) => {
              const meta = DEPARTMENT_META[row.department] || FALLBACK_META;
              return (
                <CapabilityCard
                  key={`${row.department}|${row.capability}`}
                  row={row}
                  accent={meta.color}
                  onSelect={() => setSelected(row)}
                  total={capabilityTotal(row)}
                  documented={documentedTools(row)}
                />
              );
            })}
          </div>
        </section>
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
                    total={capabilityTotal(row)}
                    documented={documentedTools(row)}
                  />
                ))}
              </div>
            </section>
          );
        })
      )}
          </>
        )}

      {selected && (
        <CapabilityModal
          capability={selected}
          onClose={() => setSelected(null)}
          voted={voted}
          wayCount={wayCount}
          toggleWay={toggleWay}
        />
      )}
      </div>
    </>
  );
}

function CapabilityCard({ row, accent, onSelect, total, documented }) {
  const wayCount = Object.values(row.usage || {}).reduce((n, arr) => n + arr.length, 0);
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
      <div className="cap-card__body">
        <span className="cap-card__cat" style={{ color: accent }}>
          {row.category}
        </span>
        <h3 className="cap-card__title">{row.capability}</h3>
        <div className="cap-card__tools" aria-label="Tools with guides">
          {documented.slice(0, 6).map((t) => (
            <span key={t.name} className="cap-card__toolchip" title={t.name} aria-hidden="true">
              {t.icon}
            </span>
          ))}
          {documented.length > 6 && (
            <span className="cap-card__toolchip cap-card__toolchip--more">
              +{documented.length - 6}
            </span>
          )}
          {documented.length === 0 && (
            <span className="cap-card__notool">No guides yet — be the first</span>
          )}
        </div>
      </div>
      <div className="cap-card__foot">
        <span className="cap-stat" title="Total upvotes across all guides">
          <span className="cap-stat__arrow" aria-hidden="true">▲</span>
          {total}
        </span>
        <span className="cap-card__view">
          {wayCount > 0 ? `${wayCount} guide${wayCount === 1 ? "" : "s"} →` : "Add a guide →"}
        </span>
      </div>
    </Card>
  );
}

function ToolBlock({ tool, usage, capability, voted, wayCount, toggleWay }) {
  const ranked = usage
    .map((u) => ({
      u,
      id: usageId(capability.department, capability.capability, tool.name, u.url),
      n: wayCount(capability, tool.name, u),
    }))
    .sort((a, b) => b.n - a.n);

  return (
    <div className="cm-tool">
      <div className="cm-tool__head">
        <span className="cm-tool__icon">{tool.icon}</span>
        <div className="cm-tool__meta">
          <div className="cm-tool__name">{tool.name}</div>
          <div className="cm-tool__cat">{tool.category}</div>
        </div>
        <div className="cm-tool__actions">
          {tool.docUrl && (
            <Button
              variant="secondary"
              size="sm"
              href={tool.docUrl}
              target="_blank"
              rel="noreferrer"
            >
              Tool docs ↗
            </Button>
          )}
        </div>
      </div>
      <div className="cm-ways">
        <span className="cm-ways__label">
          Ways people use it — upvote the ones that work
        </span>
        <ul className="cm-ways__list">
          {ranked.map(({ u, id, n }) => (
            <li key={id} className="cm-way">
              <button
                type="button"
                className={`way-vote${voted.has(id) ? " way-vote--on" : ""}`}
                aria-pressed={voted.has(id)}
                aria-label={`Upvote ${u.author}'s guide`}
                title={voted.has(id) ? "Remove your upvote" : "Upvote this guide"}
                onClick={() => toggleWay(capability, tool.name, u)}
              >
                <span className="way-vote__arrow" aria-hidden="true">▲</span>
                <span className="way-vote__count">{n}</span>
              </button>
              <a className="cm-way__link" href={u.url} target="_blank" rel="noreferrer">
                {u.author}
                <span aria-hidden="true"> ↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CapabilityModal({ capability, onClose, voted, wayCount, toggleWay }) {
  const meta = DEPARTMENT_META[capability.department] || FALLBACK_META;
  // Only show tools that have at least one shared guide.
  const documented = TOOLS.filter(
    (t) => (capability.usage?.[t.name] || []).length > 0
  );

  return (
    <Modal
      title={capability.capability}
      subtitle={`${meta.icon} ${capability.department} · ${capability.category}`}
      onClose={onClose}
    >
      <section className="cm-section">
        <h4 className="cm-section__title">
          Tools people use for this{" "}
          <span className="cm-count">{documented.length}</span>
        </h4>
        {documented.length > 0 ? (
          <div className="cm-tools">
            {documented.map((tool) => (
              <ToolBlock
                key={tool.name}
                tool={tool}
                usage={capability.usage[tool.name]}
                capability={capability}
                voted={voted}
                wayCount={wayCount}
                toggleWay={toggleWay}
              />
            ))}
          </div>
        ) : (
          <p className="cm-desc">
            No one has shared a guide for this yet. Be the first — add one via
            “Share how you AI.”
          </p>
        )}
      </section>

      <section className="cm-callout">
        <strong>💡 Two kinds of docs</strong>
        <ul>
          <li>
            <strong>Tool docs</strong> — how to get access &amp; support for the
            tool itself (same for everyone).
          </li>
          <li>
            <strong>Ways people use it</strong> — guides from colleagues; upvote
            the approaches that work best so the top one rises.
          </li>
        </ul>
        Have your own approach? Add it with <em>Share how you AI</em>.
      </section>
    </Modal>
  );
}

/* (hero stats now live in InteractiveHero) */
