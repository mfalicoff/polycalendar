const semsterCalendar = require('express').Router();
const CalendarDB = require('../models/calendar');
const SemesterDB = require('../models/semester');

semsterCalendar.get('/getCalendar', async (req, res) => {
	let calendarResults = await CalendarDB.find({}).populate({
		path: 'weeks',
		populate: {
			path: 'weekDays',
		},
	});
	res.json(calendarResults);
});

semsterCalendar.get('/getCurrentSemester', async(request, response) => {
	let currentSemester = await SemesterDB.find({});
	let semesterName = currentSemester[0].name;
	response.status(200).json({semester: semesterName});
});

module.exports = semsterCalendar;
