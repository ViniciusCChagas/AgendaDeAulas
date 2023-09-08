import { NextFunction, Request, Response } from 'express';

export const AuthenticationMiddleware = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	try {
		const user = request.session['user'];

		if (!user) {
			return response.status(401).json({
				error: `unauthorized`,
			});
		}

		next();
	} catch (error) {
		return response.status(401).json({
			error: `unauthorized`,
		});
	}
};
