import React, { Component, Fragment } from 'react';
import Kernable from 'components/kernable/kernable';
import data from "./data";
import './exercise.scss';

const component = data.component[0];

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

	createElement = ( component, props = component.props ) => {
		return( React.createElement(
			Supported[component.type],
			props
		) );
	}

	render() {
		return (
			<Fragment>
				<section className="exercise">
					<h3 className="exercise-title">{data.title}</h3>
					<p className="exercise-directions">{data.directions}</p>
					{this.createElement( component )}
				</section>
			</Fragment>
		);
	}
}

export default Exercise;