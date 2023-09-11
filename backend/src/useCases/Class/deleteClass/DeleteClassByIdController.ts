import { Request, Response } from 'express';
import { object, string } from 'yup';
import { DeleteClassByIdUseCase } from './DeleteClassByIdUseCase';

class DeleteClassByIdController {
	constructor(private deleteClassByIdUseCase: DeleteClassByIdUseCase) {}

	async handle(request: Request, response: Response): Promise<Response> {
		try {
			const { classId } = request.params;

			const paramsValidationSchema = object({
				classId: string().required().label('Id da Aula'),
			});

			await paramsValidationSchema.validate({
				classId,
			});

			await this.deleteClassByIdUseCase.execute(classId);
      
			return response.status(200).send({
				message: 'Aula deletada com sucesso!',
			});
		} catch (error) {
			return response.status(400).json({
				message: error.message || 'Unexpected error.',
			});
		}
	}
}
export { DeleteClassByIdController };
