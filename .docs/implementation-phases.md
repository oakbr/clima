# Fases de Implementação - Clima

Este documento organiza a implementação do [PRD](prd.md) em fases. Ele serve como painel de acompanhamento macro do projeto.

As tarefas detalhadas, seus objetivos e critérios de aprovação estão em [tasks.md](tasks.md). As informações funcionais, técnicas e visuais devem ser consultadas no [PRD](prd.md), sem duplicação neste arquivo.

## Como controlar o progresso

- Marque a fase como `[x]` somente quando todas as tasks listadas estiverem concluídas e o critério de saída da fase for atendido.
- Marque as tasks individualmente em [tasks.md](tasks.md), seguindo os critérios de aprovação definidos lá.
- A implementação deve avançar preferencialmente na ordem das fases.
- Uma fase pode ser considerada em andamento quando pelo menos uma de suas tasks estiver concluída e ainda existirem tasks pendentes.
- Registre decisões ou bloqueios diretamente na task relacionada ou no [PRD](prd.md), quando alterarem um requisito.

## Resumo do progresso

- Total de fases: 8
- Fases concluídas: 8
- Fases em andamento: 0
- Fases pendentes: 0

## Fase 1 - Fundação do projeto

**Status:** [x] Concluída

**Objetivo:** preparar a estrutura técnica para a implementação, mantendo o projeto compilável.

**Tasks:**

- [x] T01 - Preparar a estrutura inicial
- [x] T02 - Definir os tipos da aplicação e da API

**Critério de saída:** a estrutura de `services`, `types` e `utils` está preparada, os contratos TypeScript estão definidos e `npm run build` passa.

## Fase 2 - Integração com Open-Meteo

**Status:** [x] Concluída

**Objetivo:** implementar as duas consultas externas e conectá-las em um único fluxo de busca.

**Tasks:**

- [x] T03 - Implementar o serviço de geocodificação
- [x] T04 - Implementar o serviço meteorológico
- [x] T05 - Compor o fluxo de busca

**Critério de saída:** uma cidade válida de qualquer país executa geocodificação e consulta meteorológica, sem chamadas diretas da interface à API.

## Fase 3 - Regras de negócio

**Status:** [x] Concluída

**Objetivo:** converter os dados da API em informações prontas para exibição.

**Tasks:**

- [x] T06 - Implementar formatação e interpretação dos dados

**Critério de saída:** data/hora, unidades, direção do vento, dia/noite e todos os códigos WMO do [PRD](prd.md) são interpretados corretamente.

## Fase 4 - Estrutura da interface

**Status:** [x] Concluída

**Objetivo:** substituir o template inicial por uma interface semântica com os estados básicos.

**Tasks:**

- [x] T07 - Criar o estado vazio e a estrutura semântica
- [x] T08 - Implementar os estados de carregamento e erro

**Critério de saída:** a aplicação possui busca funcional, estado vazio, carregamento e erro, com bloqueio adequado durante as consultas.

## Fase 5 - Renderização dos dados

**Status:** [x] Concluída

**Objetivo:** apresentar a localização e os dados meteorológicos do resultado normalizado.

**Tasks:**

- [x] T09 - Renderizar o resumo da localização
- [x] T10 - Renderizar os detalhes meteorológicos

**Critério de saída:** uma busca bem-sucedida exibe cidade, país, temperatura, data/hora, dia/noite, descrição WMO e os seis detalhes meteorológicos com unidades.

## Fase 6 - Identidade visual

**Status:** [x] Concluída

**Objetivo:** aplicar o layout visual do PRD para desktop, tablet e celular.

**Tasks:**

- [x] T11 - Adicionar biblioteca e ícones de interface
- [x] T12 - Implementar o layout visual desktop
- [x] T13 - Implementar responsividade mobile e tablet

**Critério de saída:** o contêiner, a sidebar, a área principal, os ícones e a busca seguem a direção visual do [PRD](prd.md), sem sobreposição ou rolagem horizontal em telas menores.

## Fase 7 - Qualidade e acessibilidade

**Status:** [x] Concluída

**Objetivo:** revisar a experiência de uso e confirmar o comportamento nos cenários principais e de falha.

**Tasks:**

- [x] T14 - Revisar acessibilidade e conteúdo em português
- [x] T15 - Validar integração e cenários de erro

**Critério de saída:** a aplicação é navegável por teclado, possui foco e labels adequados, mantém textos em português do Brasil e trata corretamente entradas inválidas, cidade inexistente e falhas de rede/API.

## Fase 8 - Entrega

**Status:** [x] Concluída

**Objetivo:** executar a verificação final e garantir que a documentação e a implementação estejam alinhadas.

**Tasks:**

- [x] T16 - Executar a validação final do projeto

**Critério de saída:** `npm run build` passa, o template inicial não está ativo, os critérios de aceite do [PRD](prd.md) são atendidos e não há contradições entre [prd.md](prd.md), [tasks.md](tasks.md) e a implementação.

## Registro de bloqueios e decisões

Use esta seção apenas para registrar informações que afetem a ordem das fases, os critérios de aprovação ou os requisitos do [PRD](prd.md).

| Data | Fase/task | Tipo | Registro | Ação necessária |
|---|---|---|---|---|
|  |  |  |  |  |
