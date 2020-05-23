import React, { Component, Fragment } from 'react';
import { Heading, Text } from "@chakra-ui/core";
import { Card } from 'components/ui/ui';
import { Supported, createElement } from 'components/dynamicElements';

import data from "./demo";

let exercise = data;
let components = exercise.components;

class Exercise extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false
		};
	}

	/**
	* If there is an exercise name defined, load the exercise data.
	* Return an error if the exercise can't be found and show sample data instead.
	* Finally, hold off on rendering until we know for sure what's going on.
	*/

	async componentDidMount() {
		const exerciseName = this.props.name;

		if ( exerciseName ) {
			this.setState({ isLoading: true });
			await import(`../../data/exercises/${exerciseName}.json`).then(value => {
				exercise = value.default;
				components = exercise.components;
				this.setState({ isLoading: false });
			}, reason => {
			  this.setState({ isLoading: false });
			  console.error( "The requested exercise couldn't be found. Rendering the demo exercise." );
			});
		}
	}

	render() {
		if ( this.state.isLoading ) return null;

		return (
			<Fragment>
				<Card textAlign="right">
					<Heading as="h3" size="lg" textAlign="left">{exercise.title}</Heading>
					<Text fontSize="lg" textAlign="left">{exercise.directions}</Text>
					{ components.map( ( component ) =>
						createElement( component )
					) }
				</Card>
			</Fragment>
		);
	}
}

export default Exercise;