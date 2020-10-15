import React, { useState } from 'react';
import ClassForm from './components/ClassForm';

function Home() {
	const [nClasses, setNClasses] = useState();
	const [calendar, setCalendar] = useState([]);
	const [classes, setClasses] = useState([]);
	console.log(calendar);

	const setCal = (cal) => {
		console.log(cal);
		setCalendar(cal);
	};

	const setCla = (cla) => {
		console.log(cla);
		setClasses(cla);
	};

	return (
		<div>
			<h1>Home</h1>
			{nClasses === undefined ? (
				<input
					type="number"
					onChange={(event) => setNClasses(event.target.value)}
				></input>
			) : (
				<ClassForm
					numberClasses={nClasses}
					setCal={setCal}
					setCla={setCla}
					classes={classes}
				/>
			)}
		</div>
	);
}

export default Home;
