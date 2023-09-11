import axios from 'axios';
import { IWeather } from '../models/interfaces/IWeather';
import { WeatherApiConditions } from '../utils/WeatherApiConditions';

class WeatherApiService {
	private apiKey: string;
	private apiUrl: string;

	private location = 'Florianopolis';
	private days = 10;
	private endpoints = {
		forecast: '/forecast.json',
	};

	constructor() {
		this.apiKey = process.env.WEATHER_API_KEY;
		this.apiUrl = process.env.WEATHER_API_URL;
	}

	async getForecastWeather() {
		const response = await axios.get(
			`${this.apiUrl}${this.endpoints.forecast}?key=${this.apiKey}&q=${this.location}&days=${this.days}`
		);

		const forecastWeather: IWeather[] = response.data.forecast.forecastday.map(
			(forecastDay: any) => {
				const condition = WeatherApiConditions.find(
					(condition) => condition.code === forecastDay.day.condition.code
				);

				const conditionText = condition.languages.find(
					(language) => language.lang_name === 'Portuguese'
				).day_text;

				return {
					date: new Date(forecastDay.date),
					maxTemp: forecastDay.day.maxtemp_c,
					minTemp: forecastDay.day.mintemp_c,
					totalPrecipitation: forecastDay.day.totalprecip_mm,
					condition: {
						code: forecastDay.day.condition.code,
						text: conditionText,
						icon: forecastDay.day.condition.icon,
					},
				};
			}
		);

		return forecastWeather;
	}
}

export { WeatherApiService };
