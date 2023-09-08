import { Request, Response } from 'express';
import { boolean, date, object, string } from 'yup';
import { IParamsCreateNewClassDto } from '../../../models/dtos/IParamsCreateNewClassDto';
import { CreateNewClassUseCase } from './CreateNewClassUseCase';

class CreateNewClassController {
	private createNewClassUseCase: CreateNewClassUseCase;
	constructor(createNewClassUseCase: CreateNewClassUseCase) {
		this.createNewClassUseCase = createNewClassUseCase;
	}

	async handle(
		request: Request<any, any, IParamsCreateNewClassDto>,
		response: Response
	) {
		const { name, isOnlineClass, endDate, startDate } = request.body;

		const paramsValidationSchema = object({
			name: string().required().label('Nome da Aula').min(3).max(120),
			isOnlineClass: boolean().required().label('É uma aula online?'),
			startDate: date().required().label('Inicio da Aula'),
			endDate: date().required().label('Fim da Aula'),
		});

		try {
			await paramsValidationSchema.validate({
				name,
				isOnlineClass,
				startDate,
				endDate,
			});

			const newClass = await this.createNewClassUseCase.execute({
				name,
				isOnlineClass,
				startDate: new Date(startDate),
				endDate: new Date(endDate),
			});

			return response.status(200).json({
				message: 'Aula criada com sucesso!',
				class: newClass,
			});
		} catch (error) {
			console.log(error.message);

			return response.status(400).json({
				message: 'Erro ao criar aula!',
				errors: error.errors ?? [error.message],
			});
		}
	}
}
export { CreateNewClassController };
