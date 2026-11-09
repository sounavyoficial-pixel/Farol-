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
    *{box-sizing:border-box}.orb,.panel,.target-mark{font-family:system-ui,-apple-system,sans-serif;color:#f5f3fa}
    .orb{pointer-events:auto;position:fixed;left:calc(100vw - 52px);top:48%;width:40px;height:40px;padding:0;border:2px solid #f5b942;border-radius:50%;background:#15121aee;box-shadow:0 0 12px #f5b94288,0 3px 12px #0007;color:#fff;font-size:18px;cursor:grab;touch-action:none;user-select:none}
    .orb:active{cursor:grabbing}.orb:focus-visible,button:focus-visible,textarea:focus-visible{outline:3px solid #f5b942;outline-offset:3px}
    .panel{pointer-events:auto;position:fixed;right:9px;bottom:9px;width:min(310px,calc(100vw - 18px));max-height:min(48vh,420px);overflow:auto;background:#11111bf5;border:1px solid #806ba4;border-radius:18px;box-shadow:0 8px 32px #0008;padding:11px;display:none}
    .panel.open{display:block}.head{display:flex;align-items:center;gap:6px}.head h2{flex:1;font-size:16px;margin:0;color:#f5b942}.icon-button{min-width:38px;min-height:38px;padding:5px;font-size:18px}.close{min-width:38px;min-height:38px;padding:5px}
    p{font-size:13px;line-height:1.4;color:#e5e1ed;margin:7px 0 9px}.conversation{max-height:17vh;min-height:42px;overflow:auto;display:flex;flex-direction:column;gap:6px;padding:3px 0}.bubble{max-width:94%;padding:8px 10px;border-radius:12px;background:#211a30;font-size:13px;line-height:1.4;white-space:pre-wrap;overflow-wrap:anywhere}.bubble.user{align-self:flex-end;background:#6332a5}.bubble.farol{align-self:flex-start;border:1px solid #54466b}
    textarea{width:100%;min-height:42px;max-height:100px;resize:vertical;border-radius:10px;border:1px solid #65547e;background:#090911;color:#fff;padding:9px;font-size:15px;line-height:1.35}.row{display:flex;gap:6px;margin-top:6px}button{min-height:38px;padding:7px 9px;border:1px solid #725a94;border-radius:10px;background:#211a30;color:#fff;font-weight:650;font-size:13px;cursor:pointer}.primary{flex:1;background:#7138c9;border-color:#9567d9}.tools{margin-top:7px;border-top:1px solid #413650;padding-top:5px}.tools[hidden]{display:none}.tool-actions{display:grid;grid-template-columns:1fr 1fr;gap:6px}.small{font-size:11px;color:#c8c0d8;margin-top:7px}
    .warning{display:none;margin-top:7px;padding:9px;border:2px solid #ffbd4a;border-radius:10px;background:#39280f;color:#fff;font-size:12px;line-height:1.4}.warning.show{display:block}
    .target-mark{position:fixed;pointer-events:none;display:none;border:3px solid #ffbd4a;border-radius:11px;box-shadow:0 0 0 3px #ffbd4a44,0 0 15px #ffbd4acc;animation:farol-pulse 1.2s ease-in-out 2}
    .target-mark.show{display:block}@keyframes farol-pulse{50%{box-shadow:0 0 0 7px #ffbd4a22,0 0 22px #ffbd4a}}
    @media(prefers-reduced-motion:reduce){.target-mark{animation:none}}
  `;
  const button = (text, className = '') => {
    const element = document.createElement('button'); element.type = 'button'; element.textContent = text;
    if (className) element.className = className;
    return element;
  };
  const panel = document.createElement('section');
  panel.className = 'panel'; panel.setAttribute('role','dialog'); panel.setAttribute('aria-label','Conversa com o Farol');
  const header = document.createElement('header'); header.className = 'head';
  const title = document.createElement('h2'); title.textContent = '✦ Farol';
  const more = button('⋯','icon-button'); more.setAttribute('aria-label','Mostrar ferramentas'); more.title = 'Mais ferramentas';
  const close = button('×','close'); close.setAttribute('aria-label','Fechar conversa');
  header.append(title,more,close);
  const conversation = document.createElement('div'); conversation.className = 'conversation'; conversation.setAttribute('aria-live','polite');
  const welcome = document.createElement('div'); welcome.className = 'bubble farol'; welcome.textContent = 'Oi! Diga o que procura e eu marco um possível lugar na tela. Você confere e toca.'; conversation.append(welcome);
  const goal = document.createElement('textarea'); goal.setAttribute('aria-label','Diga o que quer encontrar'); goal.placeholder = 'O que você quer encontrar?';
  const row = document.createElement('div'); row.className = 'row';
  const guide = button('Mostrar onde tocar','primary'); row.append(guide);
  const tools = document.createElement('div'); tools.className = 'tools'; tools.hidden = true;
  const manualLabel = document.createElement('p'); manualLabel.textContent = 'Trecho de manual/README (opcional)';
  const manual = document.createElement('textarea'); manual.setAttribute('aria-label','Trecho de manual ou README'); manual.placeholder = 'Cole somente o trecho necessário';
  const toolActions = document.createElement('div'); toolActions.className = 'tool-actions';
  const copy = button('Copiar conversa'); const clear = button('Limpar marcação'); const end = button('Encerrar e limpar');
  toolActions.append(copy,clear,end); tools.append(manualLabel,manual,toolActions);
  const warning = document.createElement('div'); warning.className = 'warning'; warning.setAttribute('role','alert');
  const privacy = document.createElement('p'); privacy.className = 'small'; privacy.textContent = 'Só examino a página quando você pede para marcar. O conteúdo fica nesta aba, sem envio a servidor ou salvamento pelo Farol.';
  panel.append(header,conversation,goal,row,warning,tools,privacy);
  const orb = button('✦'); orb.className = 'orb'; orb.setAttribute('aria-label','Farol: arraste para mover ou toque para abrir o chat');
  const mark = document.createElement('div'); mark.className = 'target-mark';
  shadow.append(style,orb,panel,mark); document.documentElement.appendChild(host);

  let alertCount = 0, target = null, dragging = false, moved = false;
  let startX = 0, startY = 0, startLeft = 0, startTop = 0;
  function togglePanel() { panel.classList.toggle('open'); if (panel.classList.contains('open')) goal.focus(); }
  function closePanel() { panel.classList.remove('open'); orb.focus(); }
  close.addEventListener('click',closePanel);
  more.addEventListener('click',() => { tools.hidden = !tools.hidden; more.setAttribute('aria-expanded',String(!tools.hidden)); });
  orb.addEventListener('pointerdown',event => {
    if (event.button !== undefined && event.button !== 0) return;
    dragging = true; moved = false; startX = event.clientX; startY = event.clientY;
    const rect = orb.getBoundingClientRect(); startLeft = rect.left; startTop = rect.top; orb.setPointerCapture(event.pointerId);
  });
  orb.addEventListener('pointermove',event => {
    if (!dragging) return;
    const dx = event.clientX-startX, dy = event.clientY-startY;
    if (Math.abs(dx)+Math.abs(dy)>6) moved=true;
    if (moved) { orb.style.left=`${Math.max(4,Math.min(innerWidth-44,startLeft+dx))}px`; orb.style.top=`${Math.max(4,Math.min(innerHeight-44,startTop+dy))}px`; }
  });
  orb.addEventListener('pointerup',() => {
    if (!dragging) return; dragging=false;
    if (moved) { const rect=orb.getBoundingClientRect(); orb.style.left=`${rect.left+rect.width/2<innerWidth/2?8:innerWidth-48}px`; }
    else togglePanel();
  });
  orb.addEventListener('pointercancel',() => { dragging=false; });
  orb.addEventListener('keydown',event => { if(event.key==='Enter'||event.key===' '){event.preventDefault();togglePanel();} });
  shadow.addEventListener('keydown',event => { if(event.key==='Escape'&&panel.classList.contains('open'))closePanel(); });

  function normalize(text) { return (text||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim(); }
  function risky(text) { return /\b(pagar|pagamento|payment|pay now|checkout|comprar|compra|purchase|apagar|excluir|deletar|delete|remover|remove|cancelar assinatura|transferir|transfer)\b/i.test(normalize(text)); }
  function warn() {
    if(alertCount>=3)return;
    alertCount++;
    warning.textContent=`⚠️ Alerta ${alertCount} de 3: pode haver pagamento, exclusão ou outra ação importante. Confira com atenção. O Farol não confirma, não paga e não apaga nada.`;
    warning.classList.add('show');
  }
  function say(text,who='farol') { const bubble=document.createElement('div');bubble.className=`bubble ${who}`;bubble.textContent=text;conversation.append(bubble);conversation.scrollTop=conversation.scrollHeight; }
  function clearMark() { mark.classList.remove('show');target=null; }
  function positionMark() {
    if(!target||!target.isConnected){clearMark();return;}
    const rect=target.getBoundingClientRect();const left=Math.max(0,rect.left-5),top=Math.max(0,rect.top-5);
    mark.style.left=`${left}px`;mark.style.top=`${top}px`;
    mark.style.width=`${Math.max(12,Math.min(innerWidth-left,rect.width+10))}px`;
    mark.style.height=`${Math.max(12,Math.min(innerHeight-top,rect.height+10))}px`;mark.classList.add('show');
  }
  function findTarget(query) {
    const words=normalize(query).split(' ').filter(word=>word.length>2);if(!words.length)return null;
    const candidates=[...document.querySelectorAll('button,a,[role="button"],input,label,h1,h2,h3,[tabindex]')].filter(el=>!host.contains(el)&&el.getBoundingClientRect().width>0&&el.getBoundingClientRect().height>0&&getComputedStyle(el).visibility!=='hidden'&&getComputedStyle(el).display!=='none');
    let best=null,scoreMax=0,lenMax=Infinity;
    for(const el of candidates){const text=normalize(el.innerText||el.getAttribute('aria-label')||el.value||el.title);if(!text)continue;const score=words.reduce((sum,word)=>sum+(text.includes(word)?1:0),0);if(score>scoreMax||(score===scoreMax&&score>0&&text.length<lenMax)){best=el;scoreMax=score;lenMax=text.length;}}
    return scoreMax?best:null;
  }
  function guidePerson() {
    const query=goal.value.trim();if(!query){say('Escreva o que quer encontrar primeiro.');goal.focus();return;}
    say(query,'user');
    const match=findTarget(query);
    if(!match){clearMark();say('Não encontrei um lugar claramente relacionado. Tente palavras que apareçam na tela. Não cliquei em nada.');if(risky(`${query} ${manual.value}`))warn();return;}
    target=match;match.scrollIntoView({behavior:'smooth',block:'center',inline:'nearest'});setTimeout(positionMark,250);
    const label=(match.innerText||match.getAttribute('aria-label')||match.value||'item').trim().slice(0,100);
    say(`Pode ser aqui: “${label}”. Marquei na tela. Confira se é o lugar certo; você decide se toca.`);
    if(risky(`${query} ${label} ${manual.value}`))warn();goal.value='';
  }
  guide.addEventListener('click',guidePerson);
  goal.addEventListener('keydown',event=>{if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();guidePerson();}});
  clear.addEventListener('click',clearMark);
  copy.addEventListener('click',async()=>{
    const text=[...conversation.querySelectorAll('.bubble')].map(el=>el.textContent).join('\n\n');
    try{await navigator.clipboard.writeText(text);say('Conversa copiada. Confira antes de colar em outro aplicativo.');}
    catch{say('Não consegui copiar automaticamente. Selecione o texto e use Copiar no menu do navegador.');}
  });
  end.addEventListener('click',()=>{if(confirm('Encerrar o Farol e remover desta aba a conversa e os textos temporários?')){removeEventListener('scroll',positionMark,true);removeEventListener('resize',positionMark);host.remove();}});
  addEventListener('scroll',positionMark,true);addEventListener('resize',positionMark);
})();
