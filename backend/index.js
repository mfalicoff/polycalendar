require('dotenv').config()
const express = require('express');
const polycrawler = require('./services/polyCrawler');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
const Class= require('./models/class')

app.use(cors());
app.use(express.json());

const password = process.env.DBpass
const url = `mongodb+srv://mazil007:${password}@cluster0.3xdqk.mongodb.net/PolyCalendarTest?retryWrites=true&w=majority`
console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


app.post('/api/Admin/createSemester', async (req, res) => {
	console.log(req.body);
	let repertoireCours = await polycrawler.polycrawler();
	repertoireCours.map(async (cours) => {
		let coursDB = new Class({
			name: cours.nom,
			horraire: cours.horraire
		})
		let ok = await coursDB.save()
		console.log(ok);
	})
	 
	res.status(200).json({ status: 'semester created' });
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
