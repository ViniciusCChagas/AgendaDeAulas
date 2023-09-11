import { Types } from 'mongoose';
import { IWeather } from '../interfaces/IWeather';

interface IClassesDto {
	_id: Types.ObjectId;
	name: string;
	isOnlineClass: boolean;
	startDate: Date;
	endDate: Date;
	studentsCount: number;
	weather?: IWeather;
	isRegistered?: boolean;
}

export { IClassesDto };
