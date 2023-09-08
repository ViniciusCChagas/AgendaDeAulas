import { BatchCreateNewClassesUseCase } from './BatchCreateNewClassesUseCase';

import { Request, Response } from 'express';
import { boolean, object, string } from 'yup';
import { IParamsBatchCreateNewClassesDto } from '../../../models/dtos/IParamsBatchCreateNewClassesDto';
import { validationRegex } from '../../../utils/validationRegex';

class BatchCreateNewClassesController {
	private batchCreateNewClassesUseCase: BatchCreateNewClassesUseCase;

	constructor(batchCreateNewClassesUseCase: BatchCreateNewClassesUseCase) {
		this.batchCreateNewClassesUseCase = batchCreateNewClassesUseCase;
	}

	async handle(
		request: Request<any, any, IParamsBatchCreateNewClassesDto>,
		response: Response
	) {
		const { name, isOnlineClass, startDay, endDay, endHour, startHour } =
			request.body;

		const paramsValidationSchema = object({
			name: string().required().label('Nome da Aula').min(3).max(120),
			isOnlineClass: boolean().required().label('É uma aula online?'),
			startDay: string()
				.required()
				.label('Dia de Inicio do periodo')
				.matches(validationRegex.date),
			endDay: string()
				.required()
				.label('Dia de Fim do periodo')
				.matches(validationRegex.date),
			startHour: string()
				.required()
				.label('Hora de Inicio da Aula')
				.matches(validationRegex.time),
			endHour: string()
				.required()
				.label('Hora de Fim da Aula')
				.matches(validationRegex.time),
		});

		try {
			await paramsValidationSchema.validate({
				name,
				isOnlineClass,
				startDay,
				endDay,
				startHour,
				endHour,
			});

			const newClasses = await this.batchCreateNewClassesUseCase.execute({
				name,
				isOnlineClass,
				startDay,
				endDay,
				startHour,
				endHour,
			});

			return response.status(200).json({
				message: 'Aulas criadas com sucesso!',
				classes: newClasses,
			});
		} catch (error) {
			console.log(error.message);

			return response.status(400).json({
				message: 'Erro ao criar aulas!',
				errors: error.errors ?? [error.message],
			});
		}
	}
}
export { BatchCreateNewClassesController };
