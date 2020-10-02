/* eslint react/prop-types: 0 */

import React, { useState } from 'react';
import SingleClassForm from './SingleClassForm';

function useFormFields(initialValues) {
	const [formFields, setFormFields] = useState(initialValues);

	const createChangeHandler = (key) => (e) => {
		const value = e.target.value;
		setFormFields((prev) => ({ ...prev, [key]: value }));
	};

	const resetForm = (initalJson) => {
		setFormFields(initalJson);
	};
	return { formFields, createChangeHandler, resetForm };
}

export default function ClassForm({ numberClasses }) {
	let initialValueJson = {};
	let initialValueArray = [];

	for (let i = 1; i <= numberClasses; i++) {
		initialValueJson[`class${i}`] = '';
		initialValueArray.push({ class: `class${i}` });
	}

	const [classes, setClasses] = useState({});
	const { formFields, createChangeHandler, resetForm } = useFormFields(
		initialValueJson
	);

	const handleSubmit = (event) => {
		event.preventDefault();
		setClasses(formFields);
		resetForm(initialValueJson);
	};

	return (
		<div>
			{
				<form onSubmit={handleSubmit}>
					{initialValueArray.map((value, index) => (
						<SingleClassForm
							key={index}
							classNumber={index + 1}
							formFields={formFields}
							createChangeHandler={createChangeHandler}
						/>
					))}
					<button type="submit">submit</button>
				</form>
			}

			<div>
				{classes.class1 === undefined
					? console.log('classes')
					: console.log(classes)}
			</div>
		</div>
	);
}
