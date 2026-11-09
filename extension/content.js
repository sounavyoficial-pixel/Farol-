(() => {
  const HOST_ID = 'farol-overlay-host';
  const oldHost = document.getElementById(HOST_ID);
  if (oldHost) {
    const panel = oldHost.shadowRoot?.querySelector('.panel');
    panel?.classList.toggle('open');
    return;
  }

  const host = document.createElement('div');
  host.id = HOST_ID;
  host.style.cssText = 'all:initial;position:fixed;inset:0;z-index:2147483647;pointer-events:none;';
  const shadow = host.attachShadow({ mode: 'open' });
  const style = document.createElement('style');
  style.textContent = `
    *{box-sizing:border-box}.orb,.panel,.spotlight{font-family:system-ui,-apple-system,sans-serif;color:#f5f3fa}
    .orb{pointer-events:auto;position:fixed;left:calc(100vw - 56px);top:48%;width:42px;height:42px;padding:0;border:2px solid #f5b942;border-radius:50%;background:#15121aeF;box-shadow:0 0 15px #f5b94288,0 4px 14px #0008;color:#fff;font-size:19px;cursor:grab;touch-action:none;user-select:none}
    .orb:active{cursor:grabbing}.orb:focus-visible,button:focus-visible,textarea:focus-visible{outline:3px solid #f5b942;outline-offset:3px}
    .panel{pointer-events:auto;position:fixed;right:10px;bottom:10px;width:min(360px,calc(100vw - 20px));max-height:min(72vh,620px);overflow:auto;background:#11111bf5;border:1px solid #8b75b5;border-radius:20px;box-shadow:0 12px 50px #000b;padding:14px;display:none}
    .panel.open{display:block}.head{display:flex;align-items:center;gap:8px}.head h2{flex:1;font-size:18px;margin:0;color:#f5b942}.close{min-width:42px;min-height:42px;font-size:20px}
    p{font-size:14px;line-height:1.45;color:#e5e1ed;margin:8px 0 10px}.conversation{min-height:70px;max-height:30vh;overflow:auto;display:flex;flex-direction:column;gap:8px;padding:6px 0}.bubble{max-width:92%;padding:10px 12px;border-radius:13px;background:#211a30;font-size:14px;line-height:1.45;white-space:pre-wrap;overflow-wrap:anywhere}.bubble.user{align-self:flex-end;background:#6332a5}.bubble.farol{align-self:flex-start;border:1px solid #54466b}
    textarea{width:100%;min-height:54px;resize:vertical;border-radius:11px;border:1px solid #65547e;background:#090911;color:#fff;padding:11px;font-size:16px;line-height:1.4}.buttons{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px}button{min-height:44px;padding:9px 10px;border:1px solid #725a94;border-radius:11px;background:#211a30;color:#fff;font-weight:700;font-size:14px;cursor:pointer}.primary{background:#7138c9;border-color:#9567d9}.small{font-size:12px;color:#c8c0d8}.tools{margin-top:10px;border-top:1px solid #54466b;padding-top:8px}.tools summary{cursor:pointer;min-height:42px;padding:10px 4px;font-weight:700}.warning{display:none;margin-top:10px;padding:11px;border:2px solid #ffbd4a;border-radius:12px;background:#39280f;color:#fff;font-size:14px;line-height:1.45}.warning.show{display:block}.spotlight{position:fixed;border:4px solid #ffbd4a;border-radius:12px;box-shadow:0 0 0 9999px #0002,0 0 22px #ffbd4a;background:transparent;pointer-events:none;display:none}.spotlight.show{display:block}
  `;
  const button = (text, className = '') => {
    const element = document.createElement('button');
    element.type = 'button'; element.textContent = text;
    if (className) element.className = className;
    return element;
  };
  const panel = document.createElement('section');
  panel.className = 'panel'; panel.setAttribute('role','dialog'); panel.setAttribute('aria-label','Conversa com o Farol');
  const header = document.createElement('header'); header.className = 'head';
  const title = document.createElement('h2'); title.textContent = '✦ Farol';
  const close = button('Fechar'); close.className = 'close'; close.setAttribute('aria-label','Fechar conversa');
  header.append(title,close);
  const intro = document.createElement('p'); intro.textContent = 'Estou aqui nesta página. Diga o que procura e eu tento destacar onde interagir. Você confere e toca.';
  const conversation = document.createElement('div'); conversation.className = 'conversation'; conversation.setAttribute('aria-live','polite');
  const welcome = document.createElement('div'); welcome.className = 'bubble farol'; welcome.textContent = 'Olá! Como posso orientar você nesta página?'; conversation.append(welcome);
  const goal = document.createElement('textarea'); goal.setAttribute('aria-label','Diga o que quer encontrar'); goal.placeholder = 'Ex.: quero encontrar onde baixar o programa';
  const actions = document.createElement('div'); actions.className = 'buttons';
  const guide = button('Indicar na página','primary'); const clear = button('Limpar destaque'); actions.append(guide,clear);
  const tools = document.createElement('details'); tools.className = 'tools';
  const summary = document.createElement('summary'); summary.textContent = 'Mais ferramentas';
  const manualLabel = document.createElement('p'); manualLabel.textContent = 'Se quiser, cole um trecho do manual ou README:';
  const manual = document.createElement('textarea'); manual.setAttribute('aria-label','Trecho do manual ou README'); manual.placeholder = 'Cole aqui apenas o trecho necessário';
  const toolActions = document.createElement('div'); toolActions.className = 'buttons';
  const copy = button('Copiar orientação'); const end = button('Encerrar e limpar'); toolActions.append(copy,end);
  tools.append(summary,manualLabel,manual,toolActions);
  const warning = document.createElement('div'); warning.className = 'warning'; warning.setAttribute('role','alert');
  const privacy = document.createElement('p'); privacy.className = 'small'; privacy.textContent = 'A conversa fica temporariamente nesta aba. Não é enviada a um servidor nem salva pelo Farol. Feche e escolha “Encerrar e limpar” para remover tudo.';
  panel.append(header,intro,conversation,goal,actions,tools,warning,privacy);
  const orb = button('✦'); orb.className = 'orb'; orb.setAttribute('aria-label','Farol: arraste para mover ou toque para conversar');
  const spotlight = document.createElement('div'); spotlight.className = 'spotlight';
  shadow.append(style,orb,panel,spotlight); document.documentElement.appendChild(host);

  let alertCount = 0, target = null, dragging = false, moved = false;
  let startX = 0, startY = 0, startLeft = 0, startTop = 0;
  function togglePanel() {
    panel.classList.toggle('open');
    if (panel.classList.contains('open')) goal.focus();
  }
  close.addEventListener('click', () => { panel.classList.remove('open'); orb.focus(); });
  orb.addEventListener('pointerdown', event => {
    if (event.button !== undefined && event.button !== 0) return;
    dragging = true; moved = false; startX = event.clientX; startY = event.clientY;
    const rect = orb.getBoundingClientRect(); startLeft = rect.left; startTop = rect.top;
    orb.setPointerCapture(event.pointerId);
  });
  orb.addEventListener('pointermove', event => {
    if (!dragging) return;
    const dx = event.clientX - startX, dy = event.clientY - startY;
    if (Math.abs(dx) + Math.abs(dy) > 6) moved = true;
    if (moved) {
      orb.style.left = `${Math.max(4, Math.min(innerWidth - 46, startLeft + dx))}px`;
      orb.style.top = `${Math.max(4, Math.min(innerHeight - 46, startTop + dy))}px`;
    }
  });
  orb.addEventListener('pointerup', () => {
    if (!dragging) return;
    dragging = false;
    if (moved) {
      const rect = orb.getBoundingClientRect();
      orb.style.left = `${rect.left + rect.width / 2 < innerWidth / 2 ? 8 : innerWidth - 50}px`;
    } else togglePanel();
  });
  orb.addEventListener('pointercancel', () => { dragging = false; });
  orb.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); togglePanel(); }
  });
  shadow.addEventListener('keydown', event => {
    if (event.key === 'Escape' && panel.classList.contains('open')) { panel.classList.remove('open'); orb.focus(); }
  });

  function normalize(text) { return (text || '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim(); }
  function isRisky(text) { return /\b(pagar|pagamento|payment|pay now|checkout|comprar|compra|purchase|apagar|excluir|deletar|delete|remover|remove|cancelar assinatura|transferir|transfer)\b/i.test(normalize(text)); }
  function alertRisk() {
    if (alertCount >= 3) return;
    alertCount++;
    warning.textContent = `⚠️ Alerta ${alertCount} de 3: esta tarefa pode envolver pagamento, exclusão ou outra ação importante. Confira com atenção. O Farol não confirma, não paga e não apaga nada.`;
    warning.classList.add('show');
  }
  function say(text, who = 'farol') {
    const bubble = document.createElement('div'); bubble.className = `bubble ${who}`; bubble.textContent = text;
    conversation.append(bubble); conversation.scrollTop = conversation.scrollHeight;
  }
  function clearHighlight() { spotlight.classList.remove('show'); target = null; }
  function positionHighlight() {
    if (!target || !target.isConnected) { clearHighlight(); return; }
    const rect = target.getBoundingClientRect();
    const left = Math.max(0, rect.left - 5), top = Math.max(0, rect.top - 5);
    spotlight.style.left = `${left}px`; spotlight.style.top = `${top}px`;
    spotlight.style.width = `${Math.max(12, Math.min(innerWidth - left, rect.width + 10))}px`;
    spotlight.style.height = `${Math.max(12, Math.min(innerHeight - top, rect.height + 10))}px`;
    spotlight.classList.add('show');
  }
  function findTarget(query) {
    const words = normalize(query).split(' ').filter(word => word.length > 2);
    if (!words.length) return null;
    const selectors = 'button,a,[role="button"],input,label,h1,h2,h3,[tabindex]';
    const candidates = [...document.querySelectorAll(selectors)].filter(element => !host.contains(element) && element.getBoundingClientRect().width > 0 && element.getBoundingClientRect().height > 0 && getComputedStyle(element).visibility !== 'hidden');
    let best = null, bestScore = 0, bestLength = Infinity;
    for (const element of candidates) {
      const text = normalize(element.innerText || element.getAttribute('aria-label') || element.value || element.title);
      if (!text) continue;
      const score = words.reduce((sum, word) => sum + (text.includes(word) ? 1 : 0), 0);
      if (score > bestScore || (score === bestScore && score > 0 && text.length < bestLength)) {
        best = element; bestScore = score; bestLength = text.length;
      }
    }
    return bestScore ? best : null;
  }
  function guidePerson() {
    const query = goal.value.trim();
    if (!query) { say('Diga ou escreva o que quer encontrar primeiro.'); goal.focus(); return; }
    say(query, 'user');
    const match = findTarget(query);
    if (!match) {
      clearHighlight();
      say('Não encontrei um lugar claramente relacionado. Tente usar palavras que aparecem na tela ou abra “Mais ferramentas” e cole uma instrução. Não cliquei em nada.');
      if (isRisky(query)) alertRisk();
      return;
    }
    target = match; match.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    setTimeout(positionHighlight, 250);
    const label = (match.innerText || match.getAttribute('aria-label') || match.value || 'item').trim().slice(0, 120);
    say(`Pode ser aqui: “${label}”. Destaquei o elemento. Confira se é o lugar certo; você decide se toca.`);
    if (isRisky(`${query} ${label} ${manual.value}`)) alertRisk();
    goal.value = '';
  }
  guide.addEventListener('click', guidePerson);
  goal.addEventListener('keydown', event => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); guidePerson(); } });
  clear.addEventListener('click', clearHighlight);
  copy.addEventListener('click', async () => {
    const text = [...conversation.querySelectorAll('.bubble')].map(element => element.textContent).join('\n\n');
    try { await navigator.clipboard.writeText(text); say('Conversa copiada. Confira antes de colar em outro aplicativo.'); }
    catch { say('Não consegui copiar automaticamente. Selecione o texto e escolha Copiar no menu do navegador.'); }
  });
  end.addEventListener('click', () => {
    if (confirm('Encerrar o Farol e remover desta aba a conversa, o objetivo e o trecho de manual?')) host.remove();
  });
  addEventListener('scroll', positionHighlight, true);
  addEventListener('resize', positionHighlight);
})();
