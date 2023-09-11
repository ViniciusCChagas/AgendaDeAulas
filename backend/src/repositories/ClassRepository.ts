import { ObjectId } from 'mongodb';
import { Class } from '../models/Class';
import { IParamsCreateNewClassDto } from '../models/dtos/IParamsCreateNewClassDto';
import { IParamsUpdateClassDto } from '../models/dtos/IParamsUpdateClassDto';
import { IClass } from '../models/interfaces/IClass';
import { IClassRepository } from './interfaces/IClassRepository';

class ClassRepository implements IClassRepository {
	async updateClass(newClassParam: IParamsUpdateClassDto): Promise<IClass> {
		newClassParam.startDate.setHours(newClassParam.startDate.getHours() - 3);
		newClassParam.endDate.setHours(newClassParam.endDate.getHours() - 3);

		const newClass = await Class.findById(newClassParam.id);

		newClass.name = newClassParam.name;
		newClass.isOnlineClass = newClassParam.isOnlineClass;
		newClass.startDate = newClassParam.startDate;
		newClass.endDate = newClassParam.endDate;

		newClass.save();

		return newClass;
	}
	async createNewClass(newClass: IParamsCreateNewClassDto): Promise<IClass> {
		newClass.startDate.setHours(newClass.startDate.getHours() - 3);
		newClass.endDate.setHours(newClass.endDate.getHours() - 3);

		const createdClass = new Class({
			_id: new ObjectId(),
			name: newClass.name,
			isOnlineClass: newClass.isOnlineClass,
			startDate: newClass.startDate,
			endDate: newClass.endDate,
			students: [],
		});

		createdClass.save();

		return createdClass;
	}

	async deleteClassById(id: string): Promise<IClass> {
		const classToBeDeleted = await Class.findById(id);

		classToBeDeleted.deleteOne();

		return classToBeDeleted;
	}

	async batchCreateNewClasses(classes: IClass[]): Promise<IClass[]> {
		const classesToBeCreated = classes.map((newClass) => {
			newClass.startDate.setHours(newClass.startDate.getHours() - 3);
			newClass.endDate.setHours(newClass.endDate.getHours() - 3);
			const createdClass = new Class({
				_id: new ObjectId(),
				name: newClass.name,
				isOnlineClass: newClass.isOnlineClass,
				startDate: newClass.startDate,
				endDate: newClass.endDate,
				students: [],
			});

			return createdClass;
		});

		await Class.insertMany(classesToBeCreated);

		return classesToBeCreated;
	}

	async findConflictingClassesByDate(
		initialDate: Date,
		finalDate: Date
	): Promise<IClass[]> {
		const classes = await Class.find({
			$or: [
				{
					startDate: {
						$gte: initialDate,
						$lt: finalDate,
					},
				},
				{
					endDate: {
						$gte: initialDate,
						$lt: finalDate,
					},
				},
			],
		});

		return classes;
	}

	async getClassById(id: string): Promise<IClass> {
		const classToBeReturned = await Class.findById(id);

		return classToBeReturned;
	}

	async getClassesByDate(initialDate: Date, finalDate: Date): Promise<IClass[]> {
		const classes = Class.find({
			$and: [
				{
					startDate: {
						$gte: initialDate,
					},
				},
				{
					endDate: {
						$lte: finalDate,
					},
				},
			],
		});

		return classes;
	}

	async addStudentToClass(classId: string, studentId: string): Promise<IClass> {
		const classToBeUpdated = await Class.findById(classId);

		const studentIdAux = new ObjectId(studentId);
		classToBeUpdated.students.push(studentIdAux);

		classToBeUpdated.save();

		return classToBeUpdated;
	}
}

export { ClassRepository };
