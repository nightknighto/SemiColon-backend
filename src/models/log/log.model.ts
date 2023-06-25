import { UserLogType, ParticipantLogType } from "../../types/log";
import { UserLog, ParticipantLog } from "./log.schema";

export async function dbAddNewUserLog(log: UserLogType) {
	await UserLog.create(log);
}

export async function dbAddNewParticipantLog(log: ParticipantLogType) {
	await ParticipantLog.create(log);
}

export async function dbGetAllParticipantLogs() {
	return await ParticipantLog.find({}).populate("initiatorId").populate("targetId");
}

export async function dbGetAllUserLogs() {
	return await UserLog.find({}).populate("initiator").populate("target");
}

export async function dbGetLogsByAdminId(adminId: string) {
	const userLogs = await UserLog.find({ initiatorId: adminId }).populate("initiator").populate("target");
	const participantLogs = await ParticipantLog.find({ initiatorId: adminId })
		.populate("initiator")
		.populate("target");
	return {
		userLogs: userLogs,
		participantLogs: participantLogs,
	};
}

export async function dbGetLogsByAdminPhone(adminPhone: string) {
	const userLogs = await UserLog.find({ initiatorPhone: adminPhone }).populate("initiator").populate("target");
	const participantLogs = await ParticipantLog.find({ initiatorPhone: adminPhone })
		.populate("initiator")
		.populate("target");
	return {
		userLogs: userLogs,
		participantLogs: participantLogs,
	};
}

export async function dbGetLogsByParticipantId(participantId: string) {
	return await ParticipantLog.find({ targetId: participantId }).populate("initiator").populate("target");
}
