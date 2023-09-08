import { Types } from 'mongoose';

interface ISession {
	studentId: Types.ObjectId;
	email: string;
	isAdmin: boolean;
}

export { ISession };
