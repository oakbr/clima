# PRD - Clima

## 1. Visão geral

O Clima é uma aplicação web para consultar as condições meteorológicas atuais de qualquer cidade do mundo. O usuário informa o nome da cidade em um único campo de busca e recebe, em uma mesma tela, um resumo da localização e os principais dados do clima atual.

O produto será implementado com Vite, Vanilla TypeScript e a API pública Open-Meteo. A experiência deve esconder do usuário o fato de que a consulta depende de duas etapas: geocodificação da cidade e consulta da previsão atual.

## 2. Objetivo

Permitir que o usuário consulte rapidamente o clima atual de qualquer cidade, com informações claras, localizadas em português do Brasil e adaptadas para desktop e dispositivos móveis.

## 3. Escopo

### Incluído

- Busca de uma cidade de qualquer país pelo nome.
- Identificação da cidade, país, latitude, longitude e fuso horário.
- Consulta das condições meteorológicas atuais da localização encontrada.
- Exibição da temperatura, umidade, sensação térmica, chuva, precipitação e vento.
- Interpretação do código meteorológico WMO em português do Brasil.
- Indicação de dia ou noite com base no campo `is_day`.
- Data e hora provenientes de `current.time` da API meteorológica.
- Estados de vazio, carregamento, sucesso e erro.
- Layout responsivo com reorganização da sidebar e do conteúdo principal em telas menores.

### Fora do escopo inicial

- Previsão para vários dias.
- Histórico meteorológico.
- Geolocalização automática do usuário.
- Cadastro, autenticação ou persistência de cidades favoritas.
- Seleção entre múltiplos resultados de uma mesma busca.

## 4. Requisitos funcionais

### RF01 - Buscar cidade

O sistema deve oferecer um formulário com um campo para o nome da cidade e uma ação de pesquisa. A pesquisa deve ser iniciada pelo envio do formulário, inclusive ao pressionar Enter.

O campo deve impedir consultas vazias ou compostas apenas por espaços, apresentando uma orientação adequada ao usuário quando necessário.

### RF02 - Geocodificar a cidade

Ao receber uma busca válida, o sistema deve consultar o endpoint de geocodificação do Open-Meteo:

`https://geocoding-api.open-meteo.com/v1/search?name={NOME_DA_CIDADE}&count=1&language=pt&format=json`

Devem ser considerados, no mínimo, os seguintes dados do primeiro resultado:

- `name`;
- `country` ou `country_code`;
- `latitude`;
- `longitude`;
- `timezone`.

### RF03 - Consultar clima atual

Com os dados de localização obtidos, o sistema deve consultar o endpoint de previsão do Open-Meteo usando os parâmetros `latitude`, `longitude` e `timezone`:

`https://api.open-meteo.com/v1/forecast?latitude={LATITUDE}&longitude={LONGITUDE}&current=temperature_2m,relative_humidity_2m,precipitation,rain,wind_speed_10m,wind_direction_10m,is_day,apparent_temperature,weather_code&timezone={TIMEZONE}&forecast_days=1`

### RF04 - Unificar falhas da busca

Se a cidade não for encontrada, não possuir latitude, longitude ou fuso horário válidos, ou se a consulta meteorológica falhar ou retornar dados inválidos, o usuário deve receber uma única mensagem de erro informando que não foi possível encontrar ou consultar a cidade. Detalhes internos da API não devem ser exibidos como mensagem principal.

### RF05 - Exibir resumo da localização

No painel lateral, o sistema deve exibir:

- nome da cidade e país;
- temperatura atual;
- data e hora formatadas em português do Brasil a partir de `current.time`;
- situação de dia ou noite, derivada de `is_day`;
- descrição textual do clima, derivada de `weather_code`.

### RF06 - Exibir detalhes meteorológicos

Na área principal, o sistema deve exibir os seguintes dados retornados em `current` e suas respectivas unidades de `current_units`:

- umidade relativa do ar: `relative_humidity_2m`;
- sensação térmica: `apparent_temperature`;
- chuva: `rain`;
- precipitação: `precipitation`;
- velocidade do vento: `wind_speed_10m`;
- direção do vento: `wind_direction_10m`.

Os valores devem ser apresentados com unidades claras, sem depender exclusivamente de ícones ou de contexto visual.

