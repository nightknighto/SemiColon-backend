import mongoose from "mongoose";

export interface CommitteeType {
	title: string;
	description: string;
	imageURL: string;
	members?: mongoose.Schema.Types.ObjectId[];
}
