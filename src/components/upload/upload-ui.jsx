import React, { useMemo, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { formatBytes } from 'components/library';
import { Flex, Heading } from "@chakra-ui/core";

const baseStyle = {
	flex: 1,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	marginTop: '20px',
	marginBottom: '20px',
	padding: '20px',
	borderWidth: 2,
	borderRadius: 2,
	borderColor: '#eeeeee',
	borderStyle: 'dashed',
	backgroundColor: '#fafafa',
	color: '#bdbdbd',
	outline: 'none',
	transition: 'border .24s ease-in-out',
	cursor: 'pointer'
};

const activeStyle = {
	borderColor: '#2196f3'
};

const acceptStyle = {
	borderColor: '#00e676'
};

const rejectStyle = {
	borderColor: '#ff1744'
};

const thumbsContainer = {
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'wrap',
	marginTop: 16,
	textAlign: 'left'
};

const thumb = {
	display: 'block',
	borderRadius: 2,
	border: '1px solid #eaeaea',
	marginBottom: 8,
	marginRight: 8,
	padding: 4,
	boxSizing: 'border-box',
	cursor: 'pointer'
};


const thumbInner = {
	display: 'flex',
	minWidth: 0,
	overflow: 'hidden'
};

const img = {
	display: 'block',
	width: 'auto',
	height: '100%'
};

const imgName = {
	fontSize: 12,
	lineHeight: 1.2
};

function Upload( props ) {
	const [files, setFiles] = useState([]);
	const [hintText, setHintText] = useState([]);
	const {
		acceptedFiles,
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject
	} = useDropzone( {
		accept: 'image/*',
		multiple: false,
		onDrop: acceptedFiles => {
			setFiles(acceptedFiles.map(file => Object.assign(file, {
				preview: URL.createObjectURL(file)
			})));
			setHintText( "Click or drag to upload a different image" );
		}
	} );

	// From https://github.com/react-dropzone/react-dropzone/issues/805#issuecomment-481405924

	const removeFile = file => () => {
		const newFiles = [...files];
		newFiles.splice( newFiles.indexOf( file ), 1 );
		setFiles( newFiles );
		setHintText( props.hintText );
	}

	const removeAll = () => {
		setFiles([])
		setHintText( props.hintText );
	}

	const thumbs = files.map(file => (
		<div display="inline-flex">
			<div style={thumb} key={file.name} onClick={ removeFile( file ) }>
				<div style={thumbInner}>
					<img
					src={file.preview}
					style={img}
					/>
				</div>
			</div>
			<div style={imgName}><strong style={{display: 'block'}}>{ file.name }</strong> {formatBytes( file.size ) }</div>
		</div>
	));

	useEffect(() => {
		setHintText( props.hintText );
	}, []);

	useEffect(() => () => {
		// Make sure to revoke the data uris to avoid memory leaks
		files.forEach(file => URL.revokeObjectURL(file.preview));
	}, [files]);

	const style = useMemo(() => ({
		...baseStyle,
		...(isDragActive ? activeStyle : {}),
		...(isDragAccept ? acceptStyle : {}),
		...(isDragReject ? rejectStyle : {})
	}), [
		isDragActive,
		isDragReject,
		isDragAccept
	]);

	return (
		<section className="upload">
			<div {...getRootProps( {style} ) }>
				<input { ...getInputProps() } />
				<p>{hintText}</p>
				<Flex mt={5}>
					{thumbs}
				</Flex>
			</div>
		</section>
	);
}

Upload.defaultProps = {
	hintText: 'Drop files here'
}

export default Upload;