### RF07 - Interpretar código WMO

O sistema deve traduzir `weather_code` para português do Brasil conforme esta tabela:

| Código | Descrição exibida |
|---|---|
| 0 | Céu limpo |
| 1, 2, 3 | Predominantemente limpo, parcialmente nublado e nublado |
| 45, 48 | Nevoeiro |
| 51, 53, 55 | Garoa fraca, moderada e intensa |
| 56, 57 | Garoa congelante fraca e intensa |
| 61, 63, 65 | Chuva fraca, moderada e intensa |
| 66, 67 | Chuva congelante fraca e intensa |
| 71, 73, 75 | Neve fraca, moderada e intensa |
| 77 | Grãos de neve |
| 80, 81, 82 | Pancadas de chuva fracas, moderadas e intensas |
| 85, 86 | Pancadas de neve fracas e intensas |
| 95 | Trovoada fraca ou moderada |
| 96, 99 | Trovoada com granizo fraco ou intenso |

Caso seja recebido um código desconhecido, o sistema deve apresentar uma descrição genérica como `Condição não identificada`, sem interromper a exibição dos demais dados.

### RF08 - Exibir estado vazio

Antes da primeira busca, a interface deve exibir um estado vazio que explique de forma breve que o usuário deve pesquisar uma cidade para visualizar o clima. O estado vazio não deve exibir dados meteorológicos fictícios.

### RF09 - Exibir carregamento

Durante as duas etapas da consulta, o sistema deve indicar que a busca está em andamento, impedir buscas concorrentes pelo mesmo formulário e manter a interface estável.

### RF10 - Atualizar a tela

Uma busca concluída com sucesso deve substituir os dados anteriores. Uma busca malsucedida deve exibir o estado de erro sem apresentar dados parcialmente atualizados como se fossem o resultado da nova consulta.

## 5. Requisitos não funcionais

- A aplicação deve funcionar nos navegadores modernos com suporte a ES modules.
- A interface deve ser responsiva em desktop, tablet e celular.
- Textos, mensagens, rótulos e estados devem estar em português do Brasil.
- O layout deve manter contraste suficiente, foco visível e navegação básica por teclado.
- Os dados devem ser tratados com validação de campos obrigatórios antes da renderização.
- O sistema deve lidar com falhas de rede, respostas sem resultados e respostas incompletas.
- O botão de pesquisa e o campo devem possuir nomes acessíveis e estados compreensíveis por tecnologias assistivas.
- A renderização não deve depender de valores fixos presentes apenas no exemplo da documentação da API.

## 6. Detalhes técnicos

### Stack

- Vite;
- Vanilla TypeScript;
- CSS nativo;
- Biblioteca de ícones moderna, preferencialmente Lucide, caso compatível com a instalação do projeto.

### Organização sugerida

- `src/services/openMeteo.ts`: funções responsáveis por geocodificação e consulta meteorológica;
- `src/types/`: tipos das respostas da API e do modelo normalizado da aplicação;
- `src/main.ts`: inicialização, submissão do formulário e coordenação dos estados;
- `src/style.css`: estilos, responsividade e estados visuais;
- `src/utils/`: formatação de data, unidades, direção do vento e descrição WMO, se necessário.

O código da interface não deve montar URLs nem chamar diretamente `fetch` para a API. Essas responsabilidades devem ficar encapsuladas no módulo de Open-Meteo.

### Fluxo técnico

1. Capturar e normalizar o nome informado pelo usuário.
2. Consultar a geocodificação com `count=1` e idioma `pt`, sem restringir o país.
3. Validar a existência de um resultado e dos campos necessários.
4. Consultar o clima atual com as coordenadas e o fuso retornados.
5. Validar `current` e `current_units` antes de montar a visualização.
6. Normalizar os dados para um modelo interno da aplicação.
7. Renderizar o resumo, os detalhes e a descrição WMO.

### Formatação

- Usar `Intl.DateTimeFormat('pt-BR', ...)` para formatar `current.time` no fuso retornado pela API.
- Preservar as unidades retornadas pela API sempre que possível: °C, %, mm, km/h e °.
- Formatar números com precisão adequada para leitura, evitando casas decimais desnecessárias.
- Converter a direção em graus para uma indicação compreensível, como `150° (sudeste)`, sem remover o valor original.
- Usar `is_day === 1` para `Dia` e `is_day === 0` para `Noite`.

