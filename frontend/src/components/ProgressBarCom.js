import React from 'react';
/* eslint react/prop-types: 0 */
import { ProgressBar } from 'react-bootstrap';

const ProgressBarCom = ({ percentage }) => {
	return (
		<div>
			<ProgressBar now={percentage} />
		</div>
	);
};

export default ProgressBarCom;
