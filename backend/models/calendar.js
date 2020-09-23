const mongoose = require('mongoose');

const calendarSchema = new mongoose.Schema({
	weeks: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Week',
		},
	],
});

const Calendar = mongoose.model('Calendar', calendarSchema);

module.exports = Calendar;
