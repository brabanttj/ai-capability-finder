/**
 * AI Automation Capabilities — generated from ai_automation_master.xlsx
 * (sheets "Capabilities" + "Tools"). Do not edit by hand; edit the workbook
 * and re-run `npm run gen:data`.
 */

export const TOOLS = [
  {
    "name": "ChatGPT Enterprise",
    "icon": "🤖",
    "category": "General AI",
    "available": true,
    "docUrl": "https://docs.company.com/ai-tools/chatgpt"
  },
  {
    "name": "Claude",
    "icon": "🧠",
    "category": "General AI",
    "available": true,
    "docUrl": "https://docs.company.com/ai-tools/claude"
  },
  {
    "name": "Microsoft Copilot",
    "icon": "💼",
    "category": "Productivity",
    "available": true,
    "docUrl": "https://docs.company.com/ai-tools/copilot"
  },
  {
    "name": "Google Gemini",
    "icon": "✨",
    "category": "General AI",
    "available": false,
    "docUrl": ""
  },
  {
    "name": "Augment Code",
    "icon": "⚡",
    "category": "Development",
    "available": true,
    "docUrl": "https://docs.company.com/ai-tools/augment"
  },
  {
    "name": "GitHub Copilot",
    "icon": "🐙",
    "category": "Development",
    "available": true,
    "docUrl": "https://docs.company.com/ai-tools/github-copilot"
  },
  {
    "name": "Power BI AI",
    "icon": "📊",
    "category": "Analytics",
    "available": true,
    "docUrl": "https://docs.company.com/ai-tools/powerbi"
  },
  {
    "name": "Tableau AI",
    "icon": "📈",
    "category": "Analytics",
    "available": false,
    "docUrl": ""
  },
  {
    "name": "Azure AI",
    "icon": "☁️",
    "category": "Cloud AI",
    "available": true,
    "docUrl": "https://docs.company.com/ai-tools/azure-ai"
  },
  {
    "name": "Snowflake Cortex",
    "icon": "❄️",
    "category": "Data Platform",
    "available": true,
    "docUrl": "https://docs.company.com/ai-tools/snowflake"
  },
  {
    "name": "Salesforce Einstein",
    "icon": "⚡",
    "category": "CRM",
    "available": false,
    "docUrl": ""
  },
  {
    "name": "HubSpot AI",
    "icon": "🎯",
    "category": "Marketing",
    "available": true,
    "docUrl": "https://docs.company.com/ai-tools/hubspot"
  },
  {
    "name": "Jasper AI",
    "icon": "✍️",
    "category": "Content",
    "available": false,
    "docUrl": ""
  },
  {
    "name": "Grammarly Business",
    "icon": "📝",
    "category": "Writing",
    "available": true,
    "docUrl": "https://docs.company.com/ai-tools/grammarly"
  },
  {
    "name": "Figma AI",
    "icon": "🎨",
    "category": "Design",
    "available": false,
    "docUrl": ""
  }
];

