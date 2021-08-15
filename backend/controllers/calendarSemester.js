const semesterCalendar = require('express').Router();
const CalendarDB = require('../models/calendar/calendar');
const SemesterDB = require('../models/semester');

semesterCalendar.get('/getCalendar', async (req, res) => {
	let calendarResults = await CalendarDB.find({}).populate({
		path: 'weeks',
		populate: {
			path: 'weekDays',
		},
	});
	res.json(calendarResults);
});

semesterCalendar.get('/getCurrentSemester', async(request, response) => {
	let currentSemester = await SemesterDB.find({});
	let semesterName = currentSemester[0].name;
	response.status(200).json({semester: semesterName});
});

module.exports = semesterCalendar;
