const mongoose = require('mongoose');

const weekSchema = new mongoose.Schema({
	weeknumber: Number,
	weekDays: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Day',
	}],
});

const Week = mongoose.model('Week', weekSchema);

module.exports = Week;
