# Farol — piloto de inclusão digital

**Uma bolinha discreta que acompanha a pessoa na página, pode ser reposicionada e destaca onde talvez seja o próximo lugar para interagir. A pessoa continua no comando.**

**A small orb that stays on the page, can be repositioned, and highlights a possible next place to interact. The person stays in control.**

## O que é / What it is

Farol é um protótipo de assistente de inclusão digital. A função principal é orientar visualmente: ajudar a pessoa a entender termos, instruções e funções de sites e programas e destacar um possível próximo elemento usando o objetivo digitado e, opcionalmente, um trecho de manual/README escolhido pela pessoa.

Farol is a digital-inclusion assistant prototype. Its primary function is visual guidance: helping people understand terms, instructions, and features in websites and software, and highlighting a possible next element based on a typed goal and, optionally, a manual/README excerpt chosen by the person.

## Protótipo / Prototype

- `index.html` é a demonstração visual original da bolinha e do painel Farol.
- `extension/` contém uma extensão experimental para Chrome/Edge desktop. A pessoa a aciona na aba atual, move a bolinha, informa um objetivo, pode colar instruções e pede ao Farol para procurar e destacar um elemento possível.
- O destaque é a função central da extensão, mas a correspondência é uma busca simples por palavras: pode errar ou não encontrar nada. O Farol não clica.
- A extensão pode exibir até três avisos por sessão de overlay quando o objetivo/manual ou elemento encontrado contém palavras associadas a pagamento ou exclusão. A detecção é heurística, pode falhar e não bloqueia a página.
- A cópia é iniciada pela pessoa. O Farol não paga, não apaga, não envia mensagens, não pede senha e não executa ações no site.

## Instalar a extensão experimental / Install the experimental extension

1. Baixe ou clone este repositório no computador. / Download or clone this repository on your computer.
2. Abra `chrome://extensions` no Chrome ou `edge://extensions` no Edge. / Open the extensions page in Chrome or Edge.
3. Ative **Modo do desenvolvedor**. / Turn on **Developer mode**.
4. Escolha **Carregar sem compactação** e selecione a pasta `extension/`. / Choose **Load unpacked** and select the `extension/` folder.
5. Abra um site e clique no ícone do Farol. O navegador pode não permitir a extensão em páginas internas ou protegidas. / Open a website and click the Farol icon. The browser may block extensions on internal or protected pages.

É uma instalação de teste para computador, não uma publicação na loja nem um app para celular. A extensão pede acesso à aba atual somente quando a pessoa a aciona (`activeTab`); o protótipo não usa servidor nem envia o conteúdo da página para fora do navegador.

This is a desktop test installation, not a store release or a mobile app. The extension requests access to the current tab only when invoked (`activeTab`); this prototype does not use a server or send page content outside the browser.

## Limitações importantes / Important limitations

- O texto do README/manual precisa ser colado pela pessoa; a extensão ainda não busca documentação automaticamente.
- A busca é simples e pode destacar o lugar errado ou não encontrar nada. Sempre confira o destaque.
- Avisos de risco usam palavras-chave e podem deixar passar riscos ou gerar avisos indevidos. Eles não substituem a leitura cuidadosa nem protegem contra pagamentos/exclusões.
- O protótipo não é IA, não aprende dados pessoais, não lê todas as partes da página e não opera WhatsApp ou outros aplicativos.
- Transcrição de voz, integração com tradutores e suporte móvel ainda não estão implementados nesta extensão.
- Esta versão não foi testada em todos os sites/navegadores e não deve ser usada como mecanismo de segurança.

## Princípio de segurança / Safety principle

O Farol orienta, prepara e destaca um possível caminho. A pessoa revisa e interage. Não apagar, pagar, enviar ou confirmar automaticamente.

Farol guides, prepares, and highlights a possible path. The person reviews and interacts. Never delete, pay, send, or confirm automatically.
