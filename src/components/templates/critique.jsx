import React, { Fragment } from "react";
import { Banner, Page } from 'components/ui/ui';
import ProjectListing from 'components/listing/listing';
import CritiqueForm from 'components/listing/critiquev2';

const Critique = props => {
	return (
		<Fragment>
			<Banner pageTitle="Critique" />
			<Page>
				<CritiqueForm />
				<ProjectListing tag="bucomlearnsdesign" />
			</Page>
		</Fragment>
	);
};

export default Critique;