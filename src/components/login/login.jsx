import React, { useContext, useState, useEffect } from 'react';
import { Flex, Button } from "@chakra-ui/core";
import { AuthContext, authDefaults, UserContext, SiteContext } from 'contexts/auth';
import { LoadButton } from 'components/WPSubmit';
import { ProfilePhoto } from 'components/ui/ui';

import wpcomFactory from 'wpcom';
import wpcomOAuthFactory from 'wpcom-oauth-cors';

async function getAuth( context, setAuth, setIsUploading ) {
	const clientID = context.client_id,
			wpcomOAuth = wpcomOAuthFactory( clientID );

	wpcomOAuth.get( ( auth ) => {
		setAuth( Object.assign( authDefaults, {
			'auth': auth,
			'wpcom': wpcomFactory( auth.access_token ),
			'is_logged_in': true
		} ) );

		localStorage.setItem( 'loggedIn', true )
	} );
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

	useEffect( () => {
		if ( localStorage.getItem( 'loggedIn' ) ) {
			getAuth( auth, setAuth, setIsUploading )
			.then( () => {
				getUser( auth, setUser, setIsUploading );
				getSite( auth, setSite, setIsUploading );
			} );
		}
	}, [ auth, setAuth, setIsUploading ]);

	return (
			localStorage.getItem( 'loggedIn' ) ?
				<Button bg="transparent" border="1px" mr={5} width="auto">
					<Flex align="center">
						<ProfilePhoto data={ user } width="25px" mr={2} />
						Hi, { user.user.first_name }!
					</Flex>
				</Button>
			:
				<Button bg="transparent" border="1px" mr={5} width="auto" onClick={
					() => {
						getAuth( auth, setAuth, setIsUploading )
						.then( () => {
							getUser( auth, setUser, setIsUploading );
							getSite( auth, setSite, setIsUploading );
						} )
					}
				}>
					<span>Log in to WordPress</span>
				</Button>
	);
}

export default LoginButton;