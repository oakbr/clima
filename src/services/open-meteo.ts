import type {
  CurrentWeather,
  CurrentWeatherUnits,
  ForecastResponse,
  GeocodingResponse,
  GeocodingResult,
} from '../types/open-meteo.ts'
import type { WeatherData } from '../types/weather.ts'

const GEOCODING_API_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const FORECAST_API_URL = 'https://api.open-meteo.com/v1/forecast'

// T03: consulta e valida a localização retornada pela Open-Meteo.
export async function geocodeCity(city: string): Promise<GeocodingResult> {
  const normalizedCity = city.trim()

  if (!normalizedCity) {
    throw new Error('Informe o nome de uma cidade.')
  }

  const searchParams = new URLSearchParams({
    name: normalizedCity,
    count: '1',
    language: 'en',
    format: 'json',
  })

  let response: Response

  try {
    response = await fetch(`${GEOCODING_API_URL}?${searchParams.toString()}`)
  } catch {
    throw new Error('Não foi possível consultar a cidade.')
  }

  if (!response.ok) {
    throw new Error('Não foi possível consultar a cidade.')
  }

  let data: GeocodingResponse

  try {
    data = await response.json() as GeocodingResponse
  } catch {
    throw new Error('Não foi possível consultar a cidade.')
  }

  const result = data.results?.[0]

  if (!result || !isValidGeocodingResult(result)) {
    throw new Error('Não foi possível encontrar a cidade.')
  }

  return result
}

// T04: consulta e valida as condições meteorológicas atuais.
export async function getCurrentWeather(
  latitude: number,
  longitude: number,
  timezone: string,
): Promise<ForecastResponse> {
  const searchParams = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: 'temperature_2m,relative_humidity_2m,precipitation,rain,wind_speed_10m,wind_direction_10m,is_day,apparent_temperature,weather_code',
    timezone,
    forecast_days: '1',
  })

  let response: Response

  try {
    response = await fetch(`${FORECAST_API_URL}?${searchParams.toString()}`)
  } catch {
    throw new Error('Não foi possível consultar o clima.')
  }

  if (!response.ok) {
    throw new Error('Não foi possível consultar o clima.')
  }

  let data: unknown

  try {
    data = await response.json()
  } catch {
    throw new Error('Não foi possível consultar o clima.')
  }

  if (!isValidForecastResponse(data)) {
    throw new Error('Não foi possível consultar o clima.')
  }

  return data
}

// T05: compõe geocodificação, previsão e modelo normalizado da aplicação.
export async function searchWeather(city: string): Promise<WeatherData> {
  const location = await geocodeCity(city)
  const forecast = await getCurrentWeather(
    location.latitude,
    location.longitude,
    location.timezone,
  )

  return {
    location: {
      city: location.name,
      country: translateCountry(location.country),
      countryCode: location.country_code,
      latitude: location.latitude,
      longitude: location.longitude,
      timezone: location.timezone,
    },
    details: {
      temperature: forecast.current.temperature_2m,
      relativeHumidity: forecast.current.relative_humidity_2m,
      apparentTemperature: forecast.current.apparent_temperature,
      rain: forecast.current.rain,
      precipitation: forecast.current.precipitation,
      windSpeed: forecast.current.wind_speed_10m,
      windDirection: forecast.current.wind_direction_10m,
      isDay: forecast.current.is_day === 1,
      weatherCode: forecast.current.weather_code,
      time: forecast.current.time,
    },
    units: {
      temperature: forecast.current_units.temperature_2m,
      relativeHumidity: forecast.current_units.relative_humidity_2m,
      apparentTemperature: forecast.current_units.apparent_temperature,
      rain: forecast.current_units.rain,
      precipitation: forecast.current_units.precipitation,
      windSpeed: forecast.current_units.wind_speed_10m,
      windDirection: forecast.current_units.wind_direction_10m,
    },
  }
}

// T03: garante que a resposta de geocodificação tem os campos essenciais.
function isValidGeocodingResult(result: GeocodingResult): boolean {
  return Boolean(
    typeof result.name === 'string' &&
    result.name.length > 0 &&
    typeof result.country === 'string' &&
    result.country.length > 0 &&
    typeof result.country_code === 'string' &&
    result.country_code.length > 0 &&
    Number.isFinite(result.latitude) &&
    Number.isFinite(result.longitude) &&
    typeof result.timezone === 'string' &&
    result.timezone.length > 0,
  )
}

function translateCountry(country: string): string {
  const translations: Record<string, string> = {
    Brazil: 'Brasil',
    Canada: 'Canadá',
    'United Kingdom': 'Reino Unido',
    'United States': 'Estados Unidos',
  }

  return translations[country] ?? country
}

// T04: valida a estrutura externa antes de entregá-la ao fluxo da aplicação.
function isValidForecastResponse(data: unknown): data is ForecastResponse {
  if (!isRecord(data)) {
    return false
  }

  return (
    isFiniteNumber(data.latitude) &&
    isFiniteNumber(data.longitude) &&
    isNonEmptyString(data.timezone) &&
    isValidCurrentWeather(data.current) &&
    isValidCurrentWeatherUnits(data.current_units)
  )
}

function isValidCurrentWeather(value: unknown): value is CurrentWeather {
  if (!isRecord(value)) {
    return false
  }

  return (
    isNonEmptyString(value.time) &&
    isFiniteNumber(value.interval) &&
    isFiniteNumber(value.temperature_2m) &&
    isFiniteNumber(value.relative_humidity_2m) &&
    isFiniteNumber(value.apparent_temperature) &&
    isFiniteNumber(value.precipitation) &&
    isFiniteNumber(value.rain) &&
    isFiniteNumber(value.wind_speed_10m) &&
    isFiniteNumber(value.wind_direction_10m) &&
    (value.is_day === 0 || value.is_day === 1) &&
    Number.isInteger(value.weather_code)
  )
}

function isValidCurrentWeatherUnits(value: unknown): value is CurrentWeatherUnits {
  if (!isRecord(value)) {
    return false
  }

  return (
    isNonEmptyString(value.time) &&
    isNonEmptyString(value.temperature_2m) &&
    isNonEmptyString(value.relative_humidity_2m) &&
    isNonEmptyString(value.apparent_temperature) &&
    isNonEmptyString(value.precipitation) &&
    isNonEmptyString(value.rain) &&
    isNonEmptyString(value.wind_speed_10m) &&
    isNonEmptyString(value.wind_direction_10m) &&
    typeof value.is_day === 'string' &&
    isNonEmptyString(value.weather_code)
  )
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}
