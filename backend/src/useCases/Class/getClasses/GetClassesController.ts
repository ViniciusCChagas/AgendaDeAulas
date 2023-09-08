import { Request, Response } from 'express';
import { IParamsGetClassesDto } from '../../../models/dtos/IParamsGetClassesDto';
import { GetClassesUseCase } from './GetClassesUseCase';

class GetClassesController {
	private getClassUseCase: GetClassesUseCase;

	constructor(getClassUseCase: GetClassesUseCase) {
		this.getClassUseCase = getClassUseCase;
	}

	async handle(
		request: Request<any, any, any, IParamsGetClassesDto>,
		response: Response
	): Promise<Response> {
		const { initialDate, finalDate } = request.query;

		try {
			const classes = await this.getClassUseCase.execute(
				new Date(initialDate),
				new Date(finalDate)
			);

			return response.status(200).json(classes);
		} catch (error) {
			console.log(error.message);

			return response.status(400).json({
				message: 'Erro ao buscar Aulas!',
				errors: error.errors ?? [error.message],
			});
		}
	}
}

export { GetClassesController };
