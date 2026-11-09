# Instruções do Copilot e agentes de código — Farol

Estas regras valem para qualquer alteração feita por assistentes de IA ou contribuidores neste repositório.

## Propósito

O Farol é um facilitador de inclusão digital: uma interface leve que ajuda a pessoa a entender a tela e escolher o próximo passo. A pessoa continua no controle. Não presumir que toda interação precisa de IA, internet ou coleta de dados.

## Regra inviolável: não destrutivo por padrão

- Não criar nem executar funções que apaguem, sobrescrevam, limpem, arquivem ou enviem mensagens/arquivos/dados em nome da pessoa sem uma ação explícita, específica e confirmada por ela.
- Não implementar limpeza automática, exclusão em lote, autodestruição, remoção de histórico, nem automações destrutivas para WhatsApp ou qualquer outro serviço.
- Não apagar dados como “correção”, “organização” ou “otimização”. Organizar significa sugerir, etiquetar, ordenar ou mostrar uma prévia sem remover o original.
- Se a pessoa pedir uma ação potencialmente destrutiva, primeiro explicar o que será afetado e pedir confirmação explícita; oferecer cancelamento e, quando possível, desfazer/restaurar.
- Preferir operações de leitura, cópia, rascunho e pré-visualização. Nunca enviar, publicar ou compartilhar automaticamente.
- Nunca introduzir código destrutivo escondido, mesmo que pareça útil. Evitar APIs e comandos de exclusão, truncamento, sobrescrita ou envio em massa.

## WhatsApp e serviços externos

- Não automatizar a leitura, exclusão ou envio de mensagens pessoais. Qualquer integração futura deve usar meios oficiais, respeitar permissões e exigir consentimento claro.
- Por padrão, preparar um rascunho para a pessoa revisar; não enviar mensagens automaticamente.
- Não pedir nem armazenar senha, token, chave de API ou código de autenticação no HTML, JavaScript público, README ou logs. Integrações que exigem segredo precisam de backend seguro e explicação clara.
- Não afirmar que uma integração funciona se ela não foi implementada e testada.

## Privacidade e inclusão

- Coletar o mínimo necessário. Áudio, transcrição, texto copiado e conteúdo de páginas não devem ser enviados nem armazenados sem aviso e escolha explícita.
- Dar feedback claro sobre o que uma ação fará. Usar linguagem simples, botões grandes e acessíveis, estados de foco e mensagens compreensíveis.
- Não presumir capacidade, idioma, experiência ou necessidade da pessoa. Permitir que ela escolha entre orientação direta e passo a passo.
- Se não houver suporte do navegador, explicar uma alternativa simples sem falhar silenciosamente.

## Mudanças de código

1. Ler o comportamento atual antes de editar; preservar recursos existentes que não foram pedidos para remover.
2. Fazer a menor mudança segura que atenda ao pedido.
3. Antes de concluir, procurar efeitos colaterais, especialmente exclusão, envio automático, chamadas externas, armazenamento e permissões.
4. Executar testes disponíveis; se não houver testes ou não for possível executá-los, declarar isso claramente.
5. Resumir o que mudou, o que não funciona ainda e qualquer limitação. Não dizer “pronto para produção” sem verificação adequada.

## Regra para ações irreversíveis

A assistência pode explicar e preparar uma ação; a pessoa deve iniciá-la e confirmá-la. Se não for possível preservar os dados ou oferecer uma recuperação razoável, não implementar a ação.
