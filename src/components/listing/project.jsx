import React, { Component, Fragment } from 'react';
import { Flex, Box, Badge, Heading, Link, Button } from "@chakra-ui/core";
import { Banner, Card } from 'components/ui/ui';

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

class Project extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		//console.log(this.props.data);

		let badge, thumburl;

		if ( this.props.data.comment_count === 0 ) {
			badge = <Badge position="absolute" variantColor="green">New</Badge>
		}

		if (
			this.props.data.featured_media !== undefined &&
			this.props.data.featured_media.type === "image"
		) {
			thumburl = this.props.data.featured_media.uri;
		} else if ( this.props.data.featured_image ) {
			thumburl = this.props.data.featured_image
		} else {
			return null;
		}

		return (
			<Fragment>
				<Card m={0} p={5} shadow="sm" position="relative">
					{ badge }
					<img src={ thumburl } alt={ 'Mockup of ' + this.props.data.title } />
					<Flex align="center" mt={3}>
					<Box borderRadius={200} overflow="hidden" display="inline-block" mr={2} borderWidth="1px" width={25}>
						<img src={this.props.data.author.avatar_URL} alt={this.props.data.author.name} />
					</Box>
					<Heading as="h2" size="sm">{this.props.data.author.first_name} {this.props.data.author.last_name}</Heading>
					</Flex>
				</Card>
			</Fragment>
		)
	}
}

export default Project;
