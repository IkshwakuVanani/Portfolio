# IV / LAB — Ideas in motion

Ikshwaku Vanani’s portfolio is an interactive pixel laboratory. An isometric centrifuge holds project vials that crack open on hover or focus, revealing an illustrated mini interface and a project description in the specimen inspector.

The catalog currently contains all 14 repositories returned by the connected GitHub account: 12 public repositories and two private entries. The rotor loads up to eight vials per chamber; chamber controls, search, category filters, and a list view make the complete collection accessible.

## Local preview

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. This is a static site: no build step, dependency installation, or API key is required to preview it. [projects.js](./projects.js) stores project descriptions, stack labels, access notes, repository URLs, and application links. Browsing the site does not make GitHub API requests.

## Explore the lab

- Drag the rotor horizontally to rotate it; release to carry momentum into the motor’s selected speed.
- Hover or focus a vial to crack its glass and reveal a preview. Tap or click a vial, or choose it in the specimen index, to keep it selected.
- Open **Explore project** for project notes, technology details, scope, and links. **Source** opens the corresponding GitHub repository.
- Use **Pause spin**, the speed slider, and **Reset** to control the motor. Use the chamber arrows to load the remaining specimens.
- Search by project name, description, or technology, and combine search with category filters. **List view** displays all matching projects as cards.
- Press `/` to focus search. With the centrifuge focused, use the left/right arrows to rotate or Space to pause/resume. Escape releases a pinned selection. Standard Tab navigation reaches the vials, controls, and project links.

The motor pauses while inspecting a vial or interacting with its preview. Reduced-motion preferences start the rotor paused and disable release momentum. The interface supports touch, keyboard navigation, a skip link, responsive layouts, and a non-animated list view.

Mini interfaces are illustrations, not screenshots or live usage data. The first eight projects have distinct interface studies; additional repositories have labeled specimen thumbnails. Private entries expose only repository names and access notices, with no private implementation details. Linked Orbit, Stockroom, and CourseOS workspaces require owner access and ChatGPT sign-in. CourseOS is a personal planner, not a university registration service. The LLM training entry credits its upstream educational material.

## Refresh the repository catalog

With Node 20 or newer, preview or apply a public-repository refresh:

```sh
node sync-repos.mjs --dry-run
node sync-repos.mjs
```

[sync-repos.mjs](./sync-repos.mjs) reads all pages of the GitHub public repository API, updates repository metadata, and adds new repositories with clearly labeled metadata summaries. It preserves curated case-study content, stable project IDs, and existing private access-only entries. An optional `GITHUB_TOKEN` can authenticate the API request; it is never written to the catalog. The script does not import private source or descriptions.

## Publish

The [GitHub Pages workflow](./.github/workflows/pages.yml) publishes the root of `main` to the existing Pages site. Repository Pages must use GitHub Actions as its build source for this workflow. The same static root can also be published by branch-based Pages hosting.

## Validation

Run JavaScript syntax checks:

```sh
node --check app.js
node --check projects.js
node --check previews.js
node --check detail.js
node --check sync-repos.mjs
```

All 14 project detail renderings have been checked for valid content, correct repository links, and private-access labels. Chromium browser checks passed for hover cracking, preview selection, both chambers, drag momentum, pause, keyboard rotation, search, category filters, the 14-card list, touch selection, reduced motion, and project-page fallbacks. Desktop and mobile layouts were visually inspected, with no horizontal overflow at 390px or 320px and no JavaScript errors during the checked flows. The mini interfaces do not test or run the linked applications themselves.
