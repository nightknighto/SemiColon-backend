import superTest from 'supertest';
import { Types } from 'mongoose';

import { connectMONGODB, disconnectMONGODB } from '../../services/mongodb';
import UserType from '../../types/user';
import api from '../../api';
import {
	dbAddNewUser,
	dbDeleteAllUsers,
	dbDeleteUserById,
} from '../../models/user/user.model';

function generatePhone() {
	let phone = '01';
	let random9Digits = Math.floor(Math.random() * 1000000000);
	phone += random9Digits.toString().padStart(9, '0');
	return phone;
}

let loginCookie: string[];

beforeAll(async () => {
	const user = {
		username: 'Test_user',
		password: 'Test_password',
		phone: generatePhone(),
		role: 'admin',
		active: true,
	};
	await connectMONGODB();
	await dbAddNewUser(user);
	const response = await superTest(api)
		.post('/auth/login')
		.send({ phone: user.phone, password: 'Test_password' });
	const cookies = response.headers['set-cookie'];
	if (cookies) {
		loginCookie = cookies;
	}
}, 10000);

afterAll(async () => {
	await dbDeleteAllUsers();
	await disconnectMONGODB();
});

describe('POST /user endpoint', () => {
	let id1 = new Types.ObjectId();
	let id2 = new Types.ObjectId();
	let id3 = new Types.ObjectId();
	let id4 = new Types.ObjectId();
	let duplicatedPhone = generatePhone();
	beforeAll(async () => {
		const test_duplicated_phone: UserType = {
			_id: id4,
			username: 'Test_user',
			password: 'Test_password',
			phone: duplicatedPhone,
			role: 'admin',
		};
		await dbAddNewUser(test_duplicated_phone);
	});

	test('Add a valid user', async () => {
		const validUserWithAllFields: UserType = {
			_id: id1,
			username: 'Test_user',
			password: 'Test_password',
			phone: generatePhone(),
			role: 'admin',
			active: true,
		};
		const response = await superTest(api)
			.post('/user')
			.set('Cookie', loginCookie)
			.send(validUserWithAllFields);
		expect(response.statusCode).toBe(201);
	});

	test('Add a user with invalid phone number', async () => {
		const userWithInvalidPhone: UserType = {
			username: 'Test_user',
			password: 'Test_password',
			phone: 'invalid',
			role: 'admin',
			active: true,
		};
		const response = await superTest(api)
			.post('/user')
			.set('Cookie', loginCookie)
			.send(userWithInvalidPhone);
		expect(response.statusCode).toBe(400);
	});

	test('Add a user with duplicated phone number', async () => {
		const userWithDuplicatedPhone: UserType = {
			username: 'Test_user',
			password: 'Test_password',
			phone: duplicatedPhone,
			role: 'admin',
			active: true,
		};
		const response = await superTest(api)
			.post('/user')
			.send(userWithDuplicatedPhone)
			.set('Cookie', loginCookie);
		expect(response.statusCode).toBe(400);
	});

	test('Add a user with missing phone number', async () => {
		const userWithMissingPhone = {
			username: 'Test_user',
			password: 'Test_password',
			role: 'admin',
			active: true,
		};
		const response = await superTest(api)
			.post('/user')
			.set('Cookie', loginCookie)
			.send(userWithMissingPhone);
		expect(response.statusCode).toBe(400);
	});

	test('Add a user with missing username', async () => {
		const userWithMissingUsername = {
			password: 'Test_password',
			phone: generatePhone(),
			role: 'admin',
			active: true,
		};
		const response = await superTest(api)
			.post('/user')
			.set('Cookie', loginCookie)
			.send(userWithMissingUsername);
		expect(response.statusCode).toBe(400);
	});

	test('Add a user with missing password', async () => {
		const userWithMissingPassword = {
			_id: id2,
			username: 'Test_user',
			phone: generatePhone(),
			role: 'admin',
			active: true,
		};
		const response = await superTest(api)
			.post('/user')
			.set('Cookie', loginCookie)
			.send(userWithMissingPassword);
		expect(response.statusCode).toBe(400);
	});

	test('Add a user with missing role', async () => {
		const userWithMissingRole = {
			username: 'Test_user',
			password: 'Test_password',
			phone: generatePhone(),
			active: true,
		};
		const response = await superTest(api)
			.post('/user')
			.set('Cookie', loginCookie)
			.send(userWithMissingRole);
		expect(response.statusCode).toBe(400);
	});

	test('Add a user with missing active', async () => {
		const userWithMissingActive = {
			_id: id3,
			username: 'Test_user',
			password: 'Test_password',
			phone: generatePhone(),
			role: 'admin',
		};
		const response = await superTest(api)
			.post('/user')
			.set('Cookie', loginCookie)
			.send(userWithMissingActive);
		expect(response.body.data.active).toBe(false); // default value
		expect(response.statusCode).toBe(201);
	});

	test('Activate inactive user', async () => {
		const response = await superTest(api)
			.patch(`/user/activate/${id3.toString()}`)
			.set('Cookie', loginCookie);
		expect(response.body.data.active).toBe(true);
		expect(response.statusCode).toBe(200);
	});

	test('Deactivate active user', async () => {
		const response = await superTest(api)
			.patch(`/user/deactivate/${id3.toString()}`)
			.set('Cookie', loginCookie);
		expect(response.body.data.active).toBe(false);
		expect(response.statusCode).toBe(200);
	});

	afterAll(async () => {
		await dbDeleteUserById(id1.toString());
		await dbDeleteUserById(id3.toString());
		await dbDeleteUserById(id4.toString());
	});
});

describe('GET /user endpoint', () => {
	let id1 = new Types.ObjectId();
	let phone = generatePhone(); // to have access inside the test
	let nonExistingPhone = generatePhone();

	beforeAll(async () => {
		const userToGetByPhone: UserType = {
			_id: id1,
			username: 'Test_user',
			password: 'Test_password',
			phone,
			role: 'admin',
			active: true,
		};
		await dbAddNewUser(userToGetByPhone);
	});

	test('Get a user by phone', async () => {
		const response = await superTest(api)
			.get(`/user/${phone}`)
			.set('Cookie', loginCookie);
		expect(response.statusCode).toBe(200);
	});

	test('Get a user by phone that does not exist', async () => {
		const response = await superTest(api)
			.get(`/user/${nonExistingPhone}`)
			.set('Cookie', loginCookie);
		expect(response.statusCode).toBe(404);
	});

	afterAll(async () => {
		await dbDeleteUserById(id1.toString());
	});
});

describe('DELETE /user endpoint', () => {
	let id1 = new Types.ObjectId();
	let id2 = new Types.ObjectId();

	beforeAll(async () => {
		const userToDeleteById: UserType = {
			_id: id1,
			username: 'Test_user',
			password: 'Test_password',
			phone: generatePhone(),
			role: 'admin',
			active: true,
		};
		await dbAddNewUser(userToDeleteById);
	});

	test('Delete a user by id', async () => {
		// when this happens the server send 200 with data: deleteUser
		const response = await superTest(api)
			.delete(`/user/${id1.toString()}`)
			.set('Cookie', loginCookie);
		expect(response.statusCode).toBe(200);
	});

	test('Delete a user by id that does not exist', async () => {
		const response = await superTest(api)
			.delete(`/user/${id2.toString()}`)
			.set('Cookie', loginCookie);
		expect(response.statusCode).toBe(404);
	});
});
