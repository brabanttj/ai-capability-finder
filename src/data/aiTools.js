/**
 * Enterprise AI tools catalog.
 * `enabled` = available enterprise-wide; `docUrl` = integration documentation.
 * Ported from the AI Automation Hub. Update here as tools are approved.
 */
export const AI_TOOLS = [
  { id: 1, name: "ChatGPT Enterprise", icon: "🤖", category: "General AI", enabled: true, docUrl: "https://docs.company.com/ai-tools/chatgpt" },
  { id: 2, name: "Claude", icon: "🧠", category: "General AI", enabled: true, docUrl: "https://docs.company.com/ai-tools/claude" },
  { id: 3, name: "Microsoft Copilot", icon: "💼", category: "Productivity", enabled: true, docUrl: "https://docs.company.com/ai-tools/copilot" },
  { id: 4, name: "Google Gemini", icon: "✨", category: "General AI", enabled: false, docUrl: "" },
  { id: 5, name: "Augment Code", icon: "⚡", category: "Development", enabled: true, docUrl: "https://docs.company.com/ai-tools/augment" },
  { id: 6, name: "GitHub Copilot", icon: "🐙", category: "Development", enabled: true, docUrl: "https://docs.company.com/ai-tools/github-copilot" },
  { id: 7, name: "Power BI AI", icon: "📊", category: "Analytics", enabled: true, docUrl: "https://docs.company.com/ai-tools/powerbi" },
  { id: 8, name: "Tableau AI", icon: "📈", category: "Analytics", enabled: false, docUrl: "" },
  { id: 9, name: "Azure AI", icon: "☁️", category: "Cloud AI", enabled: true, docUrl: "https://docs.company.com/ai-tools/azure-ai" },
  { id: 10, name: "Snowflake Cortex", icon: "❄️", category: "Data Platform", enabled: true, docUrl: "https://docs.company.com/ai-tools/snowflake" },
  { id: 11, name: "Salesforce Einstein", icon: "⚡", category: "CRM", enabled: false, docUrl: "" },
  { id: 12, name: "HubSpot AI", icon: "🎯", category: "Marketing", enabled: true, docUrl: "https://docs.company.com/ai-tools/hubspot" },
  { id: 13, name: "Jasper AI", icon: "✍️", category: "Content", enabled: false, docUrl: "" },
  { id: 14, name: "Grammarly Business", icon: "📝", category: "Writing", enabled: true, docUrl: "https://docs.company.com/ai-tools/grammarly" },
  { id: 15, name: "Figma AI", icon: "🎨", category: "Design", enabled: false, docUrl: "" },
];

export const ENABLED_TOOLS = AI_TOOLS.filter((t) => t.enabled);
export const DISABLED_TOOLS = AI_TOOLS.filter((t) => !t.enabled);
