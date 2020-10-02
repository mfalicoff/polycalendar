const mongoose = require('mongoose');

const semesterSchema = new mongoose.Schema({
	name: String,
	calendar: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Calendar',
	},

	classes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Class',
		},
	],
});

const Semester = mongoose.model('Semester', semesterSchema, 'Semester');

module.exports = Semester;
