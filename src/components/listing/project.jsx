import React, { Fragment } from 'react';
import { Flex, Box, Badge, Heading, Button, IconButton } from "@chakra-ui/core";
import { Card } from 'components/ui/ui';
import { RiHeartLine, RiChatSmile3Line } from "react-icons/ri";

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

function Project( props ) {
	let badge, thumburl;

	if ( props.data.comment_count === 0 ) {
		badge = <Badge position="absolute" variantColor="green">New</Badge>
	}

	if (
		props.data.featured_media !== undefined &&
		props.data.featured_media.type === "image"
	) {
		thumburl = props.data.featured_media.uri;
	} else if ( props.data.featured_image ) {
		thumburl = props.data.featured_image
	} else {
		return null;
	}

	return (
		<Fragment>
			<Card m={0} p={5} shadow="sm" position="relative" isLoading={props.isLoading}>
				{ badge }
				<img src={ thumburl } alt={ 'Mockup of ' + props.data.title } />
				<Flex align="center" mt={3}>
				<Box borderRadius={200} overflow="hidden" display="inline-block" mr={2} borderWidth="1px" width={25}>
					<img src={props.data.author.avatar_URL} alt={props.data.author.name} />
				</Box>
				<Heading as="h2" size="sm">{props.data.author.first_name} {props.data.author.last_name}</Heading>
				</Flex>
				<Flex align="center" mt={3}>
				 <IconButton
					  variant="ghost"
					  variantColor="teal"
					  aria-label="Like"
					  fontSize="20px"
					  icon={RiHeartLine}
					/>
				<Button rightIcon={RiChatSmile3Line} variantColor="teal" variant="outline" ml="auto">
				    Critique
				  </Button>
				  </Flex>
			</Card>
		</Fragment>
	)
}

export default Project;
