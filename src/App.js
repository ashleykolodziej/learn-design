import React, { useState } from 'react';
import Header from 'components/header';
import { ThemeProvider, ColorModeProvider, CSSReset } from "@chakra-ui/core";
import { PostContext } from 'components/postmanager';

import "styles.scss";

const testpost = {
	title: 'Test Context',
	tags: [
		''
	]
}

function App() {
	const [ context, setContext ] = useState( testpost );

	return (
		<ThemeProvider>
		<ColorModeProvider>
		<PostContext.Provider value={[context, setContext]}>
			<CSSReset />
			<Header />
			<div className="App"></div>
		</PostContext.Provider>
		</ColorModeProvider>
		</ThemeProvider>
	);
}

export default App;
