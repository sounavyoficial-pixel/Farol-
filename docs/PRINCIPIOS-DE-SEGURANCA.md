# Princípios de segurança e controle do Farol

## Função principal: orientar visualmente

O Farol é uma bolinha em overlay que ajuda a pessoa a entender a página e encontrar onde interagir. Deve orientar com destaque visual e instruções curtas, permitir reposicionar a bolinha e deixar a pessoa no controle de cada toque. Um destaque é uma indicação, não garantia de que o elemento está correto.

## O que o Farol deve fazer

Ajudar a compreender termos, telas e tarefas digitais; permitir falar, digitar, copiar e colar quando disponível; e oferecer orientação no ritmo escolhido pela pessoa. O Farol é um facilitador, não um operador autônomo.

## O que o Farol não deve fazer

- Não apagar mensagens, arquivos, contas, histórico ou conteúdo.
- Não pagar, enviar mensagens, publicar conteúdo, preencher formulários ou confirmar ações sensíveis pela pessoa.
- Não operar WhatsApp ou outros aplicativos em segundo plano sem autorização clara e integração oficial.
- Não coletar ou transmitir conteúdo da tela, áudio, transcrições ou dados pessoais silenciosamente.
- Não executar scripts recebidos de terceiros sem explicar o que fazem e revisar os riscos.

## Alertas para ações de risco

Para pagamentos, exclusões e outras ações sensíveis, o Farol pode apresentar até três alertas por fluxo. Os alertas devem usar linguagem simples e não podem sugerir que o Farol bloqueia ou garante segurança. A detecção pode falhar; a pessoa deve conferir a página e decidir. O Farol não executa nem confirma a ação.

## Fluxo seguro para ajudar

1. **Ouvir ou receber o pedido:** a pessoa fala, digita ou cola o conteúdo que escolheu compartilhar.
2. **Explicar:** o Farol usa linguagem simples e pergunta se algo não estiver claro.
3. **Preparar:** quando útil, cria um rascunho, uma cópia ou instruções passo a passo.
4. **Indicar visualmente:** destacar um possível elemento na página, informando que a correspondência pode estar errada.
5. **Deixar a decisão com a pessoa:** ela revisa e interage; o Farol não clica, envia, paga ou apaga.

## Organização sem apagar

“Organizar” significa apresentar sugestões, agrupar, ordenar ou criar etiquetas sem remover o material original. A pessoa deve poder revisar a proposta e decidir o que fazer. Não implementar exclusão automática ou em lote.

## Dados e consentimento

- Explicar antes de qualquer compartilhamento com um serviço externo.
- Coletar apenas os dados indispensáveis para a função escolhida.
- Não guardar áudio/transcrição por padrão.
- Tornar feedback e contribuição para melhorar o Farol opcionais; não condicionar ajuda à coleta de dados.
- Fornecer um jeito simples de sair, cancelar ou fechar a ajuda.

## Integrações futuras

Usar APIs oficiais, permissões mínimas e documentação atualizada. Segredos ficam no servidor, nunca no código público do navegador. Começar com funções locais e de baixo risco, como copiar texto, preparar rascunho e explicar um termo. Recursos de IA e integrações online são opcionais, não requisito para a ajuda básica.

## Estado atual

Estes princípios são requisitos de projeto; não significam que o protótipo implemente todas as capacidades. A extensão experimental só procura elementos com texto parecido e destaca uma possível correspondência. Pode errar e não é mecanismo de segurança para pagamentos/exclusões. Testar antes de divulgar qualquer recurso como disponível.
