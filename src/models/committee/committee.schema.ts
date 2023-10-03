import mongoose from "mongoose";
import { CommitteeType } from "../../types/committee";

const committeeSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
		required: true,
	},
	imageURL: {
		type: String,
		required: true,
	},
});

export const Committee = mongoose.model("Committee", committeeSchema);
