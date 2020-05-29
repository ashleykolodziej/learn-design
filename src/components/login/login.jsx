import React, { useContext, useState, useEffect } from 'react';
import { Flex, Button } from "@chakra-ui/core";
import { AuthContext, authDefaults, UserContext, SiteContext } from 'contexts/auth';
import { LoadButton } from 'components/WPSubmit';
import { ProfilePhoto } from 'components/ui/ui';

import wpcomFactory from 'wpcom';
import wpcomOAuthFactory, { getCurrentUrl, setCurrentUrl, setLocalStorageValue } from 'wpcom-oauth-cors';
var url = require( 'url' );
var querystring = require( 'querystring' );

const clientID = authDefaults.client_id,
		wpcomOAuth = wpcomOAuthFactory( clientID ),
		token = wpcomOAuth.token();

async function getAuth( setAuth ) {
	// get url parsed object
	const url_parsed = url.parse( getCurrentUrl(), true );

	if ( token ) {
		setAuth( Object.assign( authDefaults, {
			'auth': token,
			'wpcom': wpcomFactory( token.access_token ),
			'is_logged_in': true
		} ) );

		return true;
	} else if ( url_parsed.hash && url_parsed.hash.length > 1 ) {
		// Originally from the wpcom-oauth-cors get function, which does not work for
		// my needs here because it always redirects if there's no token.
		// I want to delay the redirect until you actually click something.
		// Source: https://github.com/Automattic/wpcom-oauth-cors/blob/master/dist/wpcom-oauth.js#L121

		// get hash object
		const hash = querystring.parse(url_parsed.hash.substring(1));

		if ( hash && hash.access_token ) {
			// Token is present in current URI
			// store access_token
			setLocalStorageValue('wp_oauth', JSON.stringify( hash ));

			// clean hash from current URI
			setCurrentUrl( getCurrentUrl().replace( /\#.*$/, '' ) );
		}
	} else {
		return false;
	}
}

async function getUser( authContext, setUser, setIsUploading ) {
	const wpcom = authContext.wpcom,
			user = wpcom.me();

	await user.settings().get().then( ( data ) => {
		setUser( {
			'user': data,
			'is_logged_in': true,
		} );
		setIsUploading( false );
	} ).catch( ( error ) => {
		setUser( {
			'user': null,
			'is_logged_in': false,
		} );
		setIsUploading( false );
	} );
}

async function getSite( authContext, setSite, setIsUploading ) {
	const wpcom = authContext.wpcom,
			site = wpcom.site( authContext.auth.site_id );

	await site.get().then( ( data ) => {
		setSite( {
			'site': data,
			'site_is_loading': false,
		} );
	} ).catch( ( error ) => {
		console.warn( error );
		setSite( {
			'site': null,
			'site_is_loading': 'error',
		} );
	} );
}

function LoginButton( props ) {
	const [ auth, setAuth ] = useContext( AuthContext );
	const [ user, setUser ] = useContext( UserContext );
	const [ site, setSite ] = useContext( SiteContext );
	const [ isUploading, setIsUploading ] = useState( true );

	function logIn( setAuth ) {
		if ( ! token ) {
			let authObj = authDefaults;

			wpcomOAuth.get( ( auth ) => {
				authObj = auth;
				setAuth( Object.assign( authDefaults, authObj ) );
				alert("say goodbye and I choke");
			} );
		}
	}

	useEffect( () => {
		getAuth( setAuth )
		.then( ( response ) => {
			if ( response ) {
				getUser( auth, setUser, setIsUploading );
				getSite( auth, setSite, setIsUploading );
			} else {
				setUser( {
					'user': null,
					'is_logged_in': false,
				} );
				setSite( {
					'site': null,
					'site_is_loading': 'error',
				} );

				setIsUploading( false );
			}
		} );
	}, [ auth, setAuth, setIsUploading, setUser, setSite ]);

	return (
			auth.is_logged_in ?
				<LoadButton bg="transparent" border="1px" mr={5} isLoading={ isUploading } width="auto">
					<Flex align="center">
						<ProfilePhoto data={ user } width="25px" mr={2} />
						Hi, { user.user.first_name }!
					</Flex>
				</LoadButton>
			:
			<LoadButton bg="transparent" border="1px" mr={5} onClick={ logIn } width="auto">
				<span>Log in to WordPress</span>
			</LoadButton>
	);
}

export default LoginButton;