import React, { Fragment, useState, useEffect } from 'react';
import { Skeleton, Flex, Box, Heading, Link } from "@chakra-ui/core";
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

function UserCard( { isLoading, children, ...props } ) {
	return (
		<>
			{isLoading ? <Skeleton height="280px" /> :
				<><Box borderRadius={200} overflow="hidden" display="inline-block" mr={5} borderWidth="1px" width={75}>
					<img src={props.data.avatar_URL} alt={props.data.display_name} />
				</Box>
				<Heading as="h2" size="md">Hi, {props.data.display_name}!</Heading></>
			}
		</>
	);
}

function SiteCard( { isLoading, children, ...props } ) {
	return (
		<>
			{isLoading ? <Skeleton height="280px" /> :
				<><Heading as="h3" size="md">Connected portfolios: </Heading>
			<Card mt={0} ml={5} mb={0} p={5} shadow="sm">
				<Heading as="h4" size="sm">{props.data.name}</Heading>
				<Link href={props.data.URL} isExternal color="blue.700">Visit site</Link> |
				<Link href={props.data.options.admin_url} isExternal color="blue.700"> Site settings</Link>
			</Card></>
			}
		</>
	);
}

function Profile() {
	const [ userIsLoading, setUserIsLoading ] = useState( true );
	const [ siteIsLoading, setSiteIsLoading ] = useState( true );
	const [ userInfo, setUserInfo ] = useState( null );
	const [ siteInfo, setSiteInfo ] = useState( null );

	/**
	* Handles authorization.
	*/

	useEffect(() => {
		const fetchData = () => {
			const user = wpcom.me(),
					site = wpcom.site( auth.site_id );

			user.get().then( ( data ) => {
					console.log( data );
					setUserInfo( data );
					setUserIsLoading( false );
				} ).catch( ( error ) => {
					console.warn( error );
					setUserInfo( null );
					setUserIsLoading( false );
				} );

			site.get().then( ( data ) => {
				setSiteInfo( data );
				setSiteIsLoading( false );
				console.log(data);
			} ).catch( ( error ) => {
				console.warn( error );
				setSiteInfo( null );
				setSiteIsLoading( false );
			} );
		};

		fetchData();
	}, []);

	return (
		<Fragment>
		<Banner pageTitle="Your Progress">
		</Banner>
		<Flex pt={5} pb={5} pl={100} pr={100}>
			<Flex alignItems="center">
				<UserCard isLoading={userIsLoading} data={userInfo} />
			</Flex>
			<Flex align="center" ml="auto" mr={0}>
				<SiteCard isLoading={siteIsLoading} data={siteInfo} />
			</Flex>
		</Flex>
		</Fragment>
	)
}

export default Profile;
