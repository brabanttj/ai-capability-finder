/**
 * AI Capabilities Matrix Data
 * 
 * This file contains the comprehensive mapping of AI tools to business capabilities.
 * Update this file to add new tools, capabilities, or platforms.
 */

// Updated platform list - enterprise AI tools and platforms
export const PLATFORMS = [
  "ChatGPT",
  "Claude",
  "Copilot",
  "Gemini",
  "Augment",
  "PowerBI",
  "Figma",
  "Azure",
  "Snowflake",
  "Jira"
];

export const STATUS = {
  ENABLED: "Enabled",
  NOT_ENABLED: "Not Enabled",
  NOT_SUPPORTED: "Not Supported",
  BLANK: "Not Populated",
};

export const DOCS = {
  // AI Assistants
  chatgpt: "https://intranet.company.com/docs/chatgpt-enterprise",
  claude: "https://intranet.company.com/docs/claude-enterprise",
  copilot: "https://intranet.company.com/docs/microsoft-copilot",
  gemini: "https://intranet.company.com/docs/google-gemini",
  augment: "https://intranet.company.com/docs/augment-code",

  // Enterprise Tools
  powerbi: "https://intranet.company.com/docs/powerbi-ai",
  figma: "https://intranet.company.com/docs/figma-ai",
  azure: "https://intranet.company.com/docs/azure-ai",
  snowflake: "https://intranet.company.com/docs/snowflake-cortex",
  jira: "https://intranet.company.com/docs/jira-intelligence",
};

export const CATEGORY_META = {
  "Product Management": {
    icon: "📋",
    color: "#8b5cf6",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)",
    description: "Plan, define, and manage product development lifecycle"
  },
  "Communication": {
    icon: "💬",
    color: "#3b82f6",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)",
    description: "Facilitate team and customer communication"
  },
  "Data": {
    icon: "📊",
    color: "#10b981",
    gradient: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
    description: "Store, process, analyze, and visualize data"
  },
  "Engineering & Code": {
    icon: "⚡",
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
    description: "Build, test, and maintain software systems"
  },
  "Content & Creative": {
    icon: "🎨",
    color: "#a855f7",
    gradient: "linear-gradient(135deg, #a855f7 0%, #c084fc 100%)",
    description: "Create and manage marketing and creative content"
  },
  "Research & Intelligence": {
    icon: "🔬",
    color: "#ec4899",
    gradient: "linear-gradient(135deg, #ec4899 0%, #f472b6 100%)",
    description: "Gather and analyze market and competitive intelligence"
  },
  "Documents & Knowledge": {
    icon: "📚",
    color: "#06b6d4",
    gradient: "linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)",
    description: "Create, organize, and retrieve organizational knowledge"
  },
  "Compliance & Risk": {
    icon: "🛡️",
    color: "#f97316",
    gradient: "linear-gradient(135deg, #f97316 0%, #fb923c 100%)",
    description: "Manage regulatory compliance and risk mitigation"
  },
  "Optimization & Testing": {
    icon: "🚀",
    color: "#d946ef",
    gradient: "linear-gradient(135deg, #d946ef 0%, #e879f9 100%)",
    description: "Improve performance through experimentation and optimization"
  },
  "Finance & Operations": {
    icon: "💼",
    color: "#22c55e",
    gradient: "linear-gradient(135deg, #22c55e 0%, #4ade80 100%)",
    description: "Manage financial planning and operational processes"
  },
  "People & Talent": {
    icon: "👥",
    color: "#eab308",
    gradient: "linear-gradient(135deg, #eab308 0%, #facc15 100%)",
    description: "Support recruiting, development, and employee management"
  },
  "Infrastructure & Monitoring": {
    icon: "🔧",
    color: "#ef4444",
    gradient: "linear-gradient(135deg, #ef4444 0%, #f87171 100%)",
    description: "Maintain and monitor technical infrastructure"
  },
};

// Helper to create platform status
const ps = (status, link = "") => ({ status, link });

// Helper to create blank cells
const blank = () => Object.fromEntries(PLATFORMS.map(p => [p, ps(STATUS.BLANK)]));

