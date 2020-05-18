import React, { Fragment, useState } from 'react';
import { Grid, Skeleton } from "@chakra-ui/core";
import Project from 'components/listing/project';
import { wpcom } from 'components/authorize';

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

function ProjectListing( props ) {
	const [ isLoading, setIsLoading ] = useState( true );
	const [ data, setData ] = useState( null );

	/**
	* Get the posts by tag.
	*/
	wpcom.req.get( `/read/tags/${props.tag}/posts?number=40` )
		.then( ( data ) => {
			setData( data );
			setIsLoading( false );
		} ).catch( ( error ) => {
			console.warn( error );
			setData( null );
			setIsLoading( false );
		} );

	return (
		<Grid templateColumns="repeat(5, 1fr)" gap={6} p={100}>
			{isLoading ?
				<Fragment>
					<Skeleton height="300px" />
					<Skeleton height="300px" />
					<Skeleton height="300px" />
					<Skeleton height="300px" />
					<Skeleton height="300px" />
				</Fragment>
				:
				data.posts.map((post, index) =>
					<Project data={post} key={index.toString()} loading={isLoading} />
				)
			}
		</Grid>
	)
}

export default ProjectListing;
