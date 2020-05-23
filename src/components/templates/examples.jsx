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
				<Exercise />
				<Exercise name="sample" />
			</Page>
		</Fragment>
	);
};

export default Examples;