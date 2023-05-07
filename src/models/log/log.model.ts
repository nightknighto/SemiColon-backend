import LogType from '../../types/log';
import Log from './log.schema';

export async function dbAddNewLog(log: LogType) {
	await Log.create(log);
}

export async function dbGetAllLogs() {
	return await Log.find({}).populate('adminId').populate('participantId');
}

export async function dbGetLogsByAdminId(adminId: string) {
	return await Log.find({ adminId: adminId })
		.populate('adminId')
		.populate('participantId');
}

export async function dbGetLogsByAdminPhone(adminPhone: string) {
	return await Log.find({ adminPhone: adminPhone })
		.populate('adminId')
		.populate('participantId');
}

export async function dbGetLogsByParticipantId(participantId: string) {
	return await Log.find({ participantId: participantId })
		.populate('adminId')
		.populate('participantId');
}
