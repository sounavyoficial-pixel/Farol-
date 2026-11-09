# Farol — assistência digital na borda

**Uma bolinha pequena, sempre por perto. Uma ajuda simples quando a tela não faz sentido.**

**A small orb, always nearby. Simple help when the screen doesn’t make sense.**

O Farol é um protótipo de assistente de inclusão digital em formato de overlay. Ele acompanha a pessoa na página que ela está usando e pode ajudar a entender palavras, traduzir trechos e descobrir o próximo passo — sem exigir que ela já conheça a ferramenta.

Farol is a digital-inclusion assistant prototype in an overlay. It stays alongside the page a person is using and can help explain terms, translate passages, and find the next step—without expecting the person to already know the tool.

## A ideia / The idea

A pessoa pode estar usando um site ou programa pela primeira vez e encontrar termos como “download”, “console”, “Ruby” ou “Play”. Em vez de sair da página e procurar sozinha, ela chama o Farol, fala ou escreve o que precisa e recebe uma orientação clara, ligada àquela tarefa.

Someone may be using a website or program for the first time and encounter terms such as “download,” “console,” “Ruby,” or “Play.” Instead of leaving the page to search alone, they can call Farol, speak or type what they need, and get clear guidance related to that task.

O Farol deve ser um **facilitador**, não mais um aplicativo que obriga a pessoa a mudar de lugar. A ajuda pode incluir:

Farol should be a **facilitator**, not another app that makes someone switch contexts. Help may include:

- explicar um termo digital no contexto em que aparece / explain a digital term in the context where it appears;
- traduzir um trecho da página ou facilitar o uso de um tradutor que a pessoa já utiliza / translate part of a page or help use a translator the person already uses;
- orientar passo a passo ou indicar o caminho direto para quem já sabe o que quer fazer / guide step by step or show a direct route for someone who already knows what they want to do;
- receber uma solicitação falada ou digitada e, quando apropriado, ajudar a levá-la a outra ferramenta ou IA / take a spoken or typed request and, when appropriate, help pass it to another tool or AI;
- adaptar a forma da orientação às preferências e necessidades que a própria pessoa compartilhar / adapt guidance to preferences and needs the person chooses to share.

## Experiência desejada / Intended experience

1. Instalar e ligar com poucos passos. / Install and turn it on in a few simple steps.
2. Manter a bolinha pequena, quieta e arrastável, para estacioná-la onde não atrapalhe. / Keep the orb small, unobtrusive, and movable so it can be parked out of the way.
3. Tocar para abrir um painel compacto; fechar para voltar à bolinha. / Tap to open a compact panel; close it to return to the orb.
4. Falar ou escrever a dúvida. A fala pode ser transcrita para texto. / Speak or type a question. Speech can be transcribed into text.
5. Receber ajuda clara, contextual e no ritmo da pessoa. / Get clear, contextual help at the person’s pace.

## Protótipo / Prototype

O repositório contém uma demonstração em HTML (`index.html`) da bolinha arrastável, do painel compacto, dos controles de voz do navegador e de uma interação de exemplo. Ela demonstra a interface, mas ainda **não** acompanha outros sites nem implementa tradução contextual ou orientação real sobre a página. O chat com IA também ainda não está integrado de forma segura para produção.

The repository contains an HTML demonstration (`index.html`) of the draggable orb, compact panel, browser voice controls, and a sample interaction. It demonstrates the interface, but it does **not yet** follow users across other websites or provide contextual translation or real page guidance. The AI chat is also not yet securely integrated for production.

### Executar localmente / Run locally

Abra `index.html` em um navegador. Para servi-lo localmente, use:

Open `index.html` in a browser. To serve it locally, run:

```bash
python -m http.server 8000
```

Acesse `http://localhost:8000` / Visit `http://localhost:8000`.

## Próximos passos / Next steps

- **MVP:** uma extensão de navegador leve, com bolinha arrastável e painel compacto. / **MVP:** a lightweight browser extension with a draggable orb and compact panel.
- Permitir que a pessoa selecione ou compartilhe um trecho para pedir explicação ou tradução. / Let the person select or share a passage to request an explanation or translation.
- Oferecer orientação passo a passo e uma opção de caminho direto, sempre deixando a pessoa no controle. / Offer step-by-step guidance and a direct-route option, while keeping the person in control.
- Integrar ferramentas e serviços externos de forma opcional, sem tornar uma IA específica requisito para usar o Farol. / Integrate external tools and services optionally, without making one specific AI a requirement for using Farol.
- Tornar a coleta de feedback opcional e transparente; pedir consentimento e evitar guardar áudio ou dados pessoais sem necessidade. / Make feedback collection optional and transparent; ask for consent and avoid retaining audio or personal data unnecessarily.

## Princípio de inclusão / Inclusion principle

Cada pessoa tem necessidades e dificuldades diferentes. O Farol deve permitir que a pessoa diga de que ajuda precisa, adapte a orientação e, se quiser, compartilhe aprendizados que possam ajudar outras pessoas. Compartilhar dados não deve ser condição para receber ajuda.

Every person has different needs and challenges. Farol should let people say what help they need, adapt its guidance, and—if they choose—share learnings that may help others. Sharing data must never be a condition for getting help.

## Estado do projeto / Project status

Protótipo experimental em desenvolvimento. Não é ainda um produto final nem um sistema operacional. / Experimental prototype in development. It is not yet a finished product or an operating system.
