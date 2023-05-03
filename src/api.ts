import express from "express";

import globalRouter from "./routers/global.router";

const api = express();

api.use(express.json());
api.use("/", globalRouter);

export default api;
