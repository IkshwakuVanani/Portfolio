'use strict';

(() => {
  const escape = value => String(value == null ? '' : value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[character]));
  const projects = window.PROJECTS || [];
  const detail = document.getElementById('detail');
  const id = new URLSearchParams(window.location.search).get('repo');
  const project = projects.find(item => item.id === id);
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
  if (!detail) return;

  if (!project) {
    detail.innerHTML = '<section class="case-missing"><span class="case-eyebrow">SPECIMEN NOT FOUND / 404</span><h1>This vial is empty.</h1><p>Choose a project from the centrifuge to open its lab notes.</p><a class="case-button case-button-primary" href="index.html#work">RETURN TO THE LAB <span aria-hidden="true">↗</span></a></section>';
    return;
  }

  document.title = project.title + ' — IV / LAB';
  const number = String(projects.indexOf(project) + 1).padStart(2, '0');
  const safeUrl = value => {
    try {
      const url = new URL(value);
      return ['https:', 'http:'].includes(url.protocol) ? url.href : '';
    } catch (_) {
      return '';
    }
  };
  const source = safeUrl(project.repoUrl) || 'https://github.com/IkshwakuVanani/' + encodeURIComponent(project.repoName || project.id);
  const liveUrl = safeUrl(project.url || project.homepage);
  const ownerWorkspace = liveUrl && new URL(liveUrl).hostname.endsWith('.chatgpt.site');
  const attributionUrl = safeUrl(project.attributionUrl);
  const preview = typeof window.renderProjectScreen === 'function'
    ? window.renderProjectScreen(project)
    : '<div class="case-screen-fallback">' + escape(project.title) + '</div>';
  const stack = (project.stack || []).map(item => '<span>' + escape(item) + '</span>').join('');
  const features = (project.features || []).map(item => '<li>' + escape(item) + '</li>').join('');
  const architecture = (project.architecture || []).map((item, index) => '<li><span class="case-step">' + String(index + 1).padStart(2, '0') + '</span><span>' + escape(item) + '</span></li>').join('');
  const accessNote = project.private
    ? 'PRIVATE REPOSITORY / AUTHORIZED GITHUB ACCESS REQUIRED'
    : ownerWorkspace
      ? 'OWNER-PRIVATE WORKSPACE / CHATGPT SIGN-IN REQUIRED'
      : liveUrl
        ? 'PUBLIC REPOSITORY / LINKED SITE MAY REQUIRE SIGN-IN'
        : 'PUBLIC REPOSITORY / EXPLORE THE BUILD ON GITHUB';

  detail.innerHTML = `
    <section class="case-hero" aria-labelledby="project-title">
      <div class="case-intro">
        <div class="case-eyebrow"><span class="case-status" aria-hidden="true"></span> SPECIMEN ${number} / ${escape((project.type || 'Experiments').toUpperCase())}</div>
        <h1 id="project-title">${escape(project.title)}</h1>
        <p class="case-description">${escape(project.description)}</p>
        <div class="case-stack" aria-label="Technology stack">${stack}</div>
        <div class="case-actions">
          ${liveUrl ? '<a class="case-button case-button-primary" href="' + escape(liveUrl) + '" target="_blank" rel="noopener noreferrer">' + (ownerWorkspace ? 'OPEN WORKSPACE' : 'VISIT PROJECT') + ' <span aria-hidden="true">↗</span></a>' : ''}
          <a class="case-button" href="${escape(source)}" target="_blank" rel="noopener noreferrer">${project.private ? 'PRIVATE REPOSITORY' : 'VIEW SOURCE'} <span aria-hidden="true">↗</span></a>
        </div>
        <p class="case-access"><span aria-hidden="true">${project.private || ownerWorkspace ? '▣' : '↗'}</span> ${accessNote}</p>
        ${attributionUrl ? '<p class="case-attribution">Learning material based on <a href="' + escape(attributionUrl) + '" target="_blank" rel="noopener noreferrer">Sebastian Raschka’s LLMs from scratch <span aria-hidden="true">↗</span></a>.</p>' : ''}
      </div>
      <div class="case-preview">
        <div class="case-preview-bar"><span><i aria-hidden="true"></i> SPECIMEN / ${number}</span><span>${projects.indexOf(project) < 8 ? 'INTERFACE STUDY' : 'REPOSITORY SPECIMEN'}</span></div>
        <div class="case-preview-screen">${preview}</div>
        <div class="case-preview-caption"><span>${escape(project.label)}</span><span>${project.private ? 'SOURCE ACCESS RESTRICTED' : 'ILLUSTRATIVE PREVIEW'}</span></div>
      </div>
    </section>
    <div class="case-notebook-label"><span>LAB NOTES</span><span>BUILD / OBSERVE / ITERATE</span></div>
    <section class="case-section" aria-labelledby="problem-title">
      <div class="case-section-heading"><span class="case-index">01</span><h2 id="problem-title">The question.</h2><span class="case-section-caption">THE STARTING POINT</span></div>
      <div class="case-section-copy"><p>${escape(project.problem)}</p></div>
    </section>
    <section class="case-section" aria-labelledby="build-title">
      <div class="case-section-heading"><span class="case-index">02</span><h2 id="build-title">The experiment.</h2><span class="case-section-caption">WHAT I BUILT</span></div>
      <div class="case-section-copy"><p>${escape(project.solution)}</p><ul class="case-features">${features}</ul></div>
    </section>
    <section class="case-section" aria-labelledby="system-title">
      <div class="case-section-heading"><span class="case-index">03</span><h2 id="system-title">Under the glass.</h2><span class="case-section-caption">SYSTEM ARCHITECTURE</span></div>
      <div class="case-section-copy"><ol class="case-architecture">${architecture}</ol></div>
    </section>
    <section class="case-section" aria-labelledby="scope-title">
      <div class="case-section-heading"><span class="case-index">04</span><h2 id="scope-title">Field notes.</h2><span class="case-section-caption">SCOPE & ACCESS</span></div>
      <div class="case-section-copy"><div class="case-scope"><span class="case-eyebrow">CURRENT LIMITATIONS</span><p>${escape(project.limit)}</p></div></div>
    </section>
    <a class="case-return" href="index.html#work"><span><small>THERE’S MORE IN THE ROTOR</small><strong>Back to the centrifuge.</strong></span><span class="case-return-arrow" aria-hidden="true">↗</span></a>
  `;
})();
