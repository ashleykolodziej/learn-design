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

	/**
	* Creates a React element based on an explicitly supported list of components
	* for this type of component. See Supported above.
	*
	* TODO: Create an optional generative exercise button.
	*
	* TODO: Create a button that does something appropriate on submit here,
	* such as post to WordPress blog.
	*/

	createElement = ( component, props = component.props ) => {
		return( React.createElement(
			Supported[component.type],
			props
		) );
	}

	render() {
		if ( this.state.isLoading ) return null;

		return (
			<Fragment>
				<section className="exercise">
					<h3 className="exercise-title">{exercise.title}</h3>
					<p className="exercise-directions">{exercise.directions}</p>
					{ this.createElement( component ) }
				</section>
			</Fragment>
		);
	}
}

export default Exercise;