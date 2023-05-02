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
  acceptanceSatus: string;
  emailedStatus: boolean;
}
