import React, { useState } from 'react';
import ClassForm from './components/ClassForm';
import ApiCalendar from './services/googleCalendar';
import createEventsService from './services/createEvents';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { Button, Form } from 'react-bootstrap';
//import SendEvents from './services/sendEvents'
import ProgressBarCom from './components/ProgressBarCom';
import { backOff } from 'exponential-backoff';

function Home() {
	const [nClasses, setNClasses] = useState();
	const [calendar, setLocalCalendar] = useState();
	const [classes, setClasses] = useState([]);
	const [loggedIn, setLoggedIn] = useState(ApiCalendar.sign);
	const [events, setEvents] = useState([]);
	const [percentage, setPercent] = useState(0);

	const setCal = (cal) => {
		setLocalCalendar(cal);
	};

	const setCla = (cla) => {
		setClasses(cla);
		setLoggedIn(ApiCalendar.sign);
	};

	const handleClick = (event) => {
		if (event.target.value === 'signIn') {
			ApiCalendar.handleAuthClick();
			setLoggedIn(true);
		}
		if (event.target.value === 'signOut') {
			ApiCalendar.handleSignoutClick();
			setLoggedIn(false);
		}
	};

	const createEvents = async (event) => {
		event.preventDefault();
		let eventsCompiled = createEventsService(calendar, classes);
		setEvents(eventsCompiled);

		await sendEvents(eventsCompiled);
	};

	const sendEvents = async (eventsCompiled) => {
		await ApiCalendar.setCalendar(
			await ApiCalendar.createCalendar('Automne 2020 PolyCalendar')
		);
		for (let index = 0; index < eventsCompiled.length; index++) {
			const element = eventsCompiled[index];
			try {
				//eslint-disable-next-line
				const response = await backOff(async () => {
					await ApiCalendar.sendEvent(element);
				});
				let percentage = ((index + 1) * 100) / eventsCompiled.length;
				if (percentage > 100) {
					percentage = 100;
				}
				setPercent(percentage);
			} catch (error) {
				console.log(error.message);
			}
		}
	};

	return (
		<div className="container">
			<h1>PolyCalendar</h1>
			{nClasses === undefined ? (
				<div className="col-sm-4">
					<label>Please enter Number of Classes</label>
					<Form.Control
						placeholder="Number of classes"
						type="number"
						onChange={(event) => setNClasses(event.target.value)}
					/>
					
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
						{loggedIn === false ? (
							<Button
								variant="primary"
								value="signIn"
								onClick={handleClick}
							>
								Sign In
							</Button>
						) : (
							<Button
								value="signOut"
								variant="primary"
								onClick={handleClick}
							>
								Sign Out
							</Button>
						)}

						<Button
							variant="primary"
							className="SendCalendar"
							onClick={createEvents}
						>
							Send to Google Calendar
						</Button>
					</div>
				)}
				{events[0] === undefined ? (
					<div></div>
				) : (
					<div className="percentageBar">
						<ProgressBarCom percentage={percentage} />
						{percentage === 100 ? <div>Done</div> : <div></div>}
					</div>
				)}
			</div>
		</div>
	);
}

export default Home;
