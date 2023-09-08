import mongoose, { Schema } from 'mongoose';
import { IClass } from './interfaces/IClass';

const classSchema = new Schema<IClass>(
	{
		_id: Schema.Types.ObjectId,
		name: String,
		isOnlineClass: Boolean,
		startDate: Date,
		endDate: Date,
		students: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Student',
			},
		],
	},
	{ versionKey: false }
);

const Class = mongoose.model('Class', classSchema);

export { Class };
