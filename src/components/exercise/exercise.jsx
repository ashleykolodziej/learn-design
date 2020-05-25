import React, { useEffect, useState } from 'react';
import { Skeleton, Box, Heading, Text } from "@chakra-ui/core";
import { Card } from 'components/ui/ui';
import { createElement } from 'components/dynamicElements';
import { PostContext } from 'components/postmanager';

import data from "./demo";

const testpost = {
	title: 'Test Context',
	tags: [
		''
	]
}

const createMarkup = htmlString => ({ __html: htmlString });

function Exercise( props ) {
	const [ context, setContext ] = useState( testpost );
	const [ exercise, setExercise ] = useState( data );
	const [ isLoading, setIsLoading ] = useState( true );

	/**
	* If there is an exercise name defined, load the exercise data.
	* Return an error if the exercise can't be found and show sample data instead.
	* Finally, hold off on rendering until we know for sure what's going on.
	*/

	useEffect( () => {
		async function fetchExercise() {
			const exerciseName = props.name;

			if ( exerciseName ) {
				setIsLoading( true );

				await import(`../../data/exercises/${exerciseName}.json`).then( value => {
					setExercise( value.default )
					setIsLoading( false );
				}, reason => {
					setIsLoading( false );
					console.error( "The requested exercise couldn't be found. Rendering the demo exercise." );
				});
			}
		}

		fetchExercise();
	}, []);

	return (
		<Skeleton isLoaded={ !isLoading }>
			<PostContext.Provider value={ [ context, setContext ] }>
				<Card textAlign="right">
					<Heading as="h3" size="lg" textAlign="left">{ exercise.title }</Heading>
					<Text fontSize="lg" textAlign="left" dangerouslySetInnerHTML={ createMarkup( exercise.directions ) } />
					{ exercise.components.map( ( component, index ) =>
						<Box mb={10} key={ index.toString() }>
						{ createElement( component ) }
						</Box>
					) }
				</Card>
			</PostContext.Provider>
		</Skeleton>
	);
}

export default Exercise;