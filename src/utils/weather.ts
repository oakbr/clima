// T06: traduções dos códigos meteorológicos WMO para português do Brasil.
const WEATHER_DESCRIPTIONS: Record<number, string> = {
  0: 'Céu limpo',
  1: 'Predominantemente limpo',
  2: 'Parcialmente nublado',
  3: 'Nublado',
  45: 'Nevoeiro',
  48: 'Nevoeiro com geada',
  51: 'Garoa fraca',
  53: 'Garoa moderada',
  55: 'Garoa intensa',
  56: 'Garoa congelante fraca',
  57: 'Garoa congelante intensa',
  61: 'Chuva fraca',
  63: 'Chuva moderada',
  65: 'Chuva intensa',
  66: 'Chuva congelante fraca',
  67: 'Chuva congelante intensa',
  71: 'Neve fraca',
  73: 'Neve moderada',
  75: 'Neve intensa',
  77: 'Grãos de neve',
  80: 'Pancadas de chuva fracas',
  81: 'Pancadas de chuva moderadas',
  82: 'Pancadas de chuva intensas',
  85: 'Pancadas de neve fracas',
  86: 'Pancadas de neve intensas',
  95: 'Trovoada fraca ou moderada',
  96: 'Trovoada com granizo fraco',
  99: 'Trovoada com granizo intenso',
}

// T06: setores cardinais usados na interpretação da direção do vento.
const CARDINAL_DIRECTIONS = [
  'norte',
  'nordeste',
  'leste',
  'sudeste',
  'sul',
  'sudoeste',
  'oeste',
  'noroeste',
]

// T06: formata o horário local retornado pela API no timezone da localização.
export function formatWeatherDate(time: string, timezone: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(time)

  if (!match) {
    return 'Data indisponível'
  }

  const [, year, month, day, hour, minute] = match
  const desiredTimestamp = Date.UTC(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
  )
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: timezone,
    hourCycle: 'h23',
  })
  const numericFormatter = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: timezone,
    hourCycle: 'h23',
  })
  const displayedParts = numericFormatter.formatToParts(new Date(desiredTimestamp))
  const displayed = Object.fromEntries(
    displayedParts
      .filter(({ type }) => ['year', 'month', 'day', 'hour', 'minute'].includes(type))
      .map(({ type, value }) => [type, Number(value)]),
  )
  const displayedTimestamp = Date.UTC(
    displayed.year,
    displayed.month - 1,
    displayed.day,
    displayed.hour,
    displayed.minute,
  )
  const correctedDate = new Date(desiredTimestamp + desiredTimestamp - displayedTimestamp)

  return formatter.format(correctedDate)
}

// T06: aplica formatação numérica localizada e casas decimais controladas.
export function formatNumber(value: number, maximumFractionDigits = 1): string {
  return new Intl.NumberFormat('pt-BR', {
    maximumFractionDigits,
  }).format(value)
}

// T06: traduz o indicador numérico de dia ou noite.
export function formatDayPeriod(isDay: boolean): string {
  return isDay ? 'Dia' : 'Noite'
}

// T06: traduz o código WMO e oferece fallback para códigos desconhecidos.
export function getWeatherDescription(weatherCode: number): string {
  return WEATHER_DESCRIPTIONS[weatherCode] ?? 'Condição não identificada'
}

// T06: combina graus e direção cardinal para leitura do vento.
export function formatWindDirection(degrees: number): string {
  const normalizedDegrees = ((degrees % 360) + 360) % 360
  const directionIndex = Math.round(normalizedDegrees / 45) % CARDINAL_DIRECTIONS.length
  const direction = CARDINAL_DIRECTIONS[directionIndex]

  return `${formatNumber(normalizedDegrees, 0)}° (${direction})`
}