export const CAPABILITIES = [
  {
    "department": "Human Resources",
    "category": "Talent Acquisition",
    "capability": "Candidate sourcing",
    "description": "AI sourcing from LinkedIn, resumes, databases",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Power BI AI",
      "Snowflake Cortex",
      "Grammarly Business"
    ],
    "usage": {
      "ChatGPT Enterprise": [
        {
          "author": "Jon Smith",
          "url": "https://example.com/guides/jon-candidate-sourcing-chatgpt"
        },
        {
          "author": "Mary Jones",
          "url": "https://example.com/guides/mary-candidate-sourcing-chatgpt"
        },
        {
          "author": "Wei Chen",
          "url": "https://example.com/guides/wei-candidate-sourcing-chatgpt"
        }
      ],
      "Claude": [
        {
          "author": "Priya Patel",
          "url": "https://example.com/guides/priya-candidate-sourcing-claude"
        },
        {
          "author": "Tomas Alvarez",
          "url": "https://example.com/guides/tomas-candidate-sourcing-claude"
        }
      ]
    }
  },
  {
    "department": "Human Resources",
    "category": "Talent Acquisition",
    "capability": "Resume screening",
    "description": "Automated resume parsing and ranking",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Grammarly Business"
    ],
    "usage": {
      "ChatGPT Enterprise": [
        {
          "author": "Dana Lee",
          "url": "https://example.com/guides/dana-resume-screening-chatgpt"
        },
        {
          "author": "Rachel Kim",
          "url": "https://example.com/guides/rachel-resume-screening-chatgpt"
        }
      ],
      "Claude": [
        {
          "author": "Omar Farouk",
          "url": "https://example.com/guides/omar-resume-screening-claude"
        }
      ]
    }
  },
  {
    "department": "Human Resources",
    "category": "Employee Experience",
    "capability": "Onboarding workflows",
    "description": "Automated onboarding checklists and comms",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Grammarly Business"
    ],
    "usage": {
      "Microsoft Copilot": [
        {
          "author": "Leah Park",
          "url": "https://example.com/guides/leah-onboarding-copilot"
        },
        {
          "author": "Devin Cross",
          "url": "https://example.com/guides/devin-onboarding-copilot"
        }
      ]
    }
  },
  {
    "department": "Human Resources",
    "category": "Employee Experience",
    "capability": "Employee sentiment analysis",
    "description": "Analyze surveys, Slack, email tone",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Grammarly Business"
    ],
    "usage": {}
  },
  {
    "department": "Human Resources",
    "category": "People Ops",
    "capability": "Policy management",
    "description": "Auto-generate and update HR policies",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Grammarly Business"
    ],
    "usage": {}
  },
  {
    "department": "Finance",
    "category": "Planning",
    "capability": "Revenue forecasting",
    "description": "Predict revenue using historical + external data",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Power BI AI",
      "Snowflake Cortex"
    ],
    "usage": {}
  },
  {
    "department": "Finance",
    "category": "Operations",
    "capability": "Invoice processing",
    "description": "OCR + classification + routing",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Power BI AI",
      "Snowflake Cortex"
    ],
    "usage": {}
  },
  {
    "department": "Accounting",
    "category": "Close Process",
    "capability": "Account reconciliation",
    "description": "Auto-match transactions and flag anomalies",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Power BI AI",
      "Snowflake Cortex"
    ],
    "usage": {}
  },
  {
    "department": "Accounting",
    "category": "Compliance",
    "capability": "Audit preparation",
    "description": "Auto-compile audit trails and docs",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Power BI AI",
      "Snowflake Cortex",
      "Grammarly Business"
    ],
    "usage": {}
  },
  {
    "department": "Software Engineering",
    "category": "Development",
    "capability": "Code writing",
    "description": "Assist engineers with code generation",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Augment Code",
      "GitHub Copilot",
      "Grammarly Business"
    ],
    "usage": {
      "GitHub Copilot": [
        {
          "author": "Alex Kim",
          "url": "https://example.com/guides/alex-code-writing-copilot"
        },
        {
          "author": "Sarah Bell",
          "url": "https://example.com/guides/sarah-code-writing-copilot"
        }
      ],
      "Augment Code": [
        {
          "author": "Sam Rivera",
          "url": "https://example.com/guides/sam-code-writing-augment"
        }
      ],
      "Claude": [
        {
          "author": "Nina Patel",
          "url": "https://example.com/guides/nina-code-writing-claude"
        }
      ]
    }
  },
  {
    "department": "Software Engineering",
    "category": "QA",
    "capability": "Automated test generation",
    "description": "Generate unit/integration tests",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Augment Code",
      "GitHub Copilot"
    ],
    "usage": {}
  },
  {
    "department": "Software Engineering",
    "category": "DevOps",
    "capability": "Pipeline automation",
    "description": "Optimize and manage CI/CD pipelines",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Augment Code",
      "GitHub Copilot"
    ],
    "usage": {}
  },
  {
    "department": "Software Engineering",
    "category": "Maintenance",
    "capability": "Bug detection",
    "description": "AI-assisted debugging and root cause analysis",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Augment Code",
      "GitHub Copilot"
    ],
    "usage": {}
  },
  {
    "department": "Tech Ops",
    "category": "Infrastructure",
    "capability": "System monitoring",
    "description": "Detect anomalies in infra metrics",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Power BI AI",
      "Azure AI",
      "Snowflake Cortex"
    ],
    "usage": {}
  },
  {
    "department": "Tech Ops",
    "category": "Security",
    "capability": "Security monitoring",
    "description": "Detect unusual access or threats",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Azure AI"
    ],
    "usage": {}
  },
  {
    "department": "Tech Ops",
    "category": "Support",
    "capability": "Incident triage",
    "description": "Auto-prioritize and route incidents",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Azure AI"
    ],
    "usage": {}
  },
  {
    "department": "Product Management",
    "category": "Discovery",
    "capability": "User research synthesis",
    "description": "Summarize interviews and feedback",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Grammarly Business"
    ],
    "usage": {}
  },
  {
    "department": "Product Management",
    "category": "Planning",
    "capability": "Roadmap generation",
    "description": "Suggest prioritization based on data",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Power BI AI",
      "Snowflake Cortex",
      "Grammarly Business"
    ],
    "usage": {}
  },
  {
    "department": "Product Management",
    "category": "Execution",
    "capability": "PRD drafting",
    "description": "Auto-generate product requirement docs",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Grammarly Business"
    ],
    "usage": {}
  },
  {
    "department": "Design/UX",
    "category": "Research",
    "capability": "User testing analysis",
    "description": "Summarize usability tests",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Augment Code",
      "GitHub Copilot",
      "Grammarly Business"
    ],
    "usage": {}
  },
  {
    "department": "Design/UX",
    "category": "Design",
    "capability": "Wireframe generation",
    "description": "Generate UI layouts from prompts",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Grammarly Business"
    ],
    "usage": {}
  },
  {
    "department": "Design/UX",
    "category": "Content",
    "capability": "Microcopy generation",
    "description": "Generate UX copy variations",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Grammarly Business"
    ],
    "usage": {}
  },
  {
    "department": "Data Engineering",
    "category": "Pipelines",
    "capability": "Data pipeline automation",
    "description": "Build/optimize pipelines",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Augment Code",
      "GitHub Copilot",
      "Power BI AI",
      "Azure AI",
      "Snowflake Cortex"
    ],
    "usage": {}
  },
  {
    "department": "Data Engineering",
    "category": "Quality",
    "capability": "Data quality checks",
    "description": "Detect anomalies and missing data",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Augment Code",
      "GitHub Copilot",
      "Power BI AI",
      "Azure AI",
      "Snowflake Cortex"
    ],
    "usage": {}
  },
  {
    "department": "Reporting",
    "category": "Analytics",
    "capability": "Dashboard generation",
    "description": "Auto-create dashboards from queries",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Power BI AI",
      "Snowflake Cortex"
    ],
    "usage": {
      "Power BI AI": [
        {
          "author": "Chris Doyle",
          "url": "https://example.com/guides/chris-dashboards-powerbi"
        },
        {
          "author": "Maria Gomez",
          "url": "https://example.com/guides/maria-dashboards-powerbi"
        }
      ]
    }
  },
  {
    "department": "Reporting",
    "category": "Insights",
    "capability": "Insight generation",
    "description": "Auto-explain trends and anomalies",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Power BI AI",
      "Snowflake Cortex"
    ],
    "usage": {}
  },
  {
    "department": "Strategy",
    "category": "Market Intelligence",
    "capability": "Competitive analysis",
    "description": "Analyze competitors and market trends",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Power BI AI",
      "Snowflake Cortex"
    ],
    "usage": {}
  },
  {
    "department": "Strategy",
    "category": "Planning",
    "capability": "Scenario simulation",
    "description": "Model business scenarios",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Power BI AI",
      "Snowflake Cortex"
    ],
    "usage": {}
  },
  {
    "department": "Account Management",
    "category": "Client Ops",
    "capability": "Client reporting",
    "description": "Auto-generate reports",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Power BI AI",
      "Snowflake Cortex",
      "HubSpot AI",
      "Grammarly Business"
    ],
    "usage": {}
  },
  {
    "department": "Account Management",
    "category": "Engagement",
    "capability": "Client communication",
    "description": "Draft emails and updates",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "HubSpot AI",
      "Grammarly Business"
    ],
    "usage": {}
  },
  {
    "department": "Business Development",
    "category": "Lead Gen",
    "capability": "Lead identification",
    "description": "Find and qualify leads",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "HubSpot AI",
      "Grammarly Business"
    ],
    "usage": {}
  },
  {
    "department": "Business Development",
    "category": "Outreach",
    "capability": "Outreach personalization",
    "description": "Personalized outreach emails",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "HubSpot AI",
      "Grammarly Business"
    ],
    "usage": {}
  },
  {
    "department": "Copywriting",
    "category": "Content",
    "capability": "Ad copy generation",
    "description": "Generate ad variants",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Grammarly Business"
    ],
    "usage": {
      "ChatGPT Enterprise": [
        {
          "author": "Zoe Adams",
          "url": "https://example.com/guides/zoe-adcopy-chatgpt"
        },
        {
          "author": "Ravi Shah",
          "url": "https://example.com/guides/ravi-adcopy-chatgpt"
        }
      ],
      "Grammarly Business": [
        {
          "author": "Ben Ortiz",
          "url": "https://example.com/guides/ben-adcopy-grammarly"
        }
      ]
    }
  },
  {
    "department": "Copywriting",
    "category": "Content",
    "capability": "SEO optimization",
    "description": "Optimize content for search",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Grammarly Business"
    ],
    "usage": {}
  },
  {
    "department": "Copywriting",
    "category": "Content",
    "capability": "Content editing",
    "description": "Rewrite and improve tone",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Grammarly Business"
    ],
    "usage": {}
  },
  {
    "department": "Legal",
    "category": "Contracts",
    "capability": "Contract analysis",
    "description": "Summarize and flag risks",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Grammarly Business"
    ],
    "usage": {
      "Claude": [
        {
          "author": "Grace Liu",
          "url": "https://example.com/guides/grace-contract-analysis-claude"
        }
      ]
    }
  },
  {
    "department": "Legal",
    "category": "Compliance",
    "capability": "Regulatory monitoring",
    "description": "Track regulatory changes",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Azure AI",
      "Grammarly Business"
    ],
    "usage": {}
  },
  {
    "department": "Performance Marketing",
    "category": "Acquisition",
    "capability": "Campaign optimization",
    "description": "Optimize bids and targeting",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "HubSpot AI",
      "Grammarly Business"
    ],
    "usage": {}
  },
  {
    "department": "Performance Marketing",
    "category": "Creative",
    "capability": "Creative testing",
    "description": "Generate/test ad creatives",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Augment Code",
      "GitHub Copilot",
      "HubSpot AI",
      "Grammarly Business"
    ],
    "usage": {}
  },
  {
    "department": "Performance Marketing",
    "category": "Analytics",
    "capability": "Attribution modeling",
    "description": "Optimize attribution models",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Power BI AI",
      "Snowflake Cortex",
      "HubSpot AI",
      "Grammarly Business"
    ],
    "usage": {}
  },
  {
    "department": "Sales",
    "category": "Pipeline",
    "capability": "CRM automation",
    "description": "Update and manage CRM entries",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Augment Code",
      "GitHub Copilot",
      "HubSpot AI"
    ],
    "usage": {}
  },
  {
    "department": "Sales",
    "category": "Enablement",
    "capability": "Sales coaching",
    "description": "Analyze calls and suggest improvements",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "HubSpot AI"
    ],
    "usage": {}
  },
  {
    "department": "Sales",
    "category": "Forecasting",
    "capability": "Sales forecasting",
    "description": "Predict deal outcomes",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "Power BI AI",
      "Snowflake Cortex",
      "HubSpot AI"
    ],
    "usage": {}
  },
  {
    "department": "Customer Support",
    "category": "Support Ops",
    "capability": "Chatbots",
    "description": "Automate responses",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "HubSpot AI",
      "Grammarly Business"
    ],
    "usage": {}
  },
  {
    "department": "Customer Support",
    "category": "Quality",
    "capability": "Support QA",
    "description": "Analyze support quality",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "HubSpot AI",
      "Grammarly Business"
    ],
    "usage": {}
  },
  {
    "department": "Customer Support",
    "category": "Insights",
    "capability": "Customer insights",
    "description": "Extract themes from tickets",
    "tools": [
      "ChatGPT Enterprise",
      "Claude",
      "Microsoft Copilot",
      "HubSpot AI",
      "Grammarly Business"
    ],
    "usage": {}
  }
];

