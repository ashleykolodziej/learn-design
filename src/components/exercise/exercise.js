import React, { Component, Fragment } from 'react';
import Kernable from 'components/kernable/kernable';
import data from "./demo";
import './exercise.scss';

let exercise = data;
let component = exercise.component[0];

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

const Supported = {
	Kernable
};

class Exercise extends Component {
	/**
	* Returns React elements for each item in a
	* definition tree.
	*
	* See https://reactjs.org/docs/jsx-in-depth.html#choosing-the-type-at-runtime
	*/

	constructor(props) {
		super(props);

		this.state = {
			isLoading: false
		};
	}

	async componentDidMount() {
		const exerciseName = this.props.name;

		if ( exerciseName ) {
			this.setState({ isLoading: true });
			const specifics = await import(`../../../data/exercises/${exerciseName}.json`).then(value => {
				exercise = value.default;
				component = exercise.component[0];
				this.setState({ isLoading: false });
			}, reason => {
			  this.setState({ isLoading: false });
			  console.error( "The requested exercise couldn't be found. Rendering the demo exercise." );
			});
		}
	}

	createElement = ( component, props = component.props ) => {
		return( React.createElement(
			Supported[component.type],
			props
		) );
	}

	render() {
		if ( this.state.isLoading ) return null;

		console.log("the render");

		return (
			<Fragment>
				<section className="exercise">
					<h3 className="exercise-title">{exercise.title}</h3>
					<p className="exercise-directions">{exercise.directions}</p>
					{this.createElement( component )}
				</section>
			</Fragment>
		);
	}
}

export default Exercise;