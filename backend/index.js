const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const app = express();

app.get('/', async (req, res) => {
	console.log('ok');
	let pageToVisit =
		'https://www.polymtl.ca/programmes/cours/horaire?cycle=BA';
	console.log(`Visiting page ${pageToVisit}`);

	let response = await axios.get(pageToVisit);
	let $ = cheerio.load(response.data);
	console.log('ok');

	let data = [];
	//console.log($('.pane-content').find('h2').length)
	$('.pane-content')
		.find('h2')
		.each((i, elem) => {
			data.push({
				siglet: elem.children[0].children[0].data,
				horraire: {},
			});
		});
	console.log('siglet done');
	$('.pane-content')
		.find('.horaire')
		.each((i, elem) => {
			//Pour les cours sans lab
			if (elem.children.length !== 5) {
				let CoursTableGroupe =
					elem.children[1].children[1].children[3].children[3]
						.children[1].children[0].data; //ok
				let CoursTableJour =
					elem.children[1].children[1].children[3].children[3]
						.children[3].children[0].data; // ok
				let CoursTableHeure =
					elem.children[1].children[1].children[3].children[3]
						.children[5].children[0].data; //ok
				let CoursTableLocal = '';
				if (
					elem.children[1].children[1].children[3].children[3]
						.children.length < 8
				) {
					//console.log(elem.children[1].children[1].children[3].children[3].children[3].children)
					CoursTableJour = '';
					CoursTableHeure = 'Consultez Site web du Cours';
					CoursTableLocal = '';
				} else {
					CoursTableLocal =
						elem.children[1].children[1].children[3].children[3]
							.children[7].children[0].data;
				}
				console.log(
					CoursTableGroupe,
					CoursTableJour,
					CoursTableHeure,
					CoursTableLocal
				);
			} else {
				//pour les cours theoriques
				let currentTableCoursTH =
					elem.children[1].children[1].children[3];
				for (let j = 3; j < currentTableCoursTH.length; j = j + 2) {
					let CoursTableGroupe =
						currentTableCoursTH.children[j].children[1].children[0]
							.data; // nous donne groupe
					let CoursTableJour =
						currentTableCoursTH.children[j].children[3].children[0]
							.data; // nous donne le jours
					let CoursTableHeure =
						currentTableCoursTH.children[j].children[5].children[0]
							.data; // nous donne l'heure
					let CoursTableLocal =
						currentTableCoursTH.children[j].children[7].children[0]
							.data; //nous donne le local
					console.log(
						i,
						CoursTableGroupe,
						CoursTableJour,
						CoursTableHeure,
						CoursTableLocal
					);
				}
				//traveaux pratiques
				let currentTableCoursTP =
					elem.children[3].children[1].children[3];
				for (
					let j = 3;
					j < currentTableCoursTP.children.length;
					j = j + 2
				) {
					let CoursTableGroupe =
						currentTableCoursTP.children[j].children[1].children[0]
							.data; // nous donne groupe
					let CoursTableJour =
						currentTableCoursTP.children[j].children[3].children[0]
							.data; // nous donne le jours
					let CoursTableHeure =
						currentTableCoursTP.children[j].children[5].children[0]
							.data; // nous donne l'heure
					let CoursTableLocal =
						currentTableCoursTP.children[j].children[7].children[0]
							.data; //nous donne le local
					console.log(
						i,
						CoursTableGroupe,
						CoursTableJour,
						CoursTableHeure,
						CoursTableLocal
					);
				}
			}
		});
	//console.log(data)
	res.send('<h1>ok</h1>');
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
