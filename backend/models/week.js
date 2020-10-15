const mongoose = require('mongoose');

const weekSchema = new mongoose.Schema({
	weekDays: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Day',
		},
	],
});

weekSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Week = mongoose.model('Week', weekSchema, 'Week');

module.exports = Week;
