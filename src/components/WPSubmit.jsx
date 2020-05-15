import React, { Component } from 'react';
import { Box, Button } from "@chakra-ui/core";
import { auth, wpcom } from 'components/authorize';

/**
* A set of explicitly supported components for exercises.
*
* Why?
*
* Because React needs the component name to be assigned to a capitalized
* variable in order to know to render it as a component and not HTML.
*
* See https://reactjs.org/docs/jsx-in-depth.html#choosing-the-type-at-runtime
*/

class WPSubmit extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false
		};
	}

	componentDidMount() {
		console.log(auth);
		console.log(wpcom);
	}

	/**
	* Handles authorization.


	submit = () => {
		const siteID = auth.site_id;
		const site = wpcom.site( siteID );

		// Post type is jetpack-portfolio
		// But this won't let us use feeds, so we'll use normal posts.
		// https://public-api.wordpress.com/rest/v1.2/sites/lldtestsite.wordpress.com/posts?type=jetpack-portfolio

		// Free image compression API here: http://resmush.it/

		site.addPost( {
			title: 'Testing project auth separated',
			tags: [
				'bucomlearnsdesign'
			]
		}, function(err, post){
			console.log(err);
			console.log(post);
		});
	}

	*/

	render() {
		//if ( this.state.isLoading ) return null;

		return (
			<Button variantColor="green" >
				Submit
			</Button>
		);
	}
}

export default WPSubmit;