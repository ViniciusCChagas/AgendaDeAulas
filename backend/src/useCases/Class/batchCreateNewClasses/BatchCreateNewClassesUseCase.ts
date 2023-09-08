import { addDays, areIntervalsOverlapping, set } from 'date-fns';
import { IParamsBatchCreateNewClassesDto } from '../../../models/dtos/IParamsBatchCreateNewClassesDto';
import { IClass } from '../../../models/interfaces/IClass';
import { IClassRepository } from '../../../repositories/interfaces/IClassRepository';
import { isHoliday, weekDays } from '../../../utils/holidays';

class BatchCreateNewClassesUseCase {
	private classRepository: IClassRepository;

	constructor(classRepository: IClassRepository) {
		this.classRepository = classRepository;
	}

	async execute({
		name,
		isOnlineClass,
		startDay,
		startHour,
		endDay,
		endHour,
	}: IParamsBatchCreateNewClassesDto): Promise<IClass[]> {
		const startDate = new Date(`${startDay} ${startHour}:00`);
		const endDate = new Date(`${endDay} ${endHour}:00`);

    if (startDate > endDate) {
			throw new Error('Data de inicio não pode ser maior que data de fim!');
		}

		if (startDate < new Date()) {
			throw new Error('Data de inicio não pode ser menor que data atual!');
		}

		let currentDate = new Date(startDate.getTime());

		const classesToBeCreated: IClass[] = [];

		while (currentDate.getTime() <= endDate.getTime()) {
			const startHour = startDate.getHours();
			const startMinutes = startDate.getMinutes();

			const endHour = endDate.getHours();
			const endMinutes = endDate.getMinutes();

			const newStartDate = set(currentDate, {
				hours: startHour,
				minutes: startMinutes,
			});
			const newEndDate = set(currentDate, { hours: endHour, minutes: endMinutes });

			const isNewStartDateHoliday = isHoliday(newStartDate);
			const isNewEndDateHoliday = isHoliday(newEndDate);

			const isNewStartDateWeekend =
				newStartDate.getDay() == weekDays.SABADO ||
				newStartDate.getDay() == weekDays.DOMINGO;

			const isNewEndDateWeekend =
				newEndDate.getDay() == weekDays.SABADO ||
				newEndDate.getDay() == weekDays.DOMINGO;

			if (
				!isNewStartDateHoliday &&
				!isNewEndDateHoliday &&
				!isNewStartDateWeekend &&
				!isNewEndDateWeekend
			) {
				const newClass = {
					name,
					isOnlineClass,
					startDate: newStartDate,
					endDate: newEndDate,
				} as IClass;

				classesToBeCreated.push(newClass);
			}
			currentDate = addDays(currentDate, 1);
		}

		const possibleConflictingClasses =
			await this.classRepository.findConflictingClassesByDate(startDate, endDate);

		const classesToBeCreatedWithConflicts = classesToBeCreated.filter((newClass) => {
			return possibleConflictingClasses.some((existentClass) => {
				const newClassStartDate = newClass.startDate.getTime();
				const newClassEndDate = newClass.endDate.getTime();

				const existentClassStartDate = existentClass.startDate.getTime();
				const existentClassEndDate = existentClass.endDate.getTime();

				return areIntervalsOverlapping(
					{ start: newClassStartDate, end: newClassEndDate },
					{ start: existentClassStartDate, end: existentClassEndDate }
				);
			});
		});

		if (classesToBeCreatedWithConflicts.length > 0) {
			throw new Error(
				'Não foi possível criar as aulas pois elas conflitam com aulas já existentes.'
			);
		}

		const createdClasses = await this.classRepository.batchCreateNewClasses(
			classesToBeCreated
		);

		return createdClasses;
	}
}

export { BatchCreateNewClassesUseCase };
