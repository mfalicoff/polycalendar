/* eslint react/prop-types: 0 */
/* eslint quotes: 0 */
import React from 'react';

const SingleClassForm = ({ classNumber, formFields, createChangeHandler }) => {
	return (
		<div>
			<label>{`Class ${classNumber}`}</label>

			<input
				type="text"
				value={formFields[`class${classNumber}`][`name`]}
				onChange={createChangeHandler(`class${classNumber}`, 'name')}
			></input>
			<input
				type="text"
				value={formFields[`class${classNumber}`][`sectionTH`]}
				onChange={createChangeHandler(
					`class${classNumber}`,
					'sectionTH'
				)}
			></input>
			<input
				type="text"
				value={formFields[`class${classNumber}`][`sectionTP`]}
				onChange={createChangeHandler(
					`class${classNumber}`,
					'sectionTP'
				)}
			></input>
		</div>
	);
};

export default SingleClassForm;
