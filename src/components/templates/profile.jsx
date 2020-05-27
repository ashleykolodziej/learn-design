import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Skeleton, Flex, Box, Heading, Link } from "@chakra-ui/core";
import { Banner, Card } from 'components/ui/ui';
import { UserContext } from 'contexts/auth';
import { SiteContext } from 'contexts/auth';

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

function Profile() {
	const [ userContext ] = useContext( UserContext );
	const [ siteContext ] = useContext( SiteContext );

	return (
		<Fragment>
		<Banner pageTitle="Your Progress">
		</Banner>
		<Flex pt={5} pb={5} pl={100} pr={100}>
			<Skeleton isLoaded={ ! userContext.user_is_loading }>
				<Flex alignItems="center">
					<Box borderRadius={200} overflow="hidden" display="inline-block" mr={5} borderWidth="1px" width={75}>
						<img src={userContext.user.avatar_URL} alt={userContext.user.display_name} />
					</Box>
					<Heading as="h2" size="md">Hi, {userContext.user.display_name}!</Heading>
				</Flex>
			</Skeleton>
			<Skeleton isLoaded={ ! siteContext.site_is_loading } ml="auto" mr={0}>
				<Flex align="center">
					<Heading as="h3" size="md">Connected portfolios: </Heading>
					<Card mt={0} ml={5} mb={0} p={5} shadow="sm">
						<Heading as="h4" size="sm">{siteContext.site.name}</Heading>
						<Link href={siteContext.site.URL} isExternal color="blue.700">Visit site</Link> |
						<Link href={siteContext.site.options.admin_url} isExternal color="blue.700"> Site settings</Link>
					</Card>
				</Flex>
			</Skeleton>
		</Flex>
		</Fragment>
	)
}

export default Profile;
