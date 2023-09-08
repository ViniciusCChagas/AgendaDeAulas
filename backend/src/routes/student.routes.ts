import { Request, Response } from 'express';
import Router from 'express-promise-router';
import { IParamsCreateNewStudentDto } from '../models/dtos/IParamsCreateNewStudentDto';
import { createNewStudentController } from '../useCases/Student/createNewStudant';

const studentRoutes = Router();

studentRoutes.post(
	'/',
	(request: Request<any, any, IParamsCreateNewStudentDto>, response: Response) => {
		return createNewStudentController.handle(request, response);
	}
);

export { studentRoutes };
