/**
 * Adds/seeds a "Usage" sheet in the master workbook.
 * Columns: Capability | Department | Tool | Author | URL
 * Each row is ONE person's guide for using ONE tool for ONE capability, so a
 * capability+tool can have many author entries. Sample data below.
 */
import fs from "node:fs";
import * as XLSX from "xlsx";
import { MASTER_XLSX } from "../data-source.mjs";

const HEADER = ["Capability", "Department", "Tool", "Author", "URL"];
const SAMPLE = [
  // Candidate sourcing — several people, two tools
  ["Candidate sourcing", "Human Resources", "ChatGPT Enterprise", "Jon Smith", "https://example.com/guides/jon-candidate-sourcing-chatgpt"],
  ["Candidate sourcing", "Human Resources", "ChatGPT Enterprise", "Mary Jones", "https://example.com/guides/mary-candidate-sourcing-chatgpt"],
  ["Candidate sourcing", "Human Resources", "ChatGPT Enterprise", "Wei Chen", "https://example.com/guides/wei-candidate-sourcing-chatgpt"],
  ["Candidate sourcing", "Human Resources", "Claude", "Priya Patel", "https://example.com/guides/priya-candidate-sourcing-claude"],
  ["Candidate sourcing", "Human Resources", "Claude", "Tomas Alvarez", "https://example.com/guides/tomas-candidate-sourcing-claude"],
  // Resume screening — multiple people on ChatGPT
  ["Resume screening", "Human Resources", "ChatGPT Enterprise", "Dana Lee", "https://example.com/guides/dana-resume-screening-chatgpt"],
  ["Resume screening", "Human Resources", "ChatGPT Enterprise", "Rachel Kim", "https://example.com/guides/rachel-resume-screening-chatgpt"],
  ["Resume screening", "Human Resources", "Claude", "Omar Farouk", "https://example.com/guides/omar-resume-screening-claude"],
  // Code writing — dev tools, multiple people
  ["Code writing", "Software Engineering", "GitHub Copilot", "Alex Kim", "https://example.com/guides/alex-code-writing-copilot"],
  ["Code writing", "Software Engineering", "GitHub Copilot", "Sarah Bell", "https://example.com/guides/sarah-code-writing-copilot"],
  ["Code writing", "Software Engineering", "Augment Code", "Sam Rivera", "https://example.com/guides/sam-code-writing-augment"],
  ["Code writing", "Software Engineering", "Claude", "Nina Patel", "https://example.com/guides/nina-code-writing-claude"],
  // Dashboards
  ["Dashboard generation", "Reporting", "Power BI AI", "Chris Doyle", "https://example.com/guides/chris-dashboards-powerbi"],
  ["Dashboard generation", "Reporting", "Power BI AI", "Maria Gomez", "https://example.com/guides/maria-dashboards-powerbi"],
  // Onboarding
  ["Onboarding workflows", "Human Resources", "Microsoft Copilot", "Leah Park", "https://example.com/guides/leah-onboarding-copilot"],
  ["Onboarding workflows", "Human Resources", "Microsoft Copilot", "Devin Cross", "https://example.com/guides/devin-onboarding-copilot"],
  // Ad copy
  ["Ad copy generation", "Copywriting", "ChatGPT Enterprise", "Zoe Adams", "https://example.com/guides/zoe-adcopy-chatgpt"],
  ["Ad copy generation", "Copywriting", "ChatGPT Enterprise", "Ravi Shah", "https://example.com/guides/ravi-adcopy-chatgpt"],
  ["Ad copy generation", "Copywriting", "Grammarly Business", "Ben Ortiz", "https://example.com/guides/ben-adcopy-grammarly"],
  // Contract analysis
  ["Contract analysis", "Legal", "Claude", "Grace Liu", "https://example.com/guides/grace-contract-analysis-claude"],
];

const rows = SAMPLE.map(([Capability, Department, Tool, Author, URL]) => ({
  Capability,
  Department,
  Tool,
  Author,
  URL,
}));

// ---- Sample requests (things people wish AI could do) ----------------------
const REQ_HEADER = ["Submitted", "Request", "Department", "Details"];
const REQ_SAMPLE = [
  ["2026-06-24", "Auto-summarize weekly team standups", "Product Management", "Turn recorded standups into a short written recap with action items."],
  ["2026-06-25", "Draft QBR decks from CRM data", "Sales", "Generate a first-draft quarterly business review from Salesforce numbers."],
  ["2026-06-25", "Detect duplicate vendor invoices", "Finance", "Flag likely duplicate or near-duplicate invoices before payment."],
  ["2026-06-26", "Generate release notes from merged PRs", "Software Engineering", "Summarize the week's merged pull requests into customer-facing notes."],
  ["2026-06-27", "Summarize customer call recordings", "Customer Support", "Produce a short summary + sentiment from support call transcripts."],
  ["2026-06-28", "Draft job descriptions from a role brief", "Human Resources", "Turn a few bullet points into a full, on-brand job description."],
  ["2026-06-30", "Auto-tag support tickets by theme", "Customer Support", "Cluster incoming tickets into themes so trends are visible."],
];
const reqRows = REQ_SAMPLE.map(([Submitted, Request, Department, Details]) => ({
  Submitted,
  Request,
  Department,
  Details,
}));

const wb = XLSX.read(fs.readFileSync(MASTER_XLSX), { type: "buffer" });
for (const name of ["Usage", "Requests"]) {
  if (wb.Sheets[name]) {
    delete wb.Sheets[name];
    wb.SheetNames = wb.SheetNames.filter((n) => n !== name);
  }
}
XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rows, { header: HEADER }), "Usage");
XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(reqRows, { header: REQ_HEADER }), "Requests");
fs.writeFileSync(MASTER_XLSX, XLSX.write(wb, { bookType: "xlsx", type: "buffer" }));
console.log(`Seeded "Usage" (${rows.length}) and "Requests" (${reqRows.length}) sheets.`);
