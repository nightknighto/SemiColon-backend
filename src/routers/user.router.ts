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

userRouter.get('/:phone', getUserByPhone);
userRouter.post('/', addNewUser);
userRouter.patch('/update/:id', updateUser);
userRouter.patch('/activate/:id', activateUser);
userRouter.patch('/deactivate/:id', deactivateUser);
userRouter.delete('/:id', deleteUser)
export default userRouter;
