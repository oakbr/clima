import './style.css'
import {
	CalendarDays,
	CloudRain,
	Compass,
	createIcons,
	Droplets,
	Moon,
	Search,
	Sun,
	Thermometer,
	ThermometerSun,
	Waves,
	Wind,
} from 'lucide'
import { searchWeather } from './services/open-meteo.ts'
import type { WeatherData } from './types/weather.ts'
import {
	formatDayPeriod,
	formatNumber,
	formatWeatherDate,
	formatWindDirection,
	getWeatherDescription,
} from './utils/weather.ts'

const iconSet = {
	CalendarDays,
	CloudRain,
	Compass,
	Droplets,
	Moon,
	Search,
	Sun,
	Thermometer,
	ThermometerSun,
	Waves,
	Wind,
}

const app = document.querySelector<HTMLDivElement>('#app')!

// T07/T11/T14: estrutura semântica, conteúdo em português e controles acessíveis.
app.innerHTML = `
<main id="weather-app">
	<header id="search-region" aria-label="Pesquisa de cidade">
		<form id="search-form">
			<label for="city-input">Cidade</label>
			<input id="city-input" name="city" type="search" autocomplete="off" placeholder="Digite o nome da cidade" required>
			<button type="submit"><i data-lucide="search" aria-hidden="true"></i>Pesquisar</button>
		</form>
	</header>
	<p id="search-status" role="status" aria-live="polite" aria-atomic="true"></p>
	<p id="loading-indicator" role="status" aria-live="polite" hidden>Consultando o clima...</p>
	<section id="empty-state" aria-labelledby="empty-title">
		<h1 id="empty-title">Consulte o clima de uma cidade</h1>
		<p>Digite uma cidade para visualizar as condições meteorológicas atuais.</p>
	</section>
	<section id="weather-result" aria-labelledby="result-title" hidden>
		<h2 id="result-title">Clima atual</h2>
		<aside id="weather-summary" aria-label="Resumo da localização"></aside>
		<section id="weather-details" aria-labelledby="details-title">
			<h3 id="details-title">Detalhes meteorológicos</h3>
		</section>
	</section>
</main>
<footer id="app-footer">Criado por oakbr</footer>
`

createIcons({ icons: iconSet })

const form = document.querySelector<HTMLFormElement>('#search-form')!
const cityInput = document.querySelector<HTMLInputElement>('#city-input')!
const submitButton = form.querySelector<HTMLButtonElement>('button[type="submit"]')!
const status = document.querySelector<HTMLParagraphElement>('#search-status')!
const loadingIndicator = document.querySelector<HTMLParagraphElement>('#loading-indicator')!
const result = document.querySelector<HTMLElement>('#weather-result')!
const emptyState = document.querySelector<HTMLElement>('#empty-state')!
const weatherSummary = document.querySelector<HTMLElement>('#weather-summary')!
const weatherDetails = document.querySelector<HTMLElement>('#weather-details')!
let activeSearchId = 0

