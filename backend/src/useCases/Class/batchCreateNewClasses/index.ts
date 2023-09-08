import { ClassRepository } from '../../../repositories/ClassRepository';
import { BatchCreateNewClassesController } from './BatchCreateNewClassesController';
import { BatchCreateNewClassesUseCase } from './BatchCreateNewClassesUseCase';

const classRepository = new ClassRepository();

const batchCreateNewClassesUseCase = new BatchCreateNewClassesUseCase(classRepository);

const batchCreateNewClassesController = new BatchCreateNewClassesController(
	batchCreateNewClassesUseCase
);

export { batchCreateNewClassesController };
