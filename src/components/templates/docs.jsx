import React, { Fragment } from "react";
import { Banner, Page } from 'components/ui/ui';
import { Heading, Text } from "@chakra-ui/core";

const Docs = props => {
	return (
		<Fragment>
			<Banner pageTitle="Docs" />
			<Page>
				<Heading as="h2" size="xl">Hello</Heading>
				<Heading as="h3" size="lg">Components</Heading>
				<Text>
					All components are built in React.
				</Text>
				<Heading as="h3" size="lg">Exercises</Heading>
				<Text>
					Exercises hold the information for how you want to use a component.
					For example, you might want to use the Kernable component. What do you want
					a student to do with that component? What problem should they be solving?
					This information is held by exercises.
				</Text>
				<Text>
					Exercises are found in the exercises folder, and are written in JSON.
				</Text>
				<Heading as="h3" size="lg">Lessons</Heading>
				<Text>
					Lessons are a collection of related exercises, intended to be completed in
					one session. A lesson generally focuses on one new skill.
				</Text>
				<Text>
					Lessons are generally date-based - they're presented in a certain order.
				</Text>
				<Heading as="h3" size="lg">Modules</Heading>
				<Text>
					Modules are a collection of related lessons, intended to be completed in
					a week or series of weeks. They usually focus on teaching a theme.
				</Text>
				<Text>
					Modules can be date-based or removed from a date structure and browsed on
					their own to allow students freedom to explore ahead in areas they're
					interested in practicing further.
				</Text>
			</Page>
		</Fragment>
	);
};

export default Docs;