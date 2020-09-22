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
	console.log('ok');

	let cours = [];
	let repertoireDeCours = {};
	let ok = []
	$('.pane-content')
		.find('h2')
		.each((i, elem) => {
			cours.push({
				siglet: elem.children[0].children[0].data,
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

				// console.log(
				// 	i, 'coursTH sans lab',
				// 	CoursTableGroupe,
				// 	CoursTableJour,
				// 	CoursTableHeure,
				// 	CoursTableLocal
				// );

				sectionOnlyTH.push({
					coursSectionTH: CoursTableGroupeTH,
					coursHeureTH: CoursTableHeureTH,
					coursJoursTH: CoursTableJourTH,
					coursLocal: CoursTableLocalTH,
				})
				cours[i].horraire.push(sectionOnlyTH);
				//ok.push(horraire)
				

			} else {
				let sectionTH = [];
				let sectionTP = [];


				//pour les cours theoriques
				let currentTableCoursTH =
					elem.children[1].children[1].children[3];
					
				for (let j = 3; j < currentTableCoursTH.children.length; j = j + 2) {
					let CoursTableGroupeTH =
						currentTableCoursTH.children[j].children[1].children[0]
							.data; // nous donne groupe
							if(CoursTableGroupeTH.length === 1 ){
								CoursTableGroupeTH = currentTableCoursTH.children[j-2].children[1].children[0]
								.data
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
					// console.log(
					// 	i, 'coursTH',
					// 	CoursTableGroupe,
					// 	CoursTableJour,
					// 	CoursTableHeure,
					// 	CoursTableLocal
					// );
					
					sectionTH.push({coursSectionTH: CoursTableGroupeTH,
						coursHeureTH: CoursTableHeureTH,
						coursJoursTH: CoursTableJourTH,
						coursLocal: CoursTableLocalTH,
					})
					
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
							if(CoursTableGroupeTP.length === 1){
								CoursTableGroupeTP = currentTableCoursTP.children[j-2].children[1].children[0]
								.data
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
					// console.log(
					// 	i, "Cours TP",
					// 	CoursTableGroupe,
					// 	CoursTableJour,
					// 	CoursTableHeure,
					// 	CoursTableLocal
					// );

					sectionTP.push({
						coursSectionTH: CoursTableGroupeTP,
						coursHeureTH: CoursTableHeureTP,
						coursJoursTH: CoursTableJourTP,
						coursLocal: CoursTableLocalTP,
					})
					cours[i].horraire.push(sectionTH, sectionTP)
					//ok.push(horraire);
				}
			}
		});
		// fs.writeFile("cours.json", JSON.stringify(ok), 'utf8', function (err) {
		// 	if (err) {
		// 		console.log("An error occured while writing JSON Object to File.");
		// 		return console.log(err);
		// 	}
		 
		// 	console.log("JSON file has been saved.");
		// });
		await writeFile(cours);
	res.send('<h1>ok</h1>');
	
	//res.json(JSON.stringify(ok[ok.length-1]));
});

const writeFile = (jsonFile) => {
		fs.writeFile("cours.json", JSON.stringify(jsonFile[jsonFile.length-1]), 'utf8', function (err) {
			if (err) {
				console.log("An error occured while writing JSON Object to File.");
				return console.log(err);
			}
		 
			return console.log("JSON file has been saved.");
		});
}

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
