import React, { Component } from 'react';
import { Grid } from "@chakra-ui/core";
import Project from 'components/listing/project';
import wpcomFactory from 'wpcom';
import wpcomOAuthFactory from 'wpcom-oauth-cors';

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

class ProjectListing extends Component {
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
			const wpcom = wpcomFactory( auth.access_token );

			/*wpcom.req.get('/read/tags/BUcomlearnsdesign/posts?type=jetpack-portfolio' )
				.then( ( data ) => {
					this.setState( {
						posts: data
					} );
					console.log(data);
				} ).catch( ( error ) => {
					console.warn( error );
					this.setState( {
						isLoading: false,
						posts: false
					} );
				} );
				*/

			wpcom.req.get(`/read/tags/${this.props.tag}/posts?number=40` )
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
