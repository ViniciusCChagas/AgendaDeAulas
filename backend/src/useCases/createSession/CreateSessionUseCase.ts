import { ISession } from '../../models/interfaces/ISession';
import { IStudentRepository } from '../../repositories/interfaces/IStudentRepository';

class CreateSessionUseCase {
	private studentRepository: IStudentRepository;
	constructor(studentRepository: IStudentRepository) {
		this.studentRepository = studentRepository;
	}

	async execute(email: string): Promise<ISession> {
		const isAdmin = email.split('@')[1] === 'aprovatotal.com.br';

		if (!isAdmin) {
			const student = await this.studentRepository.findStudentByEmail(email);

			if (!student) {
				const newStudant = await this.studentRepository.createNewStudent({
					email,
				});

				return {
					studentId: newStudant._id,
					email: newStudant.email,
					isAdmin: false,
				};
			}

			return {
				studentId: student._id,
				email: student.email,
				isAdmin: false,
			};
		}

		return {
			studentId: null,
			email,
			isAdmin: true,
		};
	}
}

export { CreateSessionUseCase };
