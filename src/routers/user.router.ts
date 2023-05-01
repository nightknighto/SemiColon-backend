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

const userRouter = Router();

userRouter.route('/:id').delete(deleteUser);

userRouter.route('/:phone').get(getUserByPhone);

userRouter.route('/').post(addNewUser).patch(updateUser);

userRouter.route('/activate').post(activateUser);

userRouter.route('/deactivate').post(deactivateUser);

export default userRouter;
