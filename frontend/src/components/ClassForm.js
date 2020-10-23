/* eslint react/prop-types: 0 */

import React, { useState } from 'react';
import SingleClassForm from './SingleClassForm';
import sendClasses from '../services/sendClasses';
import getCalendar from '../services/getCalendar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Table } from 'react-bootstrap';
import './classForm.css';
//import Footer from './Footer';

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

export default function ClassForm({ numberClasses, setCal, setCla, classes }) {
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

	const { formFields, createChangeHandler, resetForm } = useFormFields(
		initialValueJson
	);

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			let returnedClasses = await sendClasses(formFields);
			resetForm(initialValueJson);
			setCla(returnedClasses);

			let calendar = await getCalendar();
			setCal(calendar);
		} catch (error) {
			console.log(error.response.data.error);
		}
	};

	return (
		<div>
			{
				<Form onSubmit={handleSubmit}>
					<ol>
						<li>
							Enter class information, meaning Sigle and
							Sections, click get Classes
						</li>
						<li>Login with your google Account</li>
						<li>Send the clendar to your Google Calendar</li>
					</ol>

					{initialValueArray.map((value, index) => (
						<Form.Row key={index}>
							<SingleClassForm
								key={index}
								classNumber={index + 1}
								formFields={formFields}
								createChangeHandler={createChangeHandler}
							/>
						</Form.Row>
					))}

					<Button
						type="submit"
						varaint="primary"
						className="getClassesButton"
					>
						Get Classes
					</Button>
				</Form>
			}

			<div>
				{classes[0] === undefined ? (
					<div></div>
				) : (
					<div>
						<Table striped className="tableClasses">
							<tbody>
								{classes.map((cla) => (
									<tr key={cla.id}>
										<td>{cla.name}</td>
									</tr>
								))}
							</tbody>
						</Table>
					</div>
				)}
			</div>
		</div>
	);
}
