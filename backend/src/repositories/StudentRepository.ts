import { ObjectId } from 'mongodb';
import { Student } from '../models/Student';
import { IParamsCreateNewStudentDto } from '../models/dtos/IParamsCreateNewStudentDto';
import { IStudent } from '../models/interfaces/IStudent';
import { IStudentRepository } from './interfaces/IStudentRepository';

class StudentRepository implements IStudentRepository {
	async deleteClassesFromStudentByClassId(classId: string): Promise<IStudent[]> {
		const id = new ObjectId(classId);
		const students = await Student.find({
			classes: id,
		});

		for (const student of students) {
			const index = student.classes.indexOf(id);
			student.classes.splice(index, 1);
			student.save();
		}

		return students;
	}
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
