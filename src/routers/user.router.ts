import { Router } from 'express';
import {
	addNewUser,
	deleteUser,
	getUserById,
	getUserByPhone,
	updateUser,
	activateUser,
	deactivateUser,
} from '../controllers/user.controller';
import {
	mwValidateId,
	mwValidatePhone,
	mwValidateUserData,
} from '../middlewares/userDataValidator';
import giveAccessTo from '../middlewares/authentication/giveAccessTo.middleware';
import isLoggedIn from '../middlewares/authentication/login.middleware';

const userRouter = Router();

userRouter.get(
	'/:phone',
	isLoggedIn,
	giveAccessTo('admin'),
	mwValidatePhone,
	getUserByPhone
);
userRouter.post('/', giveAccessTo('admin'), mwValidateUserData, addNewUser);
userRouter.patch(
	'/update/:id',
	isLoggedIn,
	giveAccessTo('admin'),
	mwValidateId,
	mwValidateUserData,
	updateUser
);
userRouter.patch(
	'/activate/:id',
	isLoggedIn,
	giveAccessTo('admin'),
	mwValidateId,
	activateUser
);
userRouter.patch(
	'/deactivate/:id',
	isLoggedIn,
	giveAccessTo('admin'),
	mwValidateId,
	deactivateUser
);
userRouter.delete('/:id', giveAccessTo('admin'), mwValidateId, deleteUser);
export default userRouter;
