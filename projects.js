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
    "limit": "Focus sessions run while the tab is open. The hosted workspace currently requires owner access and ChatGPT sign-in.",
    "repoName": "Orbit",
    "repoUrl": "https://github.com/IkshwakuVanani/Orbit",
    "private": false,
    "generic": false,
    "repoId": "975353209"
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
    "limit": "Single-owner workspaces. Inventory values use recorded unit cost, not sales revenue. No supplier integration or barcode hardware is connected.",
    "repoName": "Stockroom",
    "repoUrl": "https://github.com/IkshwakuVanani/Stockroom",
    "private": false,
    "generic": false,
    "repoId": "975352918"
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
    "limit": "An illustrative planning tool. It does not register students at Rutgers or any other university.",
    "repoName": "CourseOS",
    "repoUrl": "https://github.com/IkshwakuVanani/CourseOS",
    "private": false,
    "generic": false,
    "repoId": "975352562"
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
    "limit": "An operations prototype with synthetic workflow data. No clinical use or real EHR integration is represented.",
    "repoName": "EDFlow-Analytics",
    "repoUrl": "https://github.com/IkshwakuVanani/EDFlow-Analytics",
    "private": false,
    "generic": false,
    "repoId": "1249564102"
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
    "limit": "High scores are stored on the current browser. Deployment of this repository was outside the three-app completion scope.",
    "repoName": "Tertris",
    "repoUrl": "https://github.com/IkshwakuVanani/Tertris",
    "private": false,
    "generic": false,
    "repoId": "984569842"
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
    "limit": "An experimental repository, not presented as a production project-management service.",
    "repoName": "Interactive-Project-Plan",
    "repoUrl": "https://github.com/IkshwakuVanani/Interactive-Project-Plan",
    "private": false,
    "generic": false,
    "repoId": "988788204"
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
    "limit": "The source contains a client-side display gate; it is a visual experiment rather than secure authentication.",
    "repoName": "Flower",
    "repoUrl": "https://github.com/IkshwakuVanani/Flower",
    "private": false,
    "generic": false,
    "repoId": "985008644"
  },
  {
    "id": "portfolio",
    "title": "This portfolio",
    "type": "Experiments",
    "label": "08 / PERSONAL SYSTEM",
    "description": "An interactive 8-bit project laboratory: spin the centrifuge and crack open a vial to explore each build.",
    "stack": [
      "HTML",
      "CSS",
      "JavaScript",
      "GitHub Pages"
    ],
    "color": "#d4ef90",
    "class": "experiment",
    "problem": "Give a growing collection of repositories a distinctive, playful interface while keeping project details easy to explore.",
    "solution": "A browser-based centrifuge with draggable rotation, momentum, interactive project vials, miniature interface previews, and complete project notes.",
    "features": [
      "Spin the centrifuge and inspect a project vial.",
      "Reveal illustrated previews, descriptions, and repository links.",
      "Explore the complete catalog with keyboard and touch support.",
      "Pause motion and respect reduced-motion preferences."
    ],
    "architecture": [
      "GitHub repository catalog",
      "Interactive rotor",
      "Project previews",
      "Static project notes"
    ],
    "limit": "Miniature screens are illustrative previews. Some repositories and linked application workspaces require authorized access.",
    "repoName": "Portfolio",
    "repoUrl": "https://github.com/IkshwakuVanani/Portfolio",
    "private": false,
    "generic": false,
    "repoId": "975339502"
  },
  {
    "id": "CellClash",
    "title": "CellClash",
    "type": "Experiments",
    "label": "09 / MULTIPLAYER",
    "description": "A browser cell arena with Canvas rendering, WebSocket multiplayer, and server-side game state.",
    "stack": [
      "JavaScript",
      "Canvas",
      "Node.js",
      "WebSockets",
      "MongoDB"
    ],
    "color": "#74dba9",
    "class": "game",
    "problem": "Explore a shared browser arena where cells grow by consuming pellets and smaller players.",
    "solution": "The README describes a Canvas client, a Node.js WebSocket server, server-side movement and collision logic, and MongoDB high scores.",
    "features": [
      "Mouse-controlled cells and pellet-based growth.",
      "Real-time player updates and an in-game leaderboard.",
      "Server-side movement validation and collision handling."
    ],
    "architecture": [
      "Canvas client",
      "WebSocket messages",
      "Node.js game server",
      "MongoDB scores"
    ],
    "limit": "Summarized from the repository README. Multiplayer capacity, anti-cheat effectiveness, and deployment availability have not been independently verified.",
    "repoName": "CellClash",
    "repoUrl": "https://github.com/IkshwakuVanani/CellClash",
    "private": false,
    "generic": false,
    "repoId": "981755524"
  },
  {
    "id": "Slithering.io",
    "title": "Slithering.io",
    "type": "Experiments",
    "label": "10 / MULTIPLAYER",
    "description": "A multiplayer snake arena with mouse steering, food, collisions, and a live leaderboard.",
    "stack": [
      "JavaScript",
      "Canvas",
      "Node.js",
      "Express",
      "WebSockets"
    ],
    "color": "#e7ce79",
    "class": "game",
    "problem": "Explore synchronized snake movement and shared arena rules across browsers on a local network.",
    "solution": "The README documents an authoritative Node.js server with WebSocket updates, a Canvas client, food and collision rules, respawning, spectating, and zoom controls.",
    "features": [
      "Mouse-based steering, growth, and player collisions.",
      "Live score leaderboard, respawn, and spectator view.",
      "LAN multiplayer setup documented for up to eight players."
    ],
    "architecture": [
      "Browser input",
      "WebSocket connection",
      "Authoritative server state",
      "Canvas rendering"
    ],
    "limit": "The documented setup runs on a local network. Player capacity and runtime behavior have not been independently tested for this portfolio entry.",
    "repoName": "Slithering.io",
    "repoUrl": "https://github.com/IkshwakuVanani/Slithering.io",
    "private": false,
    "generic": false,
    "repoId": "981768145"
  },
  {
    "id": "scarlet-pad-connect",
    "title": "Scarlet Pad",
    "type": "Applications",
    "label": "11 / COMMUNITY",
    "description": "A housing and roommate companion for the Rutgers–New Brunswick community.",
    "stack": [
      "React",
      "TypeScript",
      "Supabase",
      "Leaflet"
    ],
    "color": "#ef8b8f",
    "class": "experiment",
    "homepage": "https://scarlet-pad-connect.vercel.app",
    "problem": "Bring housing exploration, practical cost comparisons, roommate discovery, and on-campus preparation into one place.",
    "solution": "The README describes housing filters and maps, saved homes, comparison tools, opt-in roommate profiles, consent-based connections, and a private planning checklist.",
    "features": [
      "Housing discovery with campus, rent, bedroom, lease, and amenity filters.",
      "Saved homes and side-by-side comparisons.",
      "Opt-in roommate discovery and consent-based contact sharing.",
      "Rutgers email membership and a private housing planner."
    ],
    "architecture": [
      "React interface",
      "Rutgers email membership",
      "Supabase data & storage",
      "Leaflet maps"
    ],
    "limit": "An independent project, not an official Rutgers service. Member homes and profiles require sign-in. It does not verify properties, process rent, or promise housing outcomes.",
    "repoName": "scarlet-pad-connect",
    "repoUrl": "https://github.com/IkshwakuVanani/scarlet-pad-connect",
    "private": false,
    "generic": false,
    "repoId": "1057587724"
  },
  {
    "id": "llm-training",
    "title": "LLM Training",
    "type": "Data",
    "label": "12 / MACHINE LEARNING",
    "description": "A learning repository containing notebooks and guides from Sebastian Raschka’s Build a Large Language Model (From Scratch).",
    "stack": [
      "Python",
      "Jupyter Notebook",
      "PyTorch"
    ],
    "color": "#92b5f2",
    "class": "data",
    "problem": "Study the components of a GPT-style language model through notebooks and educational code.",
    "solution": "The repository contains book companion material covering text processing, attention, GPT architecture, pretraining, classification, and instruction fine-tuning. Its README credits Sebastian Raschka and the upstream rasbt/LLMs-from-scratch project.",
    "features": [
      "Chapter notebooks for text data, attention, and model construction.",
      "Educational pretraining and fine-tuning examples.",
      "PyTorch setup guidance and supporting exercises."
    ],
    "architecture": [
      "Book companion notebooks",
      "PyTorch examples",
      "Training & fine-tuning studies"
    ],
    "limit": "A learning collection based on Sebastian Raschka’s book and upstream project, not a claim of original model research or a trained production model.",
    "attributionUrl": "https://github.com/rasbt/LLMs-from-scratch",
    "repoName": "llm-training",
    "repoUrl": "https://github.com/IkshwakuVanani/llm-training",
    "private": false,
    "generic": false,
    "repoId": "1197709405"
  },
  {
    "id": "islocked",
    "title": "islocked",
    "type": "Experiments",
    "label": "13 / PRIVATE REPOSITORY",
    "description": "A private repository in Ikshwaku Vanani’s GitHub collection. Source access is restricted.",
    "stack": [
      "Private repository"
    ],
    "color": "#87c8cf",
    "class": "experiment",
    "problem": "This repository is included in the project catalog with its GitHub access restrictions preserved.",
    "solution": "Only the repository name and visibility are shown. Project implementation details are not published in this entry.",
    "features": [
      "Private source repository.",
      "GitHub access requires authorization."
    ],
    "architecture": [
      "Private GitHub repository"
    ],
    "limit": "Private repository. The source link is available only to authorized GitHub accounts; implementation and deployment details are not exposed here.",
    "private": true,
    "generic": true,
    "repoName": "islocked",
    "repoUrl": "https://github.com/IkshwakuVanani/islocked",
    "repoId": "1197917631"
  },
  {
    "id": "RankRiser",
    "title": "RankRiser",
    "type": "Experiments",
    "label": "14 / PRIVATE REPOSITORY",
    "description": "A private repository in Ikshwaku Vanani’s GitHub collection. Source access is restricted.",
    "stack": [
      "Private repository"
    ],
    "color": "#c8a4eb",
    "class": "experiment",
    "problem": "This repository is included in the project catalog with its GitHub access restrictions preserved.",
    "solution": "Only the repository name and visibility are shown. Project implementation details are not published in this entry.",
    "features": [
      "Private source repository.",
      "GitHub access requires authorization."
    ],
    "architecture": [
      "Private GitHub repository"
    ],
    "limit": "Private repository. The source link is available only to authorized GitHub accounts; implementation and deployment details are not exposed here.",
    "private": true,
    "generic": true,
    "repoName": "RankRiser",
    "repoUrl": "https://github.com/IkshwakuVanani/RankRiser",
    "repoId": "1214668475"
  }
];
