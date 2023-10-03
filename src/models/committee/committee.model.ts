import { Committee } from "./committee.schema";
import { CommitteeType } from "../../types/committee.d";
import UserType from "../../types/user";

export async function dbAddNewCommittee(committee: CommitteeType) {
	const newCommittee = new Committee(committee);
	await newCommittee.save();
	return newCommittee;
}

export async function dbGetAllCommittees() {
	const committees = await Committee.find().populate("members");
	return committees;
}

export async function dbGetCommitteeByTitle(title: string) {
	const committees = await Committee.find({ title });
	return committees;
}

export async function dbDeleteCommitteeByTitle(title: string) {
	return await Committee.deleteOne({ title });
}

export async function dbUpdateCommitteeByTitle(title: string, update: Partial<CommitteeType>) {
	return await Committee.findOneAndUpdate({ title }, update, { new: true });
}
