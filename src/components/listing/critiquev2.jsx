import React, { Component, Fragment } from 'react';
import { Grid, Box, Badge, Heading, Link, Button, IconButton, FormControl, Icon,
  FormLabel,
  FormErrorMessage,
  FormHelperText, Input, Checkbox, CheckboxGroup, Textarea, Tabs, TabList, TabPanels, Tab, TabPanel, Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb } from "@chakra-ui/core";
import { Banner, Card } from 'components/ui/ui';
import { RiVipDiamondLine, RiBarChartGroupedLine, RiFile2Line, RiSearchLine, RiTodoLine, RiPaletteLine, RiPaintBrushLine, RiArtboard2Line, RiMarkupLine, RiFocus2Line, RiInputMethodLine, RiCheckboxLine, RiCharacterRecognitionLine, RiMagicLine, RiLightbulbLine } from "react-icons/ri";

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
				<Box gridColumn="span 2">
				<Heading as="h3" size="md"><Box as={RiMarkupLine} float="left" size="8" mt="-4px" mr="5px" />Help improve this design</Heading>
				<FormHelperText id="email-helper-text">
					Critique helps
				</FormHelperText>
				<Tabs>
				  <TabList>
				    <Tab><Box color="tomato" as={RiPaletteLine} /> Design</Tab>
				    <Tab><Box color="tomato" as={RiLightbulbLine} /> Concept</Tab>
				    <Tab><Box color="tomato" as={RiTodoLine} /> Execution</Tab>
				  </TabList>

				  <TabPanels>
				    <TabPanel>
				    	<FormControl>
							<FormLabel htmlFor="comments">Overall design</FormLabel>
							<Slider defaultValue={50}>
							  <SliderTrack bg="red.100" />
							  <SliderFilledTrack bg="tomato" />
							  <SliderThumb size={6}>
							    <Box color="tomato" as={RiPaletteLine} />
							  </SliderThumb>
							</Slider>
							<FormHelperText id="email-helper-text">
								Hint for overall design
							</FormHelperText>
						</FormControl>

						<FormControl>
							<FormLabel htmlFor="comments">Color</FormLabel>
							<Slider defaultValue={50}>
						  <SliderTrack bg="red.100" />
						  <SliderFilledTrack bg="tomato" />
						  <SliderThumb size={6}>
						    <Box color="tomato" as={RiPaintBrushLine} />
						  </SliderThumb>
						</Slider>
							<FormHelperText id="email-helper-text">
								We'll never share your email.
							</FormHelperText>
						</FormControl>

						<FormControl>
							<FormLabel htmlFor="comments">Layout</FormLabel>
							<Slider defaultValue={50}>
						  <SliderTrack bg="red.100" />
						  <SliderFilledTrack bg="tomato" />
						  <SliderThumb size={6}>
						    <Box color="tomato" as={RiArtboard2Line} />
						  </SliderThumb>
						</Slider>
							<FormHelperText id="email-helper-text">
								We'll never share your email.
							</FormHelperText>
						</FormControl>

						<FormControl>
							<FormLabel htmlFor="comments">Typography</FormLabel>
							<Slider defaultValue={50}>
						  <SliderTrack bg="red.100" />
						  <SliderFilledTrack bg="tomato" />
						  <SliderThumb size={6}>
						    <Box color="tomato" as={RiCharacterRecognitionLine} />
						  </SliderThumb>
						</Slider>
							<FormHelperText id="email-helper-text">
								We'll never share your email.
							</FormHelperText>
						</FormControl>
				    </TabPanel>
				    <TabPanel>
				      <FormControl>
							<FormLabel htmlFor="comments">Overall concept</FormLabel>
							<Slider defaultValue={50}>
							  <SliderTrack bg="red.100" />
							  <SliderFilledTrack bg="tomato" />
							  <SliderThumb size={6}>
							    <Box color="tomato" as={RiLightbulbLine} />
							  </SliderThumb>
							</Slider>
							<FormHelperText id="email-helper-text">
								Hint for overall concept
							</FormHelperText>
						</FormControl>

						<FormControl>
							<FormLabel htmlFor="comments">Achieves project goals</FormLabel>
							<Slider defaultValue={50}>
						  <SliderTrack bg="red.100" />
						  <SliderFilledTrack bg="tomato" />
						  <SliderThumb size={6}>
						    <Box color="tomato" as={RiCheckboxLine} />
						  </SliderThumb>
						</Slider>
							<FormHelperText id="email-helper-text">
								We'll never share your email.
							</FormHelperText>
						</FormControl>

						<FormControl>
							<FormLabel htmlFor="comments">Uniqueness</FormLabel>
							<Slider defaultValue={50}>
						  <SliderTrack bg="red.100" />
						  <SliderFilledTrack bg="tomato" />
						  <SliderThumb size={6}>
						    <Box color="tomato" as={RiMagicLine} />
						  </SliderThumb>
						</Slider>
							<FormHelperText id="email-helper-text">
								We'll never share your email.
							</FormHelperText>
						</FormControl>

						<FormControl>
							<FormLabel htmlFor="comments">Appropriate for audience</FormLabel>
							<Slider defaultValue={50}>
						  <SliderTrack bg="red.100" />
						  <SliderFilledTrack bg="tomato" />
						  <SliderThumb size={6}>
						    <Box color="tomato" as={RiFocus2Line} />
						  </SliderThumb>
						</Slider>
							<FormHelperText id="email-helper-text">
								We'll never share your email.
							</FormHelperText>
						</FormControl>
				    </TabPanel>
				    <TabPanel>
				      <FormControl>
							<FormLabel htmlFor="comments">Overall execution</FormLabel>
							<Slider defaultValue={50}>
							  <SliderTrack bg="red.100" />
							  <SliderFilledTrack bg="tomato" />
							  <SliderThumb size={6}>
							    <Box color="tomato" as={RiTodoLine} />
							  </SliderThumb>
							</Slider>
							<FormHelperText id="email-helper-text">
								Hint for overall concept
							</FormHelperText>
						</FormControl>

						<FormControl>
							<FormLabel htmlFor="comments">Attention to detail</FormLabel>
							<Slider defaultValue={50}>
						  <SliderTrack bg="red.100" />
						  <SliderFilledTrack bg="tomato" />
						  <SliderThumb size={6}>
						    <Box color="tomato" as={RiSearchLine} />
						  </SliderThumb>
						</Slider>
							<FormHelperText id="email-helper-text">
								We'll never share your email.
							</FormHelperText>
						</FormControl>

						<FormControl>
							<FormLabel htmlFor="comments">Proper size/format</FormLabel>
							<Slider defaultValue={50}>
						  <SliderTrack bg="red.100" />
						  <SliderFilledTrack bg="tomato" />
						  <SliderThumb size={6}>
						    <Box color="tomato" as={RiFile2Line} />
						  </SliderThumb>
						</Slider>
							<FormHelperText id="email-helper-text">
								We'll never share your email.
							</FormHelperText>
						</FormControl>

						<FormControl>
							<FormLabel htmlFor="comments">Usage and quality of resources</FormLabel>
							<Slider defaultValue={50}>
						  <SliderTrack bg="red.100" />
						  <SliderFilledTrack bg="tomato" />
						  <SliderThumb size={6}>
						    <Box color="tomato" as={RiVipDiamondLine} />
						  </SliderThumb>
						</Slider>
							<FormHelperText id="email-helper-text">
								We'll never share your email.
							</FormHelperText>
						</FormControl>

						<FormControl>
							<FormLabel htmlFor="comments">Quality relative to peers</FormLabel>
							<Slider defaultValue={50}>
						  <SliderTrack bg="red.100" />
						  <SliderFilledTrack bg="tomato" />
						  <SliderThumb size={6}>
						    <Box color="tomato" as={RiBarChartGroupedLine} />
						  </SliderThumb>
						</Slider>
							<FormHelperText id="email-helper-text">
								We'll never share your email.
							</FormHelperText>
						</FormControl>
				    </TabPanel>
				  </TabPanels>
				</Tabs>
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
