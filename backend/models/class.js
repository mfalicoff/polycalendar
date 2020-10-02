const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
	name: String,
	horraire: [],
});

const Class = mongoose.model('Class', classSchema, "Class");

module.exports = Class;
