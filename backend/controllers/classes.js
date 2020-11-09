const classRouter = require('express').Router();
const ClassDB = require('../models/class');

classRouter.get('/getClasses', async (req, res) => {
	let classesToQuery = [];
	classesToQuery = req.query.classes;
	classesToQuery = Object.values(JSON.parse(classesToQuery));
	let returnJson = [];
	
	await Promise.all(
		classesToQuery.map(async (classes) => {
			let name = classes.name.toUpperCase();

			let sectionTH = classes.sectionTH;
			let sectionTP = classes.sectionTP;
			if (sectionTH.length == 1) {
				sectionTH = '0' + sectionTH;
			}
			if (sectionTP.length == 1) {
				sectionTP = '0' + sectionTP;
			}

			let classesReturned = await ClassDB.find({
				name: { $regex: `${name}` },
			});
			if (classesReturned.length === 0) {
				throw new Error('Invalid  Class');
			}
			let allHorraireTH = classesReturned[0].horraire[0];
			if (parseInt(sectionTH) > allHorraireTH.length) {
				throw new Error('Invalid  SectionTH');
			}
			let selectedThUnfiltered = allHorraireTH.map((singleClass) => {
				if (singleClass.coursSectionTH == sectionTH) {
					return singleClass;
				}
			});
			let selectedTH = selectedThUnfiltered.filter(
				(clas) => clas !== undefined
			);

			let selectedTP = [];
			if (classesReturned[0].horraire[1]) {
				let allHorraireTP = classesReturned[0].horraire[1];
				if (parseInt(sectionTP) > allHorraireTP.length) {
					throw new Error('Invalid  SectionTP');
				}
				let selectedTpUnfiltered = allHorraireTP.map(
					(singleClass) => {
						if (singleClass.coursSectionTP == sectionTP) {
							return singleClass;
						}
					}
				);
				selectedTP = selectedTpUnfiltered.filter(
					(clas) => clas !== undefined
				);
			}

			let returnClass = {
				name: classesReturned[0].name,
				id: classesReturned[0]._id,
				horraire: {
					TH: selectedTH,
					TP: selectedTP,
				},
			};
			returnJson.push(returnClass);
		})
	);
	res.send(returnJson);
	
});



module.exports = classRouter;