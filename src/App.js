import React, { useState, useEffect } from 'react';
import Header from 'components/header';
import { ThemeProvider, ColorModeProvider, CSSReset } from "@chakra-ui/core";
import { AuthContext, authDefaults } from "contexts/auth";

import "styles.scss";

function App() {
	const [ context, setContext ] = useState( authDefaults );

	return (
		<AuthContext.Provider value={ [ context, setContext ] }>
		<ThemeProvider>
		<ColorModeProvider>
			<CSSReset />
			<Header />
			<div className="App"></div>
		</ColorModeProvider>
		</ThemeProvider>
		</AuthContext.Provider>
	);
}

export default App;
