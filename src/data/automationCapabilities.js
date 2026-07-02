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
