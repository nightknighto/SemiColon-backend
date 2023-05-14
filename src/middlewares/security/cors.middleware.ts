import cors, { CorsOptions } from 'cors';
import { Request } from 'express';

/* 
	CORS (Cross-Origin Resource Sharing) is a security feature implemented in web browsers that aims to
	protect the user (client) from malicious websites by preventing unauthorized cross-origin requests from
	being made by scripts running in the browser.
*/
const allowlist = [
	'http://127.0.0.1:5500',
	'https://deadreyo.github.io/SemiColon-dashboard-frontend/',
	'https://asusemicolon.tech/',
];
let corsOptionsDelegate = function (req: Request, callback: Function) {
	let corsOptions: CorsOptions = { credentials: true };
	if (allowlist.indexOf(req.header('Origin') as string) !== -1) {
		corsOptions.origin = true; // if origin exist on the allowList
	} else {
		corsOptions.origin = false; // disable CORS for this request
	}
	callback(null, corsOptions); // callback expects two parameters: error and options
};

export default cors(corsOptionsDelegate);
