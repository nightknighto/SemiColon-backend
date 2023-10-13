import { InterviewerObject } from './interviewNote'

export enum DepartmentEnum {
    freshman = 'Freshman',
    electrical = 'Electrical',
    mechanical = 'Mechanical',
    civil = 'Civil',
    architecture = 'Architecture',
    other = 'Other',
}

export enum AcademicYearsEnum {
    freshman = 'Freshman',
    sophomore = 'Sophomore',
    junior = 'Junior',
    senior1 = 'Senior 1',
    senior2 = 'Senior 2',
}

export interface ApplicantType {
    name: string
    department: DepartmentEnum
    specialization: string
    phone: string
    email: string
    first_preference: string
    first_preference_reason: string
    second_preference: string
    second_preference_reason: string
    academic_year: string
    previousExperience: string
    acceptanceStatus: string
    InterviewerNote: InterviewerObject
}
