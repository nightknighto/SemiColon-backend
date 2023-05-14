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

userRouter.get('/:phone', mwValidatePhone, getUserByPhone);
userRouter.post('/', mwValidateUserData, addNewUser);
userRouter.patch('/update/:id', mwValidateId, mwValidateUserData, updateUser);
userRouter.patch('/activate/:id', mwValidateId, activateUser);
userRouter.patch('/deactivate/:id', mwValidateId, deactivateUser);
userRouter.delete('/:id', mwValidateId, deleteUser);
export default userRouter;
