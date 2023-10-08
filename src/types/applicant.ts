export enum DepartmentEnum {
    freshman = 'Freshman',
    electrical = 'Electrical',
    mechanical = 'Mechanical',
    civil = 'Civil',
    architecture = 'Architecture',
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
    phone: string
    email: string
    first_preference: string
    first_preference_experience: string
    second_preference: string
    second_preference_experience: string
    academic_year: string
    acceptanceStatus: string
}
