const status = document.getElementById('status');

(async () => {
  status.textContent = 'Abrindo a bolinha do Farol sobre esta página…';
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) throw new Error('Não encontrei a aba atual.');
    await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['content.js'] });
    window.close();
  } catch (error) {
    status.textContent = 'O navegador bloqueou o Farol nesta página. Tente em um site comum; páginas internas e protegidas não permitem a extensão.';
  }
})();
