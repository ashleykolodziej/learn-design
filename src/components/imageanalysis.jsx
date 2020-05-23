import React from 'react';
import Upload from 'components/upload/upload';
import Prompt from './prompt';
import { Grid, Box } from "@chakra-ui/core";

function ImageAnalysis( props ) {
	return (
		<Grid templateColumns="repeat(2, 1fr)" gridGap={10}>
			<Upload />
			<Box textAlign="left">
			{ props.prompts.map( ( prompt, index ) =>
				<Prompt data={prompt} key={index.toString()} />
			) }
			</Box>
		</Grid>
	);
}

export default ImageAnalysis;