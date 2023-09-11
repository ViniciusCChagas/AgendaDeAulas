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

		const { studentId } = request.session['user'];

		try {
			const classes = await this.getClassUseCase.execute(
				new Date(initialDate),
				new Date(finalDate),
				studentId
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
