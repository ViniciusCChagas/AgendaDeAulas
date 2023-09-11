import { IParamsUpdateClassDto } from '../../../models/dtos/IParamsUpdateClassDto';
import { IClassRepository } from '../../../repositories/interfaces/IClassRepository';
import { isHoliday, weekDays } from '../../../utils/holidays';

class UpdateClassUseCase {
	private classRepository: IClassRepository;

	constructor(classRepository: IClassRepository) {
		this.classRepository = classRepository;
	}

	async execute(params: IParamsUpdateClassDto) {
		const { id, name, isOnlineClass, startDate, endDate } = params;

    if (startDate.getTime() > endDate.getTime()) {
			throw new Error('Data de inicio não pode ser maior que data de fim!');
		}

		if (startDate.getTime() < new Date().getTime()) {
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

      const filteredConflictingClasses =conflictingClasses.filter((conflictingClass) => conflictingClass._id.toString() !== id);

		if (filteredConflictingClasses.length > 0) {
			throw new Error('Existe um conflito entre as datas e horarios de aulas!');
		}

		const updatedClass = await this.classRepository.updateClass({
			id,
			name,
			isOnlineClass,
			startDate,
			endDate,
		});

		return updatedClass;
	}
}

export { UpdateClassUseCase };
