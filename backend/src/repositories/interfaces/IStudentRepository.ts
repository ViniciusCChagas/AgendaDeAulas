import { IParamsCreateNewStudentDto } from '../../models/dtos/IParamsCreateNewStudentDto';
import { IStudent } from '../../models/interfaces/IStudent';

interface IStudentRepository {
	createNewStudent(newStudent: IParamsCreateNewStudentDto): Promise<IStudent>;
	findStudentById(id: string): Promise<IStudent>;
	findStudentByEmail(email: string): Promise<IStudent>;
	addClassToStudent(studentId: string, classId: string): Promise<IStudent>;
}

export { IStudentRepository };
