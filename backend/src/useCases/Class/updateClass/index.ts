import { ClassRepository } from '../../../repositories/ClassRepository';
import { UpdateClassController } from './UpdateClassController';
import { UpdateClassUseCase } from './UpdateClassUseCase';

const classRepository = new ClassRepository();

const updateClassUseCase = new UpdateClassUseCase(classRepository);

const updateClassController = new UpdateClassController(updateClassUseCase);

export { updateClassController };
