import { Request, Response } from 'express';
import Router from 'express-promise-router';
import { IParamsGetClassesDto } from '../models/dtos/IParamsGetClassesDto';
import { batchCreateNewClassesController } from '../useCases/Class/batchCreateNewClasses';
import { createNewClassController } from '../useCases/Class/createNewClass';
import { getClassesController } from '../useCases/Class/getClasses';
import { applyStudentToClassController } from '../useCases/applyStudentToClass/intex';

const classRoutes = Router();

classRoutes.get(
	'/',
	(request: Request<any, any, any, IParamsGetClassesDto>, response: Response) => {
		return getClassesController.handle(request, response);
	}
);

classRoutes.post('/', (request: Request, response: Response) => {
	return createNewClassController.handle(request, response);
});

classRoutes.post('/batchCreate', (request: Request, response: Response) => {
	return batchCreateNewClassesController.handle(request, response);
});

classRoutes.post('/:classId/addStudent', (request: Request, response: Response) => {
	return applyStudentToClassController.handle(request, response);
});

export { classRoutes };
