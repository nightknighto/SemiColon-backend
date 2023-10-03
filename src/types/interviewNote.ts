import { Types } from 'mongoose'

export enum CriteriaEnum {
    COMMITMENT = 'Commitment',
    TEAMWORK = 'Teamwork',
    TIME_MANAGEMENT = 'Time Management',
    COMMUNICATION_SKILLS = 'Communication Skills',
    FLEXIBILITY = 'Flexibility',
    ETHICS = 'Ethics',
    LEADERSHIP = 'Leadership',
    STRESS_MANAGEMENT = 'Stress Management',
    PROBLEM_SOLVING = 'Problem Solving',
    EAGER_TO_LEARN = 'Eager To Learn',
}

export type InterviewNotes = Partial<
    Record<
        CriteriaEnum,
        {
            rating: 1 | 2 | 3 | 4 | 5
            note: string
        }
    >
>

export type InterviewerObject = {
    interviewNotes: InterviewNotes
    interviewerId: Types.ObjectId
    date: Date
}
