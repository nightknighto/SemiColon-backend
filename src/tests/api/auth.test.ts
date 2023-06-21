import superTest from 'supertest';
import { dbAddNewUser, dbDeleteAllUsers } from '../../models/user/user.model';
import { connectMONGODB, disconnectMONGODB } from '../../services/mongodb';
import UserType from '../../types/user';
import api from '../../api';

beforeAll(async () => {
	await connectMONGODB();
});

afterAll(async () => {
	await dbDeleteAllUsers();
	await disconnectMONGODB();
});

describe('Auth API', () => {
	let phone = '01444444444';
	let password = 'test';

	beforeAll(async () => {
		const authenticatedUser: UserType = {
			phone,
			password,
			username: 'test',
			role: 'admin',
		};
		await dbAddNewUser(authenticatedUser);
	});

	test('Login with a valid user', async () => {
		const response = await superTest(api)
			.post('/auth/login')
			.send({ phone, password })
		expect(response.status).toBe(200);
	});

	test('Login with wrong password', async () => {
		const response = await superTest(api)
			.post('/auth/login')
			.send({ phone, password: 'wrong' })
		expect(response.status).toBe(401);
	});

	test('Login with wrong phone number', async () => {
		const response = await superTest(api)
			.post('/auth/login')
			.send({ phone: '01444444244', password })
		console.log(response.body);
		expect(response.status).toBe(401);
	});
});
