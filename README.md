# IV Vanani / Engineering & Data

A rebuilt personal portfolio by Ikshwaku Vanani. Curated project case studies replace stale descriptions and abstract generated art. All eight repositories visible through the connected GitHub installation were reviewed; changes are scoped to this portfolio and the three unfinished applications.

## Local preview

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. No build step or API key is required. `projects.js` is the single source of project descriptions, stack labels, access notes, and application links. The site does not depend on GitHub API availability.

## Features

- A new visual identity, responsive layouts, and code-native interface illustrations.
- Search, category filters, and individual project case studies.
- Verified scope notes and explicit owner-private deployment labels.
- Keyboard navigation, a skip link, reduced-motion support, and an animation pause button.

Interface previews are illustrations, not screenshots or usage data. The linked application deployments require ChatGPT sign-in and owner access. CourseOS is a personal planner with illustrative sample courses, not a university registration service.

## Publish

The GitHub Pages workflow publishes the root of `main` to the existing Pages site. Repository Pages must use GitHub Actions as its build source if branch publishing is not already configured. The same root can also be published by branch-based Pages hosting.

## Validation

Run `node --check app.js` and `node --check projects.js`. Functional app behavior is tested in each application repository. Browser QA in the build environment was blocked by the browser URL policy; no successful screenshot inspection is claimed.
