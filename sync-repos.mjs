#!/usr/bin/env node
// Refresh public repository metadata without replacing curated case studies.
// Usage: node sync-repos.mjs [--dry-run]
// Requires Node 20+. GITHUB_TOKEN is optional and is never written to the catalog.
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const owner = 'IkshwakuVanani';
const catalogURL = new URL('./projects.js', import.meta.url);
const colors = ['#80d7bb', '#c1a7f0', '#e9be87', '#80b3f0', '#e2a6ab', '#cbec89'];
const renamed = {
  'task-organizer-app': 'Orbit',
  'inventory-management-system': 'Stockroom',
  'student-course-portal': 'CourseOS',
  portfolio: 'Portfolio'
};

export function catalogFromSource(source) {
  const match = source.trim().match(/^window\.PROJECTS\s*=\s*([\s\S]*);$/);
  if (!match) throw new Error('projects.js must contain a JSON window.PROJECTS assignment.');
  const projects = JSON.parse(match[1]);
  if (!Array.isArray(projects)) throw new Error('The project catalog must be an array.');
  return projects;
}

function repositoryName(project) {
  return project.repoName || renamed[project.id] || project.id;
}

function repositoryMetadata(repo) {
  return {
    ...(repo.id != null ? { repoId: String(repo.id) } : {}),
    repoName: repo.name,
    repoUrl: repo.html_url || repo.display_url || `https://github.com/${owner}/${encodeURIComponent(repo.name)}`
  };
}

export function projectForRepository(repo, index) {
  const language = repo.language || 'GitHub';
  const type = ['Python', 'Jupyter Notebook', 'R', 'Julia'].includes(repo.language) ? 'Data' : 'Experiments';
  const description = repo.description?.trim() || `A ${repo.language ? repo.language + ' ' : ''}repository in ${owner}’s GitHub collection.`;
  return {
    id: repo.name,
    title: repo.name,
    type,
    label: String(index + 1).padStart(2, '0') + ' / REPOSITORY',
    description,
    stack: [language],
    color: colors[index % colors.length],
    class: type === 'Data' ? 'data' : 'experiment',
    ...repositoryMetadata(repo),
    private: false,
    generic: true,
    archived: Boolean(repo.archived),
    fork: Boolean(repo.fork),
    homepage: repo.homepage || null,
    problem: 'This entry records a repository from the GitHub collection. A detailed project case study has not been added yet.',
    solution: description,
    features: [
      repo.language ? `GitHub reports ${repo.language} as the primary language.` : 'Source files and documentation are available on GitHub.',
      repo.fork ? 'GitHub identifies this repository as a fork; see its source for upstream attribution.' : 'Open the repository to inspect its source and documentation.'
    ],
    architecture: [repo.language || 'Repository files', 'Source & documentation'],
    limit: 'This summary uses GitHub repository metadata. Features, deployment status, and production readiness have not been independently verified.' + (repo.archived ? ' The repository is archived.' : '')
  };
}

export function mergeRepositories(projects, repos) {
  // Both REST and the connected GitHub catalog are accepted. The connector
  // reports visibility instead of `private`; never copy private descriptions.
  const owned = Array.from(new Map(repos.filter(repo =>
    repo.owner?.login?.toLowerCase() === owner.toLowerCase()
    && !repo.private && (!repo.visibility || repo.visibility === 'public')
  ).map(repo => [repo.name.toLowerCase(), repo])).values());
  const publicByName = new Map(owned.map(repo => [repo.name.toLowerCase(), repo]));
  const publicById = new Map(owned.filter(repo => repo.id != null).map(repo => [String(repo.id), repo]));
  const knownNames = new Set(projects.map(project => repositoryName(project).toLowerCase()));
  const matchedNames = new Set();
  const merged = projects.map((project, index) => {
    const repo = publicById.get(String(project.repoId)) || publicByName.get(repositoryName(project).toLowerCase());
    if (repo) matchedNames.add(repo.name.toLowerCase());
    // Private entries keep their name/access-only summaries. Public curated
    // writing and stable case-study IDs survive refreshes and GitHub renames.
    if (!repo || project.private) return project;
    if (!project.generic) return { ...project, ...repositoryMetadata(repo) };
    return { ...projectForRepository(repo, index), id: project.id };
  });
  const additions = owned.filter(repo => !knownNames.has(repo.name.toLowerCase()) && !matchedNames.has(repo.name.toLowerCase()))
    .sort((left, right) => left.name.localeCompare(right.name, 'en'));
  for (const repo of additions) merged.push(projectForRepository(repo, merged.length));
  return merged;
}

export async function fetchPublicRepositories(fetcher = fetch) {
  const repos = [];
  let page = 1;
  while (true) {
    const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'IV-Lab-Portfolio-Sync', 'X-GitHub-Api-Version': '2022-11-28' };
    if (process.env.GITHUB_TOKEN) headers.Authorization = 'Bearer ' + process.env.GITHUB_TOKEN;
    const url = `https://api.github.com/users/${owner}/repos?type=owner&per_page=100&sort=full_name&page=${page}`;
    const response = await fetcher(url, { headers, signal: AbortSignal.timeout(20000) });
    if (!response.ok) throw new Error(`GitHub repository lookup failed (${response.status}); the catalog was not changed.`);
    const entries = await response.json();
    if (!Array.isArray(entries)) throw new Error('GitHub returned an unexpected repository response; the catalog was not changed.');
    repos.push(...entries);
    if (!response.headers.get('link')?.includes('rel="next"')) break;
    page += 1;
  }
  return repos;
}

async function main() {
  if (process.argv.includes('--help')) {
    console.log('Usage: node sync-repos.mjs [--dry-run]\nRefresh all public GitHub repos; preserve curated and private entries.\nNo dependency installation is needed. GITHUB_TOKEN is optional.');
    return;
  }
  const unknown = process.argv.slice(2).filter(arg => arg !== '--dry-run');
  if (unknown.length) throw new Error('Unknown argument: ' + unknown.join(', '));
  const source = await readFile(catalogURL, 'utf8');
  const projects = catalogFromSource(source);
  const repos = await fetchPublicRepositories();
  const merged = mergeRepositories(projects, repos);
  const output = 'window.PROJECTS = ' + JSON.stringify(merged, null, 2) + ';\n';
  const dryRun = process.argv.includes('--dry-run');
  if (!dryRun && source !== output) await writeFile(catalogURL, output);
  console.log(`${dryRun ? 'Preview' : 'Synced'}: ${repos.length} public repositories; ${merged.length} catalog entries; ${merged.length - projects.length} additions. Curated and private entries preserved.`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
