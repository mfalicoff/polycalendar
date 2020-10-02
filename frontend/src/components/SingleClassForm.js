/* eslint react/prop-types: 0 */

import React from 'react';

const SingleClassForm = ({classNumber, formFields, createChangeHandler}) => {
	return (
		<div>
			<label>{`Class ${classNumber}`}</label>
			<input
				type="text"
				value={formFields[`class${classNumber}`]}
				onChange={createChangeHandler(`class${classNumber}`)}
			></input>
		</div>
	);
};

export default SingleClassForm;
