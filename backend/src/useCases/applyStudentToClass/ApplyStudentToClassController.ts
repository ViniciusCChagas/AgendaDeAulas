import { Request, Response } from 'express';
import { object, string } from 'yup';
import { ISession } from '../../models/interfaces/ISession';
import { ApplyStudentToClassUseCase } from './ApplyStudentToClassUseCase';

class ApplyStudentToClassController {
	private applyStudentToClassUseCase: ApplyStudentToClassUseCase;

	constructor(applyStudentToClassUseCase: ApplyStudentToClassUseCase) {
		this.applyStudentToClassUseCase = applyStudentToClassUseCase;
	}

	async handle(request: Request, response: Response): Promise<Response> {
		const classId = request.params.classId;

		const { studentId, isAdmin } = request.session['user'] as ISession;

		if(isAdmin){
			return response.status(400).json({
				message: 'Administradores não podem se inscrever em aulas!',
			});
		}

		const paramsValidationSchema = object({
			classId: string().required(),
			studentId: string().required(),
		});

		try {
			await paramsValidationSchema.validate({
				classId,
				studentId,
			});

			await this.applyStudentToClassUseCase.execute(classId, studentId.toString());

			return response.status(200).json({
				message: 'Estudante adicionado a aula com sucesso!',
			});
		} catch (err) {
			return response.status(400).json({
				message: err.message || 'Unexpected error.',
			});
		}
	}
}

export { ApplyStudentToClassController };
