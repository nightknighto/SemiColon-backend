import { Mongoose } from "mongoose";

export interface participant {
    _id: Mongoose.types.ObjectId;
    name: string;
    email: string;
    phone: string;
    collegeId: string;
    year: string;
    firstPreference: string;
    firstPrefReason: string;
    firstPrefKnowledge: string;
    secondPreference: string;
    secondPrefReason: string;
    pastExperience: string;
    acceptanceStatus: string;
    InterviewerNote: string;
}

export interface InterviewerNote {
    rating: 1|2|3|4|5;
    note: string;
}
// this type mean only one field of the above type can be used as a filter to update at a time
type UpdateParticipant = {
    [K in keyof participant]?: participant[K];
};
