import React, { Component } from 'react';
import { Grid } from "@chakra-ui/core";
import Project from 'components/listing/project';
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

class ProjectListing extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			userInfo: "Test name"
		};
	}



	/**
	* Get the posts by tag.
	*/

	async componentDidMount() {
		this.setState({ isLoading: true });

		wpcom.req.get( `/read/tags/${this.props.tag}/posts?number=40` )
			.then( ( data ) => {
				this.setState( {
					isLoading: false,
					data: data
				} );
			} ).catch( ( error ) => {
				console.warn( error );
				this.setState( {
					isLoading: false,
					data: false
				} );
			} );
	}

	render() {
		if ( this.state.isLoading ) return null;

		const thedata = this.state.data.posts;

		console.log(thedata);

		return (
			<Grid templateColumns="repeat(5, 1fr)" gap={6} p={100}>
				{thedata.map((post, index) =>
					<Project data={post} key={index.toString()} />
				)}
			</Grid>
		)
	}
}

export default ProjectListing;
