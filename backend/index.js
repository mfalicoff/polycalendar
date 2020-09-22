const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const app = express();

app.get('/', async (req, res) => {
	let pageToVisit =
		'https://www.polymtl.ca/programmes/cours/horaire?cycle=BA';
	console.log(`Visiting page ${pageToVisit}`);

	let response = await axios.get(pageToVisit);
	let $ = cheerio.load(response.data);

	let cours = [];

	$('.pane-content')
		.find('h2')
		.each((i, elem) => {
			let nom = elem.children[0].children[0].data;
			cours.push({
				nom: nom,
				horraire: [],
			});
		});
	console.log('siglet done');

	$('.pane-content')
		.find('.horaire')
		.each((i, elem) => {
			//let horraire = [];

			//Pour les cours sans lab
			if (elem.children.length !== 5) {
				let sectionOnlyTH = [];
				let CoursTableGroupeTH =
					elem.children[1].children[1].children[3].children[3]
						.children[1].children[0].data; //ok
				let CoursTableJourTH =
					elem.children[1].children[1].children[3].children[3]
						.children[3].children[0].data; // ok
				let CoursTableHeureTH =
					elem.children[1].children[1].children[3].children[3]
						.children[5].children[0].data; //ok
				let CoursTableLocalTH = '';
				if (
					elem.children[1].children[1].children[3].children[3]
						.children.length < 8
				) {
					//console.log(elem.children[1].children[1].children[3].children[3].children[3].children)
					CoursTableJour = '';
					CoursTableHeure = 'Consultez Site web du Cours';
					CoursTableLocal = '';
				} else {
					CoursTableLocalTH =
						elem.children[1].children[1].children[3].children[3]
							.children[7].children[0].data;
				}

				sectionOnlyTH.push({
					coursSectionTH: CoursTableGroupeTH,
					coursHeureTH: CoursTableHeureTH,
					coursJoursTH: CoursTableJourTH,
					coursLocalTH: CoursTableLocalTH,
				});
				cours[i].horraire.push(sectionOnlyTH);
			} else {
				let sectionTH = [];
				let sectionTP = [];

				//pour les cours theoriques
				let currentTableCoursTH =
					elem.children[1].children[1].children[3];

				for (
					let j = 3;
					j < currentTableCoursTH.children.length;
					j = j + 2
				) {
					let CoursTableGroupeTH =
						currentTableCoursTH.children[j].children[1].children[0]
							.data; // nous donne groupe
					if (CoursTableGroupeTH.length === 1) {
						CoursTableGroupeTH =
							currentTableCoursTH.children[j - 2].children[1]
								.children[0].data;
					}
					let CoursTableJourTH =
						currentTableCoursTH.children[j].children[3].children[0]
							.data; // nous donne le jours
					let CoursTableHeureTH =
						currentTableCoursTH.children[j].children[5].children[0]
							.data; // nous donne l'heure
					let CoursTableLocalTH =
						currentTableCoursTH.children[j].children[7].children[0]
							.data; //nous donne le local

					sectionTH.push({
						coursSectionTH: CoursTableGroupeTH,
						coursHeureTH: CoursTableHeureTH,
						coursJoursTH: CoursTableJourTH,
						coursLocalTH: CoursTableLocalTH,
					});
				}

				//traveaux pratiques
				let currentTableCoursTP =
					elem.children[3].children[1].children[3];
				for (
					let j = 3;
					j < currentTableCoursTP.children.length;
					j = j + 2
				) {
					let CoursTableGroupeTP =
						currentTableCoursTP.children[j].children[1].children[0]
							.data; // nous donne groupe
					if (CoursTableGroupeTP.length === 1) {
						CoursTableGroupeTP =
							currentTableCoursTP.children[j - 2].children[1]
								.children[0].data;
					}
					let CoursTableJourTP =
						currentTableCoursTP.children[j].children[3].children[0]
							.data; // nous donne le jours
					let CoursTableHeureTP =
						currentTableCoursTP.children[j].children[5].children[0]
							.data; // nous donne l'heure
					let CoursTableLocalTP =
						currentTableCoursTP.children[j].children[7].children[0]
							.data; //nous donne le local

					sectionTP.push({
						coursSectionTP: CoursTableGroupeTP,
						coursHeureTP: CoursTableHeureTP,
						coursJoursTP: CoursTableJourTP,
						coursLocalTP: CoursTableLocalTP,
					});
					cours[i].horraire.push(sectionTH, sectionTP);
				}
			}
		});

	//await writeFile(cours);
	res.send('<h1>ok</h1>');
});

const writeFile = (jsonFile) => {
	fs.writeFile(
		'cours.json',
		JSON.stringify(jsonFile[jsonFile.length - 1]),
		'utf8',
		function (err) {
			if (err) {
				console.log(
					'An error occured while writing JSON Object to File.'
				);
				return console.log(err);
			}

			return console.log('JSON file has been saved.');
		}
	);
};

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
