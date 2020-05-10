import React, { Fragment } from "react";
import { Heading, Grid } from "@chakra-ui/core";
import { Banner } from 'components/ui/banner';
import Exercise from 'components/exercise/exercise';

const Examples = props => {
  return (
  		<Fragment>
  		<Banner pageTitle="Examples" />
		<Grid column="1" rowGap="20" p={20}>
			<Exercise />
			<Exercise name="sample" />
		</Grid>
		</Fragment>
  );
};

export default Examples;