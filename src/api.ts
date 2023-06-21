import express from 'express';
import passport from 'passport';
import globalRouter from './routers/global.router';
import './services/passport';
import cors from './middlewares/security/cors.middleware';

const api = express();

api.use(express.json());
api.use(passport.initialize());
api.use(cors);
api.use('/', globalRouter);

export default api;