/**
 * Matrix Rows Structure:
 * {
 *   id: string (auto-generated from category|subCategory|capability|platform),
 *   category: string,
 *   subCategory: string,
 *   capability: string,
 *   platform: string (AI tool name, e.g., "Microsoft Copilot", "ChatGPT Enterprise"),
 *   cells: { [platform: string]: { status: STATUS, link: string } }
 * }
 */

// Auto-add IDs to rows
function addIds(rows) {
  return rows.map(row => ({
    ...row,
    id: `${row.category}|${row.subCategory}|${row.capability}|${row.platform || "blank"}`
  }));
}

const RAW_MATRIX_ROWS = [
  // ========================================================================
  // PRODUCT MANAGEMENT
  // ========================================================================
  {
    category: "Product Management",
    subCategory: "Requirements",
    capability: "Write user stories, PRDs & requirements",
    platform: "ChatGPT Enterprise",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.ENABLED, DOCS.chatgpt),
      Claude: ps(STATUS.ENABLED, DOCS.claude),
      Copilot: ps(STATUS.ENABLED, DOCS.copilot),
      Gemini: ps(STATUS.NOT_ENABLED),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.NOT_SUPPORTED),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.NOT_SUPPORTED),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.ENABLED, DOCS.jira),
    }
  },
  {
    category: "Product Management",
    subCategory: "Research",
    capability: "Conduct competitive research & analysis",
    platform: "Claude",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.ENABLED, DOCS.chatgpt),
      Claude: ps(STATUS.ENABLED, DOCS.claude),
      Copilot: ps(STATUS.ENABLED, DOCS.copilot),
      Gemini: ps(STATUS.ENABLED, DOCS.gemini),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.NOT_SUPPORTED),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.NOT_SUPPORTED),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },
  {
    category: "Product Management",
    subCategory: "Planning",
    capability: "Build roadmaps & prioritize features",
    platform: "Jira Intelligence",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.NOT_ENABLED),
      Claude: ps(STATUS.NOT_ENABLED),
      Copilot: ps(STATUS.NOT_SUPPORTED),
      Gemini: ps(STATUS.NOT_SUPPORTED),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.NOT_SUPPORTED),
      Figma: ps(STATUS.ENABLED, DOCS.figma),
      Azure: ps(STATUS.NOT_SUPPORTED),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.ENABLED, DOCS.jira),
    }
  },
  {
    category: "Product Management",
    subCategory: "Design",
    capability: "Generate wireframes & prototypes",
    platform: "Figma AI",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.ENABLED, DOCS.chatgpt),
      Claude: ps(STATUS.ENABLED, DOCS.claude),
      Copilot: ps(STATUS.NOT_SUPPORTED),
      Gemini: ps(STATUS.NOT_ENABLED),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.NOT_SUPPORTED),
      Figma: ps(STATUS.ENABLED, DOCS.figma),
      Azure: ps(STATUS.NOT_SUPPORTED),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },
  {
    category: "Product Management",
    subCategory: "Communication",
    capability: "Create presentations & stakeholder decks",
    platform: "Microsoft Copilot",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.ENABLED, DOCS.chatgpt),
      Claude: ps(STATUS.ENABLED, DOCS.claude),
      Copilot: ps(STATUS.ENABLED, DOCS.copilot),
      Gemini: ps(STATUS.ENABLED, DOCS.gemini),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.NOT_SUPPORTED),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.NOT_SUPPORTED),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },
  {
    category: "Product Management",
    subCategory: "Research",
    capability: "Synthesize user feedback & research",
    platform: "Claude",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.ENABLED, DOCS.chatgpt),
      Claude: ps(STATUS.ENABLED, DOCS.claude),
      Copilot: ps(STATUS.ENABLED, DOCS.copilot),
      Gemini: ps(STATUS.NOT_ENABLED),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.ENABLED, DOCS.powerbi),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.NOT_SUPPORTED),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },

  // ========================================================================
  // COMMUNICATION
  // ========================================================================
  {
    category: "Communication",
    subCategory: "Email & Messaging",
    capability: "Write & draft messages",
    platform: "Microsoft Copilot",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.ENABLED, DOCS.chatgpt),
      Claude: ps(STATUS.ENABLED, DOCS.claude),
      Copilot: ps(STATUS.ENABLED, DOCS.copilot),
      Gemini: ps(STATUS.ENABLED, DOCS.gemini),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.NOT_SUPPORTED),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.NOT_SUPPORTED),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },
  {
    category: "Communication",
    subCategory: "Inbox Management",
    capability: "Monitor & triage inboxes",
    platform: "Microsoft Copilot",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.NOT_ENABLED),
      Claude: ps(STATUS.NOT_ENABLED),
      Copilot: ps(STATUS.ENABLED, DOCS.copilot),
      Gemini: ps(STATUS.NOT_ENABLED),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.NOT_SUPPORTED),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.NOT_SUPPORTED),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },
  {
    category: "Communication",
    subCategory: "Meeting Management",
    capability: "Summarize conversations & meetings",
    platform: "Microsoft Copilot",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.ENABLED, DOCS.chatgpt),
      Claude: ps(STATUS.ENABLED, DOCS.claude),
      Copilot: ps(STATUS.ENABLED, DOCS.copilot),
      Gemini: ps(STATUS.NOT_ENABLED),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.NOT_SUPPORTED),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.NOT_SUPPORTED),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },
  {
    category: "Communication",
    subCategory: "Localization",
    capability: "Translate & localize content",
    platform: "Google Gemini",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.ENABLED, DOCS.chatgpt),
      Claude: ps(STATUS.ENABLED, DOCS.claude),
      Copilot: ps(STATUS.ENABLED, DOCS.copilot),
      Gemini: ps(STATUS.ENABLED, DOCS.gemini),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.NOT_SUPPORTED),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.NOT_SUPPORTED),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },

  // ========================================================================
  // DATA
  // ========================================================================
  {
    category: "Data",
    subCategory: "Data Access",
    capability: "Query & extract data",
    platform: "Snowflake Cortex",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.ENABLED, DOCS.chatgpt),
      Claude: ps(STATUS.ENABLED, DOCS.claude),
      Copilot: ps(STATUS.NOT_ENABLED),
      Gemini: ps(STATUS.NOT_SUPPORTED),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.ENABLED, DOCS.powerbi),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.ENABLED, DOCS.azure),
      Snowflake: ps(STATUS.ENABLED, DOCS.snowflake),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },
  {
    category: "Data",
    subCategory: "Reporting & Visualization",
    capability: "Build reports & visualizations",
    platform: "Power BI",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.NOT_ENABLED),
      Claude: ps(STATUS.NOT_ENABLED),
      Copilot: ps(STATUS.ENABLED, DOCS.copilot),
      Gemini: ps(STATUS.NOT_SUPPORTED),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.ENABLED, DOCS.powerbi),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.ENABLED, DOCS.azure),
      Snowflake: ps(STATUS.ENABLED, DOCS.snowflake),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },
  {
    category: "Data",
    subCategory: "Analysis",
    capability: "Analyze & summarize datasets",
    platform: "Azure AI",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.ENABLED, DOCS.chatgpt),
      Claude: ps(STATUS.ENABLED, DOCS.claude),
      Copilot: ps(STATUS.ENABLED, DOCS.copilot),
      Gemini: ps(STATUS.NOT_ENABLED),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.ENABLED, DOCS.powerbi),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.ENABLED, DOCS.azure),
      Snowflake: ps(STATUS.ENABLED, DOCS.snowflake),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },
  {
    category: "Data",
    subCategory: "Forecasting",
    capability: "Forecast & predict outcomes",
    platform: "Azure Machine Learning",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.NOT_ENABLED),
      Claude: ps(STATUS.NOT_ENABLED),
      Copilot: ps(STATUS.NOT_ENABLED),
      Gemini: ps(STATUS.NOT_SUPPORTED),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.ENABLED, DOCS.powerbi),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.ENABLED, DOCS.azure),
      Snowflake: ps(STATUS.ENABLED, DOCS.snowflake),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },
  {
    category: "Data",
    subCategory: "Data Quality",
    capability: "Monitor quality & detect anomalies",
    platform: "Snowflake Cortex",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.NOT_SUPPORTED),
      Claude: ps(STATUS.NOT_SUPPORTED),
      Copilot: ps(STATUS.NOT_SUPPORTED),
      Gemini: ps(STATUS.NOT_SUPPORTED),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.NOT_ENABLED),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.ENABLED, DOCS.azure),
      Snowflake: ps(STATUS.ENABLED, DOCS.snowflake),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },

  // ========================================================================
  // ENGINEERING & CODE
  // ========================================================================
  {
    category: "Engineering & Code",
    subCategory: "Code Generation",
    capability: "Generate, complete & refactor code",
    platform: "Augment Code",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.ENABLED, DOCS.chatgpt),
      Claude: ps(STATUS.ENABLED, DOCS.claude),
      Copilot: ps(STATUS.ENABLED, DOCS.copilot),
      Gemini: ps(STATUS.NOT_ENABLED),
      Augment: ps(STATUS.ENABLED, DOCS.augment),
      PowerBI: ps(STATUS.NOT_SUPPORTED),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.NOT_SUPPORTED),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },
  {
    category: "Engineering & Code",
    subCategory: "Code Quality",
    capability: "Review, debug & fix issues",
    platform: "Augment Code",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.ENABLED, DOCS.chatgpt),
      Claude: ps(STATUS.ENABLED, DOCS.claude),
      Copilot: ps(STATUS.ENABLED, DOCS.copilot),
      Gemini: ps(STATUS.NOT_ENABLED),
      Augment: ps(STATUS.ENABLED, DOCS.augment),
      PowerBI: ps(STATUS.NOT_SUPPORTED),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.NOT_SUPPORTED),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },
  {
    category: "Engineering & Code",
    subCategory: "Documentation",
    capability: "Write tests & documentation",
    platform: "ChatGPT Enterprise",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.ENABLED, DOCS.chatgpt),
      Claude: ps(STATUS.ENABLED, DOCS.claude),
      Copilot: ps(STATUS.ENABLED, DOCS.copilot),
      Gemini: ps(STATUS.NOT_ENABLED),
      Augment: ps(STATUS.ENABLED, DOCS.augment),
      PowerBI: ps(STATUS.NOT_SUPPORTED),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.NOT_SUPPORTED),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },
  {
    category: "Engineering & Code",
    subCategory: "Data Engineering",
    capability: "Build & maintain data pipelines",
    platform: "Azure AI",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.NOT_ENABLED),
      Claude: ps(STATUS.NOT_ENABLED),
      Copilot: ps(STATUS.NOT_ENABLED),
      Gemini: ps(STATUS.NOT_SUPPORTED),
      Augment: ps(STATUS.ENABLED, DOCS.augment),
      PowerBI: ps(STATUS.NOT_SUPPORTED),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.ENABLED, DOCS.azure),
      Snowflake: ps(STATUS.ENABLED, DOCS.snowflake),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },

  // ========================================================================
  // DOCUMENTS & KNOWLEDGE
  // ========================================================================
  {
    category: "Documents & Knowledge",
    subCategory: "Knowledge Management",
    capability: "Build & maintain knowledge bases",
    platform: "Microsoft Copilot",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.ENABLED, DOCS.chatgpt),
      Claude: ps(STATUS.ENABLED, DOCS.claude),
      Copilot: ps(STATUS.ENABLED, DOCS.copilot),
      Gemini: ps(STATUS.NOT_ENABLED),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.NOT_SUPPORTED),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.ENABLED, DOCS.azure),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },
  {
    category: "Documents & Knowledge",
    subCategory: "Document Creation",
    capability: "Draft & summarize documents",
    platform: "Microsoft Copilot",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.ENABLED, DOCS.chatgpt),
      Claude: ps(STATUS.ENABLED, DOCS.claude),
      Copilot: ps(STATUS.ENABLED, DOCS.copilot),
      Gemini: ps(STATUS.ENABLED, DOCS.gemini),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.NOT_SUPPORTED),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.NOT_SUPPORTED),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },
  {
    category: "Documents & Knowledge",
    subCategory: "Contract Review",
    capability: "Review, redline & manage contracts",
    platform: "Claude",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.ENABLED, DOCS.chatgpt),
      Claude: ps(STATUS.ENABLED, DOCS.claude),
      Copilot: ps(STATUS.NOT_ENABLED),
      Gemini: ps(STATUS.NOT_ENABLED),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.NOT_SUPPORTED),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.NOT_SUPPORTED),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },
  {
    category: "Documents & Knowledge",
    subCategory: "Information Extraction",
    capability: "Extract & organize information",
    platform: "Claude",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.ENABLED, DOCS.chatgpt),
      Claude: ps(STATUS.ENABLED, DOCS.claude),
      Copilot: ps(STATUS.ENABLED, DOCS.copilot),
      Gemini: ps(STATUS.NOT_ENABLED),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.NOT_SUPPORTED),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.ENABLED, DOCS.azure),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },



  // ========================================================================
  // CONTENT & CREATIVE
  // ========================================================================
  {
    category: "Content & Creative",
    subCategory: "Content Generation",
    capability: "Generate copy & written content",
    platform: "ChatGPT Enterprise",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.ENABLED, DOCS.chatgpt),
      Claude: ps(STATUS.ENABLED, DOCS.claude),
      Copilot: ps(STATUS.ENABLED, DOCS.copilot),
      Gemini: ps(STATUS.ENABLED, DOCS.gemini),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.NOT_SUPPORTED),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.NOT_SUPPORTED),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },
  {
    category: "Content & Creative",
    subCategory: "Visual Creation",
    capability: "Generate images & visual assets",
    platform: "Figma AI",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.ENABLED, DOCS.chatgpt),
      Claude: ps(STATUS.NOT_ENABLED),
      Copilot: ps(STATUS.NOT_ENABLED),
      Gemini: ps(STATUS.NOT_ENABLED),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.NOT_SUPPORTED),
      Figma: ps(STATUS.ENABLED, DOCS.figma),
      Azure: ps(STATUS.ENABLED, DOCS.azure),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },
  {
    category: "Content & Creative",
    subCategory: "Asset Production",
    capability: "Scale & adapt assets across formats",
    platform: "Figma AI",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.NOT_ENABLED),
      Claude: ps(STATUS.NOT_ENABLED),
      Copilot: ps(STATUS.NOT_ENABLED),
      Gemini: ps(STATUS.NOT_SUPPORTED),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.NOT_SUPPORTED),
      Figma: ps(STATUS.ENABLED, DOCS.figma),
      Azure: ps(STATUS.NOT_ENABLED),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },
  {
    category: "Content & Creative",
    subCategory: "Experimentation",
    capability: "Create A/B variants",
    platform: "ChatGPT Enterprise",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.ENABLED, DOCS.chatgpt),
      Claude: ps(STATUS.ENABLED, DOCS.claude),
      Copilot: ps(STATUS.NOT_ENABLED),
      Gemini: ps(STATUS.NOT_ENABLED),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.NOT_SUPPORTED),
      Figma: ps(STATUS.ENABLED, DOCS.figma),
      Azure: ps(STATUS.NOT_SUPPORTED),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },

  // ========================================================================
  // RESEARCH & INTELLIGENCE
  // ========================================================================
  {
    category: "Research & Intelligence",
    subCategory: "Market Research",
    capability: "Monitor competitors & market trends",
    platform: "Claude",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.ENABLED, DOCS.chatgpt),
      Claude: ps(STATUS.ENABLED, DOCS.claude),
      Copilot: ps(STATUS.ENABLED, DOCS.copilot),
      Gemini: ps(STATUS.ENABLED, DOCS.gemini),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.NOT_SUPPORTED),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.NOT_SUPPORTED),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },
  {
    category: "Research & Intelligence",
    subCategory: "Prospecting",
    capability: "Research & score prospects",
    platform: "Claude",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.ENABLED, DOCS.chatgpt),
      Claude: ps(STATUS.ENABLED, DOCS.claude),
      Copilot: ps(STATUS.NOT_ENABLED),
      Gemini: ps(STATUS.NOT_ENABLED),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.ENABLED, DOCS.powerbi),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.NOT_SUPPORTED),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },
  {
    category: "Research & Intelligence",
    subCategory: "Brand Intelligence",
    capability: "Track brand sentiment & media coverage",
    platform: "Azure AI",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.NOT_ENABLED),
      Claude: ps(STATUS.NOT_ENABLED),
      Copilot: ps(STATUS.NOT_ENABLED),
      Gemini: ps(STATUS.NOT_SUPPORTED),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.ENABLED, DOCS.powerbi),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.ENABLED, DOCS.azure),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },
  {
    category: "Research & Intelligence",
    subCategory: "Regulatory Research",
    capability: "Monitor regulatory & industry changes",
    platform: "Claude",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.ENABLED, DOCS.chatgpt),
      Claude: ps(STATUS.ENABLED, DOCS.claude),
      Copilot: ps(STATUS.NOT_ENABLED),
      Gemini: ps(STATUS.NOT_ENABLED),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.NOT_SUPPORTED),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.NOT_SUPPORTED),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },

  // ========================================================================
  // COMPLIANCE & RISK
  // ========================================================================
  {
    category: "Compliance & Risk",
    subCategory: "Policy Review",
    capability: "Screen content for policy violations",
    platform: "Azure AI",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.NOT_ENABLED),
      Claude: ps(STATUS.NOT_ENABLED),
      Copilot: ps(STATUS.ENABLED, DOCS.copilot),
      Gemini: ps(STATUS.NOT_SUPPORTED),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.NOT_SUPPORTED),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.ENABLED, DOCS.azure),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },
  {
    category: "Compliance & Risk",
    subCategory: "Data Governance",
    capability: "Audit consent & data practices",
    platform: "Azure AI",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.NOT_SUPPORTED),
      Claude: ps(STATUS.NOT_SUPPORTED),
      Copilot: ps(STATUS.NOT_ENABLED),
      Gemini: ps(STATUS.NOT_SUPPORTED),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.NOT_ENABLED),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.ENABLED, DOCS.azure),
      Snowflake: ps(STATUS.ENABLED, DOCS.snowflake),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },
  {
    category: "Compliance & Risk",
    subCategory: "Fraud & Vendor Risk",
    capability: "Detect fraud & score vendor risk",
    platform: "Azure Machine Learning",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.NOT_SUPPORTED),
      Claude: ps(STATUS.NOT_SUPPORTED),
      Copilot: ps(STATUS.NOT_SUPPORTED),
      Gemini: ps(STATUS.NOT_SUPPORTED),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.NOT_ENABLED),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.ENABLED, DOCS.azure),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },
  {
    category: "Compliance & Risk",
    subCategory: "Regulatory Reporting",
    capability: "Monitor regulations & generate reports",
    platform: "Claude",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.ENABLED, DOCS.chatgpt),
      Claude: ps(STATUS.ENABLED, DOCS.claude),
      Copilot: ps(STATUS.ENABLED, DOCS.copilot),
      Gemini: ps(STATUS.NOT_ENABLED),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.ENABLED, DOCS.powerbi),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.NOT_SUPPORTED),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },

  // ========================================================================
  // OPTIMIZATION & TESTING
  // ========================================================================
  {
    category: "Optimization & Testing",
    subCategory: "Experimentation",
    capability: "Design & run experiments",
    platform: "ChatGPT Enterprise",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.ENABLED, DOCS.chatgpt),
      Claude: ps(STATUS.ENABLED, DOCS.claude),
      Copilot: ps(STATUS.NOT_ENABLED),
      Gemini: ps(STATUS.NOT_ENABLED),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.ENABLED, DOCS.powerbi),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.NOT_SUPPORTED),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },
  {
    category: "Optimization & Testing",
    subCategory: "Campaign Optimization",
    capability: "Optimize bids, budgets & pacing",
    platform: "Azure Machine Learning",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.NOT_ENABLED),
      Claude: ps(STATUS.NOT_ENABLED),
      Copilot: ps(STATUS.NOT_SUPPORTED),
      Gemini: ps(STATUS.NOT_SUPPORTED),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.ENABLED, DOCS.powerbi),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.ENABLED, DOCS.azure),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },
  {
    category: "Optimization & Testing",
    subCategory: "Personalization",
    capability: "Personalize & route in real-time",
    platform: "Azure AI",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.NOT_SUPPORTED),
      Claude: ps(STATUS.NOT_SUPPORTED),
      Copilot: ps(STATUS.NOT_SUPPORTED),
      Gemini: ps(STATUS.NOT_SUPPORTED),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.NOT_SUPPORTED),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.ENABLED, DOCS.azure),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },
  {
    category: "Optimization & Testing",
    subCategory: "Predictive Modeling",
    capability: "Build & retrain predictive models",
    platform: "Azure Machine Learning",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.NOT_SUPPORTED),
      Claude: ps(STATUS.NOT_SUPPORTED),
      Copilot: ps(STATUS.NOT_SUPPORTED),
      Gemini: ps(STATUS.NOT_SUPPORTED),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.NOT_SUPPORTED),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.ENABLED, DOCS.azure),
      Snowflake: ps(STATUS.ENABLED, DOCS.snowflake),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },

  // ========================================================================
  // FINANCE & OPERATIONS
  // ========================================================================
  {
    category: "Finance & Operations",
    subCategory: "Reconciliation",
    capability: "Process & reconcile transactions",
    platform: "Azure AI",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.NOT_ENABLED),
      Claude: ps(STATUS.NOT_ENABLED),
      Copilot: ps(STATUS.ENABLED, DOCS.copilot),
      Gemini: ps(STATUS.NOT_SUPPORTED),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.NOT_SUPPORTED),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.ENABLED, DOCS.azure),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },
  {
    category: "Finance & Operations",
    subCategory: "Spend Monitoring",
    capability: "Detect spend anomalies",
    platform: "Power BI",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.NOT_SUPPORTED),
      Claude: ps(STATUS.NOT_SUPPORTED),
      Copilot: ps(STATUS.NOT_SUPPORTED),
      Gemini: ps(STATUS.NOT_SUPPORTED),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.ENABLED, DOCS.powerbi),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.ENABLED, DOCS.azure),
      Snowflake: ps(STATUS.ENABLED, DOCS.snowflake),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },
  {
    category: "Finance & Operations",
    subCategory: "Forecasting",
    capability: "Forecast revenue & cash flow",
    platform: "Azure Machine Learning",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.NOT_ENABLED),
      Claude: ps(STATUS.NOT_ENABLED),
      Copilot: ps(STATUS.NOT_SUPPORTED),
      Gemini: ps(STATUS.NOT_SUPPORTED),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.ENABLED, DOCS.powerbi),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.ENABLED, DOCS.azure),
      Snowflake: ps(STATUS.ENABLED, DOCS.snowflake),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },
  {
    category: "Finance & Operations",
    subCategory: "Reporting",
    capability: "Generate financial reports & narratives",
    platform: "Power BI",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.ENABLED, DOCS.chatgpt),
      Claude: ps(STATUS.ENABLED, DOCS.claude),
      Copilot: ps(STATUS.ENABLED, DOCS.copilot),
      Gemini: ps(STATUS.NOT_ENABLED),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.ENABLED, DOCS.powerbi),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.NOT_SUPPORTED),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },

  // ========================================================================
  // PEOPLE & TALENT
  // ========================================================================
  {
    category: "People & Talent",
    subCategory: "Recruiting",
    capability: "Screen & recruit candidates",
    platform: "ChatGPT Enterprise",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.ENABLED, DOCS.chatgpt),
      Claude: ps(STATUS.ENABLED, DOCS.claude),
      Copilot: ps(STATUS.ENABLED, DOCS.copilot),
      Gemini: ps(STATUS.NOT_ENABLED),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.NOT_SUPPORTED),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.NOT_SUPPORTED),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },
  {
    category: "People & Talent",
    subCategory: "Employee Insights",
    capability: "Analyze sentiment & predict attrition",
    platform: "Azure AI",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.NOT_ENABLED),
      Claude: ps(STATUS.NOT_ENABLED),
      Copilot: ps(STATUS.NOT_SUPPORTED),
      Gemini: ps(STATUS.NOT_SUPPORTED),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.ENABLED, DOCS.powerbi),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.ENABLED, DOCS.azure),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },
  {
    category: "People & Talent",
    subCategory: "Learning & Development",
    capability: "Generate onboarding & training content",
    platform: "ChatGPT Enterprise",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.ENABLED, DOCS.chatgpt),
      Claude: ps(STATUS.ENABLED, DOCS.claude),
      Copilot: ps(STATUS.ENABLED, DOCS.copilot),
      Gemini: ps(STATUS.ENABLED, DOCS.gemini),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.NOT_SUPPORTED),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.NOT_SUPPORTED),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },
  {
    category: "People & Talent",
    subCategory: "Performance",
    capability: "Support performance review cycles",
    platform: "Microsoft Copilot",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.ENABLED, DOCS.chatgpt),
      Claude: ps(STATUS.ENABLED, DOCS.claude),
      Copilot: ps(STATUS.ENABLED, DOCS.copilot),
      Gemini: ps(STATUS.NOT_ENABLED),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.NOT_SUPPORTED),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.NOT_SUPPORTED),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },

  // ========================================================================
  // INFRASTRUCTURE & MONITORING
  // ========================================================================
  {
    category: "Infrastructure & Monitoring",
    subCategory: "Monitoring",
    capability: "Monitor systems & detect anomalies",
    platform: "Azure AI",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.NOT_SUPPORTED),
      Claude: ps(STATUS.NOT_SUPPORTED),
      Copilot: ps(STATUS.NOT_SUPPORTED),
      Gemini: ps(STATUS.NOT_SUPPORTED),
      Augment: ps(STATUS.NOT_SUPPORTED),
      PowerBI: ps(STATUS.NOT_ENABLED),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.ENABLED, DOCS.azure),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },
  {
    category: "Infrastructure & Monitoring",
    subCategory: "Incident Response",
    capability: "Diagnose incidents & root causes",
    platform: "Augment Code",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.ENABLED, DOCS.chatgpt),
      Claude: ps(STATUS.ENABLED, DOCS.claude),
      Copilot: ps(STATUS.ENABLED, DOCS.copilot),
      Gemini: ps(STATUS.NOT_ENABLED),
      Augment: ps(STATUS.ENABLED, DOCS.augment),
      PowerBI: ps(STATUS.NOT_SUPPORTED),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.NOT_SUPPORTED),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.ENABLED, DOCS.jira),
    }
  },
  {
    category: "Infrastructure & Monitoring",
    subCategory: "Automation",
    capability: "Automate remediation",
    platform: "Augment Code",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.NOT_ENABLED),
      Claude: ps(STATUS.NOT_ENABLED),
      Copilot: ps(STATUS.ENABLED, DOCS.copilot),
      Gemini: ps(STATUS.NOT_SUPPORTED),
      Augment: ps(STATUS.ENABLED, DOCS.augment),
      PowerBI: ps(STATUS.NOT_SUPPORTED),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.ENABLED, DOCS.azure),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },
  {
    category: "Infrastructure & Monitoring",
    subCategory: "Planning",
    capability: "Plan capacity & document systems",
    platform: "ChatGPT Enterprise",
    cells: {
      ...blank(),
      ChatGPT: ps(STATUS.ENABLED, DOCS.chatgpt),
      Claude: ps(STATUS.ENABLED, DOCS.claude),
      Copilot: ps(STATUS.ENABLED, DOCS.copilot),
      Gemini: ps(STATUS.NOT_ENABLED),
      Augment: ps(STATUS.ENABLED, DOCS.augment),
      PowerBI: ps(STATUS.NOT_SUPPORTED),
      Figma: ps(STATUS.NOT_SUPPORTED),
      Azure: ps(STATUS.NOT_SUPPORTED),
      Snowflake: ps(STATUS.NOT_SUPPORTED),
      Jira: ps(STATUS.NOT_SUPPORTED),
    }
  },
];

// Export with IDs added
export const MATRIX_ROWS = addIds(RAW_MATRIX_ROWS);
