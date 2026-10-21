window.PROJECTS = [
  {
    "id": "task-organizer-app",
    "title": "Orbit",
    "type": "Applications",
    "label": "01 / PRODUCTIVITY",
    "description": "A focused workspace for projects, priorities, and daily momentum.",
    "stack": [
      "React",
      "Express",
      "D1",
      "MySQL"
    ],
    "color": "#cbec89",
    "class": "orbit",
    "url": "https://orbit-iv-vanani.fabled-crumb-5773.chatgpt.site",
    "problem": "The original repository held a setup script, rather than a working application. The goal was to turn that starting point into a usable planning workspace.",
    "solution": "A task board with projects, due dates, priorities, search, list view, completion insights, and a focus timer. The Express version supports private accounts and SQLite or MySQL. The hosted version uses ChatGPT sign-in and persistent D1 records.",
    "features": [
      "Create, edit, delete, and move tasks across three workflow states.",
      "Filter projects, search notes, and track project completion.",
      "Pause and reset a 25-minute focus timer.",
      "Keep tasks private to the signed-in account."
    ],
    "architecture": [
      "React interface",
      "Same-origin API",
      "Identity + validation",
      "Persistent task store"
    ],
    "limit": "Focus sessions run while the tab is open. The hosted workspace currently requires owner access and ChatGPT sign-in."
  },
  {
    "id": "inventory-management-system",
    "title": "Stockroom",
    "type": "Applications",
    "label": "02 / OPERATIONS",
    "description": "Inventory clarity, from the first product to the last stock movement.",
    "stack": [
      "React",
      "JavaScript",
      "D1",
      "SQL"
    ],
    "color": "#80d7bb",
    "class": "stock",
    "url": "https://stockroom-iv-vanani.fabled-crumb-5773.chatgpt.site",
    "problem": "A small PHP CRUD prototype could list products, but lacked the stock controls and deployment needed for daily use.",
    "solution": "A private inventory workspace with product management, category and stock filters, reorder thresholds, integer-cent valuation, CSV exports, and an auditable stock ledger. The rebuilt hosted application runs on JavaScript and D1.",
    "features": [
      "Create and edit products with unique SKUs and recorded unit costs.",
      "Record stock changes atomically with a required reason.",
      "Block negative balances and retain history for archived products.",
      "Export the filtered inventory to a spreadsheet-safe CSV."
    ],
    "architecture": [
      "Inventory interface",
      "Validated JSON API",
      "Guarded stock update",
      "Atomic movement ledger"
    ],
    "limit": "Single-owner workspaces. Inventory values use recorded unit cost, not sales revenue. No supplier integration or barcode hardware is connected."
  },
  {
    "id": "student-course-portal",
    "title": "CourseOS",
    "type": "Applications",
    "label": "03 / EDUCATION",
    "description": "A semester planner that makes room for ambition and catches scheduling conflicts.",
    "stack": [
      "React",
      "JavaScript",
      "D1",
      "SQL"
    ],
    "color": "#c1a7f0",
    "class": "course",
    "url": "https://courseos-iv-vanani.fabled-crumb-5773.chatgpt.site",
    "problem": "The unfinished Laravel project offered basic course records without a complete enrollment workflow or runnable deployment.",
    "solution": "A personal course catalog and enrollment planner with editable course details, weekday schedules, conflict checks, credit limits, a weekly view, and CSV plan export. Rebuilt for JavaScript hosting with durable D1 storage.",
    "features": [
      "Build a personal catalog or load a labeled sample catalog.",
      "Add and drop courses from a persistent study plan.",
      "Enforce schedule overlaps and an 18-credit ceiling in the database write.",
      "Review the week by weekday and export the plan."
    ],
    "architecture": [
      "Course catalog",
      "Enrollment API",
      "Conflict + credit guards",
      "Persistent study plan"
    ],
    "limit": "An illustrative planning tool. It does not register students at Rutgers or any other university."
  },
  {
    "id": "EDFlow-Analytics",
    "title": "EDFlow Orchestrator",
    "type": "Data",
    "label": "04 / DATA & SYSTEMS",
    "description": "A hospital operations prototype connecting capacity constraints, accountable actions, and public-data analytics.",
    "stack": [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "React"
    ],
    "color": "#80b3f0",
    "class": "data",
    "problem": "Hospital capacity dashboards can show friction without clarifying the next accountable operational step.",
    "solution": "The repository models synthetic med-surg capacity workflows and includes CMS data pipelines, a FastAPI backend, and a React interface.",
    "features": [
      "Capacity graph and ranked operational blockers.",
      "Action ownership and what-if simulation.",
      "Public CMS analytics and validation pipelines."
    ],
    "architecture": [
      "CMS datasets",
      "Python pipelines",
      "FastAPI services",
      "React analytics"
    ],
    "limit": "An operations prototype with synthetic workflow data. No clinical use or real EHR integration is represented."
  },
  {
    "id": "Tertris",
    "title": "Tertris: Neon Rift",
    "type": "Experiments",
    "label": "05 / INTERACTION",
    "description": "An arcade browser game with hold and preview systems, combo scoring, particles, and synthesized audio.",
    "stack": [
      "JavaScript",
      "Canvas",
      "CSS"
    ],
    "color": "#b5a0f5",
    "class": "game",
    "problem": "Build an expressive browser arcade experience around readable controls and a responsive game loop.",
    "solution": "A static web game with ghost and hold pieces, level progression, sound synthesis, responsive controls, and device-local high scores.",
    "features": [
      "Hold chamber and three-piece preview.",
      "Combo scoring and particle effects.",
      "Keyboard controls and local high scores."
    ],
    "architecture": [
      "Player input",
      "Game loop",
      "Canvas renderer",
      "Browser audio"
    ],
    "limit": "High scores are stored on the current browser. Deployment of this repository was outside the three-app completion scope."
  },
  {
    "id": "Interactive-Project-Plan",
    "title": "Interactive Project Plan",
    "type": "Experiments",
    "label": "06 / PROTOTYPE",
    "description": "A single-page exploration of project planning and interactive presentation.",
    "stack": [
      "HTML",
      "JavaScript",
      "CSS"
    ],
    "color": "#e9be87",
    "class": "experiment",
    "problem": "Explore how a project plan can be presented as an interactive browser surface.",
    "solution": "A standalone HTML prototype. The full implementation and current scope can be inspected in its source.",
    "features": [
      "Single-file browser prototype.",
      "Source-first exploration of planning interfaces."
    ],
    "architecture": [
      "HTML structure",
      "Browser interaction",
      "Local presentation"
    ],
    "limit": "An experimental repository, not presented as a production project-management service."
  },
  {
    "id": "Flower",
    "title": "Flower",
    "type": "Experiments",
    "label": "07 / CREATIVE CODE",
    "description": "A Canvas bloom experiment using depth, rotation, and gradual animation.",
    "stack": [
      "Canvas",
      "JavaScript",
      "HTML"
    ],
    "color": "#e2a6ab",
    "class": "flower",
    "problem": "Explore animated flowers with simple perspective and depth ordering.",
    "solution": "A small Canvas experiment using generated positions, gradual blooming, and rotation.",
    "features": [
      "Canvas flower rendering.",
      "Perspective-inspired depth and staged bloom animation."
    ],
    "architecture": [
      "Generated positions",
      "Depth ordering",
      "Canvas animation"
    ],
    "limit": "The source contains a client-side display gate; it is a visual experiment rather than secure authentication."
  },
  {
    "id": "portfolio",
    "title": "This portfolio",
    "type": "Experiments",
    "label": "08 / PERSONAL SYSTEM",
    "description": "A lightweight engineering portfolio with project case studies and a resilient repository index.",
    "stack": [
      "HTML",
      "CSS",
      "JavaScript",
      "GitHub Pages"
    ],
    "color": "#d4ef90",
    "class": "experiment",
    "problem": "Replace generic concept art and stale descriptions with a clear, grounded view of the work.",
    "solution": "A new visual identity, curated case studies, functional filters, accessible navigation, and project links that do not depend on a successful live API request.",
    "features": [
      "Project search and category filters.",
      "Dedicated project case studies.",
      "Responsive layout and reduced-motion support."
    ],
    "architecture": [
      "Curated project data",
      "Static interface",
      "GitHub metadata",
      "GitHub Pages"
    ],
    "limit": "App workspaces linked from this site are owner-private deployments."
  }
];
