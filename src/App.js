import React, { useState, useEffect } from 'react';
import Header from 'components/header';
import { ThemeProvider, ColorModeProvider, CSSReset } from "@chakra-ui/core";
import {
	AuthContext, authDefaults,
	UserContext, userDefaults,
	SiteContext, siteDefaults
} from "contexts/auth";

import "styles.scss";

function App() {
	const [ auth, setAuth ] = useState( authDefaults );
	const [ user, setUser ] = useState( userDefaults );
	const [ site, setSite ] = useState( siteDefaults );

	return (
		<AuthContext.Provider value={ [ auth, setAuth ] }>
		<UserContext.Provider value={ [ user, setUser ] }>
		<SiteContext.Provider value={ [ site, setSite ] }>
		<ThemeProvider>
		<ColorModeProvider>
			<CSSReset />
			<Header />
			<div className="App"></div>
		</ColorModeProvider>
		</ThemeProvider>
		</SiteContext.Provider>
		</UserContext.Provider>
		</AuthContext.Provider>
	);
}

export default App;
