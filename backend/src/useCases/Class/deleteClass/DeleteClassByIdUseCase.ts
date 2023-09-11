import { IClass } from '../../../models/interfaces/IClass';
import { IClassRepository } from '../../../repositories/interfaces/IClassRepository';
import { IStudentRepository } from '../../../repositories/interfaces/IStudentRepository';

class DeleteClassByIdUseCase {
	constructor(
		private classRepository: IClassRepository,
		private studentRepository: IStudentRepository
	) {}

	async execute(id: string): Promise<IClass> {
		const classExists = await this.classRepository.getClassById(id);

		if (!classExists) {
			throw new Error('Aula não encontrada!');
		}

		const deletedClass = await this.classRepository.deleteClassById(id);

		await this.studentRepository.deleteClassesFromStudentByClassId(id);

		return deletedClass;
	}
}

export { DeleteClassByIdUseCase };
