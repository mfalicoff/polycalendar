/* eslint react/prop-types: 0 */

import React, { useState } from 'react';
import SingleClassForm from './SingleClassForm';
import sendClasses from '../services/sendClasses';

function useFormFields(initialValues) {
	const [formFields, setFormFields] = useState(initialValues);

	const createChangeHandler = (key, type) => (e) => {
		const value = e.target.value;
		let test = {};
		if (type == 'name') {
			test = {
				name: value,
				sectionTH: formFields[key].sectionTH,
				sectionTP: formFields[key].sectionTP,
			};
		} else if (type == 'sectionTH') {
			test = {
				name: formFields[key].name,
				sectionTH: value,
				sectionTP: formFields[key].sectionTP,
			};
		} else if (type == 'sectionTP') {
			test = {
				name: formFields[key].name,
				sectionTH: formFields[key].sectionTH,
				sectionTP: value,
			};
		}
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
		initialValueArray.push({ class: `class${i}` });
	}

	const [classes, setClasses] = useState([]);
	const { formFields, createChangeHandler, resetForm } = useFormFields(
		initialValueJson
	);

	const handleSubmit = async (event) => {
		event.preventDefault();
		let ok = await sendClasses(formFields);
		resetForm(initialValueJson);
		setClasses(ok);
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
				{classes[0] === undefined
					? console.log('undefined')
					: classes.map((cla) => {
						return <p key={cla.id}>{cla.name}</p>;
					})}
			</div>
		</div>
	);
}
