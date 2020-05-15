import React from "react";
import { Banner } from 'components/ui/ui';
import ProjectListing from 'components/listing/listing';

const Inspiration = props => {
  return (
  	<>
    <Banner pageTitle="Inspiration" />
    <ProjectListing tag="design" />
   </>
  );
};

export default Inspiration;