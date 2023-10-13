import { Committee } from './committee.schema'
import { CommitteeType } from '../../types/committee'
import User from '../user/user.schema'

export async function dbAddNewCommittee(committee: CommitteeType) {
    const newCommittee = new Committee(committee)
    await newCommittee.save()
    return newCommittee
}

export async function dbGetAllCommittees() {
    const committees = await Committee.find()
    return committees
}

export async function dbGetCommitteeByTitle(title: string) {
    const committee = await Committee.findOne({ title }).lean()
    return committee
}

export async function dbDeleteCommitteeByTitle(title: string) {
    return await Committee.deleteOne({ title })
}

export async function dbUpdateCommitteeByTitle(
    title: string,
    update: Partial<CommitteeType>,
) {
    return await Committee.findOneAndUpdate({ title }, update, { new: true })
}

export async function getCommitteeMembersByCommitteeId(committeeId: string) {
    return await User.find({ committee: committeeId })
}
