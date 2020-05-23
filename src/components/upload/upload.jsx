import React, { useMemo, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { formatBytes } from 'components/library';
//import WPSubmit from 'components/WPSubmit';
//import { Box, Button } from "@chakra-ui/core";

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
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
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

function Upload( props ) {
	const [files, setFiles] = useState([]);
	const {
		acceptedFiles,
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject
	} = useDropzone( {
		accept: 'image/*',
		onDrop: acceptedFiles => {
			setFiles(acceptedFiles.map(file => Object.assign(file, {
				preview: URL.createObjectURL(file)
			})));
		}
	} );

	// From https://github.com/react-dropzone/react-dropzone/issues/805#issuecomment-481405924

	const removeFile = file => () => {
		const newFiles = [...files]
		newFiles.splice( newFiles.indexOf( file ), 1 )
		setFiles( newFiles )
	}

	const removeAll = () => {
		setFiles([])
	}

	const thumbs = files.map(file => (
		<div>
			<div style={thumb} key={file.name} onClick={ removeFile( file ) }>
				<div style={thumbInner}>
					<img
					src={file.preview}
					style={img}
					/>
				</div>
			</div>
			<span><strong>{ file.name }</strong> {formatBytes( file.size ) }</span>
		</div>
	));

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
				<p>Drop files here</p>
			</div>
			<aside style={thumbsContainer}>
				<h4>To be uploaded:</h4>
				{thumbs}
			</aside>
		</section>
	);
}

export default Upload;