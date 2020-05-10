import React from 'react';
import { Box } from "@chakra-ui/core";

export const stringToSpans = ( str ) => {
	let newHTML = [];

	for ( var i = 0; i < str.length; i++ ) {
		newHTML.push(<span key={i}>{str[i]}</span>);
	}

	return newHTML;
}