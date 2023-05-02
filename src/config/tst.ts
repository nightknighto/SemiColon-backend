import Configs from "../types/configs";

const test: Configs = {
  PORT: process.env.PORT,
  DB_URL: process.env.TEST_DB_URL,
};

export default test;
