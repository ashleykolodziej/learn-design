import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { Button, useToast, Spinner } from "@chakra-ui/core";
import { AuthContext } from 'contexts/auth';
import { PostContext } from 'contexts/post';

const auth = AuthContext.auth;
const wpcom = AuthContext.wpcom;

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

export function LoadButton( { isLoading, children, ...props } ) {
	const [ width, setWidth ] = useState( 0 );
	const [ height, setHeight ] = useState( 0 );
	const ref = useRef( null );

	useEffect( () => {
		if ( ref.current && ref.current.getBoundingClientRect().width && props.keepWidth ) {
			setWidth( ref.current.getBoundingClientRect().width );
		}
		if ( ref.current && ref.current.getBoundingClientRect().height && props.keepWidth ) {
			setHeight( ref.current.getBoundingClientRect().height );
		}
	},
		[children]
	);

	return (
		<Button ref={ref} style={
        width && height
          ? {
              width: `${width}px`,
              height: `${height}px`,
            }
          : {}
      } {...props}>
			{isLoading ? <Spinner /> : children}
		</Button>
	);
}

/**
* Handles authorization.
*/

async function sendData( props, context, setContext ) {
	const siteID = auth.site_id;
	const site = wpcom.site( siteID );

	// Add media files first, then attach them, and send with content.
	// Any content. There needs to be something or they won't show in the post.
	return await site.addMediaFiles( context.dropzone )
	.then( response => {
		const mediaID = response.media[0].ID;
		const mediaURLs = response.media.map( image => image.URL );
		const content = 'The test content has images, maybe.';

		const mediaUploaded = Object.assign( context, {
			featured_image: mediaID,
			media_urls: mediaURLs,
			content: content
		} );

		setContext( mediaUploaded );

		return site.addPost( context );
	} );
}

function WPSubmit( props ) {
	const [ isUploading, setIsUploading ] = useState( null );
	const [ context, setContext ] = useContext( PostContext );
	const toast = useToast();

	const submit = useCallback( async () => {
		// don't send again while we are sending
		if ( isUploading ) return;

		// update state
		setIsUploading( true );

		// send the actual request
		const post = await sendData( props, context, setContext );

		if ( post.URL ) {
			toast({
				title: "Posted!",
				description: `Check out your new project at ${post.URL}.`,
				status: "success",
				duration: 9000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Something went wrong. Try again later.",
				description: `Error: ${post}.`,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}

		// once the request is sent, update state again
		setIsUploading( false );
	}, [ context, setContext, toast, isUploading, props ] );

	return (
		<LoadButton variantColor="green" onClick={ submit } isLoading={ isUploading } keepWidth>
			{ props.text || "Submit" }
		</LoadButton>
	);
}

// Next: I need to figure out how to pass state from parent down here.

WPSubmit.defaultProps = {
	postData: {
		title: 'Move it to a prop',
		tags: [
			'bucomlearnsdesign'
		]
	}
}

export default WPSubmit;