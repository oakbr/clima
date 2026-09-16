Projeto: Clima

Este projeto vais pesquisar a cidade digitada no form e baseado nessa cidade, consultar o clima para acidade e região, exibindo as seguintes informações rerente ao clima: Temperatura, Humidade Relativa do Ar, Velocidade do Vento.

### Aspectos Técnicos:

Projeto será criado com o framework Vite + Vanilla + TypeScript.

Projeto usará a API OpenMeteo.


#### Fluxo de Pesquisa para obter as informações do clima:

- Usuário digita o nome da cidade.
- O app utilizará o nome da cidade digitado pelo usuário e acessa o OpenMeto para buscar as seguintes informações: Latitude, Logintude Timezone, País.


- O app utilizizará as informações obtidas no OpenMeto (Latitude, Logintude e Timezone, País) para buscar informações sobre o clima dessa localização.

- Caso o usuário digitar uma cidade que não foi encontrada ou seja, sem Latitude, Logintude ou não forem encontradas as informações sobre o clima, o app informará que não foi possível encontrar a cidade digitada.

- Sendo que o resultado das informações envolve duas pesquisas no fluxo do processo de código, todavia para o usuário isso é transparente, é como se fosse apenas um processo, por conta disso emitir apenas uma informação de retorno quando não satisfizer as duas fases de pesquisa.


#### Informações da API que serão utilizadas no Projeto:

{NOME_DA_CIDADE} = Nome será digitado pelo usuário.

- Para obter a Latitude e a Longitude utilizar o {NOME_DA_CIDADE} na URL:
https://geocoding-api.open-meteo.com/v1/search?name={NOME_DA_CIDADE}&count=1&language=pt&format=json&countryCode=BR


- Exemplo de Resposta da busca da cidade no OpenMeteo:

{
  "results": [
    {
      "id": 3451234,
      "name": "Rio Claro",
      "latitude": -22.41139,
      "longitude": -47.56139,
      "elevation": 617,
      "feature_code": "PPL",
      "country_code": "BR",
      "admin1_id": 3448433,
      "admin2_id": 6322520,
      "timezone": "America/Sao_Paulo",
      "population": 201418,
      "country_id": 3469034,
      "country": "Brasil",
      "admin1": "São Paulo",
      "admin2": "Rio Claro"
    }
  ],
  "generationtime_ms": 1.4352798
}

- Informações obtidas na resposta da requisição acima que serão utilizadas para a busca do clima:

{NAME} = Nome da Cidade Obtina na URL acima.
{COUNTRY_CODE} = País Obtino na URL acima.
{LATITUDE} = Latitude Obtina na URL acima.
{LOGINTUDE} = Longitude Obtina na URL acima.
{TIMEZONE} = Time Zone Obtina na URL acima.


- Para obter as informações do clima utilizar a URL abaixo, considerando os parâmetros obtidos na url anterior conforme descrito acima:

https://api.open-meteo.com/v1/forecast?latitude={LATITUDE}&longitude={LONGITUDE}&current=temperature_2m,relative_humidity_2m,precipitation,rain,wind_speed_10m,wind_direction_10m,is_day,apparent_temperature,weather_code&timezone={TIME_ZONE}&forecast_days=1

- Exemplo de Resposta do Clima:

{
  "latitude": -22.460457,
  "longitude": -47.56476,
  "generationtime_ms": 0.534176826477051,
  "utc_offset_seconds": -10800,
  "timezone": "America/Sao_Paulo",
  "timezone_abbreviation": "GMT-3",
  "elevation": 616,
  "current_units": {
    "time": "iso8601",
    "interval": "seconds",
    "temperature_2m": "°C",
    "relative_humidity_2m": "%",
    "apparent_temperature": "°C",
    "is_day": "",
    "precipitation": "mm",
    "rain": "mm",
    "weather_code": "wmo code",
    "wind_speed_10m": "km/h",
    "wind_direction_10m": "°"
  },
  "current": {
    "time": "2026-09-16T08:45",
    "interval": 900,
    "temperature_2m": 16.9,
    "relative_humidity_2m": 78,
    "apparent_temperature": 16.4,
    "is_day": 1,
    "precipitation": 0,
    "rain": 0,
    "weather_code": 0,
    "wind_speed_10m": 9.6,
    "wind_direction_10m": 150
  }
}


- No retorno da requisição temos:

"current_units" que são as unidades de medidas das propriedades do objeto json.

"current" que são os dados do objeto json.

- Exibir as seguintes propriedades:

    "temperature_2m"
    "relative_humidity_2m"
    "apparent_temperature"
    "rain"
    "precipitation"
    "wind_speed_10m"
    "wind_direction_10m"
    "is_day"


Informação Importante:
Teremos um arquivo com as funções do OpenMeteo para que o projeto não faça requisição diretamente a API, mas use as funções desse arquivo.


# Aspectos Visuais (Design e UX)

- Deverá conter Empyt State
- Deverá ter uma área Superior Centralizada contendo apenas o campo de busca da cidade.
- Deverá ter um Sidebar à esquerda da tela com as seguintes informações:

    - Nome da cidade / País.
    - Temperatura.
    - Data Atual.
    - Dia ou Noite.

    Em relação ao Dia/Noite utilizar a tabela abaixo para fazer a interpretação:
    *** ATENÇÃO: TRADUZIR PARA O PORTUGUES DO BRASIL para exibir a informação.

WMO Weather interpretation codes (WW)
Code	    Description
0	        Clear sky
1, 2, 3	    Mainly clear, partly cloudy, and overcast
45, 48	    Fog and depositing rime fog
51, 53, 55	Drizzle: Light, moderate, and dense intensity
56, 57	    Freezing Drizzle: Light and dense intensity
61, 63, 65	Rain: Slight, moderate and heavy intensity
66, 67	    Freezing Rain: Light and heavy intensity
71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
77	        Snow grains
80, 81, 82	Rain showers: Slight, moderate, and violent
85, 86	    Snow showers slight and heavy
95 *	    Thunderstorm: Slight or moderate
96, 99 *	Thunderstorm with slight and heavy hail


- Deverá ter uma área principal com as seguintes informações:
    - Humidade Relativa do Ar.
    - Sensação Térmica (Temperatura Aparente).
    - Chovendo.
    - Preciptação.
    - Velocidade do Vento.
    - Direção do Vento.

Desenho Geral do Projeto:
- Projeto terá um fundo cinza escruto.
- A parte superior não terá background-color.
- A Sidebar e Área Principal deverão ficar dentro de uma DIV com borda bem arredondada, fundo branco, centralizada com largura máxima de 800px .

* Usar ícones modernos para indicação das propriedades informadas.


