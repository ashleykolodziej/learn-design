import React from 'react';
import Header from 'components/header';
import Kernable from 'components/kernable/kernable';
import Exercise from 'components/exercise/exercise';
import { ThemeProvider, ColorModeProvider, CSSReset, Grid } from "@chakra-ui/core";

import "styles.scss";

function App() {
	return (
		<ThemeProvider>
		<ColorModeProvider>
			<CSSReset />
			<Header />
			<div className="App">
				<Grid column="1" rowGap="20" p={20}>
					<Exercise />
					<Exercise name="sample" />
				</Grid>
			</div>
		</ColorModeProvider>
		</ThemeProvider>
	);
}

export default App;
