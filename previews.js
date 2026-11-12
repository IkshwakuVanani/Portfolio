/* Small, illustrative project interfaces. All values are demonstration content. */
(function () {
  'use strict';

  const escape = value => String(value == null ? '' : value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  const styleId = 'mini-project-screen-styles';

  function installStyles() {
    if (document.getElementById(styleId)) return;
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .mini-screen{--mini-accent:#a9ecd2;position:relative;isolation:isolate;overflow:hidden;box-sizing:border-box;width:100%;aspect-ratio:2/1;min-height:156px;background:#0b1e25;color:#dceae6;border:1px solid #365059;font-family:'IBM Plex Mono',monospace;font-size:9px;font-weight:400;line-height:1.4;letter-spacing:0;text-align:left;box-shadow:inset 0 0 32px #020d1650}
      .mini-screen *{box-sizing:border-box}.mini-screen .mini-bar{display:flex;align-items:center;gap:5px;position:relative;height:25px;padding:0 10px;border-bottom:1px solid #294049;background:#142b33;font-size:8px;color:#8da7a9}
      .mini-screen .mini-dot{display:block;width:4px;height:4px;background:#527277}.mini-screen .mini-dot:first-child{background:var(--mini-accent)}.mini-screen .mini-bar-title{margin-left:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:72%;color:#d2e4de;font-size:8px;font-weight:500}.mini-screen .mini-bar-code{margin-left:auto;color:#6e9296;font-size:7px}
      .mini-screen .mini-canvas{position:absolute;inset:25px 0 18px;padding:11px 12px;overflow:hidden}.mini-screen .mini-caption{position:absolute;bottom:0;inset-inline:0;height:18px;display:flex;align-items:center;justify-content:space-between;padding:0 10px;background:#0b1b22;border-top:1px solid #294049;color:#6f9095;font-size:6px;letter-spacing:1px}.mini-screen .mini-caption i{display:inline-block;width:3px;height:3px;margin-right:4px;background:var(--mini-accent)}
      .mini-screen .mini-title{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:0 0 9px;color:#e2eee8;font-size:12px;line-height:1.2;font-weight:600}.mini-screen .mini-tag{flex-shrink:0;background:#203a3e;color:var(--mini-accent);padding:3px 5px;font-size:6px;font-weight:400;letter-spacing:.4px}.mini-screen .mini-eyebrow{display:block;margin-bottom:4px;color:#7a9b9e;font-size:6px;letter-spacing:1px}.mini-screen .mini-muted{color:#7c9c9f;font-size:7px}
      .mini-screen .mini-board{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px}.mini-screen .mini-column{min-width:0}.mini-screen .mini-column-label{display:flex;justify-content:space-between;margin:0 0 5px;color:#8aa5a5;font-size:6px;letter-spacing:.4px}.mini-screen .mini-card{margin:0 0 5px;padding:6px;border:1px solid #2b454b;background:#142c32;min-height:33px;font-size:7px;color:#d4e1dc}.mini-screen .mini-card span{display:block;margin-top:3px;font-size:5px;color:#77979a}.mini-screen .mini-card::before{content:'';display:block;margin-bottom:5px;width:16px;height:2px;background:var(--mini-accent)}.mini-screen .mini-card-done{opacity:.6}
      .mini-screen .mini-statline{display:flex;gap:16px;margin-bottom:9px}.mini-screen .mini-statline b{display:block;color:var(--mini-accent);font-size:14px;font-weight:500;line-height:1.3}.mini-screen .mini-statline span{font-size:6px;color:#829fa2}.mini-screen .mini-rows{display:grid;grid-template-columns:1.5fr .6fr 1fr;font-size:7px;gap:0 8px;align-items:center}.mini-screen .mini-rows>span{height:20px;display:flex;align-items:center;border-top:1px solid #243c43;white-space:nowrap}.mini-screen .mini-rows>span:nth-child(3n){justify-content:flex-end;color:var(--mini-accent)}.mini-screen .mini-rows .mini-warning{color:#eacb83!important}.mini-screen .mini-pixel{width:7px;height:7px;border:1px solid var(--mini-accent);margin-right:6px;background:#22423f}
      .mini-screen .mini-week{display:grid;grid-template-columns:repeat(5,1fr);gap:4px;position:relative}.mini-screen .mini-day{min-height:80px;border-right:1px solid #294049;background:repeating-linear-gradient(to bottom,transparent 0,transparent 24px,#294049 25px);padding-right:3px;color:#66878d;font-size:6px}.mini-screen .mini-day>span{display:block;margin-bottom:6px}.mini-screen .mini-class{min-height:25px;margin-bottom:4px;padding:4px 3px;background:#c1a7f021;border-left:2px solid #c1a7f0;color:#d8c6fa;font-size:6px;line-height:1.25}.mini-screen .mini-class.alt{background:#80d7bb20;border-color:#80d7bb;color:#ace4d2}.mini-screen .mini-class.late{margin-top:24px}
      .mini-screen .mini-data-layout{display:grid;grid-template-columns:1fr 1.5fr;gap:12px;height:84px}.mini-screen .mini-data-card{background:#132c34;border:1px solid #29444b;padding:8px}.mini-screen .mini-data-card>b{display:block;font-size:25px;line-height:1.2;color:var(--mini-accent);font-weight:400}.mini-screen .mini-data-card>span{font-size:6px;color:#7d9ca1}.mini-screen .mini-spark{width:100%;height:49px;display:block;margin-top:4px}.mini-screen .mini-data-label{display:flex;justify-content:space-between;color:#7f9da0;font-size:6px}.mini-screen .mini-data-status{display:flex;align-items:center;gap:5px;margin-top:5px;font-size:6px;color:#91c1b2}.mini-screen .mini-data-status::before{content:'';width:4px;height:4px;background:#91c1b2}
      .mini-screen .mini-game{display:grid;grid-template-columns:1fr 94px 1fr;gap:13px;height:100%;align-items:start;max-width:290px;margin:0 auto}.mini-screen .mini-game-side{padding-top:8px;color:#8298a2;font-size:6px;letter-spacing:1px}.mini-screen .mini-game-side b{display:block;margin:4px 0 12px;color:#d5c6fa;font-size:13px;font-weight:500;letter-spacing:0}.mini-screen .mini-tetris{position:relative;display:grid;grid-template-columns:repeat(10,1fr);grid-template-rows:repeat(10,1fr);gap:1px;aspect-ratio:1;background:#07151e;border:1px solid #3b4966;padding:2px;box-shadow:0 0 20px #aa86f910}.mini-screen .mini-block{background:#102430;box-shadow:inset 1px 1px #ffffff03}.mini-screen .mini-block.p{background:#ac8ee2;box-shadow:inset 1px 1px #d2baff}.mini-screen .mini-block.t{background:#72c4bc;box-shadow:inset 1px 1px #b1efde}.mini-screen .mini-block.y{background:#d5b66f;box-shadow:inset 1px 1px #f0d799}.mini-screen .mini-block.r{background:#c97f99;box-shadow:inset 1px 1px #f2aab6}.mini-screen .mini-next{display:grid;grid-template-columns:repeat(3,8px);gap:2px;margin-top:8px}.mini-screen .mini-next i{width:8px;height:8px;background:#77c9be}.mini-screen .mini-next i:first-child{grid-column:2}
      .mini-screen .mini-plan{display:grid;grid-template-columns:70px 1fr;gap:9px}.mini-screen .mini-plan-labels{font-size:7px;color:#a5bbba}.mini-screen .mini-plan-labels span{display:flex;align-items:center;height:23px;border-bottom:1px solid #263d43}.mini-screen .mini-plan-track{height:69px;position:relative;background:repeating-linear-gradient(to right,#273f44 0,#273f44 1px,transparent 1px,transparent 25%);border-top:1px solid #294049}.mini-screen .mini-plan-track>i{position:absolute;height:11px;background:#e9be87;box-shadow:3px 3px #e9be8720}.mini-screen .mini-plan-track>i:nth-child(1){top:6px;left:0;width:30%}.mini-screen .mini-plan-track>i:nth-child(2){top:29px;left:25%;width:47%;background:#b5a0f5}.mini-screen .mini-plan-track>i:nth-child(3){top:52px;left:65%;width:35%;background:#80d7bb}.mini-screen .mini-plan-axis{display:flex;justify-content:space-between;margin-top:5px;color:#6f8d92;font-size:6px}
      .mini-screen .mini-flower-art{width:140px;height:125px;position:absolute;top:-2px;left:50%;transform:translateX(-50%);overflow:visible}.mini-screen .mini-flower-copy{position:absolute;top:16px;left:12px;z-index:1}.mini-screen .mini-flower-copy strong{display:block;font-size:13px;color:#e9b1bd;font-weight:500;line-height:1.3}.mini-screen .mini-flower-copy span{display:block;margin-top:5px;color:#829a9e;font-size:6px;letter-spacing:.5px}.mini-screen .mini-flower-meta{position:absolute;right:12px;bottom:12px;color:#a78093;font-size:6px;text-align:right;line-height:1.8}.mini-screen .mini-flower-grid{position:absolute;inset:10px 20px;background-image:radial-gradient(#4c4a603d .7px,transparent .7px);background-size:10px 10px}
      .mini-screen .mini-lab{display:grid;grid-template-columns:1fr 1fr;gap:5px;align-items:center;height:100%}.mini-screen .mini-lab-copy strong{display:block;font-size:16px;line-height:1.3;color:#dbe6d7;font-weight:500}.mini-screen .mini-lab-copy span{display:block;margin-top:7px;color:#7e9c98;font-size:6px;line-height:1.7;letter-spacing:.6px}.mini-screen .mini-lab-copy b{display:inline-block;margin-top:9px;padding:4px 6px;border:1px solid #4e6251;color:#d4ef90;font-size:6px;font-weight:400}.mini-screen .mini-rotor{height:90px;position:relative;transform:rotate(-12deg)}.mini-screen .mini-rotor-ring{position:absolute;width:90px;height:70px;top:10px;left:50%;transform:translateX(-50%);border:8px solid #496266;border-radius:50%;box-shadow:0 7px #223a43,inset 0 3px #172d35;background:#132a33}.mini-screen .mini-rotor-hub{position:absolute;width:23px;height:18px;border:4px solid #6f8f83;border-radius:50%;background:#bfd893;left:50%;top:35px;transform:translateX(-50%);box-shadow:0 4px #253e41}.mini-screen .mini-vial{position:absolute;left:calc(50% + var(--mini-x));top:var(--mini-y);width:10px;height:23px;background:linear-gradient(to top,var(--mini-liquid) 0,var(--mini-liquid) 55%,#b4d8d326 55%);border:1px solid #9cbbb8;border-top:4px solid var(--mini-liquid);box-shadow:2px 2px #02171e80;transform:rotate(var(--mini-turn))}
      .mini-screen .mini-repository{display:grid;grid-template-columns:58px minmax(0,1fr);gap:16px;align-items:center;height:100%}.mini-screen .mini-repository-icon{position:relative;display:grid;place-items:center;width:58px;height:62px;background:#17353c;border:2px solid var(--mini-accent);box-shadow:4px 4px #030f18;color:var(--mini-accent);font:20px/1 'Silkscreen',monospace}.mini-screen .mini-repository-icon::before{content:'';position:absolute;top:-8px;left:4px;width:23px;height:8px;background:var(--mini-accent)}.mini-screen .mini-repository .mini-title{display:block;margin-bottom:7px;overflow-wrap:anywhere;font-size:13px;line-height:1.4}.mini-screen .mini-repository-note{display:block;color:#91aeb0;font-size:8px;line-height:1.6;max-width:240px}.mini-screen .mini-repository-stack{display:flex;gap:5px;flex-wrap:wrap;margin-top:9px}.mini-screen .mini-repository-stack span{padding:2px 5px;color:var(--mini-accent);background:#203a3e;font-size:6px}
      .mini-screen.mini-compact{min-height:145px}.mini-screen.mini-compact .mini-canvas{padding:9px 10px}.mini-screen.mini-compact .mini-title{font-size:11px;margin-bottom:7px}.mini-screen.mini-compact .mini-card{min-height:29px;padding:5px}.mini-screen.mini-compact .mini-card span{font-size:5px}
      @media(max-width:420px){.mini-screen{min-height:160px}.mini-screen .mini-title{font-size:11px}.mini-screen .mini-card{padding:5px}.mini-screen .mini-game{grid-template-columns:1fr 88px 1fr;gap:9px}}
    `;
    document.head.appendChild(style);
  }

  function orbit() {
    return '<div class="mini-title">A little more focus.<span class="mini-tag">MY WORKSPACE</span></div><div class="mini-board">' + [
      ['TO DO', '02', [['Design review', 'PRODUCT / HIGH PRIORITY'], ['Plan the next sprint', 'TEAM / TOMORROW']]],
      ['IN PROGRESS', '01', [['Build something good', 'ENGINEERING / TODAY']]],
      ['DONE', '01', [['Find your orbit', 'PERSONAL / COMPLETE']]]
    ].map((column, index) => '<div class="mini-column"><div class="mini-column-label"><span>' + column[0] + '</span><span>' + column[1] + '</span></div>' + column[2].map(card => '<div class="mini-card' + (index === 2 ? ' mini-card-done' : '') + '">' + card[0] + '<span>' + card[1] + '</span></div>').join('') + '</div>').join('') + '</div>';
  }

  function stockroom() {
    return '<div class="mini-title">Everything, accounted for.<span class="mini-tag">INVENTORY</span></div><div class="mini-statline"><div><b>06</b><span>PRODUCTS</span></div><div><b>02</b><span>REORDER ALERTS</span></div><div><b>24</b><span>MOVEMENTS</span></div></div><div class="mini-rows"><span><i class="mini-pixel"></i>USB-C Dock</span><span>24 units</span><span>IN STOCK</span><span><i class="mini-pixel"></i>Keyboard</span><span>5 units</span><span class="mini-warning">LOW STOCK</span></div>';
  }

  function courseOS() {
    return '<div class="mini-title">Your week, in balance.<span class="mini-tag">11 / 18 CREDITS</span></div><div class="mini-week">' + [
      ['MON', '<div class="mini-class">Data<br>structures</div><div class="mini-class alt">Linear<br>algebra</div>'],
      ['TUE', '<div class="mini-class alt late">Applied<br>ML</div>'],
      ['WED', '<div class="mini-class">Data<br>structures</div>'],
      ['THU', '<div class="mini-class alt late">Applied<br>ML</div>'],
      ['FRI', '<div class="mini-class alt">Linear<br>algebra</div>']
    ].map(day => '<div class="mini-day"><span>' + day[0] + '</span>' + day[1] + '</div>').join('') + '</div>';
  }

  function edFlow() {
    return '<div class="mini-title">From capacity to action.<span class="mini-tag">SYNTHETIC DATA</span></div><div class="mini-data-layout"><div class="mini-data-card"><span class="mini-eyebrow">CAPACITY MODEL</span><b>78<span style="font-size:12px">%</span></b><span>ILLUSTRATIVE UTILIZATION</span><div class="mini-data-status">Scenario ready</div></div><div><div class="mini-data-label"><span>CAPACITY / 24H</span><span>→</span></div><svg class="mini-spark" viewBox="0 0 180 54" preserveAspectRatio="none" aria-hidden="true"><path d="M0 13H180M0 29H180M0 45H180" stroke="#28424b" stroke-width="1"/><path d="M0 46 20 38 40 41 60 20 80 27 100 17 120 23 140 8 160 16 180 5V54H0Z" fill="#80b3f017"/><path d="M0 46 20 38 40 41 60 20 80 27 100 17 120 23 140 8 160 16 180 5" fill="none" stroke="#80b3f0" stroke-width="2"/></svg><div class="mini-data-label"><span>00:00</span><span>12:00</span><span>24:00</span></div><div class="mini-data-status">03 blockers · ranked by impact</div></div></div>';
  }

  function tertris() {
    const rows = ['..........', '....p.....', '...ppp....', '..........', '..........', '..........', '..........', 'tt....rr..', '.tt.yyrr.p', 'yyy.yttppp'];
    return '<div class="mini-game"><div class="mini-game-side">NEON RIFT<b>TERTRIS</b>SCORE<b>012400</b><span>LEVEL 03</span></div><div class="mini-tetris">' + rows.join('').split('').map(cell => '<i class="mini-block' + (cell === '.' ? '' : ' ' + cell) + '"></i>').join('') + '</div><div class="mini-game-side">UP NEXT<div class="mini-next"><i></i><i></i><i></i><i></i></div><div style="margin-top:22px">HOLD / SHIFT<br><br>DROP / SPACE</div></div></div>';
  }

  function projectPlan() {
    return '<div class="mini-title">A plan you can explore.<span class="mini-tag">PROTOTYPE</span></div><div class="mini-plan"><div class="mini-plan-labels"><span>01 Discover</span><span>02 Build</span><span>03 Refine</span></div><div><div class="mini-plan-track"><i></i><i></i><i></i></div><div class="mini-plan-axis"><span>WEEK 01</span><span>02</span><span>03</span><span>04</span></div></div></div>';
  }

  function flower() {
    const petals = Array.from({ length: 9 }, (_, index) => '<path d="M0 0C-20-17-17-52 0-61C17-52 20-17 0 0Z" fill="' + (index % 2 ? '#d798b3' : '#a4779d') + '" opacity=".82" transform="rotate(' + (index * 40) + ')"/>').join('');
    return '<div class="mini-flower-grid"></div><div class="mini-flower-copy"><strong>Let an idea<br>bloom.</strong><span>CANVAS EXPERIMENT</span></div><svg class="mini-flower-art" viewBox="0 0 160 135" aria-hidden="true"><path d="M87 83Q76 107 83 134" fill="none" stroke="#668f86" stroke-width="2"/><path d="M80 116Q48 103 60 90Q79 92 80 116" fill="#668f8655"/><g transform="translate(90 66) scale(.76 .65) rotate(-15)">' + petals + '<circle r="13" fill="#e8c497"/><circle r="5" fill="#c79d81"/></g></svg><div class="mini-flower-meta">DEPTH + ROTATION<br>GENERATIVE BLOOM</div>';
  }

  function portfolio() {
    const vials = [
      [-6, 0, 0, '#d4ef90'], [24, 10, 40, '#80d7bb'], [38, 32, 80, '#c1a7f0'], [25, 56, 130, '#80b3f0'], [-6, 65, 180, '#e2a6ab'], [-35, 55, 220, '#e9be87'], [-47, 31, 270, '#b5a0f5'], [-35, 9, 320, '#cbec89']
    ];
    const count = String((window.PROJECTS || []).length).padStart(2, '0');
    return '<div class="mini-lab"><div class="mini-lab-copy"><span class="mini-eyebrow">THE PERSONAL LAB</span><strong>Ideas in<br>motion.</strong><span>' + count + ' PROJECTS.<br>ONE CURIOUS MIND.</span><b>EXPLORE THE EXPERIMENTS ↗</b></div><div class="mini-rotor"><div class="mini-rotor-ring"></div>' + vials.map(vial => '<i class="mini-vial" style="--mini-x:' + vial[0] + 'px;--mini-y:' + vial[1] + 'px;--mini-turn:' + vial[2] + 'deg;--mini-liquid:' + vial[3] + '"></i>').join('') + '<div class="mini-rotor-hub"></div></div></div>';
  }

  function repository(project) {
    const p = project || {};
    const note = p.private ? 'Source access is restricted. Project details stay private.' : 'Open the lab notes to explore this repository and its source.';
    const stack = (p.stack || []).slice(0, 3).map(item => '<span>' + escape(item) + '</span>').join('');
    return '<div class="mini-repository"><div class="mini-repository-icon">' + (p.private ? '▣' : '&lt;/&gt;') + '</div><div><span class="mini-eyebrow">' + (p.private ? 'PRIVATE SPECIMEN' : 'GITHUB SPECIMEN') + '</span><div class="mini-title">' + escape(p.title || p.repoName || 'Repository') + '</div><span class="mini-repository-note">' + note + '</span><div class="mini-repository-stack">' + stack + '</div></div></div>';
  }

  const screens = {
    'task-organizer-app': orbit,
    'inventory-management-system': stockroom,
    'student-course-portal': courseOS,
    'EDFlow-Analytics': edFlow,
    'Tertris': tertris,
    'Interactive-Project-Plan': projectPlan,
    'Flower': flower,
    'portfolio': portfolio
  };

  /** Return a decorative HTML preview. options.compact reduces the internal spacing. */
  window.renderProjectScreen = function (project, options) {
    installStyles();
    const p = project || {};
    const config = options || {};
    const color = /^#[0-9a-f]{3,8}$/i.test(p.color || '') ? p.color : '#a9ecd2';
    const render = screens[p.id];
    const content = render ? render() : repository(p);
    const caption = render ? 'ILLUSTRATIVE PREVIEW' : 'REPOSITORY THUMBNAIL';
    const status = p.private ? 'ACCESS RESTRICTED' : render ? 'NOT LIVE DATA' : 'SOURCE ON GITHUB';
    const label = (render ? 'Illustrative interface preview of ' : 'Repository thumbnail for ') + (p.title || 'this project');
    return '<div class="mini-screen' + (config.compact ? ' mini-compact' : '') + '" style="--mini-accent:' + color + '" role="img" aria-label="' + escape(label) + '"><div aria-hidden="true"><div class="mini-bar"><i class="mini-dot"></i><i class="mini-dot"></i><i class="mini-dot"></i><span class="mini-bar-title">' + escape(p.title || 'Project') + '</span><span class="mini-bar-code">IV / LAB</span></div><div class="mini-canvas">' + content + '</div><div class="mini-caption"><span><i></i>' + caption + '</span><span>' + status + '</span></div></div></div>';
  };
}());
