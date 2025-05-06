import 'reflect-metadata';
import dotenv from 'dotenv';

dotenv.config();

import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongo: MongoMemoryServer;

jest.mock('winston', () => {
	const originalWinston = jest.requireActual('winston');

	const fakeLogger = {
		info: jest.fn(),
		warn: jest.fn(),
		error: jest.fn(),
		debug: jest.fn(),
	};

	return {
		...originalWinston,
		createLogger: jest.fn(() => fakeLogger),
		transports: {
			Console: jest.fn(),
		},
		format: originalWinston.format,
	};
});

beforeAll(async () => {
	mongo = await MongoMemoryServer.create();
	const uri = mongo.getUri();

	await mongoose.connect(uri);
});

afterEach(async () => {
	const collections = await mongoose.connection.db?.collections();

	if (collections) {
		for (const collection of collections) {
			await collection.deleteMany({});
		}
	}
});

afterAll(async () => {
	await mongoose.connection.close();
	await mongo.stop();
});
