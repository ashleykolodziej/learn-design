import React, { Component } from 'react';
import { Button } from "@chakra-ui/core";
import wpcomFactory from 'wpcom';
import wpcomOAuthFactory from 'wpcom-oauth-cors';

const clientID = 68924,
		wpcomOAuth = wpcomOAuthFactory( clientID );


class LoginButton extends Component {
	constructor (props) {
		super(props);
	}

	/**
	* Handles authorization.
	*/

	getAuthorization() {
		wpcomOAuth.get(function(auth){
			const wpcom = wpcomFactory( auth.access_token );

			const siteID = auth.site_id;
			const site = wpcom.site( siteID );

			// Post type is jetpack-portfolio
			// https://public-api.wordpress.com/rest/v1.2/sites/lldtestsite.wordpress.com/posts?type=jetpack-portfolio

			// Free image compression API here: http://resmush.it/

			/*site.addPost( { title: 'Testing auth' }, function(err, post){
				//console.log(err);
				//console.log(post);
			});*/

		});
	}

	render() {
		return (
			<Button bg="transparent" border="1px" mr={5} onClick={ this.getAuthorization }>
          Test auth
        </Button>
		);
	}
}

export default LoginButton;