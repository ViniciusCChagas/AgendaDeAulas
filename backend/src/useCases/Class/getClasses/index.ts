import { ClassRepository } from '../../../repositories/ClassRepository';
import { GetClassesController } from './GetClassesController';
import { GetClassesUseCase } from './GetClassesUseCase';

const classRepository = new ClassRepository();

const getClassesUseCase = new GetClassesUseCase(classRepository);

const getClassesController = new GetClassesController(getClassesUseCase);

export { getClassesController };
