(() => {
  const HOST_ID = 'farol-overlay-host';
  const existing = document.getElementById(HOST_ID);
  if (existing) {
    existing.shadowRoot?.querySelector('.panel')?.classList.toggle('open');
    return;
  }

  const host = document.createElement('div');
  host.id = HOST_ID;
  host.style.cssText = 'all:initial;position:fixed;inset:0;z-index:2147483647;pointer-events:none;';
  const shadow = host.attachShadow({ mode: 'open' });
  const style = document.createElement('style');
  style.textContent = `
    *{box-sizing:border-box} .orb,.panel,.spotlight{font-family:system-ui,-apple-system,sans-serif;color:#f5f3fa}
    .orb{pointer-events:auto;position:fixed;right:14px;top:48%;width:58px;height:58px;border:3px solid #f5b942;border-radius:50%;background:#15121acc;box-shadow:0 0 22px #f5b94288,0 5px 18px #0008;color:#fff;font-size:25px;cursor:grab;touch-action:none}
    .orb:focus-visible,button:focus-visible,textarea:focus-visible{outline:3px solid #f5b942;outline-offset:3px}
    .panel{pointer-events:auto;position:fixed;right:12px;bottom:12px;width:min(390px,calc(100vw - 24px));max-height:min(78vh,700px);overflow:auto;background:#11111bf5;border:1px solid #8b75b5;border-radius:20px;box-shadow:0 12px 50px #000b;padding:16px;display:none}
    .panel.open{display:block}.head{display:flex;align-items:center;gap:10px}.head h2{flex:1;font-size:19px;margin:0;color:#f5b942}.close{min-width:44px;min-height:44px;font-size:21px}
    p{font-size:14px;line-height:1.5;color:#e5e1ed;margin:8px 0 12px}.label{display:block;font-weight:700;font-size:14px;margin:12px 0 5px}
    textarea{width:100%;min-height:62px;resize:vertical;border-radius:11px;border:1px solid #65547e;background:#090911;color:#fff;padding:11px;font-size:16px;line-height:1.45}
    .buttons{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}button{min-height:46px;padding:9px 11px;border:1px solid #725a94;border-radius:11px;background:#211a30;color:#fff;font-weight:700;font-size:14px;cursor:pointer}.primary{background:#7138c9;border-color:#9567d9}.warning{display:none;margin-top:12px;padding:12px;border:2px solid #ffbd4a;border-radius:12px;background:#39280f;color:#fff;font-size:14px;line-height:1.45}.warning.show{display:block}.result{margin-top:12px;padding:12px;border-radius:12px;background:#201b2b;border:1px solid #54466b;white-space:pre-wrap;overflow-wrap:anywhere;font-size:14px;line-height:1.5}.small{font-size:12px;color:#c8c0d8}.spotlight{position:fixed;border:4px solid #ffbd4a;border-radius:12px;box-shadow:0 0 0 9999px #0002,0 0 22px #ffbd4a;background:transparent;pointer-events:none;display:none;transition:all .15s}.spotlight.show{display:block}
  `;
  const button = (label, cls = '') => { const b = document.createElement('button'); b.type = 'button'; b.textContent = label; if (cls) b.className = cls; return b; };
  const panel = document.createElement('section'); panel.className = 'panel open'; panel.setAttribute('role','dialog'); panel.setAttribute('aria-label','Assistente Farol');
  const head = document.createElement('div'); head.className = 'head';
  const title = document.createElement('h2'); title.textContent = '✦ Farol · piloto';
  const close = button('Fechar'); close.className = 'close'; close.setAttribute('aria-label','Fechar o Farol'); head.append(title,close);
  const intro = document.createElement('p'); intro.textContent = 'Diga o que quer fazer. Se tiver um manual ou README, cole um trecho. O Farol ajuda a localizar; você decide e faz cada ação.';
  const goalLabel = document.createElement('label'); goalLabel.className = 'label'; goalLabel.textContent = 'O que você quer fazer?';
  const goal = document.createElement('textarea'); goal.placeholder = 'Ex.: encontrar onde baixar o programa'; goal.setAttribute('aria-label','O que você quer fazer?');
  const docLabel = document.createElement('label'); docLabel.className = 'label'; docLabel.textContent = 'Trecho do manual ou README (opcional)';
  const manual = document.createElement('textarea'); manual.placeholder = 'Cole aqui as instruções que escolheu compartilhar'; manual.setAttribute('aria-label','Trecho do manual ou README');
  const controls = document.createElement('div'); controls.className = 'buttons';
  const guide = button('Preparar orientação','primary'); const locate = button('Localizar na tela'); const copy = button('Copiar orientação'); const clear = button('Limpar marcação'); controls.append(guide,locate,copy,clear);
  const note = document.createElement('p'); note.className = 'small'; note.textContent = 'Privacidade: o Farol examina o texto da página somente quando você toca em “Preparar orientação”. O texto não é enviado a um servidor nem salvo por esta demonstração.';
  const warning = document.createElement('div'); warning.className = 'warning'; warning.setAttribute('role','alert');
  const result = document.createElement('div'); result.className = 'result'; result.hidden = true;
  panel.append(head,intro,goalLabel,goal,docLabel,manual,controls,warning,result,note);
  const orb = button('✦'); orb.className = 'orb'; orb.setAttribute('aria-label','Abrir ou fechar o Farol');
  const spotlight = document.createElement('div'); spotlight.className = 'spotlight';
  shadow.append(style,orb,panel,spotlight); document.documentElement.appendChild(host);

  let alertCount = 0;
  let target = null;
  close.addEventListener('click', () => { panel.classList.remove('open'); orb.focus(); });
  orb.addEventListener('click', () => panel.classList.toggle('open'));

  function normalized(s) { return (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim(); }
  function visible(el) { const r=el.getBoundingClientRect(),s=getComputedStyle(el); return r.width>0&&r.height>0&&s.visibility!=='hidden'&&s.display!=='none'&&Number(s.opacity)!==0; }
  function pageText() { return (document.body?.innerText || '').slice(0,200000); }
  function bestManualLine(query, text) {
    const q=normalized(query).split(' ').filter(w=>w.length>2);
    if(!text.trim()) return '';
    const lines=text.split(/[\n.!?]+/).map(x=>x.trim()).filter(Boolean);
    if(!q.length) return lines[0] || '';
    let best='',score=0;
    for(const line of lines){const n=normalized(line);const points=q.reduce((sum,w)=>sum+(n.includes(w)?1:0),0);if(points>score){best=line;score=points}}
    return best || lines[0] || '';
  }
  function risky(text) { return /\b(pagar|pagamento|payment|pay now|checkout|comprar|compra|purchase|apagar|excluir|deletar|delete|remover|remove|cancelar assinatura|transferir|transfer)\b/i.test(normalized(text)); }
  function showRisk() {
    if(alertCount>=3) return;
    alertCount++;
    warning.textContent = `⚠️ Atenção (${alertCount}/3): esta página parece mencionar pagamento, exclusão ou outra ação importante. Confira os detalhes e os riscos antes de continuar. O Farol não confirma, não paga e não apaga nada.`;
    warning.classList.add('show');
  }
  guide.addEventListener('click', () => {
    const q=goal.value.trim(), doc=manual.value.trim();
    if(!q){result.hidden=false;result.textContent='Escreva ou dite o que quer fazer primeiro.';goal.focus();return}
    const excerpt=bestManualLine(q,doc);
    result.hidden=false;
    result.textContent=excerpt ? `Objetivo: ${q}\n\nTrecho possivelmente relevante do material que você colou:\n${excerpt}\n\nConfira se este passo corresponde ao que deseja fazer.` : `Objetivo: ${q}\n\nNão há manual colado. Toque em “Localizar na tela” para procurar palavras relacionadas. O Farol não conhece todos os passos deste site.`;
    if(risky(q+' '+doc+' '+pageText())) showRisk();
    clearHighlight();
  });
  function clearHighlight(){spotlight.classList.remove('show');target=null}
  locate.addEventListener('click', () => {
    const q=normalized(goal.value).split(' ').filter(w=>w.length>2);
    if(!q.length){result.hidden=false;result.textContent='Diga primeiro o que deseja localizar.';goal.focus();return}
    const candidates=[...document.querySelectorAll('button,a,[role="button"],input,label,h1,h2,h3,[tabindex]')].filter(el=>!host.contains(el)&&visible(el));
    let best=null,bestScore=0,bestLen=Infinity;
    for(const el of candidates){const text=normalized(el.innerText||el.getAttribute('aria-label')||el.value||el.title);if(!text)continue;const score=q.reduce((sum,w)=>sum+(text.includes(w)?1:0),0);if(score>bestScore||(score===bestScore&&score>0&&text.length<bestLen)){best=el;bestScore=score;bestLen=text.length}}
    if(!best||bestScore===0){result.hidden=false;result.textContent='Não encontrei um botão ou texto claramente relacionado na página. Tente usar uma palavra que aparece na tela. Não cliquei em nada.';clearHighlight();return}
    target=best;best.scrollIntoView({behavior:'smooth',block:'center',inline:'nearest'});
    setTimeout(()=>{if(!target)return;const r=target.getBoundingClientRect();spotlight.style.left=`${Math.max(0,r.left-5)}px`;spotlight.style.top=`${Math.max(0,r.top-5)}px`;spotlight.style.width=`${Math.min(innerWidth-Math.max(0,r.left-5),r.width+10)}px`;spotlight.style.height=`${Math.min(innerHeight-Math.max(0,r.top-5),r.height+10)}px`;spotlight.classList.add('show')},250);
    result.hidden=false;result.textContent=`Encontrei “${(best.innerText||best.getAttribute('aria-label')||best.value||'item').trim().slice(0,120)}”. Está destacado. O Farol não clicou; confira se é o lugar certo.`;
  });
  copy.addEventListener('click', async () => {
    const text=result.hidden?'':result.textContent;
    if(!text){result.hidden=false;result.textContent='Prepare uma orientação antes de copiar.';return}
    try{await navigator.clipboard.writeText(text);result.textContent+='\n\nOrientação copiada. Confira antes de colar em outro aplicativo.'}
    catch{result.textContent+='\n\nA cópia automática foi bloqueada. Selecione este texto e use Copiar no menu do navegador.'}
  });
  clear.addEventListener('click',clearHighlight);
  addEventListener('scroll',()=>{if(target&&spotlight.classList.contains('show')){const r=target.getBoundingClientRect();spotlight.style.left=`${Math.max(0,r.left-5)}px`;spotlight.style.top=`${Math.max(0,r.top-5)}px`}},true);
})();
