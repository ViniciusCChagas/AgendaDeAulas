import { Request, Response } from 'express';
import { ICreateSessionDto } from '../../models/dtos/ICreateSessionDto';
import { CreateSessionUseCase } from './CreateSessionUseCase';

class CreateSessionController {
	private createSessionUseCase: CreateSessionUseCase;
	constructor(createSessionUseCase: CreateSessionUseCase) {
		this.createSessionUseCase = createSessionUseCase;
	}

	async handle(request: Request<any, any, ICreateSessionDto>, response: Response) {
		try {
			const { email } = request.body;

			const userSession = await this.createSessionUseCase.execute(email);

			request.session['user'] = userSession;

			return response.status(201).send();
		} catch (error) {
			console.log(error.message);

			return response.status(400).json({
				message: 'Erro ao criar session!',
				errors: error.errors ?? [error.message],
			});
		}
	}
}
export { CreateSessionController };
