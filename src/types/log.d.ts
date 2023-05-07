import { Types } from 'mongoose';

export default interface Log {
	_id?: Types.ObjectId;
	adminPhone: string;
	adminId: string;
	participantId: string;
	action: string;
}
