import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import { LoggerMiddleware } from './middlewares/LoggerMiddleware';
import { mainRouter } from './routes/main.routes';
import { MongooseClient } from './services/MongooseService';
import './services/YupTranslateService';

const app = express();

app.use(express.json());
app.use(
	cors({
		methods: ['POST', 'PUT', 'GET', 'DELETE', 'OPTIONS', 'HEAD'],
		allowedHeaders: ['Content-Type', 'Authorization', 'Origin'],
		credentials: true,
		origin: process.env.FRONTEND_URL,
	})
);

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 3, // 3 horas
			secure: false,
			httpOnly: true,
			sameSite: true,
		},
	})
);

app.use(LoggerMiddleware);

app.use(mainRouter);

app.listen(process.env.PORT, () => {
	new MongooseClient().connect();

	console.log(`Server listening on port ${process.env.PORT}`);
});
