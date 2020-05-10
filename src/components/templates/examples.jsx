import React, { Fragment } from "react";
import { Heading, Grid } from "@chakra-ui/core";
//import Kernable from 'components/kernable/kernable';
import Exercise from 'components/exercise/exercise';

const Examples = props => {
  return (
  		<Fragment>
  		<Heading as="h1">Examples</Heading>
		<Grid column="1" rowGap="20" p={20}>
			<Exercise />
			<Exercise name="sample" />
		</Grid>
		</Fragment>
  );
};

export default Examples;