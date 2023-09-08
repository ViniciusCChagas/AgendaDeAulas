import mongoose from 'mongoose';

class MongooseClient {
	private connectionString: string;

	constructor() {
		this.connectionString = process.env.MONGODB_CONNECTION_STRING;
	}

	async connect() {
		try {
			await mongoose.connect(this.connectionString);

			console.log('[Mongoose] MongoDB connected!');
		} catch (error) {
			console.log('[Mongoose] connection failed!');
			console.log({ mongooseError: error.message });
		}
	}
}

export { MongooseClient };
