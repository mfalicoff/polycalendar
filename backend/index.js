const express = require('express');
const cheerio = require('cheerio');
const axios = require("axios");
const fs = require('fs')
const app = express();

app.get('/', async(req, res) => {
	console.log('ok');
	let pageToVisit = 'https://www.polymtl.ca/programmes/cours/horaire?cycle=BA';
	console.log(`Visiting page ${pageToVisit}`);

	let response = await axios.get(pageToVisit);
	let $ = cheerio.load(response.data);
	console.log('ok');

	let data = []
	//console.log($('.pane-content').find('h2').length)
	$('.pane-content').find('h2').each((i, elem) => {
		data.push ({
			siglet: elem.children[0].children[0].data,
			horraire: {}
		})
	})
	console.log('siglet done')
	$('.pane-content').find('.horaire').each((i, elem) => {
		console.log(elem.children.length)
		if(elem.children.length === 3){
			// if(elem.children[1].children[3].children[3].children.length > 5){
			// 	let CoursTableGroupe = elem.children[1].children[3].children[3].children[1].children[0].data;
			// 	let CoursTableJour = elem.children[1].children[3].children[3].children[3].children[0].data;
			// 	let CoursTableHeure = elem.children[1].children[3].children[3].children[5].children[0].data;
			// 	let CoursTableLocal = elem.children[1].children[3].children[3].children[7].children[0].data;
			// 	let CoursTableProf = elem.children[1].children[3].children[3].children[9].children[0].data;
			// 	console.log(CoursTableGroupe, CoursTableJour, CoursTableHeure, CoursTableLocal, CoursTableProf)
			// }


		}//else{
		// 	let CoursTable = elem.clidren[1];
		// 	let TDTable = elem.children[3]

		// }
		//console.log(elem.children[3].children[3]) //chaque TR TD
		//console.log(elem.children[1].children[1].children[1].children) Chaque TR Cours
		/*
		On a ici toutes les tables chaqune representant la serie suivante:
			Pour chaque Cours, table 1: TH, table 2 TD/TP
			Avec la table 0 qui commence au elem.children[0] qui est un TH
		*/
	})
	//console.log(data)
	res.send('<h1>ok</h1>');
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
