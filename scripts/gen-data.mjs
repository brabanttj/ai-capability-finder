/**
 * Generates src/data/automationCapabilities.js from the single source of
 * truth: ../../ai_automation_master.xlsx (sheets "Capabilities" + "Tools").
 *
 * Run with `npm run gen:data` after editing the workbook.
 */
import { readFileSync, writeFileSync } from "node:fs";
import * as XLSX from "xlsx";
import { MASTER_XLSX } from "../data-source.mjs";

const FIXED = ["Department", "Category", "Capability", "Description"];

const wb = XLSX.read(readFileSync(MASTER_XLSX), { type: "buffer" });

// ---- Tools reference sheet -------------------------------------------------
const toolRows = XLSX.utils.sheet_to_json(wb.Sheets["Tools"], { defval: "" });
const TOOLS = toolRows
  .filter((r) => r.Tool)
  .map((r) => ({
    name: String(r.Tool).trim(),
    icon: String(r.Icon ?? "").trim(),
    category: String(r.Category ?? "").trim(),
    available: /^y(es)?$|^true$|^x$/i.test(String(r.Available).trim()),
    docUrl: String(r.DocURL ?? "").trim(),
  }));
const toolByName = new Map(TOOLS.map((t) => [t.name, t]));

// ---- Capabilities matrix sheet ---------------------------------------------
const capRows = XLSX.utils.sheet_to_json(wb.Sheets["Capabilities"], { defval: "" });
const toolColumns = Object.keys(capRows[0] ?? {}).filter(
  (k) => !FIXED.includes(k)
);
const isOn = (v) => /^(x|yes|y|true|1|enabled)$/i.test(String(v).trim());

const CAPABILITIES = capRows
  .filter((r) => r.Capability)
  .map((r) => ({
    department: String(r.Department).trim(),
    category: String(r.Category).trim(),
    capability: String(r.Capability).trim(),
    description: String(r.Description ?? "").trim(),
    // Per-capability enabled tools: column checked AND tool available
    tools: toolColumns.filter(
      (name) => isOn(r[name]) && (toolByName.get(name)?.available ?? true)
    ),
  }));

// ---- Derived lookups -------------------------------------------------------
const departments = [...new Set(CAPABILITIES.map((r) => r.department))];
const categoriesByDepartment = {};
for (const r of CAPABILITIES) {
  (categoriesByDepartment[r.department] ??= new Set()).add(r.category);
}
for (const k of Object.keys(categoriesByDepartment)) {
  categoriesByDepartment[k] = [...categoriesByDepartment[k]];
}

// Brand-palette accent + emoji per department
const PALETTE = [
  "#0069BA", "#08C177", "#078181", "#002A4A", "#00D084",
  "#044D4D", "#0069BA", "#08C177", "#078181", "#00D084",
  "#0069BA", "#044D4D", "#08C177", "#078181", "#002A4A",
  "#00D084", "#0069BA",
];
const ICONS = {
  "Human Resources": "👥", Finance: "💰", Accounting: "📒",
  "Software Engineering": "💻", "Tech Ops": "🖥️", "Product Management": "🧭",
  "Design/UX": "🎨", "Data Engineering": "🗄️", Reporting: "📊",
  Strategy: "♟️", "Account Management": "🤝", "Business Development": "📈",
  Copywriting: "✍️", Legal: "⚖️", "Performance Marketing": "📣",
  Sales: "💼", "Customer Support": "🎧",
};
const departmentMeta = {};
departments.forEach((d, i) => {
  departmentMeta[d] = { color: PALETTE[i % PALETTE.length], icon: ICONS[d] ?? "✨" };
});

const out = `/**
 * AI Automation Capabilities — generated from ai_automation_master.xlsx
 * (sheets "Capabilities" + "Tools"). Do not edit by hand; edit the workbook
 * and re-run \`npm run gen:data\`.
 */

export const TOOLS = ${JSON.stringify(TOOLS, null, 2)};

export const CAPABILITIES = ${JSON.stringify(CAPABILITIES, null, 2)};

export const DEPARTMENTS = ${JSON.stringify(departments, null, 2)};

export const CATEGORIES_BY_DEPARTMENT = ${JSON.stringify(categoriesByDepartment, null, 2)};

export const DEPARTMENT_META = ${JSON.stringify(departmentMeta, null, 2)};
`;

writeFileSync(new URL("../src/data/automationCapabilities.js", import.meta.url), out);
const totalLinks = CAPABILITIES.reduce((n, c) => n + c.tools.length, 0);
console.log(
  `Wrote ${CAPABILITIES.length} capabilities, ${TOOLS.length} tools, ${totalLinks} per-capability tool enablements.`
);
