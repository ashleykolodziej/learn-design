import React, { Fragment } from "react";
import { Banner } from 'components/ui/ui';
import ProjectListing from 'components/listing/listing';

const Critique = props => {
	return (
		<Fragment>
			<Banner pageTitle="Critique" />
			<ProjectListing tag="bucomlearnsdesign" />
		</Fragment>
	);
};

export default Critique;