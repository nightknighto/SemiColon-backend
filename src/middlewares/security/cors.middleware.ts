import cors from 'cors'

/* 
	CORS (Cross-Origin Resource Sharing) is a security feature implemented in web browsers that aims to
	protect the user (client) from malicious websites by preventing unauthorized cross-origin requests from
	being made by scripts running in the browser.
*/
const corsOptions = {
    origin: '*',
}

export default cors(corsOptions)
