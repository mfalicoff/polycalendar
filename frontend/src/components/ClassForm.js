import React, { useState } from 'react';
import SingleClassForm from './SingleClassForm';

const initialValue = {
	class1: '',
	class2: '',
	class3: '',
	class4: '',
	class5: '',
};

function useFormFields(initialValues) {
	const [formFields, setFormFields] = useState(initialValues);

	const createChangeHandler = (key) => (e) => {
		const value = e.target.value;
		setFormFields((prev) => ({ ...prev, [key]: value }));
	};

	const resetForm = () => {
		setFormFields(initialValue);
	};
	return { formFields, createChangeHandler, resetForm };
}

export default function ClassForm() {
	const [classes, setClasses] = useState({});
	const { formFields, createChangeHandler, resetForm } = useFormFields(
		initialValue
	);

	const handleSubmit = (event) => {
		event.preventDefault();
		setClasses(formFields);
		resetForm(initialValue);
	};

	return (
		<form onSubmit={handleSubmit}>
			<SingleClassForm
				classNumber="1"
				formFields={formFields}
				createChangeHandler={createChangeHandler}
			/>
			<SingleClassForm
				classNumber="2"
				formFields={formFields}
				createChangeHandler={createChangeHandler}
			/>

			<SingleClassForm
				classNumber="3"
				formFields={formFields}
				createChangeHandler={createChangeHandler}
			/>

			<SingleClassForm
				classNumber="4"
				formFields={formFields}
				createChangeHandler={createChangeHandler}
			/>

			<SingleClassForm
				classNumber="5"
				formFields={formFields}
				createChangeHandler={createChangeHandler}
			/>
			<button type="submit">submit</button>
		</form>
	);
}
