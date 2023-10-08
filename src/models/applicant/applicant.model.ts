import { Applicant } from './applicant.schema'
import { ApplicantType } from '../../types/applicant'

export async function dbAddNewApplicant(applicant: ApplicantType) {
    const newApplicant = new Applicant(applicant)
    return await newApplicant.save()
}

export async function dbGetAllApplicants() {
    return await Applicant.find()
}

export async function dbGetApplicantById(id: string) {
    return await Applicant.findById(id)
}

export async function dbUpdateApplicantById(
    id: string,
    update: Partial<ApplicantType>,
) {
    return await Applicant.findByIdAndUpdate(id, update, { new: true })
}