// T05/T08: executa a busca, controla estados e impede respostas obsoletas.
form.addEventListener('submit', async (event) => {
	event.preventDefault()
	const searchId = ++activeSearchId
	emptyState.hidden = true
	result.hidden = true
	weatherSummary.replaceChildren()
	weatherDetails.replaceChildren()
	status.textContent = ''
	status.setAttribute('role', 'status')
	status.setAttribute('aria-live', 'polite')
	loadingIndicator.hidden = false
	form.setAttribute('aria-busy', 'true')
	submitButton.disabled = true
	cityInput.disabled = true

	try {
		const weather = await searchWeather(cityInput.value)
		if (searchId !== activeSearchId) {
			return
		}

		// T09: cria os campos semânticos do resumo da localização.
		const city = document.createElement('h3')
		city.textContent = weather.location.city

		const country = document.createElement('p')
		country.textContent = weather.location.country

		const temperature = document.createElement('p')
		temperature.className = 'summary-temperature'
		temperature.append(
			createIcon('thermometer'),
			document.createTextNode(`${formatNumber(weather.details.temperature)}${weather.units.temperature}`),
		)

		const summaryDetails = document.createElement('dl')
		appendSummaryField(
			summaryDetails,
			'Data e hora',
			formatWeatherDate(weather.details.time, weather.location.timezone),
			'calendar-days',
		)
		appendSummaryField(
			summaryDetails,
			'Período',
			formatDayPeriod(weather.details.isDay),
			weather.details.isDay ? 'sun' : 'moon',
		)
		appendSummaryField(
			summaryDetails,
			'Condição',
			getWeatherDescription(weather.details.weatherCode),
			'cloud-rain',
		)

		weatherSummary.append(city, country, temperature, summaryDetails)
		renderWeatherDetails(weatherDetails, weather)
		createIcons({ icons: iconSet })
		result.hidden = false
		status.textContent = 'Consulta concluída.'
	} catch {
		if (searchId === activeSearchId) {
			status.setAttribute('role', 'alert')
			status.setAttribute('aria-live', 'assertive')
			status.textContent = 'Não foi possível encontrar ou consultar a cidade.'
		}
	} finally {
		if (searchId === activeSearchId) {
			loadingIndicator.hidden = true
			form.removeAttribute('aria-busy')
			submitButton.disabled = false
			cityInput.disabled = false
		}
	}
})

// T09: adiciona rótulo, ícone e valor aos campos do resumo.
function appendSummaryField(
	list: HTMLDListElement,
	label: string,
	value: string,
	iconName: string,
): void {
	const term = document.createElement('dt')
	term.append(createIcon(iconName))
	term.append(document.createTextNode(label))
	const description = document.createElement('dd')
	description.textContent = value
	list.append(term, description)
}

// T10/T11: renderiza os seis detalhes meteorológicos com seus ícones.
function renderWeatherDetails(container: HTMLElement, weather: WeatherData): void {
	const heading = document.createElement('h3')
	heading.id = 'details-title'
	heading.textContent = 'Detalhes meteorológicos'
	container.append(heading)

	appendWeatherDetail(
		container,
		'Umidade relativa do ar',
		`${formatNumber(weather.details.relativeHumidity)}${weather.units.relativeHumidity}`,
		'droplets',
	)
	appendWeatherDetail(
		container,
		'Sensação térmica',
		`${formatNumber(weather.details.apparentTemperature)}${weather.units.apparentTemperature}`,
		'thermometer-sun',
	)
	appendWeatherDetail(
		container,
		'Chuva',
		`${formatNumber(weather.details.rain)}${weather.units.rain}`,
		'cloud-rain',
	)
	appendWeatherDetail(
		container,
		'Precipitação',
		`${formatNumber(weather.details.precipitation)}${weather.units.precipitation}`,
		'waves',
	)
	appendWeatherDetail(
		container,
		'Velocidade do vento',
		`${formatNumber(weather.details.windSpeed)}${weather.units.windSpeed}`,
		'wind',
	)
	appendWeatherDetail(
		container,
		'Direção do vento',
		formatWindDirection(weather.details.windDirection),
		'compass',
	)
}

// T10: cria um item de detalhe com rótulo e valor legíveis.
function appendWeatherDetail(
	container: HTMLElement,
	label: string,
	value: string,
	iconName: string,
): void {
	const item = document.createElement('article')
	item.className = 'weather-detail'
	const title = document.createElement('h4')
	title.append(createIcon(iconName))
	title.append(document.createTextNode(label))
	const measurement = document.createElement('p')
	measurement.textContent = value
	item.append(title, measurement)
	container.append(item)
}

// T11: cria o marcador que Lucide transforma em SVG decorativo.
function createIcon(iconName: string): HTMLElement {
	const icon = document.createElement('i')
	icon.dataset.lucide = iconName
	icon.setAttribute('aria-hidden', 'true')
	return icon
}
