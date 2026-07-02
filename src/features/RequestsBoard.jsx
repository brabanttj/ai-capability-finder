import { useMemo, useState } from "react";
import { REQUESTS, DEPARTMENT_META } from "../data/automationCapabilities.js";
import { Card, Badge, Input, Select, Button } from "../components/ui/index.js";
import RequestForm from "./RequestForm.jsx";
import {
  requestId,
  baseCount,
  loadVoted,
  saveVoted,
  REQUESTS_KEY,
} from "../lib/votes.js";
import "./RequestsBoard.css";

const ALL = "All";
const FALLBACK_META = { icon: "✨", color: "#0069ba" };

export default function RequestsBoard() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState(ALL);
  const [sort, setSort] = useState("popular"); // "popular" | "newest"
  const [voted, setVoted] = useState(() => loadVoted(REQUESTS_KEY));
  const [formOpen, setFormOpen] = useState(false);

  const departments = useMemo(
    () => [ALL, ...new Set(REQUESTS.map((r) => r.department).filter(Boolean))].sort(),
    []
  );

  const countOf = (r) =>
    baseCount(requestId(r.department, r.request)) +
    (voted.has(requestId(r.department, r.request)) ? 1 : 0);

  const toggle = (r) => {
    const id = requestId(r.department, r.request);
    setVoted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      saveVoted(next, REQUESTS_KEY);
      return next;
    });
  };

  const list = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = REQUESTS.filter((r) => {
      if (department !== ALL && r.department !== department) return false;
      if (q) {
        const hit =
          r.request.toLowerCase().includes(q) ||
          r.details.toLowerCase().includes(q) ||
          r.department.toLowerCase().includes(q);
        if (!hit) return false;
      }
      return true;
    });
    return filtered.sort((a, b) =>
      sort === "newest"
        ? String(b.submitted).localeCompare(String(a.submitted))
        : countOf(b) - countOf(a) || a.request.localeCompare(b.request)
    );
  }, [search, department, sort, voted]);

  return (
    <>
      <Card className="cf-toolbar">
        <div className="rb-toolbar__grid">
          <Input
            search
            placeholder="Search requests…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search requests"
          />
          <Select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            aria-label="Filter requests by department"
          >
            {departments.map((d) => (
              <option key={d} value={d}>
                {d === ALL ? "All Departments" : d}
              </option>
            ))}
          </Select>
          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort requests"
          >
            <option value="popular">Sort: Most upvoted</option>
            <option value="newest">Sort: Newest</option>
          </Select>
          <Button variant="accent" onClick={() => setFormOpen(true)}>
            ＋ Request one
          </Button>
        </div>
      </Card>

      <p className="rb-intro">
        Capabilities people wish existed. <strong>Upvote</strong> the ones you
        want so the team can prioritize what to enable next.
      </p>

      {list.length === 0 ? (
        <Card className="cf-empty-results">
          <div className="cf-empty__icon" aria-hidden="true">📝</div>
          <p className="cf-empty__title">No requests match</p>
          <p className="cf-empty__sub">Try a different search or department.</p>
        </Card>
      ) : (
        <div className="rb-grid">
          {list.map((r) => {
            const meta = DEPARTMENT_META[r.department] || FALLBACK_META;
            const id = requestId(r.department, r.request);
            const isVoted = voted.has(id);
            return (
              <Card key={id} className="req-card" pad={false}>
                <button
                  type="button"
                  className={`req-vote${isVoted ? " req-vote--on" : ""}`}
                  aria-pressed={isVoted}
                  aria-label={`Upvote request: ${r.request}`}
                  title={isVoted ? "Remove your upvote" : "Upvote this request"}
                  onClick={() => toggle(r)}
                >
                  <span className="req-vote__arrow" aria-hidden="true">▲</span>
                  <span className="req-vote__count">{countOf(r)}</span>
                </button>
                <div className="req-card__body">
                  <h3 className="req-card__title">{r.request}</h3>
                  {r.details && <p className="req-card__desc">{r.details}</p>}
                  <div className="req-card__meta">
                    {r.department && (
                      <Badge tone="brand" style={{ borderColor: `${meta.color}55` }}>
                        {meta.icon} {r.department}
                      </Badge>
                    )}
                    {r.submitted && (
                      <span className="req-card__date">Requested {r.submitted}</span>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {formOpen && <RequestForm onClose={() => setFormOpen(false)} />}
    </>
  );
}
