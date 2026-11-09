const button = document.getElementById('open');
const status = document.getElementById('status');

button.addEventListener('click', async () => {
  button.disabled = true;
  status.textContent = 'Abrindo o Farol nesta página…';
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) throw new Error('Não encontrei a aba atual.');
    await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['content.js'] });
    window.close();
  } catch (error) {
    status.textContent = 'Não foi possível abrir nesta página. Algumas páginas internas do navegador bloqueiam extensões.';
    button.disabled = false;
  }
});
