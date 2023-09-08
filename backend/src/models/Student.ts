import mongoose, { Schema } from 'mongoose';
import { IStudent } from './interfaces/IStudent';

const studentSchema = new Schema<IStudent>(
	{
		_id: Schema.Types.ObjectId,
		email: String,
		classes: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Class',
			},
		],
	},
	{ versionKey: false }
);

const Student = mongoose.model('Student', studentSchema);

export { Student };
