# Clima

Aplicação web para consultar o clima atual de qualquer cidade do mundo.

O usuário informa o nome de uma cidade e recebe as condições meteorológicas atuais, incluindo temperatura, umidade, sensação térmica, chuva, precipitação e vento.

## Funcionalidades

- Busca de cidades de qualquer país.
- Consulta de localização e clima atual pela API Open-Meteo.
- Exibição do país, temperatura, data e hora local.
- Identificação de dia ou noite.
- Tradução dos códigos meteorológicos WMO para português do Brasil.
- Informações sobre umidade, sensação térmica, chuva, precipitação e vento.
- Direção do vento em graus e orientação cardinal.
- Estados de vazio, carregamento, sucesso e erro.
- Interface responsiva para desktop, tablet e celular.
- Ícones de interface com Lucide.

## Tecnologias

- Vite
- Vanilla TypeScript
- CSS
- Open-Meteo API
- Lucide

## Requisitos

- Node.js 20 ou superior
- npm

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone <URL_DO_REPOSITORIO>
cd clima
npm install
```

## Executar em desenvolvimento

```bash
npm run dev
```

O Vite exibirá no terminal a URL local da aplicação.

## Gerar build de produção

```bash
npm run build
```

## Visualizar o build

```bash
npm run preview
```

## Como usar

1. Acesse a aplicação.
2. Digite o nome de uma cidade no campo de busca.
3. Clique em `Pesquisar` ou pressione Enter.
4. Consulte o resumo da localização e os detalhes meteorológicos atuais.

A busca aceita cidades de qualquer país. Os textos da interface e as descrições meteorológicas são exibidos em português do Brasil.

## API

O projeto utiliza dois endpoints públicos da Open-Meteo:

- [Open-Meteo Geocoding API](https://geocoding-api.open-meteo.com/v1/search)
- [Open-Meteo Forecast API](https://api.open-meteo.com/v1/forecast)

A interface não realiza requisições diretamente. O acesso à API está concentrado em [`src/services/open-meteo.ts`](../src/services/open-meteo.ts).

## Estrutura principal

```text
src/
├── main.ts                 # Inicialização e fluxo da interface
├── style.css               # Layout, responsividade e estilos
├── services/
│   └── open-meteo.ts       # Integração com a Open-Meteo
├── types/
│   ├── open-meteo.ts       # Tipos das respostas externas
│   └── weather.ts          # Modelo normalizado da aplicação
└── utils/
    └── weather.ts          # Formatação e interpretação meteorológica
```

## Documentação

- [PRD](prd.md): requisitos funcionais, técnicos e visuais.
- [Tasks](tasks.md): tarefas e critérios de aprovação.
- [Fases de implementação](implementation-phases.md): acompanhamento por fases.
- [Resumo da implementação](implementation-summary.md): registro do que foi implementado em cada task.

## Licença

Este projeto foi desenvolvido para fins de estudo e demonstração.
