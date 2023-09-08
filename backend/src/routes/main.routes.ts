import Router from 'express-promise-router';

import { AuthenticationMiddleware } from '../middlewares/AuthenticationMiddleware';
import { classRoutes } from './class.routes';
import { sessionRoutes } from './session.routes';
import { studentRoutes } from './student.routes';

const mainRouter = Router();

mainRouter.use('/class', AuthenticationMiddleware, classRoutes);

mainRouter.use('/student', AuthenticationMiddleware, studentRoutes);

mainRouter.use('/session', sessionRoutes);

export { mainRouter };
