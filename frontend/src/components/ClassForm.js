/* eslint react/prop-types: 0 */

import React, { useState } from 'react';
import SingleClassForm from './SingleClassForm';
import sendClasses from '../services/sendClasses';

function useFormFields(initialValues) {
	const [formFields, setFormFields] = useState(initialValues);

	const createChangeHandler = (key, type) => (e) => {
		const value = e.target.value;
		let test = {};
		console.log(key, type);
		if (type == 'name') {
			test = {
				name: value,
				sectionTH: formFields[key].sectionTH,
				sectionTP: formFields[key].sectionTP,
			};
		} else if (type == 'sectionTH') {
			console.log(formFields[key].name);
			test = {
				name: formFields[key].name,
				sectionTH: value,
				sectionTP: formFields[key].sectionTP,
			};
		} else if (type == 'sectionTP') {
			console.log(formFields[key].name);
			test = {
				name: formFields[key].name,
				sectionTH: formFields[key].sectionTH,
				sectionTP: value,
			};
		}
		console.log(test);
		setFormFields((prev) => ({ ...prev, [key]: test }));
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
		initialValueJson[`class${i}`] = {
			name: '',
			sectionTH: '',
			sectionTP: '',
		};
		console.log(initialValueJson);
		initialValueArray.push({ class: `class${i}` });
		console.log(initialValueArray);
	}

	const [classes, setClasses] = useState({});
	const { formFields, createChangeHandler, resetForm } = useFormFields(
		initialValueJson
	);

	const handleSubmit = (event) => {
		event.preventDefault();
		setClasses(formFields);
		sendClasses(formFields);
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
