import React from 'react';
import Upload from 'components/upload/upload-ui';
import Prompt from './prompt';
import { Grid, Box } from "@chakra-ui/core";
import WPSubmit from 'components/WPSubmit';

function Compare( props ) {
	return (
		<Grid templateColumns="repeat(2, 1fr)" gridGap={10}>
			{ props.prompts.map( ( prompt, index ) =>
				<Box textAlign="left">
					<Upload hintText={ prompt.uploadHint } />
					<Prompt data={prompt} key={index.toString()} />
				</Box>
			) }
		</Grid>
	);
}

function Examine( props ) {
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

function ImageAnalysis( props ) {
	return (
		<>
		{ props.type === 'compare' &&
			<Compare {...props} />
		}

		{ props.type === 'examine' &&
			<Examine {...props} />
		}

		<WPSubmit />
		</>
	);
}

ImageAnalysis.defaultProps = {
	type: 'examine'
}

export default ImageAnalysis;