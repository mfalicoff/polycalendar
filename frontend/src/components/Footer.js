import React from 'react';

const footerStyle = {
	backgroundColor: 'gainsboro',
	fontSize: '20px',
	color: 'black',
	borderTop: '1px solid #E7E7E7',
	textAlign: 'inline',
	padding: '20px',
	position: 'fixed',
	left: '0',
	bottom: '0',
	height: '60px',
	width: '100%',
};

const phantomStyle = {
	display: 'block',
	padding: '20px',
	height: '60px',
	width: '100%',
};
/* eslint react/prop-types: 0 */
export default function Footer({ children }) {
	return (
		<div>
			<div style={phantomStyle} />
			<div style={footerStyle}>{children}</div>
		</div>
	);
}
