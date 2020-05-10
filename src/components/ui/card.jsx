import React from 'react';
import { Box } from "@chakra-ui/core";

export function Card( props ) {
	return (
		<Box shadow="xl" borderWidth="1px" p={10} m={10} {...props}>
			{props.children}
		</Box>
	);
}
