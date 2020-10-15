import React, { useState } from 'react';
import ClassForm from './components/ClassForm';
import ApiCalendar from './services/googleCalendar'

function Home() {
	const [nClasses, setNClasses] = useState();
	const [calendar, setLocalCalendar] = useState([]);
	const [classes, setClasses] = useState([]);
	console.log(calendar);

	const setCal = (cal) => {
		console.log(cal);
		setLocalCalendar(cal);
	};

	const setCla = (cla) => {
		console.log(cla);
		setClasses(cla);
	};

	const handleAuthClick = () => {};

	const handleSignoutClick = () => {};

	const handleClick = (event) => {
		if(event.target.value === "signIn"){
			ApiCalendar.handleAuthClick();
		}
	}

	const eventFromNow = {
		summary: "Poc Dev From Now",
		time: 480,
	};

	const eventF = {
		"start": {
		  "dateTime": "2020-10-15T16:00:00.511Z",
		  "timeZone": "America/Toronto"
		},
		"end": {
		  "dateTime": "2020-10-15T20:00:00.511Z",
		  "timeZone": "America/Toronto"
		},
		"summary": "test"
	  }

	const setCalendar = (calendarName) => {};

	const createEventFromNow = (ok) => {};

	const createEvent = (ok, ok1) => {};

	const test = (event) => {
		// ApiCalendar.setCalendar("thks51mldef4rp7b7mt1icpvgo@group.calendar.google.com");
		// console.log(ApiCalendar.calendar)
		// ApiCalendar.createEvent(eventF, ApiCalendar.calendar)
		// 	.then((result) => {
		// 	console.log(result);
		// 		})
		// 	.catch((error) => {
		// 	console.log(error);
		// 		});
		// console.log(ApiCalendar.createCalendar("okokok"))
		//create();
	}


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
			<div>
				<button value="signIn" onClick={handleClick}> sign-in</button>
				<button onClick={test}> test</button>
			</div>
		</div>
	);
}

export default Home;
