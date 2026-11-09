# Farol — piloto de inclusão digital

**Uma bolinha discreta para ajudar a entender a página e encontrar o próximo passo. A pessoa continua no comando.**

**A small, unobtrusive orb to help understand a page and find the next step. The person stays in control.**

## O que é / What it is

Farol é um protótipo de assistente de inclusão digital. A ideia é ajudar a pessoa a entender termos, instruções e funções de sites e programas, usando a documentação que ela escolher compartilhar — como um README ou manual. A bolinha pode orientar e destacar um possível lugar na página; ela não deve tomar decisões pela pessoa.

Farol is a digital-inclusion assistant prototype. It aims to help people understand terms, instructions, and features in websites and software, using documentation they choose to share—such as a README or manual. The orb can guide and highlight a possible place on the page; it should not make decisions for the person.

## Protótipo / Prototype

- `index.html` é a demonstração visual original da bolinha e do painel Farol.
- `extension/` contém uma primeira extensão experimental para Chrome/Edge desktop. Ela abre por ação da pessoa na aba atual, aceita um objetivo e texto de manual colado, procura controles visíveis relacionados e destaca um resultado sem clicar.
- A extensão avisa — até três vezes por aba — quando detecta palavras que podem indicar pagamento, exclusão ou outra ação importante. O aviso é heurístico; não reconhece todos os riscos e não bloqueia a página.
- A cópia é iniciada pela pessoa. O Farol não paga, não apaga, não envia mensagens, não pede senha e não executa ações no site.

`index.html` is a visual demonstration of the original orb and panel. `extension/` contains an experimental first Chrome/Edge desktop extension. It opens only after the person clicks the extension in the current tab, accepts a goal and pasted manual text, searches visible controls, and highlights a possible match without clicking. It displays up to three warnings per tab when it detects words that may indicate payment, deletion, or another important action. Detection is heuristic and cannot identify every risk or block the page. Copying is user-initiated. Farol does not pay, delete, send messages, request passwords, or perform actions on the website.

## Instalar a extensão experimental / Install the experimental extension

1. Baixe ou clone este repositório no computador. / Download or clone this repository on your computer.
2. Abra `chrome://extensions` no Chrome ou `edge://extensions` no Edge. / Open the extensions page in Chrome or Edge.
3. Ative **Modo do desenvolvedor**. / Turn on **Developer mode**.
4. Escolha **Carregar sem compactação** e selecione a pasta `extension/`. / Choose **Load unpacked** and select the `extension/` folder.
5. Abra um site e clique no ícone do Farol. O navegador pode não permitir a extensão em páginas internas ou protegidas. / Open a website and click the Farol icon. The browser may block extensions on internal or protected pages.

Essa é uma instalação de teste para computador, não uma publicação na loja nem um app para celular. A extensão pede acesso à aba atual somente quando a pessoa a aciona (`activeTab`); o protótipo não usa servidor nem envia o conteúdo da página para fora do navegador.

This is a desktop test installation, not a store release or a mobile app. The extension requests access to the current tab only when the person invokes it (`activeTab`); this prototype does not use a server or send page content outside the browser.

## Limitações importantes / Important limitations

- O texto do README/manual precisa ser colado pela pessoa; a extensão ainda não busca documentação automaticamente.
- A busca é simples e pode destacar o lugar errado ou não encontrar nada. Sempre confira o destaque.
- Avisos de risco usam palavras-chave e podem deixar passar riscos ou gerar avisos indevidos. Eles não substituem a leitura cuidadosa.
- O protótipo não é IA, não aprende dados pessoais, não lê todas as partes da página e não opera WhatsApp ou outros aplicativos.
- Transcrição de voz, integração com tradutores e suporte móvel ainda não estão implementados nesta extensão.
- Esta versão não foi verificada em todos os sites/navegadores; não a use como mecanismo de segurança para pagamentos ou exclusões.

The README/manual must be pasted by the person; automatic documentation retrieval is not implemented. Search is basic and may highlight the wrong place or find nothing, so always verify it. Risk warnings use keywords and can miss risks or show false alarms; they do not replace careful review. This prototype is not AI, does not learn personal data, read every part of a page, or operate WhatsApp or other apps. Voice transcription, translator integrations, and mobile support are not yet implemented in this extension. It has not been verified on every site/browser; do not rely on it as a safety mechanism for payments or deletions.

## Princípio de segurança / Safety principle

O Farol orienta, prepara e destaca. A pessoa revisa e executa. Não apagar, pagar, enviar ou confirmar automaticamente.

Farol guides, prepares, and highlights. The person reviews and acts. Never delete, pay, send, or confirm automatically.
