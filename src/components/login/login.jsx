import React, { Component } from 'react';
import { Button } from "@chakra-ui/core";
import wpcomXhrRequest from 'wpcom-xhr-request';
import wpcomFactory from 'wpcom';

const clientID = 68924,
		wpcomOAuth = require('wpcom-oauth-cors')(clientID);


class LoginButton extends Component {
	constructor (props) {
		super(props);
	}

	/**
	* Handles authorization.
	*/

	getAuthorization() {
		wpcomOAuth.get(function(auth){
			// Here, your token is available as auth.access_token

			// Valid? https://public-api.wordpress.com/oauth2/token-info?client_id=68924&token=ooEwSigVtdIzV%26t%2860AHzhJO%26%21pybci8%2AQXP5AY0NKF77uD%290iinGOAKPRb%29DX4v
			// https://github.com/codebykat/metonymic/blob/master/amanuensis/js/login.js

			const wpcom = wpcomFactory( auth.access_token, wpcomXhrRequest );

			console.log(wpcom);

			const siteID = auth.site_id;
			const site = wpcom.site( siteID );

			site.postsList({ number: 50, fields: "author,URL,title,slug" }, function(err, list) {
				//console.log( list );
			});

			site.post( { slug: 'test-post' } ).get( function (err, data) {
				console.log(err)
				console.log(data)
			} )

			site.addPost({ title: 'It is my new post' }, function(err, post){
				console.log(err);
				console.log(post);
			});

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