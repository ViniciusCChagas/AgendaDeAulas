import { StudentRepository } from '../../repositories/StudentRepository';
import { CreateSessionController } from './CreateSessionController';
import { CreateSessionUseCase } from './CreateSessionUseCase';

const studentRepository = new StudentRepository();

const createSessionUseCase = new CreateSessionUseCase(studentRepository);

const createSessionController = new CreateSessionController(createSessionUseCase);

export { createSessionController };
