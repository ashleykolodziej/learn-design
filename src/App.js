import React from 'react';
import Kernable from 'components/kernable/kernable';
import Exercise from 'components/exercise/exercise';

import "styles.scss";

function App() {
	return (
		<div className="App">
			<Exercise />
			<Exercise name="sample" />
		</div>
	);
}

export default App;
