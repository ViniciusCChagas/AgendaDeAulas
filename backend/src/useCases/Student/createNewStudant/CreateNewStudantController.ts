import { Request, Response } from 'express';
import { object, string } from 'yup';
import { IParamsCreateNewStudentDto } from '../../../models/dtos/IParamsCreateNewStudentDto';
import { CreateNewStudentUseCase } from './CreateNewStudantUseCase';

class CreateNewStudentController {
	private createNewStudantUseCase: CreateNewStudentUseCase;

	constructor(createNewStudantUseCase: CreateNewStudentUseCase) {
		this.createNewStudantUseCase = createNewStudantUseCase;
	}

	async handle(
		request: Request<any, any, IParamsCreateNewStudentDto>,
		response: Response
	): Promise<Response> {
		const { email } = request.body;

		const paramsValidationSchema = object({
			email: string().required().label('Email').email(),
		});

		try {
			await paramsValidationSchema.validate({
				email,
			});

			const newClass = await this.createNewStudantUseCase.execute({
				email,
			});

			return response.status(200).json({
				message: 'Estudante criado com sucesso!',
				class: newClass,
			});
		} catch (error) {
			console.log(error.message);

			return response.status(400).json({
				message: 'Erro ao criar estudante!',
				errors: error.errors ?? [error.message],
			});
		}
	}
}

export { CreateNewStudentController };
