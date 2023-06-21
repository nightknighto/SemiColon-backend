export const criteria = {
    Commitment: 'Commitment',
    Teamwork: 'Teamwork',
    TimeManagement: 'Time Management',
    ComminicationSkills: 'Communication Skills',
    Flexibility: 'Flexibility',
    Ethics: 'Ethics',
    Leadership: 'Leadership',
    StressManagement: 'Stress Management',
    ProblemSolving: 'Problem Solving',
    EagerToLearn: 'Eager To Learn',
} ;
export interface InterviewerNote {
    [key in criteria]: {
        rating: 1|2|3|4|5;
        note: string;
    }
}
