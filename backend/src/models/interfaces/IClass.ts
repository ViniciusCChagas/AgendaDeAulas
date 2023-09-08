import { Types } from 'mongoose';

interface IClass {
	_id: Types.ObjectId;
	name: string;
	isOnlineClass: boolean;
	startDate: Date;
	endDate: Date;
	students: Types.ObjectId[];
}

export { IClass };
