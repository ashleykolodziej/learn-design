import React, { PureComponent, Fragment } from 'react';
import { Box, Heading, Text } from "@chakra-ui/core";
import { Card } from 'components/ui/ui';
import { createElement } from 'components/dynamicElements';

import data from "./demo";

let exercise = data;
let components = exercise.components;

class Exercise extends PureComponent {
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

	createMarkup = htmlString => ({ __html: htmlString });

	render() {
		if ( this.state.isLoading ) return null;

		return (
			<Fragment>
				<Card textAlign="right">
					<Heading as="h3" size="lg" textAlign="left">{exercise.title}</Heading>
					<Text fontSize="lg" textAlign="left" dangerouslySetInnerHTML={this.createMarkup(exercise.directions)} />
					{ components.map( ( component, index ) =>
						<Box mb={10} key={index.toString()}>
						{ createElement( component ) }
						</Box>
					) }
				</Card>
			</Fragment>
		);
	}
}

export default Exercise;