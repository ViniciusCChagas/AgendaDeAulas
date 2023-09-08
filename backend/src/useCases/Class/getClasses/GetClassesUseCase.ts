import { IClassesDto } from '../../../models/dtos/IClassesDto';
import { IClassRepository } from '../../../repositories/interfaces/IClassRepository';
import { WeatherApiService } from '../../../services/WheaterApiService';

class GetClassesUseCase {
	private classRepository: IClassRepository;
	constructor(classRepository: IClassRepository) {
		this.classRepository = classRepository;
	}

	async execute(initialDate: Date, finalDate: Date): Promise<IClassesDto[]> {
		const classes = await this.classRepository.getClassesByDate(
			initialDate,
			finalDate
		);

		const weatherApiService = new WeatherApiService();
		const forecastWeather = await weatherApiService.getForecastWeather();

		const classesWithWeather = classes.map((classItem): IClassesDto => {
			let newClassItem = {
				_id: classItem._id,
				name: classItem.name,
				isOnlineClass: classItem.isOnlineClass,
				startDate: classItem.startDate,
				endDate: classItem.endDate,
				studentsCount: classItem.students.length,
				weather: null,
			};

			if (classItem.isOnlineClass) {
				return newClassItem;
			}

			const existingForecastWeather = forecastWeather.find(
				(item) => item.date.toDateString() === classItem.startDate.toDateString()
			);

			if (existingForecastWeather) {
				newClassItem = {
					...newClassItem,
					weather: existingForecastWeather,
				};
			}

			return newClassItem;
		});

		return classesWithWeather;
	}
}

export { GetClassesUseCase };
