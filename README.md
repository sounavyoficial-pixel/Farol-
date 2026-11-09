# Farol — piloto de inclusão digital

**Uma bolinha pequena e discreta por cima da página em que a pessoa já está. Toque para abrir uma conversa simples; use “Mais ferramentas” quando precisar.**

**A small, unobtrusive orb over the page the person is already using. Tap it to open a simple conversation; use “More tools” when needed.**

## O que é / What it is

Farol é um protótipo de assistente de inclusão digital. Não abre um site próprio para orientar: a extensão injeta uma bolinha e um painel de conversa sobre a página atual, após a pessoa tocar no ícone do Farol no navegador. A bolinha pode ser movida para não atrapalhar. O painel inicial é simples e as ferramentas adicionais ficam recolhidas.

Farol is a digital-inclusion assistant prototype. It does not open a separate website to provide guidance: after the person clicks the Farol browser icon, the extension places an orb and conversation panel over the current page. The orb can be moved out of the way. The initial panel is simple, with extra tools collapsed.

## Protótipo / Prototype

- `index.html` é a demonstração visual original.
- `extension/` contém uma extensão experimental para Chrome/Edge desktop. Ao tocar no ícone do navegador, ela tenta mostrar a bolinha sobre a aba atual; não abre uma página própria. A pessoa toca na bolinha para abrir ou fechar o chat.
- A pessoa descreve o que procura; o protótipo tenta encontrar texto ou um controle com palavras semelhantes e destacar uma possível correspondência. A pessoa confere e interage. O Farol não clica.
- “Mais ferramentas” contém colar trecho de manual, copiar a conversa e encerrar/limpar os dados temporários desta aba.
- A extensão pode exibir até três alertas por overlay quando o pedido, trecho informado ou resultado contém palavras associadas a pagamento ou exclusão. A detecção é heurística, pode falhar e não bloqueia a página.
- O protótipo não usa IA ou servidor, não salva a conversa, não paga, apaga, envia mensagens ou pede senhas.

## Instalar a extensão experimental / Install the experimental extension

1. Baixe ou clone este repositório no computador.
2. Abra `chrome://extensions` no Chrome ou `edge://extensions` no Edge.
3. Ative **Modo do desenvolvedor**.
4. Escolha **Carregar sem compactação** e selecione a pasta `extension/`.
5. Abra um site comum e toque no ícone do Farol na barra do navegador. A bolinha será colocada sobre a página atual. Páginas internas ou protegidas podem bloquear extensões.

É uma instalação de teste para computador, não uma publicação na loja nem um app para celular. A extensão usa a permissão `activeTab` quando a pessoa aciona o ícone; o conteúdo não é enviado para um servidor. Para remover os dados temporários, abra o chat, toque em **Mais ferramentas** e escolha **Encerrar e limpar**.

## Limitações importantes / Important limitations

- A extensão só é ativada na aba atual após a pessoa tocar no ícone. Ela não acompanha automaticamente outras abas nem permanece disponível em páginas que o navegador bloqueia.
- A busca é simples e pode destacar o lugar errado ou não encontrar nada. Sempre confira o destaque.
- O trecho de manual/README precisa ser colado pela pessoa; o protótipo não busca documentação automaticamente.
- Os alertas usam palavras-chave, podem deixar passar riscos ou gerar avisos indevidos e não são uma proteção para pagamentos ou exclusões.
- Não há IA, voz, integração com tradutores, controle de permissões de sites, nem suporte móvel nesta versão.
- O protótipo não foi testado em todos os sites/navegadores e não deve ser usado como mecanismo de segurança.

## Princípio de segurança / Safety principle

O Farol orienta, explica e destaca um possível caminho. A pessoa revisa e interage. Não apagar, pagar, enviar ou confirmar automaticamente.