export const DEPARTMENTS = [
  "Human Resources",
  "Finance",
  "Accounting",
  "Software Engineering",
  "Tech Ops",
  "Product Management",
  "Design/UX",
  "Data Engineering",
  "Reporting",
  "Strategy",
  "Account Management",
  "Business Development",
  "Copywriting",
  "Legal",
  "Performance Marketing",
  "Sales",
  "Customer Support"
];

export const CATEGORIES_BY_DEPARTMENT = {
  "Human Resources": [
    "Talent Acquisition",
    "Employee Experience",
    "People Ops"
  ],
  "Finance": [
    "Planning",
    "Operations"
  ],
  "Accounting": [
    "Close Process",
    "Compliance"
  ],
  "Software Engineering": [
    "Development",
    "QA",
    "DevOps",
    "Maintenance"
  ],
  "Tech Ops": [
    "Infrastructure",
    "Security",
    "Support"
  ],
  "Product Management": [
    "Discovery",
    "Planning",
    "Execution"
  ],
  "Design/UX": [
    "Research",
    "Design",
    "Content"
  ],
  "Data Engineering": [
    "Pipelines",
    "Quality"
  ],
  "Reporting": [
    "Analytics",
    "Insights"
  ],
  "Strategy": [
    "Market Intelligence",
    "Planning"
  ],
  "Account Management": [
    "Client Ops",
    "Engagement"
  ],
  "Business Development": [
    "Lead Gen",
    "Outreach"
  ],
  "Copywriting": [
    "Content"
  ],
  "Legal": [
    "Contracts",
    "Compliance"
  ],
  "Performance Marketing": [
    "Acquisition",
    "Creative",
    "Analytics"
  ],
  "Sales": [
    "Pipeline",
    "Enablement",
    "Forecasting"
  ],
  "Customer Support": [
    "Support Ops",
    "Quality",
    "Insights"
  ]
};

