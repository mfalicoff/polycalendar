const mongoose = require('mongoose');

const weekSchema = new mongoose.Schema({
	weekDays: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Day',
	}],
});

const Week = mongoose.model('Week', weekSchema, "Week");

module.exports = Week;
