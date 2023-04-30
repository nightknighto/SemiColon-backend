import Configs from '../types/configs';

const prod: Configs = {
	PORT: process.env.PORT,
	DB_URL: process.env.PROD_DB_URL,
};

export default prod;
