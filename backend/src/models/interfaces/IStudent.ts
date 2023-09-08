import { Types } from 'mongoose';

interface IStudent {
	_id: Types.ObjectId;
	email: string;
	classes: Types.ObjectId[];
}

export { IStudent };
