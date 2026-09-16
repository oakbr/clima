// T02: contratos da resposta de geocodificação da Open-Meteo.
export interface GeocodingResult {
  name: string
  country: string
  country_code: string
  latitude: number
  longitude: number
  timezone: string
}

export interface GeocodingResponse {
  results?: GeocodingResult[]
}

// T02: unidades e valores do bloco current da previsão meteorológica.
export interface CurrentWeatherUnits {
  time: string
  temperature_2m: string
  relative_humidity_2m: string
  apparent_temperature: string
  precipitation: string
  rain: string
  wind_speed_10m: string
  wind_direction_10m: string
  is_day: string
  weather_code: string
}

export interface CurrentWeather {
  time: string
  interval: number
  temperature_2m: number
  relative_humidity_2m: number
  apparent_temperature: number
  precipitation: number
  rain: number
  wind_speed_10m: number
  wind_direction_10m: number
  is_day: number
  weather_code: number
}

// T02: resposta completa consumida pelo serviço meteorológico.
export interface ForecastResponse {
  latitude: number
  longitude: number
  timezone: string
  current_units: CurrentWeatherUnits
  current: CurrentWeather
}
