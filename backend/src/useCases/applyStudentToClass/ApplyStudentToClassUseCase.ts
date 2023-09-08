import { IClassRepository } from '../../repositories/interfaces/IClassRepository';
import { IStudentRepository } from '../../repositories/interfaces/IStudentRepository';

class ApplyStudentToClassUseCase {
	private classRepository: IClassRepository;
	private studentRepository: IStudentRepository;

	constructor(
		classRepository: IClassRepository,
		studentRepository: IStudentRepository
	) {
		this.classRepository = classRepository;
		this.studentRepository = studentRepository;
	}

	async execute(classId: string, studentId: string) {
		const student = await this.studentRepository.findStudentById(studentId);
		if (!student) {
			throw new Error('Estudante não encontrado!');
		}

		const classToBeUpdated = await this.classRepository.getClassById(classId);
		if (!classToBeUpdated) {
			throw new Error('Aula não encontrada!');
		}

		const studentAlreadyInClass = classToBeUpdated.students.find(
			(student) => student.toString() === studentId
		);

		if (studentAlreadyInClass) {
			throw new Error('Estudante já cadastrado nessa aula!');
		}

		await this.classRepository.addStudentToClass(
			classToBeUpdated._id.toString(),
			student._id.toString()
		);

		await this.studentRepository.addClassToStudent(
			student._id.toString(),
			classToBeUpdated._id.toString()
		);
	}
}

export { ApplyStudentToClassUseCase };
