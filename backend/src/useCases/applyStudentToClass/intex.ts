import { ClassRepository } from '../../repositories/ClassRepository';
import { StudentRepository } from '../../repositories/StudentRepository';
import { ApplyStudentToClassController } from './ApplyStudentToClassController';
import { ApplyStudentToClassUseCase } from './ApplyStudentToClassUseCase';

const classRepository = new ClassRepository();
const studentRepository = new StudentRepository();

const applyStudentToClassUseCase = new ApplyStudentToClassUseCase(
	classRepository,
	studentRepository
);

const applyStudentToClassController = new ApplyStudentToClassController(
	applyStudentToClassUseCase
);

export { applyStudentToClassController };
