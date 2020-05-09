import React from 'react';
import Kernable from 'components/kernable/kernable';
import Exercise from 'components/exercise/exercise';
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { Button } from "@chakra-ui/core";

import "styles.scss";

function App() {
	return (
		<ThemeProvider>
			<CSSReset />
			<div className="App">
				<Button variantColor="green">Button</Button>
				<Exercise />
				<Exercise name="sample" />
			</div>
		</ThemeProvider>
	);
}

export default App;
