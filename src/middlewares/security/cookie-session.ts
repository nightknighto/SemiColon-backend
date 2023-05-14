import cookieSession from 'cookie-session';
import configs from '../../config/config';
export default cookieSession({
	name: 'semicolon',
	maxAge: 24 * 60 * 60 * 1000, // 24 hours
	secret: configs.SESSION_SECRET,
	secure: true, // Send the cookie over https only
	httpOnly: true, // Disable accessing the cookie from client side js
	sameSite: 'none', // Send the cookies in cross site requests
});
