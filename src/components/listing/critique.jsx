import React, { Component, Fragment } from 'react';
import { Grid, Box, Badge, Heading, Link, Button, IconButton, FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText, Input, Checkbox, CheckboxGroup, Textarea } from "@chakra-ui/core";
import { Banner, Card } from 'components/ui/ui';
import { RiHeartLine, RiChatSmile3Line } from "react-icons/ri";

/**
* A set of explicitly supported components for exercises.
*
* Why?
*
* Because React needs the component name to be assigned to a capitalized
* variable in order to know to render it as a component and not HTML.
*
* See https://reactjs.org/docs/jsx-in-depth.html#choosing-the-type-at-runtime
*/

class CritiqueForm extends Component {

	render() {
		return (
			<Grid templateColumns="repeat(4, 1fr)" gridGap={10}>
				<Box gridColumn="span 2" bg='gray.100'>
				</Box>
				<Box>
				<Heading as="h3" size="md">What's working well? 👏 </Heading>
				<FormHelperText id="email-helper-text">
					Select only if you're a fan.
				</FormHelperText>
				<FormControl as="fieldset">
					<FormLabel as="legend">Design</FormLabel>
					<CheckboxGroup>
						<Checkbox value="Sasuke">Color</Checkbox>
						<Checkbox value="Nagato">Typography</Checkbox>
						<Checkbox value="Itachi">Layout / Composition</Checkbox>
					</CheckboxGroup>
				</FormControl>
				<FormControl as="fieldset">
					<FormLabel as="legend">Concept</FormLabel>
					<CheckboxGroup>
						<Checkbox value="Sasuke">Surprising or unique</Checkbox>
						<Checkbox value="Nagato">Makes me think</Checkbox>
						<Checkbox value="Itachi">Perfect for project goals</Checkbox>
					</CheckboxGroup>
				</FormControl>
				<FormControl as="fieldset">
					<FormLabel as="legend">Execution</FormLabel>
					<CheckboxGroup>
						<Checkbox value="Sasuke">Awesome use of software</Checkbox>
						<Checkbox value="Sasuke">Innovative use of traditional materials</Checkbox>
						<Checkbox value="Nagato">Clean and tidy details</Checkbox>
						<Checkbox value="Itachi">Itachi</Checkbox>
					</CheckboxGroup>
				</FormControl>
				</Box>
				<Box>
				<Heading as="h3" size="md">What could be improved? 👏 </Heading>
				<FormHelperText id="email-helper-text">
					Select only if you're a fan.
				</FormHelperText>
				<FormControl as="fieldset">
					<FormLabel as="legend">Design</FormLabel>
					<CheckboxGroup>
						<Checkbox value="Sasuke">Color</Checkbox>
						<Checkbox value="Nagato">Typography</Checkbox>
						<Checkbox value="Itachi">Layout / Composition</Checkbox>
					</CheckboxGroup>
				</FormControl>
				<FormControl as="fieldset">
					<FormLabel as="legend">Concept</FormLabel>
					<CheckboxGroup>
						<Checkbox value="Sasuke">Surprising or unique</Checkbox>
						<Checkbox value="Nagato">Makes me think</Checkbox>
						<Checkbox value="Itachi">Perfect for project goals</Checkbox>
					</CheckboxGroup>
				</FormControl>
				<FormControl as="fieldset">
					<FormLabel as="legend">Execution</FormLabel>
					<CheckboxGroup>
						<Checkbox value="Sasuke">Awesome use of software</Checkbox>
						<Checkbox value="Sasuke">Innovative use of traditional materials</Checkbox>
						<Checkbox value="Nagato">Clean and tidy details</Checkbox>
						<Checkbox value="Itachi">Itachi</Checkbox>
					</CheckboxGroup>
				</FormControl>
				</Box>
				<Box gridColumn="span 4">
				<FormControl>
					<FormLabel htmlFor="comments">Comments</FormLabel>
					<Textarea placeholder="Here is a sample placeholder" />
					<FormHelperText id="email-helper-text">
						We'll never share your email.
					</FormHelperText>
				</FormControl>
				</Box>
			</Grid>
		)
	}
}

export default CritiqueForm;
