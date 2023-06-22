import { Mongoose } from "mongoose";
import { StatusEnum } from "../models/participant/participant.schema";

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
    acceptanceStatus: StatusEnum;
    emailedStatus: boolean;
}
// this type mean only one field of the above type can be used as a filter to update at a time
type UpdateParticipant = {
    [K in keyof participant]?: participant[K];
};
