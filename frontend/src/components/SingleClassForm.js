/* eslint react/prop-types: 0 */
/* eslint quotes: 0 */
import React from 'react';
import Form from 'react-bootstrap/Form';

const SingleClassForm = ({ classNumber, formFields, createChangeHandler }) => {
	return (
		<div>
			<label>{`Class ${classNumber}`}</label>
			<Form.Control
				placeholder="Siglet"
				type="text"
				value={formFields[`class${classNumber}`][`name`]}
				onChange={createChangeHandler(`class${classNumber}`, 'name')}
			/>
			<Form.Control
				placeholder="Section TH"
				type="text"
				value={formFields[`class${classNumber}`][`sectionTH`]}
				onChange={createChangeHandler(
					`class${classNumber}`,
					'sectionTH'
				)}
			/>
			<Form.Control
				placeholder="Section TP"
				type="text"
				value={formFields[`class${classNumber}`][`sectionTP`]}
				onChange={createChangeHandler(
					`class${classNumber}`,
					'sectionTP'
				)}
			/>
		</div>
	);
};

export default SingleClassForm;
