import React, { useContext, useState, useEffect } from 'react';
import { Button } from "@chakra-ui/core";
import { AuthContext } from 'contexts/auth';
import { LoadButton } from 'components/WPSubmit';

import wpcomFactory from 'wpcom';
import wpcomOAuthFactory from 'wpcom-oauth-cors';

//setContext( mediaFiles );

async function setAuths( context, setContext, setIsUploading ) {
	const clientID = context.client_id,
		wpcomOAuth = wpcomOAuthFactory( clientID );

	wpcomOAuth.get( ( auth ) => {
		setContext( Object.assign( context, {
			'auth': auth,
			'wpcom': wpcomFactory( auth.access_token )
		} ) );
	} );

	const auth = context.auth,
			wpcom = context.wpcom,
			user = wpcom.me(),
			site = wpcom.site( auth.site_id );

	await user.get().then( ( data ) => {
		setContext( Object.assign( context, {
			'user': data
		} ) );
		setIsUploading( false );
	} ).catch( ( error ) => {
		setContext( Object.assign( context, {
			'user': null
		} ) );
		setIsUploading( false );
	} );

	await site.get().then( ( data ) => {
		setContext( Object.assign( context, {
			'site': data
		} ) );
	} ).catch( ( error ) => {
		console.warn( error );
		setContext( Object.assign( context, {
			'site': null
		} ) );
	} );

	return;
}

function LoginButton( props ) {
	const [ context, setContext ] = useContext( AuthContext );
	const [ isUploading, setIsUploading ] = useState( true );

	useEffect( () => {
		setAuths( context, setContext, setIsUploading );
	}, [ context, setContext, setIsUploading ]);

	return (
		<LoadButton bg="transparent" border="1px" mr={5} isLoading={ isUploading } width="auto">
			Hi, { context.user.display_name }
		</LoadButton>
	);
}

export default LoginButton;