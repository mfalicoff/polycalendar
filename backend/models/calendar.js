const mongoose = require('mongoose');

const calendarSchema = new mongoose.Schema({
	weeks: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Week',
		},
	],
});

calendarSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Calendar = mongoose.model('Calendar', calendarSchema, 'Calendar');

module.exports = Calendar;
