const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
	date: Date,
	value: Number,
	alternance: String,
});

daySchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Day = mongoose.model('Day', daySchema, 'Day');

module.exports = Day;
