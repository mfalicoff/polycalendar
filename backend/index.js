require('dotenv').config();
/* eslint-disable no-unused-vars */

const express = require('express');
const polycrawler = require('./services/polyCrawler');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Class = require('./models/class');
const CalendarDB = require('./models/calendar');
const WeekDB = require('./models/week');
const DayDB = require('./models/day');
const SemesterDB = require('./models/semester');

app.use(cors());
app.use(express.json());

const password = process.env.DBpass;
const url = `mongodb+srv://mazil007:${password}@cluster0.3xdqk.mongodb.net/PolyCalendarTest?retryWrites=true&w=majority`;
console.log('connecting to', url);
const NumberofWeeks = 17;

mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then((_result) => {
		console.log('connected to MongoDB');
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message);
	});

let resetDB = async () => {
	await Class.deleteMany({});
	await CalendarDB.deleteMany({});
	await WeekDB.deleteMany({});
	await DayDB.deleteMany({});
};

app.post('/api/Admin/createSemester', async (req, res) => {
	await resetDB();

	let calendar = req.body.calendar;
	let semesterName = req.body.name;

	let weeks = [];
	let calendarId = '';

	await calendar.weeks.map(async (weekJson) => {
		let weekDays = [];
		weekJson.map(async (dayJson) => {
			let day = new DayDB({
				date: dayJson.date,
				value: dayJson.value,
				alternance: dayJson.alternance,
			});

			let savedDay = await day.save();
			weekDays.push(savedDay._id);

			if (weekDays.length === 7) {
				let week = new WeekDB({
					weekDays: weekDays,
				});

				let savedWeek = await week.save();
				weeks.push(savedWeek._id);

				if (weeks.length === NumberofWeeks) {
					let calendartoSave = new CalendarDB({
						weeks: weeks,
					});
					let savedCalendar = await calendartoSave.save();
					calendarId = savedCalendar._id;
				}
			}
		});
	});

	let savedclassesId = [];
	let repertoireCours = await polycrawler.polycrawler();

	repertoireCours.map(async (cours) => {
		let coursDB = new Class({
			name: cours.nom,
			horraire: cours.horraire,
		});

		let savedClasses = await coursDB.save();
		savedclassesId.push(savedClasses._id);
	});

	//wait for semester attriubutes to have content
	let interval = setInterval(async () => {
		if (calendarId == '') return;
		clearInterval(interval);

		let newSemester = new SemesterDB({
			name: semesterName,
			calendar: calendarId,
			classes: savedclassesId,
		});

		await newSemester.save();
		clearInterval(interval);
	}, 10);

	res.status(200).json({ status: 'semester created' });
});

app.get('/api/getClasses', async (req, res) => {
	let classesToQuery = [];
	classesToQuery = req.query.classes;
	classesToQuery = Object.values(JSON.parse(classesToQuery));
	let returnJson = [];

	await Promise.all(
		classesToQuery.map(async (classes) => {
			let name = classes.name.toUpperCase();

			let sectionTH = classes.sectionTH;
			let sectionTP = classes.sectionTP;
			if (sectionTH.length == 1) {
				sectionTH = '0' + sectionTH;
			}
			if (sectionTP.length == 1) {
				sectionTP = '0' + sectionTP;
			}

			let classesReturned = await Class.find({
				name: { $regex: `${name}` },
			});

			let allHorraireTH = classesReturned[0].horraire[0];
			let selectedThUnfiltered = allHorraireTH.map((singleClass) => {
				if (singleClass.coursSectionTH == sectionTH) {
					return singleClass;
				}
			});
			let selectedTH = selectedThUnfiltered.filter(
				(clas) => clas !== undefined
			);

			let allHorraireTP = classesReturned[0].horraire[1];
			let selectedTpUnfiltered = allHorraireTP.map((singleClass) => {
				if (singleClass.coursSectionTP == sectionTP) {
					return singleClass;
				}
			});
			let selectedTP = selectedTpUnfiltered.filter(
				(clas) => clas !== undefined
			);

			let returnClass = {
				name: classesReturned[0].name,
				id: classesReturned[0]._id,
				horraire: {
					TH: selectedTH,
					TP: selectedTP,
				},
			};
			returnJson.push(returnClass);
		})
	);
	res.send(returnJson);
});
app.get('/api/getCalendar', async(req, res) => {
	let calendarResults = await CalendarDB.find({}).populate({
		path: "weeks",
		populate: {
			path: "weekDays"
		}
	});
	console.log(calendarResults)
	res.json(calendarResults)
})

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
