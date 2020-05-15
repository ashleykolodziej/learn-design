import React from "react";
import { Banner } from 'components/ui/ui';
import ProjectListing from 'components/listing/listing';

const Critique = props => {
  return (
  	<>
    <Banner pageTitle="Critique" />
    <ProjectListing tag="bucomlearnsdesign" />
   </>
  );
};

export default Critique;