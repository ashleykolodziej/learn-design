import wpcomFactory from 'wpcom';
import wpcomOAuthFactory from 'wpcom-oauth-cors';

const clientID = 68924,
		wpcomOAuth = wpcomOAuthFactory( clientID );

let oAuth = null;

wpcomOAuth.get( ( auth ) => {
	oAuth = auth;
} );

export const auth = oAuth;
export const wpcom = wpcomFactory( auth.access_token );
