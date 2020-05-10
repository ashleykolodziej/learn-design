import React from 'react';
import Header from 'components/header';
import { ThemeProvider, ColorModeProvider, CSSReset } from "@chakra-ui/core";

import "styles.scss";

function App() {
	return (
		<ThemeProvider>
		<ColorModeProvider>
			<CSSReset />
			<Header />
			<div className="App"></div>
		</ColorModeProvider>
		</ThemeProvider>
	);
}

export default App;
