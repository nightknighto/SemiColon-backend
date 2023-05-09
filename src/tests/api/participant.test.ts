import superTest from 'supertest';
import { connectMONGODB, disconnectMONGODB } from '../../services/mongodb';
import { participant as ParticipantType } from '../../types/participant';
import api from '../../api';
import {
	dbAddParticipant,
	dbDeleteParticipant,
} from '../../models/participant/participant.model';
import { dbAddNewUser, dbDeleteAllUsers } from '../../models/user/user.model';

let loginCookie: string[];

beforeAll(async () => {
	const user = {
		username: 'Test_user',
		password: 'Test_password',
		phone: '01000000000',
		role: 'admin',
		active: true,
	};
	await connectMONGODB();
	await dbAddNewUser(user);
	const response = await superTest(api)
		.post('/auth/login')
		.send({ phone: '01000000000', password: 'Test_password' });
	const cookies = response.headers['set-cookie'];
	if (cookies) {
		loginCookie = cookies;
	}
}, 10000);

afterAll(async () => {
	// await dbDeleteAllUsers();
	await disconnectMONGODB();
});

describe('GET /participant endpoint', () => {
	beforeAll(async () => {
		const participant1: Partial<ParticipantType> = {
			name: 'Test participant one',
			phone: '01111111111',
			email: 'testuser1@gmail.com',
			collegeId: '1601234',
			firstPreference: 'c-prog',
			firstPrefKnowledge: 'beginner',
			firstPrefReason: 'I like it',
			secondPreference: 'avr',
			secondPrefReason: 'I like it',
			pastExperience: 'I have experience',
			year: 'Freshman',
		};
		await dbAddParticipant(participant1);
	});

	afterAll(async () => {
		await dbDeleteParticipant({email: 'testuser1@gmail.com'});
	});

	test('Get all participants', async () => {
		const response = await superTest(api)
			.get('/participants/getAll')
			.set('Cookie', loginCookie);
		expect(response.statusCode).toBe(200);
	});
});

describe('POST /participant endpoint', () => {
	afterAll(async () => {
		await dbDeleteParticipant({email: 'testuser2@gmail.com'});
	});
	test('Add a new participant with valid data', async () => {
		const participant2: Partial<ParticipantType> = {
			name: 'Test participant one',
			phone: '01111111111',
			email: 'testuser2@gmail.com',
			collegeId: '1601234',
			firstPreference: 'arm',
			firstPrefKnowledge: 'beginner',
			firstPrefReason: 'I like it',
			secondPreference: 'avr',
			secondPrefReason: 'I like it',
			pastExperience: 'I have experience',
			year: 'Freshman',
		};
		const response = await superTest(api)
			.post('/participants/add')
			.send({ participant: participant2 })
			.set('Cookie', loginCookie);
		expect(response.statusCode).toBe(200);
	});

	test('Add an already added participant with valid data', async () => {
		const participant2: Partial<ParticipantType> = {
			name: 'Test participant two',
			phone: '01111211111',
			email: 'testuser2@gmail.com',
			collegeId: '1801298',
			firstPreference: 'desktop',
			firstPrefKnowledge: 'beginner',
			firstPrefReason: 'I like it',
			secondPreference: 'arm',
			secondPrefReason: 'I like it',
			pastExperience: 'N/A',
			year: 'Freshman',
		};
		const response = await superTest(api)
			.post('/participants/add')
			.set('Cookie', loginCookie)
			.send({ participant: participant2 });
		expect(response.statusCode).toBe(200);
		expect(response.body.data.name).toBe('Test participant two');
	});
});

describe('PATCH /participant endpoint', () => {
	beforeAll(async () => {
		const participant3: Partial<ParticipantType> = {
			name: 'Test participant one',
			phone: '01111111111',
			email: 'testuser3@gmail.com',
			collegeId: '1601234',
			firstPreference: 'avr',
			firstPrefKnowledge: 'beginner',
			firstPrefReason: 'I like it',
			secondPreference: 'arm',
			secondPrefReason: 'I like it',
			pastExperience: 'I have experience',
			year: 'Freshman',
		};
		await dbAddParticipant(participant3);
	});
	afterAll(async () => {
		await dbDeleteParticipant({email: 'testuser3@gmail.com'});
	});
	test('Update a non-existing participant ', async () => {
		const response = await superTest(api)
			.patch('/participants/update')
			.set('Cookie', loginCookie)
			.send({
				filter: {email: 'testuser665@gmail.com'},
				update: { acceptanceStatus: 'accepted' },
			});
		expect(response.statusCode).toBe(404);
	});
	test('Update a existing participant status ', async () => {
		const response = await superTest(api)
			.patch('/participants/update')
			.set('Cookie', loginCookie)
			.send({
				filter: {email: 'testuser3@gmail.com'},
				update: { acceptanceStatus: 'accepted' },
			});
		expect(response.statusCode).toBe(200);
	});
	test('Update a existing participant emailed status ', async () => {
		const response = await superTest(api)
			.patch('/participants/update')
			.set('Cookie', loginCookie)
			.send({
				filter: {email: 'testuser3@gmail.com'},
				update: { emailedStatus: true },
			});
		expect(response.statusCode).toBe(200);
	});
});

describe('DELETE /participant endpoint', () => {
	beforeAll(async () => {
		const participant4: Partial<ParticipantType> = {
			name: 'Test participant one',
			phone: '01111111111',
			email: 'testuser4@gmail.com',
			collegeId: '1601234',
			firstPreference: 'arm',
			firstPrefKnowledge: 'beginner',
			firstPrefReason: 'I like it',
			secondPreference: 'avr',
			secondPrefReason: 'I like it',
			pastExperience: 'I have experience',
			year: 'Freshman',
		};
		await dbAddParticipant(participant4);
	});

	test('Delete a non-existing participant ', async () => {
		const response = await superTest(api)
			.delete('/participants/delete')
			.set('Cookie', loginCookie)
			.send({filter: { email: 'testuser65434@gmail.com'} });
		expect(response.statusCode).toBe(404);
	});
	test('Delete an existing participant ', async () => {
		const response = await superTest(api)
			.delete('/participants/delete')
			.set('Cookie', loginCookie)
			.send({ filter: {email: 'testuser4@gmail.com'} });
		expect(response.statusCode).toBe(200);
	});
});
