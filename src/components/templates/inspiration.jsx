import React, { Fragment } from "react";
import { Banner } from 'components/ui/ui';
import ProjectListing from 'components/listing/listing';

const Inspiration = props => {
	return (
		<Fragment>
			<Banner pageTitle="Inspiration" />
			<ProjectListing tag="design" />
		</Fragment>
	);
};

export default Inspiration;