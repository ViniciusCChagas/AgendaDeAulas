interface IWeather {
	date: Date;
	maxTemp: number;
	minTemp: number;
	totalPrecipitation: number;
	condition: {
		text: string;
		icon: string;
	};
}

export { IWeather };
