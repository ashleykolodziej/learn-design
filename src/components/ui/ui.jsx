import React from 'react';

import {
	Box,
	Heading,
	CheckboxGroup,
	Checkbox,
	RadioGroup,
	Radio
} from "@chakra-ui/core";

export function Banner( props ) {
	return (
		<Box shadow="xl" p={100} m={0} textAlign="center" backgroundImage="linear-gradient(#2D3748, #2D3748, #285E61)" {...props}>
			<Heading as="h1" size="2xl" textAlign="center" color="gray.50">{props.pageTitle}</Heading>
			{props.children}
		</Box>
	);
}

export function Page( props ) {
	return (
		<Box p={100} m={0} {...props}>
			{props.children}
		</Box>
	);
}

export function Card( props ) {
	return (
		<Box shadow="xl" borderWidth="1px" p={10} m={10} {...props}>
			{props.children}
		</Box>
	);
}

export function Options( props ) {
	return (
		<>
		{ props.type === "multiple"
			?
				<CheckboxGroup {...props}>
					{ props.choices.map( ( choice, index ) =>
						<Checkbox key={index.toString()} value={index.toString()}>{ choice }</Checkbox>
					) }
				</CheckboxGroup>
			:
				<RadioGroup {...props}>
					{ props.choices.map( ( choice, index ) =>
						<Radio key={index.toString()} value={index.toString()}>{ choice }</Radio>
					) }
				</RadioGroup>
		}
      </>

	);
}

export function ProfilePhoto( props ) {
	return (
		<Box borderRadius={200} overflow="hidden" display="inline-block" mr={5} borderWidth="1px" width={75} {...props}>
			<img src={props.data.user.avatar_URL} alt={props.data.user.display_name} />
		</Box>
	);
}
