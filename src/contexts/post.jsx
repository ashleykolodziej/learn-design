import React from 'react';

export const PostContext = React.createContext({
	title: 'Test Context',
	//media: [],
	media_urls: ['https://ashleykolodziej.com/img/profile.jpg'],
	tags: [
		''
	]
});