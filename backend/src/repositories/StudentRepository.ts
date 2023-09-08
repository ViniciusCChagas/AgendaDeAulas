import { ObjectId } from 'mongodb';
import { Student } from '../models/Student';
import { IParamsCreateNewStudentDto } from '../models/dtos/IParamsCreateNewStudentDto';
import { IStudent } from '../models/interfaces/IStudent';
import { IStudentRepository } from './interfaces/IStudentRepository';

class StudentRepository implements IStudentRepository {
	async createNewStudent(newStudent: IParamsCreateNewStudentDto): Promise<IStudent> {
		const createdStudent = new Student({
			_id: new ObjectId(),
			email: newStudent.email,
			classes: [],
		});

		createdStudent.save();

		return createdStudent;
	}

	async findStudentById(id: string): Promise<IStudent> {
		const student = Student.findById(id);

		return student;
	}

	async findStudentByEmail(email: string): Promise<IStudent | null> {
		const student = Student.findOne({
			email,
		});

		return student;
	}

	async addClassToStudent(studentId: string, classId: string): Promise<IStudent> {
		const StudentToBeUpdated = await Student.findById(studentId);

		const classIdAux = new ObjectId(classId);
		StudentToBeUpdated.classes.push(classIdAux);

		StudentToBeUpdated.save();

		return StudentToBeUpdated;
	}
}

export { StudentRepository };
