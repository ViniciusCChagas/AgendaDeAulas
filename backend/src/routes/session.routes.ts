import Router from 'express-promise-router';
import { createSessionController } from '../useCases/createSession';

const sessionRoutes = Router();

sessionRoutes.post('/', (request, response) => {
	return createSessionController.handle(request, response);
});

export { sessionRoutes };
