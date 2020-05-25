import React from 'react';

export const stringToSpans = ( str ) => {
	let newHTML = [];

	for ( var i = 0; i < str.length; i++ ) {
		newHTML.push(<span key={i}>{str[i]}</span>);
	}

	return newHTML;
}

// From https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript

export function formatBytes( bytes, decimals = 2 ) {
	if ( bytes === 0 ) return '0 Bytes';

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = [ 'Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB' ];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
