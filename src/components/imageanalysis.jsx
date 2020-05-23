import React from 'react';
import Upload from 'components/upload/upload';

function buildPrompts( promptsData ) {
	console.log( promptsData );
}

function ImageAnalysis( props ) {
	return (
		<>
			<div>
				{ props.prompts[0].prompt }
				{ buildPrompts( props.prompts ) }
			</div>
			<Upload />
		</>
	);
}

export default ImageAnalysis;