import cors from "cors";

/* 
	CORS (Cross-Origin Resource Sharing) is a security feature implemented in web browsers that aims to
	protect the user (client) from malicious websites by preventing unauthorized cross-origin requests from
	being made by scripts running in the browser.
*/
export default cors({
  origin: process.env.NODE_ENV === "production" ? "https://nightknighto.github.io" : "http://localhost:5173",
  credentials: true, // Allow cookies to be sent with requests
});
