import React, { Component } from 'react';
import { Button } from "@chakra-ui/core";

const wpcom = require( 'wpcom' ),
		wpcomOAuth = require('wpcom-oauth-cors')('68924');


class LoginButton extends React.Component {

	/**
	* Handles authorization.
	*/

	getAuthorization() {
		wpcomOAuth.get(function(auth){
			// Here, your token is available as auth.access_token
			var wpc = wpcom( auth.access_token );
			var mySite = wpc.site( 104966642 );
			mySite.postsList({ number: 50, fields: "author,URL,title,geo" }, function(err, list) {
				console.log( list );
			});
		});
	}

	render() {
		return (
			<Button bg="transparent" border="1px" mr={5} onClick={ this.getAuthorization }>
          Create account
        </Button>
		);
	}
}

export default LoginButton;