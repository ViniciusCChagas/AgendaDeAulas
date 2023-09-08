import { StudentRepository } from '../../../repositories/StudentRepository';
import { CreateNewStudentController } from './CreateNewStudantController';
import { CreateNewStudentUseCase } from './CreateNewStudantUseCase';

const studentRepository = new StudentRepository();

const createNewStudentUseCase = new CreateNewStudentUseCase(studentRepository);

const createNewStudentController = new CreateNewStudentController(
	createNewStudentUseCase
);

export { createNewStudentController };
