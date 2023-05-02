import { userSchema } from '../models/user/user.schema';
import { Mongoose } from 'mongoose';

export default interface UserType {
	_id?: Mongoose.Types.ObjectId;
	username: string;
	password?: string;
	phone: string;
	role: string;
	active?: boolean;
}
