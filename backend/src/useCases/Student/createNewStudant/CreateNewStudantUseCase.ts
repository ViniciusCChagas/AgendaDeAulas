import { IParamsCreateNewStudentDto } from '../../../models/dtos/IParamsCreateNewStudentDto';
import { IStudentRepository } from '../../../repositories/interfaces/IStudentRepository';

class CreateNewStudentUseCase {
	private studentRepository: IStudentRepository;

	constructor(studentRepository: IStudentRepository) {
		this.studentRepository = studentRepository;
	}

	async execute(newStudent: IParamsCreateNewStudentDto) {
		const studentAlreadyExists = await this.studentRepository.findStudentByEmail(
			newStudent.email
		);

		if (studentAlreadyExists) {
			throw new Error('Estudante já cadastrado!');
		}

		const student = await this.studentRepository.createNewStudent(newStudent);

		return student;
	}
}

export { CreateNewStudentUseCase };
