import mongoose from 'mongoose';
import LogType from '../../types/log';

const LogSchema = new mongoose.Schema({
	adminId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	participantId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Participant',
		required: true,
	},
	action: {
		type: String,
		required: true,
		enum: ['add', 'update', 'delete', 'approve', 'reject'],
	},
});

const Log = mongoose.model<LogType>('Log', LogSchema);

export default Log;
