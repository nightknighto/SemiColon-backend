import cookieSession from 'cookie-session';
import configs from '../config/config';
export default cookieSession({
	name: 'semicolon',
	maxAge: 24 * 60 * 60 * 1000, // 24 hours
	secret: configs.SESSION_SECRET,
	secure: false, // TODO: when https is available, set to true
	httpOnly: true,
});
