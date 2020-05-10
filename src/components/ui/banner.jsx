import React from 'react';
import { Box, Heading } from "@chakra-ui/core";

export function Banner( props ) {
	return (
		<Box shadow="xl" p={100} m={0} textAlign="center" backgroundImage="linear-gradient(#2D3748, #2D3748, #285E61)" {...props}>
			<Heading as="h1" size="2xl" textAlign="center" color="gray.50">{props.pageTitle}</Heading>
			{props.children}
		</Box>
	);
}
