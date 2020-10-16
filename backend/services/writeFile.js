const fs = require('fs');

const writeFile = (jsonFile) => {
	fs.writeFile('cours.json', JSON.stringify(jsonFile), 'utf8', function (
		err
	) {
		if (err) {
			console.log('An error occured while writing JSON Object to File.');
			return console.log(err);
		}

		return console.log('JSON file has been saved.');
	});
};

module.exports = {
	writeFile,
};
