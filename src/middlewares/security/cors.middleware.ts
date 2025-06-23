import cors from "cors";

const allowedOrigin = process.env.NODE_ENV === "production" 
	? process.env.CORS_ORIGIN ?? "https://nightknighto.github.io" 
	: "http://localhost:5173";

/* 
	CORS (Cross-Origin Resource Sharing) is a security feature implemented in web browsers that aims to
	protect the user (client) from malicious websites by preventing unauthorized cross-origin requests from
	being made by scripts running in the browser.
*/
export default cors({
	origin: allowedOrigin,
	credentials: true, // Allow cookies to be sent with requests
});
