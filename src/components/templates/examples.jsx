import React, { Fragment } from "react";
import { Banner, Page } from 'components/ui/ui';
import Exercise from 'components/exercise/exercise';

const Examples = props => {
  return (
  		<Fragment>
  		<Banner pageTitle="Examples" />
		<Page>
			<Exercise />
			<Exercise name="sample" />
		</Page>
		</Fragment>
  );
};

export default Examples;