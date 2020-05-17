import React, { useState } from 'react';
import {
	Grid,
	Box,
	Heading,
	FormControl,
	FormLabel,
	FormHelperText,
	Textarea,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb } from "@chakra-ui/core";
import {
	RiVipDiamondLine,
	RiBarChartGroupedLine,
	RiFile2Line,
	RiSearchLine,
	RiTodoLine,
	RiPaletteLine,
	RiPaintBrushLine,
	RiArtboard2Line,
	RiMarkupLine,
	RiFocus2Line,
	RiCheckboxLine,
	RiCharacterRecognitionLine,
	RiMagicLine,
	RiLightbulbLine } from "react-icons/ri";
import WPSubmit from 'components/WPSubmit';

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

const rubric = [
	{
		group: "Design",
		icon: RiPaletteLine,
		items: [
			{
				name: "Overall design",
				icon: RiPaletteLine,
				info: "Hint for overall design"
			},
			{
				name: "Color",
				icon: RiPaintBrushLine,
				info: "Hint for color"
			},
			{
				name: "Layout",
				icon: RiArtboard2Line,
				info: "Hint for layout"
			},
			{
				name: "Typography",
				icon: RiCharacterRecognitionLine,
				info: "Hint for typography"
			}
		]
	},
	{
		group: "Concept",
		icon: RiLightbulbLine,
		items: [
			{
				name: "Overall concept",
				icon: RiLightbulbLine,
				info: "Hint"
			},
			{
				name: "Achieves project goals",
				icon: RiCheckboxLine,
				info: "Hint"
			},
			{
				name: "Uniqueness",
				icon: RiMagicLine,
				info: "Hint"
			},
			{
				name: "Appropriate for audience",
				icon: RiFocus2Line,
				info: "Hint"
			}
		]
	},
	{
		group: "Execution",
		icon: RiTodoLine,
		items: [
			{
				name: "Overall execution",
				icon: RiTodoLine,
				info: "Hint"
			},
			{
				name: "Attention to detail",
				icon: RiSearchLine,
				info: "Hint"
			},
			{
				name: "Proper size/format",
				icon: RiFile2Line,
				info: "Hint"
			},
			{
				name: "Usage and quality of resources",
				icon: RiVipDiamondLine,
				info: "Hint"
			},
			{
				name: "Quality relative to peers",
				icon: RiBarChartGroupedLine,
				info: "Hint"
			}
		]
	},
];

const key = [
	{
		name: "Needs rework"
	},
	{
		name: "Below average"
	},
	{
		name: "Average"
	},
	{
		name: "Above average"
	},
	{
		name: "On fire!"
	}
];

function CritiqueForm() {
	function Tabby( props ) {
		const point = props.point,
				i = props.key;

		const [value, setValue] = useState( props.defaultValue );

		function updateText( data ) {
			setValue( data );
		}

		return (
			<FormControl key={i}>
				<FormLabel htmlFor="comments">{point.name}: {key[value - 1].name}</FormLabel>
				<Slider defaultValue={props.defaultValue} min={1} max={5} onChange={updateText}>
				  <SliderTrack bg="red.100" />
				  <SliderFilledTrack bg="tomato" />
				  <SliderThumb size={6}>
				    <Box color="tomato" as={point.icon} />
				  </SliderThumb>
				</Slider>
				<FormHelperText id="email-helper-text">
					{point.info}
				</FormHelperText>
			</FormControl>
		);
	}

	function DataTabs({ data }) {
		return (
			<Tabs variant="enclosed" isFitted mt="5">
				<TabList>
					{data.map((tab, index) => (
					<Tab key={index}><Box color="tomato" as={tab.icon} mr="5px" /> {tab.group}</Tab>
					))}
				</TabList>
				<TabPanels p="5" border="1px" borderColor="gray.200">
					{data.map((tab, index) => (
						<TabPanel key={index}>
							{tab.items.map((point, i) => (
								<Tabby point={point} key={i} defaultValue={3} />
							))}
						</TabPanel>
					))}
				</TabPanels>
			</Tabs>
		);
	}

	return (
		<Grid templateColumns="repeat(4, 1fr)" gridGap={10}>
			<Box gridColumn="span 2" bg='gray.100'>
			</Box>
			<Box gridColumn="span 2">
				<Heading as="h3" size="md"><Box as={RiMarkupLine} float="left" size="8" mt="-4px" mr="5px" />Assess this design</Heading>
				<FormHelperText id="email-helper-text" mb={10}>
					Critique helps us improve our work collectively.
				</FormHelperText>
				<DataTabs data={rubric} />
				<FormControl mt={10} mb={10}>
					<FormLabel htmlFor="comments" mb="5px">How could this design be improved?</FormLabel>
					<Textarea placeholder="Here is a sample placeholder" />
					<FormHelperText id="email-helper-text">
						Hints
					</FormHelperText>
				</FormControl>
				<WPSubmit text="Submit Critique" />
			</Box>
		</Grid>
	);
}

export default CritiqueForm;
