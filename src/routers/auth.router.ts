/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - finished
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of your book
 *         author:
 *           type: string
 *           description: The book author
 *         finished:
 *           type: boolean
 *           description: Whether you have finished reading the book
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         finished: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 */

import { Router } from 'express';
import passport from 'passport';
import { failedLogin, successfulLogin } from '../controllers/auth.controller';
const authRouter = Router();

authRouter.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/auth/login/success',
		failureRedirect: '/auth/login/failure',
	})
);

authRouter.route('/login/success').get(successfulLogin).post(successfulLogin);

authRouter.route('/login/failure').get(failedLogin).post(failedLogin);

export default authRouter;
