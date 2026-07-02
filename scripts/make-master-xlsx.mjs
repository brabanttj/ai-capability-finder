/**
 * Builds the single source-of-truth workbook: ../../ai_automation_master.xlsx
 *
 *   Sheet "Capabilities" — Department, Category, Capability, Description,
 *                          then one column per AI tool. "X" = that tool is
 *                          enabled for that capability.
 *   Sheet "Tools"        — Tool, Icon, Category, Available, DocURL.
 *
 * Tool cells are SEEDED BY RELEVANCE as a starting point — edit the workbook
 * in Excel to refine, then run `npm run gen:data` to rebuild the app data.
 *
 * Run once with `npm run make:master`. Re-running OVERWRITES manual edits.
 */
import { writeFileSync } from "node:fs";
import * as XLSX from "xlsx";
import { CAPABILITIES } from "../src/data/automationCapabilities.js";
import { AI_TOOLS } from "../src/data/aiTools.js";
import { MASTER_XLSX } from "../data-source.mjs";

const has = (s, ...words) =>
  words.some((w) => s.toLowerCase().includes(w.toLowerCase()));

// General-purpose assistants relevant to virtually any capability.
const GENERAL = ["ChatGPT Enterprise", "Claude", "Microsoft Copilot"];

// Relevance rules keyed by department.
const BY_DEPARTMENT = {
  "Software Engineering": ["Augment Code", "GitHub Copilot"],
  "Data Engineering": ["Snowflake Cortex", "Azure AI", "Augment Code", "GitHub Copilot"],
  "Tech Ops": ["Azure AI"],
  Reporting: ["Power BI AI", "Snowflake Cortex"],
  Finance: ["Power BI AI", "Snowflake Cortex"],
  Accounting: ["Power BI AI", "Snowflake Cortex"],
  Strategy: ["Power BI AI", "Snowflake Cortex"],
  "Performance Marketing": ["HubSpot AI", "Grammarly Business"],
  Sales: ["HubSpot AI"],
  "Account Management": ["HubSpot AI", "Grammarly Business"],
  "Business Development": ["HubSpot AI", "Grammarly Business"],
  Copywriting: ["Grammarly Business"],
  "Customer Support": ["HubSpot AI", "Grammarly Business"],
  Legal: ["Grammarly Business"],
  "Human Resources": ["Grammarly Business"],
  "Product Management": ["Grammarly Business"],
  "Design/UX": ["Grammarly Business"],
};

const availableNames = new Set(AI_TOOLS.filter((t) => t.enabled).map((t) => t.name));

function seedTools(cap) {
  const set = new Set(GENERAL);
  for (const t of BY_DEPARTMENT[cap.department] ?? []) set.add(t);

  const text = `${cap.category} ${cap.capability} ${cap.description}`;
  // Keyword nudges that cut across departments
  if (has(text, "code", "pipeline", "test", "bug", "debug", "ci/cd", "devops")) {
    set.add("Augment Code");
    set.add("GitHub Copilot");
  }
  if (has(text, "data", "anomal", "forecast", "dashboard", "report", "metric", "analytic")) {
    set.add("Power BI AI");
    set.add("Snowflake Cortex");
  }
  if (has(text, "email", "copy", "content", "writ", "draft", "comm", "doc", "policy", "microcopy")) {
    set.add("Grammarly Business");
  }
  if (has(text, "lead", "crm", "outreach", "client", "campaign")) {
    set.add("HubSpot AI");
  }
  if (has(text, "monitor", "infra", "security", "threat")) {
    set.add("Azure AI");
  }

  // Only tools that are available enterprise-wide can be enabled per capability.
  return [...set].filter((name) => availableNames.has(name));
}

// ---- Build "Capabilities" sheet (capability rows x tool columns) -----------
const toolNames = AI_TOOLS.map((t) => t.name);
const capRows = CAPABILITIES.map((cap) => {
  const enabled = new Set(seedTools(cap));
  const row = {
    Department: cap.department,
    Category: cap.category,
    Capability: cap.capability,
    Description: cap.description,
  };
  for (const name of toolNames) row[name] = enabled.has(name) ? "X" : "";
  return row;
});
const capsSheet = XLSX.utils.json_to_sheet(capRows, {
  header: ["Department", "Category", "Capability", "Description", ...toolNames],
});

// ---- Build "Tools" reference sheet -----------------------------------------
const toolRows = AI_TOOLS.map((t) => ({
  Tool: t.name,
  Icon: t.icon,
  Category: t.category,
  Available: t.enabled ? "Yes" : "No",
  DocURL: t.docUrl,
}));
const toolsSheet = XLSX.utils.json_to_sheet(toolRows, {
  header: ["Tool", "Icon", "Category", "Available", "DocURL"],
});

const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, capsSheet, "Capabilities");
XLSX.utils.book_append_sheet(wb, toolsSheet, "Tools");

const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
writeFileSync(MASTER_XLSX, buf);

const totalChecks = capRows.reduce(
  (n, r) => n + toolNames.filter((t) => r[t] === "X").length,
  0
);
console.log(
  `Wrote ai_automation_master.xlsx: ${capRows.length} capabilities x ${toolNames.length} tools, ${totalChecks} enablements seeded.`
);