export const DEPARTMENT_META = {
  "Human Resources": {
    "color": "#0069BA",
    "icon": "👥"
  },
  "Finance": {
    "color": "#08C177",
    "icon": "💰"
  },
  "Accounting": {
    "color": "#078181",
    "icon": "📒"
  },
  "Software Engineering": {
    "color": "#4B5FB5",
    "icon": "💻"
  },
  "Tech Ops": {
    "color": "#C9822E",
    "icon": "🖥️"
  },
  "Product Management": {
    "color": "#B24A6B",
    "icon": "🧭"
  },
  "Design/UX": {
    "color": "#1E9CB8",
    "icon": "🎨"
  },
  "Data Engineering": {
    "color": "#2F8F4E",
    "icon": "🗄️"
  },
  "Reporting": {
    "color": "#6C5CB8",
    "icon": "📊"
  },
  "Strategy": {
    "color": "#A9832C",
    "icon": "♟️"
  },
  "Account Management": {
    "color": "#0E6E78",
    "icon": "🤝"
  },
  "Business Development": {
    "color": "#3F7BC4",
    "icon": "📈"
  },
  "Copywriting": {
    "color": "#B3573C",
    "icon": "✍️"
  },
  "Legal": {
    "color": "#12A594",
    "icon": "⚖️"
  },
  "Performance Marketing": {
    "color": "#8457AA",
    "icon": "📣"
  },
  "Sales": {
    "color": "#2A7DA3",
    "icon": "💼"
  },
  "Customer Support": {
    "color": "#C25E86",
    "icon": "🎧"
  }
};

