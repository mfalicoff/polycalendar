const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
	date: Date,
	value: Boolean,
	alternance: String,
});

const Day = mongoose.model('Day', daySchema);

module.exports = Day;
