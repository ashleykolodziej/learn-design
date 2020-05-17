import React, { useState, useEffect } from 'react';
import { Button, useToast, Spinner } from "@chakra-ui/core";
import { auth, wpcom } from 'components/authorize';

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

function LoadButton( { isLoading, children, ...props } ) {
	const [ width, setWidth ] = React.useState( 0 );
	const [ height, setHeight ] = React.useState( 0 );
	const ref = React.useRef( null );

	useEffect( () => {
		if ( ref.current && ref.current.getBoundingClientRect().width ) {
			setWidth( ref.current.getBoundingClientRect().width );
		}
		if ( ref.current && ref.current.getBoundingClientRect().height ) {
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

function WPSubmit() {
	const [ isUploading, setIsUploading ] = useState( false );
	const toast = useToast();

	function ShowLoading() {
		console.log( this.getState() );

		if ( isUploading ) {
			return <Spinner />;
		}

		return;
	}

	/**
	* Handles authorization.
	*/

	async function submit() {
		const siteID = auth.site_id;
		const site = wpcom.site( siteID );
		const post = {
			title: 'Testing project auth w/promise',
			tags: [
				'bucomlearnsdesign'
			]
		}

		setIsUploading( true );

		// Post type is jetpack-portfolio
		// But this won't let us use feeds, so we'll use normal posts.
		// https://public-api.wordpress.com/rest/v1.2/sites/lldtestsite.wordpress.com/posts?type=jetpack-portfolio

		// Free image compression API here: http://resmush.it/

      const result = await site.addPost( post ).then( ( data ) => {
			console.log("Success");
			console.log(data);

			toast({
				title: "Posted!",
				description: `We've created your account for you. Check out your new project at ${data.URL}.`,
				status: "success",
				duration: 9000,
				isClosable: true,
			});
		} ).catch( (err, post) => {
			console.log(err);
			console.log(post);

			toast({
				title: "Something went wrong",
				description: `Error: ${err}.`,
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		} );

		setIsUploading( false );
	}

	return (
		<LoadButton variantColor="green" onClick={ submit } isLoading={ isUploading }>
			Submit
		</LoadButton>
	);
}

export default WPSubmit;