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
	SliderThumb,
	Tag,
	TagLabel } from "@chakra-ui/core";
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
import { PostContext } from 'contexts/post';

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
				info: "How does this work attempt to use the elements of design to communicate? Do the design decisions add to the communication? Are there any distracting elements that could be modified or removed and still create an effective communication?"
			},
			{
				name: "Color",
				icon: RiPaintBrushLine,
				info: "What colors are being used in this design? Do they remind you of anything? How do they contribute to the overall message of the work?"
			},
			{
				name: "Layout",
				icon: RiArtboard2Line,
				info: "How does this work make use of the space on the page? Is it intentional? Does it draw your eye around the page effectively?"
			},
			{
				name: "Readability",
				icon: RiCharacterRecognitionLine,
				info: "Examine kerning, leading, and hierarchy. Is it pleasant to read?"
			},
			{
				name: "Creative Typography",
				icon: RiCharacterRecognitionLine,
				info: "Examine artistic decisions: typeface choice, placement, and modification of type. Do the characteristics of the type align with the intended message? How does placement and modification of type add to this work, if it is present?"
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
				info: "What is this work trying to communicate? Is it communicating the message effectively?"
			},
			{
				name: "Achieves goals",
				icon: RiCheckboxLine,
				info: "What is the goal of this work? Has it been achieved? Are there more effective ways to achieve this goal from a visual or conceptual standpoint?"
			},
			{
				name: "Uniqueness",
				icon: RiMagicLine,
				info: "Have you seen this idea before? Is it new and innovative? Is it what you would expect, or did it make you think and surprise you?"
			},
			{
				name: "Appropriate for audience",
				icon: RiFocus2Line,
				info: "Who is this work meant for? Does it address their needs and concerns, or appeal to them?"
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
				info: "Are all included elements contributing towards the intended message? Is anything present detracting or distracting from this message? Is anything missing?"
			},
			{
				name: "Attention to detail",
				icon: RiSearchLine,
				info: "Are all elements neat and tidy? Examine spacing, leading, kerning, connecting lines, and smoothness of curves. Does it feel harmonious? Is it readable, or tight?"
			},
			{
				name: "Format",
				icon: RiFile2Line,
				info: "Is this work sized and formatted properly? Does this work maximize the potential of the format it works in? Does the chosen format make sense for the message?"
			},
			{
				name: "Usage and quality of resources",
				icon: RiVipDiamondLine,
				info: "Are all included elements contributing towards the intended message? Is anything detracting or distracting from this message?"
			},
			{
				name: "Quality relative to similar works",
				icon: RiBarChartGroupedLine,
				info: "Consider other works you've seen in this category. How does this work compare? Does it stand out? Is there room to grow?"
			}
		]
	},
];

const key = [
	{
		name: "Seed",
		description: "In the seed stage, an idea or tactic is present, but it is too early to tell if it is viable. Nurture it, but don't be afraid to rapidly explore other seeds at this stage."
	},
	{
		name: "Seedling 🌱",
		description: "Something is developing, but it's not clear exactly what it is yet."
	},
	{
		name: "Blooming 🌿",
		description: "Your little seedling is taking off. You can identify what it is, but it isn't fruitful yet. You're almost there!"
	},
	{
		name: "Fruitful 🍅",
		description: "Success! You're reaping the benefits of your hard work. But is it the best it could be?"
	},
	{
		name: "Harvest ☀️",
		description: "Your friends are totally jealous of your tomatoes."
	}
];

const testpost = {
	title: 'Test Context',
	tags: [
		''
	]
}

function Tabby( props ) {
	const point = props.point;

	const [ value, setValue ] = useState( props.defaultValue );

	function updateText( data ) {
		setValue( data );
	}

	return (
		<FormControl mb={5}>
			<FormLabel htmlFor="comments">{point.name}</FormLabel>
			<Tag variantColor="cyan" rounded="full" size={"sm"} float="right">
				<TagLabel>{key[value].name}</TagLabel>
			</Tag>
			<Slider defaultValue={props.defaultValue} min={0} max={4} onChange={updateText}>
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
							<Tabby point={point} key={i} defaultValue={1} />
						))}
					</TabPanel>
				))}
			</TabPanels>
		</Tabs>
	);
}

function CritiqueForm() {
	const [ context, setContext ] = useState( testpost );

	return (
		<PostContext.Provider value={ [ context, setContext ] }>
		<Grid templateColumns="repeat(4, 1fr)" gridGap={10}>
			<Box gridColumn="span 2" bg='gray.100'>
			</Box>
			<Box gridColumn="span 2">
				<Heading as="h3" size="md"><Box as={RiMarkupLine} float="left" size="8" mt="-4px" mr="5px" />What stage is this design at right now?</Heading>
				<FormHelperText id="email-helper-text" mb={10}>
					Critique helps us improve our work collectively, and assessing where we are helps us grow further together.
				</FormHelperText>
				<DataTabs data={rubric} />
				<FormControl mt={10} mb={10}>
					<FormLabel htmlFor="comments" mb="5px">How can this design grow further?</FormLabel>
					<Textarea placeholder="Here is a sample placeholder" />
					<FormHelperText id="email-helper-text">
						Hints
					</FormHelperText>
				</FormControl>
				<WPSubmit text="Submit Feedback" />
			</Box>
		</Grid>
		</PostContext.Provider>
	);
}

export default CritiqueForm;
