import cookieSession from 'cookie-session';
import configs from '../config/config';
export default cookieSession({
	name: 'semicolon',
	maxAge: 24 * 60 * 60 * 1000, // 24 hours
	secret: 'w@EeA1^Ic6kMAmQxd@u5zEv097xGc#59dznLod!87GaO%ISbFn', // TODO: user env variable from configs
	secure: false, // TODO: when https is available, set to true
	httpOnly: true,
});