export const REQUESTS = [
  {
    "submitted": "2026-06-24",
    "request": "Auto-summarize weekly team standups",
    "department": "Product Management",
    "details": "Turn recorded standups into a short written recap with action items."
  },
  {
    "submitted": "2026-06-25",
    "request": "Draft QBR decks from CRM data",
    "department": "Sales",
    "details": "Generate a first-draft quarterly business review from Salesforce numbers."
  },
  {
    "submitted": "2026-06-25",
    "request": "Detect duplicate vendor invoices",
    "department": "Finance",
    "details": "Flag likely duplicate or near-duplicate invoices before payment."
  },
  {
    "submitted": "2026-06-26",
    "request": "Generate release notes from merged PRs",
    "department": "Software Engineering",
    "details": "Summarize the week's merged pull requests into customer-facing notes."
  },
  {
    "submitted": "2026-06-27",
    "request": "Summarize customer call recordings",
    "department": "Customer Support",
    "details": "Produce a short summary + sentiment from support call transcripts."
  },
  {
    "submitted": "2026-06-28",
    "request": "Draft job descriptions from a role brief",
    "department": "Human Resources",
    "details": "Turn a few bullet points into a full, on-brand job description."
  },
  {
    "submitted": "2026-06-30",
    "request": "Auto-tag support tickets by theme",
    "department": "Customer Support",
    "details": "Cluster incoming tickets into themes so trends are visible."
  }
];
