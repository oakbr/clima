// T02: modelo de localização independente da resposta bruta da API.
export interface WeatherLocation {
  city: string
  country: string
  countryCode: string
  latitude: number
  longitude: number
  timezone: string
}

// T02/T06: valores meteorológicos normalizados para a interface.
export interface WeatherDetails {
  temperature: number
  relativeHumidity: number
  apparentTemperature: number
  rain: number
  precipitation: number
  windSpeed: number
  windDirection: number
  isDay: boolean
  weatherCode: number
  time: string
}

// T02: unidades normalizadas para renderização dos valores.
export interface WeatherUnits {
  temperature: string
  relativeHumidity: string
  apparentTemperature: string
  rain: string
  precipitation: string
  windSpeed: string
  windDirection: string
}

// T02/T05: modelo final entregue ao fluxo da interface.
export interface WeatherData {
  location: WeatherLocation
  details: WeatherDetails
  units: WeatherUnits
}
