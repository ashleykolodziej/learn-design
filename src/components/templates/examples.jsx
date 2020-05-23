import React, { Fragment } from "react";
import { Banner, Page } from 'components/ui/ui';
import Exercise from 'components/exercise/exercise';

const Examples = props => {
	return (
		<Fragment>
			<Banner pageTitle="Examples" />
			<Page>
				<Exercise name="sample-image-analysis" />
				<Exercise name="sample-upload" />
				<Exercise name="sample-multiple" />
				<Exercise name="sample" />
				<Exercise />
			</Page>
		</Fragment>
	);
};

export default Examples;