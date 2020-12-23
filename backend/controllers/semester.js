const semesterRouter = require('express').Router();
const polycrawler = require('../services/polyCrawler');
const polycrawlerMA = require('../services/polyCrawlerMA');
const ClassDB = require('../models/class');
const CalendarDB = require('../models/calendar');
const WeekDB = require('../models/week');
const DayDB = require('../models/day');
const SemesterDB = require('../models/semester');
const jwt = require('jsonwebtoken');
const tokenService = require( '../utils/getToken');
const NumberWeeks = 16;

let resetDB = async () => {
	await ClassDB.deleteMany({});
	await CalendarDB.deleteMany({});
	await WeekDB.deleteMany({});
	await DayDB.deleteMany({});
	await SemesterDB.deleteMany({});
};

semesterRouter.post('/', async (request, response) => {
	const token = tokenService.getTokenFrom(request);
	console.log(token);
	if (token === null) {
		return response.status(401).json({ error: 'token missing or invalid' });
	}
	const decodedToken = jwt.verify(token, process.env.SECRET);
	if (!token || !decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' });
	}
	if (decodedToken.id === process.env.ADMIN_ID) {
		await resetDB();

		let calendar = request.body.calendar;
		let semesterName = request.body.name;

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

					if (weeks.length === NumberWeeks) {
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
		let repertoireCoursBA = await polycrawler.polycrawler();
		let repertoireCoursMA = await polycrawlerMA.polycrawler();

		let repertoireCours = repertoireCoursBA.concat(repertoireCoursMA);
		repertoireCours.map(async (cours) => {
			let coursDB = new ClassDB({
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

		response.status(200).json({ status: 'semester created' });
	} else {
		throw new Error('action forbidden');
	}
});



module.exports = semesterRouter;


