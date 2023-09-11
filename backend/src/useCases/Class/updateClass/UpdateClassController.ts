import { Request, Response } from 'express';
import { boolean, date, object, string } from 'yup';
import { IParamsUpdateClassDto } from '../../../models/dtos/IParamsUpdateClassDto';
import { UpdateClassUseCase } from './UpdateClassUseCase';

class UpdateClassController {
	private updateClassUseCase: UpdateClassUseCase;
	constructor(updateClassUseCase: UpdateClassUseCase) {
		this.updateClassUseCase = updateClassUseCase;
	}

	async handle(request: Request<any, any, IParamsUpdateClassDto>, response: Response) {
		const { id, name, isOnlineClass, endDate, startDate } = request.body;

		const paramsValidationSchema = object({
			id: string().required().label('Id da Aula'),
			name: string().required().label('Nome da Aula').min(3).max(120),
			isOnlineClass: boolean().required().label('É uma aula online?'),
			startDate: date().required().label('Inicio da Aula'),
			endDate: date().required().label('Fim da Aula'),
		});

		try {
			await paramsValidationSchema.validate({
				id,
				name,
				isOnlineClass,
				startDate,
				endDate,
			});

			const newClass = await this.updateClassUseCase.execute({
				id,
				name,
				isOnlineClass,
				startDate: new Date(startDate),
				endDate: new Date(endDate),
			});

			return response.status(200).json({
				message: 'Aula modificada com sucesso!',
				class: newClass,
			});
		} catch (error) {
			console.log(error.message);

			return response.status(400).json({
				message: 'Erro ao modificar aula!',
				errors: error.errors ?? [error.message],
			});
		}
	}
}
export { UpdateClassController };
