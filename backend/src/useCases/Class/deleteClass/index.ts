import { ClassRepository } from '../../../repositories/ClassRepository';
import { StudentRepository } from '../../../repositories/StudentRepository';
import { DeleteClassByIdController } from './DeleteClassByIdController';
import { DeleteClassByIdUseCase } from './DeleteClassByIdUseCase';

const classRepository = new ClassRepository();
const studentRepository = new StudentRepository();

const deleteClassByIdUseCase = new DeleteClassByIdUseCase(
	classRepository,
	studentRepository
);

const deleteClassByIdController = new DeleteClassByIdController(deleteClassByIdUseCase);

export { deleteClassByIdController };