### Segurança e confiabilidade

- Codificar o nome da cidade com `URLSearchParams` ou mecanismo equivalente.
- Não inserir respostas da API usando HTML não confiável.
- Tratar respostas HTTP não bem-sucedidas e erros de parsing.
- Considerar timeout ou cancelamento da requisição para evitar que uma busca antiga sobrescreva uma pesquisa mais recente.

## 7. Requisitos visuais e de UX

### Composição

- Fundo geral cinza escuro.
- Área superior sem uma faixa de fundo própria, contendo apenas a busca centralizada.
- Um contêiner central branco, com largura máxima de aproximadamente 800 px e bordas bem arredondadas.
- Dentro do contêiner, sidebar à esquerda e área principal à direita em telas maiores.
- Em telas menores, a sidebar deve ficar acima da área principal, com espaçamento e largura adequados ao toque.

### Busca

- Campo de busca visualmente centralizado na parte superior.
- Placeholder em português indicando que o usuário deve informar uma cidade.
- Botão com ícone de busca e texto ou rótulo acessível.
- Estado de carregamento perceptível, sem deslocar os demais elementos da página.

### Sidebar

- Deve estabelecer rapidamente qual cidade está sendo consultada.
- Temperatura deve receber maior destaque tipográfico dentro do painel.
- Data/hora, dia/noite e descrição meteorológica devem permanecer legíveis em conjunto.
- O uso de ícones deve reforçar o significado, mas nunca substituir os textos e valores.

### Área principal

- Organizar os dados em blocos ou cartões individuais, evitando excesso de elementos decorativos.
- Cada informação deve apresentar ícone, rótulo, valor e unidade.
- Chuva e precipitação devem ser informações distintas, mesmo quando ambas tiverem valor zero.
- Direção do vento deve incluir o grau e, quando possível, a direção cardinal correspondente.

### Estados visuais

- Vazio: orientação para iniciar uma busca.
- Carregando: indicador de progresso e formulário temporariamente desabilitado.
- Sucesso: localização e dados meteorológicos completos.
- Erro: mensagem única, clara e acionável, com possibilidade de nova busca.

### Ícones

Podem ser usados ícones de uma biblioteca como Lucide para busca, temperatura, umidade, chuva, precipitação, vento, calendário e dia/noite. Os ícones devem ter tamanho consistente, texto alternativo quando necessário e não devem ser a única forma de comunicar um dado.

## 8. Critérios de aceite

- Ao pesquisar uma cidade válida de qualquer país, a aplicação exibe cidade, país, temperatura, data/hora de `current.time`, dia/noite e descrição meteorológica.
- A aplicação exibe todos os seis detalhes meteorológicos definidos no escopo, com valores e unidades.
- A data/hora exibida corresponde ao horário retornado pela API e é formatada em português do Brasil.
- Uma cidade inexistente gera uma única mensagem de erro compreensível.
- Falhas na geocodificação ou no endpoint meteorológico não deixam dados incompletos apresentados como sucesso.
- A tela inicial apresenta estado vazio e não mostra dados inventados.
- Durante a consulta, o usuário visualiza o estado de carregamento e não dispara pesquisas concorrentes pelo mesmo formulário.
- O layout funciona sem sobreposição em telas pequenas, com sidebar acima da área principal.
- Todos os códigos WMO listados possuem uma descrição em português, e códigos desconhecidos recebem fallback.
- O projeto executa `npm run build` sem erros de TypeScript ou de build do Vite.

## 9. Decisões e premissas

- A busca aceita cidades de qualquer país; o país exibido deve ser o retornado pela geocodificação.
- Apenas o primeiro resultado de geocodificação será utilizado, conforme `count=1`.
- A data/hora será derivada exclusivamente de `current.time`, respeitando o `timezone` retornado pela API.
- A responsividade será resolvida com uma composição vertical em telas pequenas.
- Uma biblioteca de ícones poderá ser instalada para atender ao requisito visual de ícones modernos.
- A aparência final deve preservar a direção visual descrita: fundo cinza escuro, contêiner branco, bordas arredondadas e foco em leitura rápida.
