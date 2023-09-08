import { ClassRepository } from '../../../repositories/ClassRepository';
import { CreateNewClassController } from './CreateNewClassController';
import { CreateNewClassUseCase } from './CreateNewClassUseCase';

const classRepository = new ClassRepository();

const createNewClassUseCase = new CreateNewClassUseCase(classRepository);

const createNewClassController = new CreateNewClassController(createNewClassUseCase);

export { createNewClassController };
