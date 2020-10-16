import React, { useState } from 'react';
import ClassForm from './components/ClassForm';
import ApiCalendar from './services/googleCalendar'

function Home() {
	const [nClasses, setNClasses] = useState();
	const [calendar, setLocalCalendar] = useState();
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

	const test = (event) => {
		let day = calendar[0].weeks[0].weekDays[1]
		console.log(day)
		console.log(classes)
		if(day.value == 1){
			for(let i = 0; i < classes.length; i++){
				let horrTH = classes[i].horraire.TH
				let horrTP = classes[i].horraire.TP

				console.log(horrTH)
				for(let j = 0; j < horrTH.length; j++){
					let ok = horrTH[j];
					console.log(ok)
					let dayInInt = new Date(day.date).getDay()
					if(dateMapper(ok.coursJoursTH) === dayInInt){
						let ok1 = new Date(day.date);

						let startTime = ok.coursHeureTH.substr(0, ok.coursHeureTH.indexOf(","))
						console.log(startTime)
						let indexHourStart = startTime.indexOf("h")
						console.log(indexHourStart, )
						let hoursStart = "";
						for(let o = 0; o < indexHourStart; o++){
							console.log(startTime[o])
							hoursStart = hoursStart + startTime[o]
						}
						let minuteStart = "";
						for(let o = indexHourStart+1; o < startTime.length; o++){
							console.log(startTime[o])
							minuteStart = minuteStart + startTime[o]
						}
						console.log(hoursStart, minuteStart)

						let dateStart = new Date(ok1.getFullYear(), ok1.getMonth(), ok1.getDate(), hoursStart, minuteStart);
						console.log(dateStart)

						


						let endTime = ok.coursHeureTH.substr(ok.coursHeureTH.lastIndexOf(",")+2, ok.length)
						console.log(endTime)
						let indexHourEnd = endTime.indexOf("h")
						let hoursEnd= "";
						for(let o = 0; o < indexHourEnd; o++){
							hoursEnd = hoursEnd + endTime[o]
						}
						let minutesEnd = "";
						for(let o = indexHourEnd+1; o < endTime.length; o++){
							minutesEnd = minutesEnd + endTime[o]
						}
						hoursEnd = parseInt(hoursEnd) + 1;
						minutesEnd = parseInt(minutesEnd) - 10;
						let dateEnd= new Date(ok1.getFullYear(), ok1.getMonth(), ok1.getDate(), hoursEnd, minutesEnd);
						console.log(dateEnd)

						let eve = {
							'summary': classes[i].name + " " + "TH",
							'description': ok.coursLocalTH,
							'start': {
							  'dateTime': dateStart,
							  'timeZone': 'America/Toronto'
							},
							'end': {
							  'dateTime': dateEnd,
							  'timeZone': 'America/Toronto'
							},
						  
						}
						ApiCalendar.createEvent(eve, "thks51mldef4rp7b7mt1icpvgo@group.calendar.google.com")

					}
				}

				// for(let k = 0; k < horrTP.length; j++){
					
				// }
			}
		}
	}

	const dateMapper = (dateInFrench) => {
		console.log(dateInFrench)
		if(dateInFrench === "Dimanche"){return 0}
		if(dateInFrench === "Lundi"){return 1}
		if(dateInFrench === "Mardi"){return 2}
		if(dateInFrench === "Mercredi"){return 3}
		if(dateInFrench === "Jeudi"){return 4}
		if(dateInFrench === "Venredi"){return 5}
		if(dateInFrench === "Samedi"){return 6}
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
