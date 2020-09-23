/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import '../App.css';
import Calendar from '../globals/models/calendar_template';

function Admin() {
	const [startDateI, setStartDateI] = useState('');
	const [startDate, setStartDate] = useState();
	const [endDateI, setendDateI] = useState('');
	const [endDate, setendDate] = useState();
	const [calendar, setCalendar] = useState();
	const [Dates, setDates] = useState([]);
	const [newDates, setNewDate] = useState([{ Date: '' }]);
	const [newSemaineVac, setNewSemaineVac] = useState('');
	const [semaineVac, setSemaineVac] = useState('');
	const [mondayNew, setMondayNew] = useState('');
	const [tuesdayNew, setTuesdayNew] = useState('');
	const [wednesdayNew, setWednesdayNew] = useState('');
	const [thursdayNew, setThursdayNew] = useState('');
	const [fridayNew, setFridayNew] = useState('');
	const [monday, setMonday] = useState('');
	const [tuesday, setTuesday] = useState('');
	const [wednesday, setWednesday] = useState('');
	const [thursday, setThursday] = useState('');
	const [friday, setFriday] = useState('');
	const [firstWeek, setFirstWeek] = useState([]);
	const [semesterName, setSemesterName] = useState('');
	const [newSemesterName, setNewSemesterName] = useState('');

	const createCalendar = () => {
		let newCal = new Calendar(
			startDate,
			endDate,
			Dates,
			semaineVac,
			firstWeek
		);
		console.log(newCal.toJson());
		setCalendar(newCal);
		
	};

	const dateMan = (start, end, dates, week1) => {
		let endYear = end.substring(0, 4);
		let endMonth = end.substring(5, 7);
		let endDay = end.substring(8, 10);
		let dateEnd = `${endMonth}/${endDay}/${endYear}`;

		let startYear = start.substring(0, 4);
		let startMonth = start.substring(5, 7);
		let startDay = start.substring(8, 10);
		let dateStart = `${startMonth}/${startDay}/${startYear}`;

		let dateFormat = [];
		for (let i = 0; i < dates.length; i++) {
			let startDateY = dates[i].substring(0, 4);
			let startDateM = dates[i].substring(5, 7);
			let startDateD = dates[i].substring(8, 10);
			let dateStart = `${startDateM}/${startDateD}/${startDateY}`;
			dateFormat[i] = new Date(dateStart);
		}

		setFirstWeek(week1);
		setStartDate(new Date(dateStart));
		setendDate(new Date(dateEnd));
		setDates(dateFormat);
	};

	const clickHandler = (event) => {
		event.preventDefault();

		let dates = newDates.filter((date) => date.Date !== '');
		setSemaineVac(newSemaineVac);
		setMonday(mondayNew);
		setTuesday(tuesdayNew);
		setWednesday(wednesdayNew);
		setThursday(thursdayNew);
		setFriday(fridayNew);

		let week1 = [];
		week1[0] = mondayNew;
		week1[1] = tuesdayNew;
		week1[2] = wednesdayNew;
		week1[3] = thursdayNew;
		week1[4] = fridayNew;

		setSemesterName(newSemesterName);
		dates = dates.map((date) => date.Date);
		dateMan(startDateI, endDateI, dates, week1);

		setNewSemesterName('');
		setNewDate([{ Date: '' }]);
		setendDateI('');
		setStartDateI('');
		setMondayNew('');
		setTuesdayNew('');
		setWednesdayNew('');
		setThursdayNew('');
		setFridayNew('');
		setNewSemaineVac('');
	};

	const onChangeStart = (event) => {
		setStartDateI(event.target.value);
	};

	const onChangeEnd = (event) => {
		setendDateI(event.target.value);
	};

	const handleAddClick = () => {
		setNewDate([...newDates, { Date: '' }]);
	};

	const handleRemoveClick = (index) => {
		const list = [...newDates];
		list.splice(index, 1);
		setNewDate(list);
	};

	const onChangeDate = (event, index) => {
		setNewDate[index] = event.target.value;
		const Date = event.target.value;
		const list = [...newDates];
		list[index].Date = Date;
		setNewDate(list);
	};

	const newVacChange = (event) => {
		setNewSemaineVac(event.target.value);
	};

	const mondayChange = (event) => {
		setMondayNew(event.target.value);
	};

	const TuesdayChange = (event) => {
		setTuesdayNew(event.target.value);
	};

	const WednesdayChange = (event) => {
		setWednesdayNew(event.target.value);
	};

	const ThursdayChange = (event) => {
		setThursdayNew(event.target.value);
	};

	const FridayChange = (event) => {
		setFridayNew(event.target.value);
	};

	const newSemester = (event) => {
		setNewSemesterName(event.target.value);
	};

	return (
		<div>
			<h1>admin</h1>
			<form onSubmit={clickHandler}>
				<div>
					Semester:
					<input
						type="text"
						onChange={newSemester}
						value={newSemesterName}
					/>
				</div>

				<input
					type="date"
					onChange={onChangeStart}
					value={startDateI}
				></input>
				<input
					type="date"
					onChange={onChangeEnd}
					value={endDateI}
				></input>

				<div>
					<br />
					Vacation is on week number:{' '}
					<input
						type="number"
						onChange={newVacChange}
						value={newSemaineVac}
					></input>
					<br />
					Additional days off:
					{newDates.map((date, i) => {
						return (
							<div key={i} id="additionDaysOff">
								<input
									type="date"
									onChange={(event) => onChangeDate(event, i)}
									value={newDates[i].Date}
								></input>
								{newDates.length !== 1 && (
									<button onClick={handleRemoveClick}>
										Remove
									</button>
								)}
								{newDates.length - 1 === i && (
									<button onClick={handleAddClick}>
										Add
									</button>
								)}
							</div>
						);
					})}
				</div>
				<div>
					<h3>Alternances Laboratoires</h3>
					Semaine 1 (B1 ou B2):
					<div>
						Monday
						<input
							type="list"
							list="alt"
							onChange={mondayChange}
							value={mondayNew}
						></input>
						<br />
						Tuesday
						<input
							type="list"
							list="alt"
							onChange={TuesdayChange}
							value={tuesdayNew}
						></input>
						<br />
						Wednesday
						<input
							type="list"
							list="alt"
							onChange={WednesdayChange}
							value={wednesdayNew}
						></input>
						<br />
						Thursday
						<input
							type="list"
							list="alt"
							onChange={ThursdayChange}
							value={thursdayNew}
						></input>
						<br />
						Friday
						<input
							type="list"
							list="alt"
							onChange={FridayChange}
							value={fridayNew}
						></input>
						<datalist id="alt">
							<option value="B1" />
							<option value="B2" />
						</datalist>
					</div>
				</div>
				<div>
					<br />
					<button type="submit"> submit</button>
				</div>
			</form>
			{endDate === undefined ? (
				<div>
					<h3> Dates not entered</h3>
				</div>
			) : (
				<div>
					<h3>
						Semester Starts: {startDate.toDateString()} and Ends:{' '}
						{endDate.toDateString()}
					</h3>
					<h3>
						Vacation: week {semaineVac}
						<br />
						Days off:
						<div>
							<ul>
								{Dates.map((date) => (
									<li
										key={date.getTime()}
									>{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</li>
								))}
							</ul>
						</div>
					</h3>
					<button type="submit" onClick={() => createCalendar()}>
						{' '}
						create calendar
					</button>
					{console.log(calendar)}
					{calendar === undefined ? console.log('ok') : console.log(calendar.toJson())}
				</div>
			)}
		</div>
	);
}

export default Admin;
