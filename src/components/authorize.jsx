import React, { Component } from 'react';
import { Box, Button } from "@chakra-ui/core";
import wpcomFactory from 'wpcom';
import wpcomOAuthFactory from 'wpcom-oauth-cors';

const clientID = 68924,
		wpcomOAuth = wpcomOAuthFactory( clientID );

alert(wpcomOAuth);

export let auth = null;

wpcomOAuth.get().then( ( data ) => {
	auth = data;
} ).catch( ( error ) => {
	console.warn( error );
} );

alert(auth);

export const wpcom = wpcomFactory( auth.access_token );
