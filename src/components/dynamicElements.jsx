import React from 'react';

import Kernable from 'components/kernable/kernable';
import Upload from 'components/upload/upload';
import ImageAnalysis from 'components/imageanalysis';
import { Options } from 'components/ui/ui';

import { Textarea } from "@chakra-ui/core";

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

export const Supported = {
	Kernable,
	Upload,
	ImageAnalysis,
	Textarea,
	Options
};

export const createElement = ( component, props = component.props ) => {
	return ( React.createElement(
		Supported[component.type],
		props
	) );
}
