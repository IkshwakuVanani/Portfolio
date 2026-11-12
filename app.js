'use strict';
(() => {
  const projects = window.PROJECTS || [];
  const $ = id => document.getElementById(id);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const color = p => /^#[a-f\d]{6}$/i.test(p.color || '') ? p.color : '#d1ed91';
  const number = p => String(projects.indexOf(p) + 1).padStart(2, '0');
  const source = p => /^https:\/\/github\.com\//.test(p.repoUrl || '') ? p.repoUrl : 'https://github.com/IkshwakuVanani/' + encodeURIComponent(p.repoName || p.id);
  const scene = $('scene'), canvas = $('centrifuge'), ctx = canvas.getContext('2d');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let category='All', filtered=projects.slice(), chamber=0, listView=false, selected=projects[0], loaded=[], vials=[];
  let angle=Math.PI/2, velocity=0, speed=24, paused=reduced.matches;
  let hovered=null, focused=null, cardPointer=false, cardFocus=false, pinned=null, dragging=false, moved=false;
  let pointer=null, startX=0, startY=0, lastX=0, lastMove=0, lastFrame=0, animation=0, visible=true;

  function card(p) {
    return `<article class="project-card" style="--project-color:${color(p)}"><div class="preview-display">${window.renderProjectScreen(p,{compact:true})}</div><div class="project-card-body"><div class="specimen-meta"><span>SPECIMEN ${number(p)} / ${esc(p.type.toUpperCase())}</span><span>${p.private?'PRIVATE':'REPOSITORY'}</span></div><h2>${esc(p.title)}</h2><p>${esc(p.description)}</p><div class="stack">${p.stack.map(t=>`<span>${esc(t)}</span>`).join('')}</div><div class="project-card-actions"><a class="open-project" href="project.html?repo=${encodeURIComponent(p.id)}">Explore project <span aria-hidden="true">↗</span></a><a class="source-link" href="${esc(source(p))}" target="_blank" rel="noopener noreferrer">Source ↗</a></div></div></article>`;
  }
  function inspect(p, crack=false) {
    if(!p)return;
    const changed=selected!==p;
    selected=p;
    if(changed || !$('project-preview').firstElementChild) {
      $('project-preview').innerHTML=card(p);
      $('viewer-number').textContent=`${number(p)} / ${String(projects.length).padStart(2,'0')}`;
    }
    vials.forEach((v,i)=>{v.classList.toggle('selected',loaded[i]===p);v.classList.toggle('cracked',loaded[i]===p&&(crack||pinned===p.id));v.setAttribute('aria-pressed',String(loaded[i]===p));});
    document.querySelectorAll('.specimen-slot').forEach(v=>{v.classList.toggle('active',v.dataset.id===p.id);v.setAttribute('aria-pressed',String(v.dataset.id===p.id));});
    draw();
  }
  function vialArt(p) {
    return `<svg viewBox="0 0 55 113" aria-hidden="true"><ellipse cx="28" cy="106" rx="20" ry="6" fill="#020b14" opacity=".55"/><path d="M13 24h29v7h4v56h-4v10h-6v5H20v-5h-6V87h-4V31h3Z" class="vial-glass" stroke="#86a8ac" stroke-width="2"/><path d="M14 57h28v29h-4v9H22v-5h-5v-8h-3Z" class="vial-liquid"/><path d="M15 57h27v5H15Z" fill="${color(p)}"/><path d="M16 32h4v21h-4ZM16 65h3v16h-3Z" class="vial-shine"/><path d="M22 51h3v3h-3ZM33 40h4v4h-4ZM28 73h3v3h-3Z" fill="${color(p)}" opacity=".65"/><g class="vial-cap"><path d="M12 15h31v5h3v9H9v-9h3Z" fill="#75918e" stroke="#b7c8bc" stroke-width="2"/><path d="M13 14h29v6H13Z" fill="#c6d7c7"/><path d="M15 23h4v5h-4ZM25 23h4v5h-4ZM35 23h4v5h-4Z" fill="#405e65"/><path d="M17 9h21v5H17Z" fill="${color(p)}"/></g><g class="vial-cracks" fill="none" stroke="#e7fff4" stroke-width="2"><path d="m31 30-8 12 12 9-10 13 7 13-9 15M23 42l-9 4M35 51l9-8M25 64l-11 5M32 77l9 7"/></g><g class="vial-screen"><path d="M7 43h42v34H7Z" fill="#09212a" stroke="${color(p)}" stroke-width="2"/><path d="M12 48h32v3H12ZM12 56h11v14H12ZM27 56h17v3H27ZM27 62h13v2H27ZM27 68h16v2H27Z" fill="${color(p)}"/></g><g class="vial-shards" fill="#b8e5d7"><path d="m49 31 7-9 1 12ZM2 39l-7 8 8 2ZM45 88l7 5-4 4Z"/></g></svg><span class="vial-number">${number(p)}</span><span class="vial-label">${esc(p.title)}</span>`;
  }
  function mountChamber() {
    loaded=filtered.slice(chamber*8,(chamber+1)*8);hovered=null;focused=null;
    $('vials').innerHTML=loaded.map(p=>`<button class="vial" data-id="${esc(p.id)}" style="--vial-color:${color(p)}" aria-label="Inspect ${esc(p.title)}" aria-pressed="false" aria-controls="project-preview">${vialArt(p)}</button>`).join('');
    vials=[...$('vials').children];
    vials.forEach((v,i)=>{
      const p=loaded[i];
      v.addEventListener('pointerenter',e=>{if(e.pointerType==='touch'||dragging)return;hovered=p.id;inspect(p,true);});
      v.addEventListener('pointerleave',()=>{hovered=null;if(!focused&&!pinned)v.classList.remove('cracked');});
      v.addEventListener('focus',()=>{focused=p.id;inspect(p,true);});
      v.addEventListener('blur',()=>{focused=null;if(!hovered&&!pinned)v.classList.remove('cracked');});
      v.addEventListener('click',e=>{e.stopPropagation();if(moved)return;pinned=pinned===p.id?null:p.id;inspect(p,true);$('result-count').textContent=`${p.title} selected. Project details are in the specimen inspector.`;});
    });
    $('specimen-index').innerHTML=loaded.map(p=>`<button class="specimen-slot" data-id="${esc(p.id)}" style="--vial-color:${color(p)}" aria-label="Inspect ${esc(p.title)}" aria-pressed="false"><span class="slot-icon" aria-hidden="true"></span><span class="slot-info"><small>${number(p)} / ${p.private?'PRIVATE':p.type==='Applications'?'APP':p.type==='Data'?'DATA':'EXP'}</small><b>${esc(p.title)}</b></span></button>`).join('');
    [...$('specimen-index').children].forEach((v,i)=>v.addEventListener('click',()=>{pinned=loaded[i].id;inspect(loaded[i],true);}));
    const total=Math.ceil(filtered.length/8);
    $('batch-controls').hidden=total<=1;$('batch-label').textContent=`CHAMBER ${chamber+1} OF ${total}`;
    $('previous-batch').disabled=chamber===0;$('next-batch').disabled=chamber>=total-1;
    $('chamber-label').innerHTML=`CHAMBER ${String(chamber+1).padStart(2,'0')} <span class="muted">/ ISOMETRIC VIEW</span>`;
    $('shelf-count').textContent=`${String(loaded.length).padStart(2,'0')} LOADED / ${filtered.length} MATCHING`;
    inspect(loaded.includes(selected)?selected:loaded[0]);draw();
  }
  function render() {
    const q=$('search').value.trim().toLowerCase();
    filtered=projects.filter(p=>(category==='All'||p.type===category)&&[p.title,p.id,p.repoName,p.description,...p.stack].join(' ').toLowerCase().includes(q));
    chamber=0;pinned=null;
    $('all-count').textContent=String(projects.length).padStart(2,'0');
    $('sample-count').textContent=`${String(projects.length).padStart(2,'0')} SPECIMENS / 01 CURIOUS MIND`;
    $('result-count').textContent=`${filtered.length} projects found. ${Math.min(8,filtered.length)} vials in the current chamber.`;
    $('lab-body').hidden=listView||!filtered.length;$('project-list').hidden=!listView||!filtered.length;$('empty').hidden=!!filtered.length;
    document.querySelector('.specimen-shelf').hidden=listView||!filtered.length;
    if(listView)$('project-list').innerHTML=filtered.map(card).join('');
    mountChamber();
  }

  // Fixed-resolution canvas and DOM vials use the same isometric projection.
  const ellipse=(x,y,rx,ry)=>Array.from({length:48},(_,i)=>[Math.round(x+Math.cos(i/48*Math.PI*2)*rx),Math.round(y+Math.sin(i/48*Math.PI*2)*ry)]);
  function poly(points,fill,stroke){ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();if(fill){ctx.fillStyle=fill;ctx.fill();}if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=2;ctx.stroke();}}
  function ring(x,y,rx,ry,fill,stroke){poly(ellipse(x,y,rx,ry),fill,stroke);}
  function cylinder(x,y,rx,ry,depth,top,side,edge){const front=Array.from({length:25},(_,i)=>[Math.round(x+Math.cos(i/24*Math.PI)*rx),Math.round(y+Math.sin(i/24*Math.PI)*ry)]);poly([...front,...front.slice().reverse().map(([px,py])=>[px,py+depth])],side,edge);ring(x,y,rx,ry,top,edge);}
  function draw(){
    if(!ctx)return;
    const x=380,y=249;
    ctx.clearRect(0,0,760,480);ctx.imageSmoothingEnabled=false;
    ring(x,376,276,63,'#061017');
    poly([[186,333],[209,338],[209,372],[184,369]],'#08121b','#263b43');
    poly([[548,335],[574,329],[574,368],[550,375]],'#08121b','#263b43');
    cylinder(x,y+50,251,93,38,'#304951','#263c46','#52696c');
    for(let i=0;i<6;i++){const vx=192+i*9;poly([[vx,337+i*2.2],[vx+4,339+i*2.2],[vx+4,352+i*2.2],[vx,350+i*2.2]],'#101f29');}
    poly([[453,359],[533,340],[533,359],[453,378]],'#101f25','#40575e');
    ctx.fillStyle='#b8d78b';ctx.font='bold 10px monospace';ctx.save();ctx.translate(466,371);ctx.transform(1,-.24,0,1,0,0);ctx.fillText('IV / LAB',0,0);ctx.restore();
    cylinder(x,y+4,255,99,39,'#6c8681','#3e5a60','#8fa59a');
    cylinder(x,y,237,86,10,'#152b35','#253f49','#abc3ac');
    ring(x,y+2,218,77,'#1b3540','#415e65');ring(x,y+2,188,63,null,'#2e4b55');
    loaded.forEach((p,i)=>{
      const a=angle+i/loaded.length*Math.PI*2,px=x+Math.cos(a)*197,py=y+Math.sin(a)*70;
      ctx.strokeStyle='#39565f';ctx.lineWidth=10;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(px,py);ctx.stroke();
      ctx.strokeStyle='#69827e';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x,y-3);ctx.lineTo(px,py-3);ctx.stroke();
      ring(px,py,24,10,'#081b27','#76928a');ring(px,py,17,6,'#102b36','#334f58');
      if(selected===p)ring(px,py,26,11,null,color(p));
      const depth=(Math.sin(a)+1)/2,v=vials[i];
      v.style.left=`${px/760*100}%`;v.style.top=`${(py+1)/480*100}%`;
      v.style.transform=`translate(-50%,-93%) rotate(${Math.cos(a)*10}deg) scale(${.86+depth*.19})`;
      v.style.zIndex=String(Math.round(10+depth*20));
    });
    cylinder(x,y-4,51,24,14,'#819b8c','#456467','#b4c6a7');
    cylinder(x,y-15,34,16,10,'#b0c79c','#68877d','#c6d9ad');
    poly(Array.from({length:6},(_,i)=>[x+Math.cos(i/6*Math.PI*2+angle)*15,y-16+Math.sin(i/6*Math.PI*2+angle)*8]),'#304f50','#87a087');
    [0,Math.PI].forEach(a=>{const px=x+Math.cos(a)*245;ring(px,y+6,4,3,'#becfba');ctx.fillStyle='#4c6768';ctx.fillRect(px-2,y+5,4,1);});
    [0,1,2].forEach(i=>{ctx.fillStyle=paused?'#56776b':['#d1ed91','#80d7bb','#627b76'][i];ctx.fillRect(350+i*12,372,5,4);});
    $('angle-readout').textContent=String(Math.round(((angle*180/Math.PI)%360+360)%360)).padStart(3,'0');
    scene.dataset.rotation=angle.toFixed(4);
  }
  function updateMotion(){
    $('motion-toggle').setAttribute('aria-pressed',String(paused));$('motion-toggle').setAttribute('aria-label',paused?'Resume centrifuge spin':'Pause centrifuge spin');
    $('motion-icon').textContent=paused?'▷':'Ⅱ';$('motion-label').textContent=paused?'Resume spin':'Pause spin';
    $('motor-state').textContent=paused?'ROTOR PAUSED':'ROTOR ACTIVE';$('speed-value').textContent=speed+'%';draw();
  }
  function frame(now){
    const dt=Math.min((now-(lastFrame||now))/1000,.05);lastFrame=now;
    if(!dragging&&!paused&&!hovered&&!focused&&!cardPointer&&!cardFocus&&!pinned&&!listView&&filtered.length){
      velocity+=(speed/100*.48-velocity)*(1-Math.exp(-dt*1.3));angle+=velocity*dt;draw();
    }
    if(visible&&!document.hidden)animation=requestAnimationFrame(frame);
  }
  function resumeFrame(){cancelAnimationFrame(animation);lastFrame=0;if(visible&&!document.hidden)animation=requestAnimationFrame(frame);}
  scene.addEventListener('pointerdown',e=>{if(e.button!==0)return;pointer=e.pointerId;startX=lastX=e.clientX;startY=e.clientY;lastMove=performance.now();moved=false;});
  scene.addEventListener('pointermove',e=>{
    if(pointer!==e.pointerId)return;
    if(e.pointerType==='mouse'&&!(e.buttons&1)){release(e);return;}
    const dx=e.clientX-lastX;
    if(!dragging&&Math.abs(e.clientX-startX)<6)return;
    if(!dragging&&e.pointerType==='touch'&&Math.abs(e.clientY-startY)>Math.abs(e.clientX-startX)){pointer=null;return;}
    if(!dragging){scene.setPointerCapture(e.pointerId);dragging=true;moved=true;pinned=null;hovered=null;focused=null;scene.classList.add('dragging');document.activeElement?.blur();}
    const now=performance.now(),delta=dx/scene.clientWidth*Math.PI*2;
    angle+=delta;velocity=Math.max(-5,Math.min(5,delta/Math.max((now-lastMove)/1000,.016)));lastX=e.clientX;lastMove=now;inspect(selected,false);draw();
  });
  function release(e){if(pointer!==e.pointerId)return;if(performance.now()-lastMove>120||reduced.matches)velocity=0;pointer=null;dragging=false;scene.classList.remove('dragging');if(scene.hasPointerCapture(e.pointerId))scene.releasePointerCapture(e.pointerId);setTimeout(()=>{moved=false;},0);}
  scene.addEventListener('pointerup',release);scene.addEventListener('pointercancel',release);
  window.addEventListener('pointerup',release);window.addEventListener('pointercancel',release);
  scene.addEventListener('lostpointercapture',()=>{pointer=null;dragging=false;scene.classList.remove('dragging');});
  scene.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();pinned=null;angle+=(e.key==='ArrowLeft'?-1:1)*Math.PI/8;velocity=0;draw();}if(e.key===' '&&e.target===scene){e.preventDefault();paused=!paused;velocity=0;updateMotion();}});
  document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){e.preventDefault();$('search').focus();}if(e.key==='Escape'){pinned=null;hovered=null;focused=null;document.activeElement?.blur();inspect(selected,false);}});
  $('viewer').addEventListener('pointerenter',()=>{cardPointer=true;});$('viewer').addEventListener('pointerleave',()=>{cardPointer=false;});
  $('viewer').addEventListener('focusin',()=>{cardFocus=true;});$('viewer').addEventListener('focusout',e=>{if(!$('viewer').contains(e.relatedTarget))cardFocus=false;});
  $('motion-toggle').addEventListener('click',()=>{paused=!paused;velocity=0;pinned=null;updateMotion();});
  $('speed').addEventListener('input',()=>{speed=Number($('speed').value);pinned=null;updateMotion();});
  $('reset').addEventListener('click',()=>{angle=Math.PI/2;velocity=0;speed=24;pinned=null;paused=reduced.matches;$('speed').value='24';inspect(loaded[0],false);updateMotion();});
  $('search').addEventListener('input',render);
  document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{category=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b));});render();}));
  $('clear-filters').addEventListener('click',()=>{$('search').value='';document.querySelector('[data-filter="All"]').click();});
  $('view-toggle').addEventListener('click',()=>{listView=!listView;$('view-toggle').setAttribute('aria-pressed',String(listView));$('view-toggle').setAttribute('aria-label',listView?'Switch to centrifuge view':'Switch to project list');$('view-toggle').querySelector('span').textContent=listView?'Lab view':'List view';render();});
  $('previous-batch').addEventListener('click',()=>{if(chamber>0){chamber--;pinned=null;mountChamber();}});
  $('next-batch').addEventListener('click',()=>{if((chamber+1)*8<filtered.length){chamber++;pinned=null;mountChamber();}});
  reduced.addEventListener('change',()=>{paused=reduced.matches;velocity=0;updateMotion();});document.addEventListener('visibilitychange',resumeFrame);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;resumeFrame();},{rootMargin:'150px'}).observe(scene);
  $('year').textContent=String(new Date().getFullYear());render();updateMotion();resumeFrame();
})();
