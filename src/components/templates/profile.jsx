import React, { Component, Fragment } from 'react';
import { Flex, Box, Heading, Link } from "@chakra-ui/core";
import { Banner, Card } from 'components/ui/ui';
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

		const user = wpcom.me(),
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
	}

	render() {
		if ( this.state.isLoading ) return null;

		const userInfo = this.state.userInfo;
		const siteInfo = this.state.siteInfo;

		return (
			<Fragment>
			<Banner pageTitle="Your Progress">
			</Banner>
			<Flex pt={5} pb={5} pl={100} pr={100}>
				<Flex alignItems="center">
					<Box borderRadius={200} overflow="hidden" display="inline-block" mr={5} borderWidth="1px" width={75}>
						<img src={userInfo.avatar_URL} alt={userInfo.display_name} />
					</Box>
					<Heading as="h2" size="md">Hi, {userInfo.display_name}!</Heading>
				</Flex>
				<Flex align="center" ml="auto" mr={0}>
					<Heading as="h3" size="md">Connected portfolios: </Heading>
					<Card mt={0} ml={5} mb={0} p={5} shadow="sm">
						<Heading as="h4" size="sm">{siteInfo.name}</Heading>
						<Link href={siteInfo.URL} isExternal color="blue.700">Visit site</Link> |
						<Link href={siteInfo.options.admin_url} isExternal color="blue.700"> Site settings</Link>
					</Card>
				</Flex>
			</Flex>
			</Fragment>
		)
	}
}

export default Profile;
