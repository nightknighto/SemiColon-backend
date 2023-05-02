import Configs from "../types/configs";

const dev: Configs = {
  PORT: process.env.PORT,
  DB_URL: process.env.DEV_DB_URL,
};

export default dev;
