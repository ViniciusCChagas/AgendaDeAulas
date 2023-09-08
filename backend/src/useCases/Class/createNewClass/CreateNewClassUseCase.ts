import { IParamsCreateNewClassDto } from '../../../models/dtos/IParamsCreateNewClassDto';
import { IClassRepository } from '../../../repositories/interfaces/IClassRepository';
import { isHoliday, weekDays } from '../../../utils/holidays';

class CreateNewClassUseCase {
	private classRepository: IClassRepository;

	constructor(classRepository: IClassRepository) {
		this.classRepository = classRepository;
	}

	async execute(params: IParamsCreateNewClassDto) {
		const { name, isOnlineClass, startDate, endDate } = params;

		if (startDate > endDate) {
			throw new Error('Data de inicio não pode ser maior que data de fim!');
		}

		if (startDate < new Date()) {
			throw new Error('Data de inicio não pode ser menor que data atual!');
		}

		const isStartDateHoliday = isHoliday(startDate);
		const isEndDateHoliday = isHoliday(endDate);

		const isStarDateWeekend =
			startDate.getDay() == weekDays.SABADO ||
			startDate.getDay() == weekDays.DOMINGO;

		const isEndDateWeekend =
			endDate.getDay() == weekDays.SABADO || endDate.getDay() == weekDays.DOMINGO;

		if (
			isStartDateHoliday ||
			isEndDateHoliday ||
			isStarDateWeekend ||
			isEndDateWeekend
		) {
			throw new Error('A aula deve ser em um dia útil!');
		}

		const conflictingClasses =
			await this.classRepository.findConflictingClassesByDate(startDate, endDate);

		if (conflictingClasses.length > 0) {
			throw new Error('Existe um conflito entre as datas e horarios de aulas!');
		}

		const createdClass = await this.classRepository.createNewClass({
			name,
			isOnlineClass,
			startDate,
			endDate,
		});

		return createdClass;
	}
}

export { CreateNewClassUseCase };
