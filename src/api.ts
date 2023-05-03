import express from "express";

import globalRouter from "./routers/global.router";

const api = express();

api.use(express.json());

api.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

api.use("/", globalRouter);

export default api;
