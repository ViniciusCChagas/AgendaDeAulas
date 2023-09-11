import { IParamsCreateNewClassDto } from '../../models/dtos/IParamsCreateNewClassDto';
import { IParamsUpdateClassDto } from '../../models/dtos/IParamsUpdateClassDto';
import { IClass } from '../../models/interfaces/IClass';

interface IClassRepository {
	createNewClass(newClass: IParamsCreateNewClassDto): Promise<IClass>;
	deleteClassById(id: string): Promise<IClass>;
	updateClass(newClass: IParamsUpdateClassDto): Promise<IClass>;
	batchCreateNewClasses(params: IClass[]): Promise<IClass[]>;
	findConflictingClassesByDate(initialDate: Date, finalDate: Date): Promise<IClass[]>;
	getClassById(id: string): Promise<IClass>;
	getClassesByDate(initialDate: Date, finalDate: Date): Promise<IClass[]>;
	addStudentToClass(classId: string, studentId: string): Promise<IClass>;
}

export { IClassRepository };
