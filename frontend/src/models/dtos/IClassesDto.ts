import { IWeather } from '../IWeather';

interface IClassesDto {
	_id: string;
	name: string;
	isOnlineClass: boolean;
	startDate: Date;
	endDate: Date;
	studentsCount: number;
	weather?: IWeather;
}

export type { IClassesDto };
