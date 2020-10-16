const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const classSchema = new mongoose.Schema({
	name: String,
	horraire: [],
});

classSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Class = mongoose.model('Class', classSchema, 'Class');

module.exports = Class;
