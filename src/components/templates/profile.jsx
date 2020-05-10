import React, { Component, Fragment } from 'react';
import { Flex, Box, Heading, Link, Button } from "@chakra-ui/core";
import { Card } from 'components/ui/card';
import wpcomFactory from 'wpcom';
import wpcomOAuthFactory from 'wpcom-oauth-cors';

import { Banner } from 'components/ui/banner';

const clientID = 68924,
		wpcomOAuth = wpcomOAuthFactory( clientID );

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

class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			userInfo: "Test name"
		};
	}



	/**
	* Handles authorization.
	*/

	async componentDidMount() {
		this.setState({ isLoading: true });

		wpcomOAuth.get( ( auth ) => {
			const wpcom = wpcomFactory( auth.access_token ),
					user = wpcom.me(),
					site = wpcom.site( auth.site_id );

			user.get().then( ( data ) => {
				this.setState( {
					userInfo: data
				} );
				console.log(data);
			} ).catch( ( error ) => {
				console.warn( error );
				this.setState( {
					isLoading: false,
					userInfo: false
				} );
			} );

			site.get().then( ( data ) => {
				this.setState( {
					isLoading: false,
					siteInfo: data
				} );
				console.log(data);
			} ).catch( ( error ) => {
				console.warn( error );
				this.setState( {
					siteInfo: false
				} );
			} );
		} );
	}

	render() {
		if ( this.state.isLoading ) return null;

		const userInfo = this.state.userInfo;
		const siteInfo = this.state.siteInfo;

		return (
			<Fragment>
			<Banner pageTitle="Your Progress" />
			<Card m={0}>
				<Flex alignItems="center" mb={10}>
					<Box borderRadius={200} overflow="hidden" display="inline-block" mr={5} borderWidth="1px">
						<img src={userInfo.avatar_URL} alt={userInfo.display_name} />
					</Box>
					<Heading as="h1">Hi, {userInfo.display_name}!</Heading>
				</Flex>
				<Heading as="h2" size="md">Your connected portfolios: </Heading>
				<Card mt={5} ml={0} p={5} shadow="sm" display="inline-block">
					<Heading as="h3" size="sm">{siteInfo.name}</Heading>
					<Link href={siteInfo.URL} isExternal color="blue.700">Visit site</Link> |
					<Link href={siteInfo.options.admin_url} isExternal color="blue.700"> Site settings</Link>
				</Card>
			</Card>
			</Fragment>
		)
	}
}

export default Profile;
