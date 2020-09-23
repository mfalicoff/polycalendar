const mongoose = require('mongoose');

const weekSchema = new mongoose.Schema({
	weeknumber: Number,
	week: [],
});

const Week = mongoose.model('Week', weekSchema);

module.exports = Week;
