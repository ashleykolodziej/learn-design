import React from 'react';
import { Box, Heading } from "@chakra-ui/core";
import { Supported, createElement } from 'components/dynamicElements';

function Prompt( props ) {
	const prompt = props.data;

	return (
		<Box mb={5}>
			<Heading as="h3" size="sm" mb={3}>{ prompt.prompt }</Heading>
			{ createElement( prompt.response ) }
		</Box>
	);
}

export default Prompt;