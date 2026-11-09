# Farol — piloto de inclusão digital

**Uma bolinha pequena e discreta por cima da página em que a pessoa já está. Toque para abrir um chat compacto; use o botão ⋯ para mostrar ferramentas extras.**

## Como funciona

- A extensão experimental para Chrome/Edge desktop é chamada pelo ícone do navegador na aba atual. Ela não abre um site ou app separado.
- Uma bolinha pequena aparece por cima da página. É possível arrastá-la; tocar nela abre ou fecha o chat.
- Escreva o que quer encontrar e toque em **Mostrar onde tocar**. O Farol tenta encontrar uma correspondência por palavras e marca um único elemento com um contorno brilhante, sem escurecer ou cobrir o restante da tela. A pessoa confere e toca; o Farol nunca clica.
- O botão **⋯** abre ferramentas secundárias: colar trecho de manual/README, copiar a conversa, limpar a marcação e encerrar/limpar os dados temporários.
- Pagamentos, exclusões e termos de risco podem gerar até três alertas. A detecção é simples, pode falhar e não bloqueia a página. O Farol não paga, apaga, envia nem confirma ações.
- O conteúdo da página só é examinado quando a pessoa pede o destaque. O protótipo não envia os dados a um servidor nem os salva.

## Instalação experimental

1. Baixe ou clone o repositório em um computador.
2. Abra `chrome://extensions` no Chrome ou `edge://extensions` no Edge.
3. Ative **Modo do desenvolvedor**.
4. Selecione **Carregar sem compactação** e escolha a pasta `extension/`.
5. Abra um site comum e toque no ícone do Farol na barra do navegador. Páginas internas e protegidas podem bloquear extensões.

A extensão usa `activeTab`: a pessoa a chama explicitamente para a aba atual. Isso evita pedir acesso indiscriminado a todos os sites. Para usar em outra aba, chame o Farol novamente nela. O navegador não permite extensões em todas as páginas, e esta versão não acompanha automaticamente a navegação entre abas.

## Limitações

- O destaque por palavras pode marcar o elemento errado ou não encontrar nada; confirme antes de interagir.
- O trecho de manual precisa ser colado pela pessoa; não há busca automática nem IA.
- Alertas heurísticos não são proteção confiável contra pagamento ou exclusão.
- Não há controle automático de permissões de sites, voz nem suporte móvel.
- Esta versão não foi testada em todos os sites/navegadores e não está pronta para ser tratada como mecanismo de segurança.
