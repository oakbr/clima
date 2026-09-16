# Tasks de Implementação - Clima

Este arquivo divide a implementação descrita no [PRD](prd.md) em tarefas progressivas. Cada tarefa deve ser executada por um agente por vez, na ordem apresentada, salvo quando o agente responsável identificar uma dependência diferente.

As regras funcionais, técnicas, visuais e os dados da API devem ser consultados no [prd.md](prd.md). Este arquivo contém apenas o trabalho incremental e os critérios para aprovar cada etapa.

## Como usar

- Marque `[x]` somente quando todos os critérios de aprovação da tarefa forem atendidos.
- O agente deve alterar apenas o necessário para concluir a tarefa atual.
- O agente deve executar a validação indicada antes de marcar a tarefa como concluída.
- Falhas ou decisões novas devem ser registradas na descrição da tarefa ou no PRD, conforme o caso.

## Tarefas

### [x] T01 - Preparar a estrutura inicial

Criar ou ajustar a estrutura base de pastas e arquivos prevista no PRD, preservando o funcionamento do Vite e do TypeScript.

**Critérios de aprovação**

- Existem os pontos de extensão necessários para `services`, `types` e `utils`, sem código duplicado entre interface e API.
- O projeto continua compilando com `npm run build`.
- Nenhuma funcionalidade do template permanece conectada à tela final, como o contador de exemplo.

### [x] T02 - Definir os tipos da aplicação e da API

Criar os tipos TypeScript para a resposta de geocodificação, a resposta meteorológica e o modelo normalizado usado pela interface.

**Critérios de aprovação**

- Os tipos contemplam os campos de localização exigidos pelo RF02 e os campos `current`/`current_units` exigidos pelo RF03 e RF06.
- O modelo normalizado não depende diretamente da estrutura completa da resposta da API.
- `npm run build` passa sem uso de `any` para contornar os contratos principais.

### [x] T03 - Implementar o serviço de geocodificação

Implementar no módulo de Open-Meteo a função que recebe o nome da cidade, codifica o parâmetro com uma API estruturada e consulta cidades de qualquer país.

**Critérios de aprovação**

- A URL usa `count=1`, `language=pt` e não contém `countryCode=BR`.
- A função trata resposta HTTP inválida, resposta sem resultados e erro de parsing.
- A função retorna somente os dados de localização necessários ou um erro controlável pela aplicação.
- A interface não chama `fetch` diretamente para geocodificação.

### [x] T04 - Implementar o serviço meteorológico

Implementar no mesmo limite de serviço a consulta do clima atual usando latitude, longitude e timezone da localização encontrada.

**Critérios de aprovação**

- A URL solicita todos os campos definidos no RF03.
- A função trata resposta HTTP inválida, resposta incompleta e erro de parsing.
- A função retorna `current` e `current_units` validados para a camada de aplicação.
- A interface não monta a URL nem chama `fetch` diretamente para o clima.

### [x] T05 - Compor o fluxo de busca

Conectar o envio do formulário às duas funções do serviço, mantendo a segunda consulta transparente para o usuário.

**Critérios de aprovação**

- Uma busca válida executa geocodificação e, somente após sucesso, consulta meteorológica.
- O primeiro resultado de geocodificação é usado conforme `count=1`.
- A tela recebe um único resultado normalizado com localização e clima.
- Falha em qualquer etapa produz uma única condição de erro, sem dados parcialmente atualizados.

### [x] T06 - Implementar formatação e interpretação dos dados

Criar os utilitários para data/hora, números, unidades, direção do vento, dia/noite e código WMO.

**Critérios de aprovação**

- A data/hora é derivada de `current.time`, formatada com `pt-BR` e respeita o timezone retornado pela API.
- `is_day` resulta em `Dia` ou `Noite`.
- Todos os códigos WMO do PRD possuem descrição em português e código desconhecido possui fallback.
- A direção mantém os graus e acrescenta direção cardinal quando aplicável.
- Os valores numéricos não exibem casas decimais desnecessárias.

### [x] T07 - Criar o estado vazio e a estrutura semântica

Substituir o template inicial por uma estrutura HTML semântica contendo busca, estado vazio, área de resultado e área de mensagem.

**Critérios de aprovação**

- A primeira abertura exibe somente o estado vazio, sem dados meteorológicos fictícios.
- Existe um formulário com campo de cidade e ação de pesquisa.
- O envio pelo botão e pela tecla Enter utiliza o mesmo fluxo.
- A estrutura possui regiões semanticamente identificáveis para busca, sidebar, detalhes e mensagens.

### [x] T08 - Implementar os estados de carregamento e erro

Adicionar o comportamento visual e funcional dos estados de carregamento e erro.

