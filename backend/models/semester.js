const mongoose = require('mongoose');

const semesterSchema = new mongoose.Schema({
	name: String,
	startDate: Date,
	enddate: Date,
	calendar: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Calendar',
		},
	],

	classes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Class',
		},
	],
});

const Semester = mongoose.model('Semester', semesterSchema);

module.exports = Semester;
