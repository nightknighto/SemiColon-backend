import express from 'express';
import passport from 'passport';
import cookieSession from './services/cookie-session';

import globalRouter from './routers/global.router';
import './services/passport';

const api = express();

api.use(express.json());
<<<<<<< HEAD

api.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

api.use("/", globalRouter);
=======
api.use(cookieSession);
api.use(passport.initialize());
api.use(passport.session());
api.use('/', globalRouter);
>>>>>>> master

export default api;