**Critérios de aprovação**

- Durante as duas consultas, o usuário vê um indicador de carregamento.
- Campo e botão ficam desabilitados durante a busca e retornam ao estado normal ao terminar.
- A mensagem de erro é única, clara e não expõe detalhes internos da API.
- Uma nova busca pode ser iniciada após erro.
- Uma busca antiga não sobrescreve uma busca mais recente, por cancelamento ou controle equivalente.

### [x] T09 - Renderizar o resumo da localização

Implementar a sidebar com cidade, país, temperatura, data/hora, situação de dia/noite e descrição WMO.

**Critérios de aprovação**

- O país exibido é o país retornado pela API, sem assumir Brasil.
- A temperatura atual recebe destaque visual e apresenta sua unidade.
- Data/hora e situação de dia/noite correspondem aos dados da resposta.
- A descrição meteorológica corresponde ao `weather_code` interpretado.
- Uma busca bem-sucedida substitui corretamente o conteúdo anterior.

### [x] T10 - Renderizar os detalhes meteorológicos

Implementar a área principal com os seis dados exigidos pelo RF06.

**Critérios de aprovação**

- São exibidos umidade, sensação térmica, chuva, precipitação, velocidade do vento e direção do vento.
- Cada item possui rótulo, valor e unidade legíveis.
- Chuva e precipitação aparecem como informações separadas, inclusive quando valem zero.
- A renderização usa valores da resposta atual e não dados fixos do exemplo.

### [x] T11 - Adicionar biblioteca e ícones de interface

Adicionar uma biblioteca de ícones moderna, preferencialmente Lucide, e aplicá-la aos elementos que representam busca, temperatura, umidade, chuva, precipitação, vento, calendário e dia/noite.

**Critérios de aprovação**

- A dependência está registrada no `package.json` e pode ser instalada por um novo ambiente.
- Os ícones reforçam os rótulos sem substituir valores ou textos.
- Ícones decorativos não são anunciados desnecessariamente por leitores de tela.
- O tamanho e o alinhamento dos ícones permanecem consistentes em todos os estados.

### [x] T12 - Implementar o layout visual desktop

Aplicar a direção visual principal descrita no PRD para telas maiores.

**Critérios de aprovação**

- O fundo geral é cinza escuro e a área superior não possui uma faixa de fundo própria.
- O campo de busca fica centralizado na parte superior.
- O contêiner de resultados é branco, centralizado, tem largura máxima aproximada de 800 px e bordas arredondadas.
- Sidebar fica à esquerda e área principal à direita.
- O resultado é legível, sem sobreposição ou deslocamentos causados por estados dinâmicos.

### [x] T13 - Implementar responsividade mobile e tablet

Adaptar a composição para larguras menores, mantendo leitura e interação confortáveis.

**Critérios de aprovação**

- Em telas pequenas, a sidebar aparece acima da área principal.
- Não existe rolagem horizontal causada pelo layout.
- Campo, botão, cartões e textos cabem sem sobreposição em viewport móvel.
- Áreas interativas têm tamanho adequado para toque.
- A composição permanece utilizável em pelo menos uma largura desktop e uma largura móvel.

### [x] T14 - Revisar acessibilidade e conteúdo em português

Revisar labels, foco, estados e mensagens conforme os requisitos não funcionais do PRD.

**Critérios de aprovação**

- O campo e o botão possuem nomes acessíveis e foco visível.
- O carregamento e o erro são comunicados de forma compreensível, inclusive para tecnologias assistivas quando aplicável.
- Todos os textos visíveis da aplicação estão em português do Brasil.
- A interface continua navegável por teclado.
- Contraste entre texto e fundo permite leitura dos valores e mensagens.

### [x] T15 - Validar integração e cenários de erro

Executar uma verificação integrada dos cenários principais e das falhas previstas no PRD.

**Critérios de aprovação**

- Uma cidade válida de qualquer país exibe localização e clima atuais.
- Entrada vazia ou composta por espaços não dispara consulta inválida.
- Cidade inexistente exibe a mensagem única de erro.
- Falha de rede ou resposta meteorológica inválida retorna ao estado de erro sem dados incompletos.
- `is_day` e todos os códigos WMO definidos produzem a interpretação esperada.

### [x] T16 - Executar a validação final do projeto

Confirmar que a aplicação está pronta para entrega e que a documentação permanece alinhada.

**Critérios de aprovação**

- `npm run build` termina sem erros de TypeScript ou Vite.
- Não existem referências ativas ao template inicial do Vite.
- A implementação atende os critérios de aceite do [PRD](prd.md).
- O [PRD](prd.md) e este arquivo não contradizem o comportamento implementado.
