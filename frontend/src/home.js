import React, { useState } from 'react';
import ClassForm from './components/ClassForm';
import ApiCalendar from './services/googleCalendar';
import createEventsService from './services/createEvents';

function Home() {
	const [nClasses, setNClasses] = useState();
	const [calendar, setLocalCalendar] = useState();
	const [classes, setClasses] = useState([]);

	const setCal = (cal) => {
		setLocalCalendar(cal);
	};

	const setCla = (cla) => {
		setClasses(cla);
	};

	const handleClick = (event) => {
		if (event.target.value === 'signIn') {
			ApiCalendar.handleAuthClick();
		}
	};

	const createEvents = async (event) => {
		event.preventDefault();
		await createEventsService(calendar, classes);
	};

	return (
		<div>
			<h1>PolyCalendar</h1>
			{nClasses === undefined ? (
				<div>
					Please enter Number of Classes
					<input
						type="number"
						onChange={(event) => setNClasses(event.target.value)}
					></input>
				</div>
			) : (
				<div>
					<ClassForm
						numberClasses={nClasses}
						setCal={setCal}
						setCla={setCla}
						classes={classes}
					/>
				</div>
			)}
			<div>
				{classes[0] === undefined ? (
					<div></div>
				) : (
					<div>
						<button value="signIn" onClick={handleClick}>
							{' '}
							sign-in
						</button>
						<button onClick={createEvents}>
							Send to Google Calendar
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default Home;
