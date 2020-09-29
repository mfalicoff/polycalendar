require('dotenv').config()
const express = require('express');
const polycrawler = require('./services/polyCrawler');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose')
const Class= require('./models/class')
const CalendarDB = require('./models/calendar')
const WeekDB = require('./models/week')
const DayDB = require('./models/day')

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

	await resetDB();

	let calendar = req.body;
	console.log(calendar);
	let weekNumber = 0;

	
	let weeks = []
	calendar.weeks.map(async (weekJson) => {
		let weekDays = []
		weekJson.map(async(dayJson) => {
			let day = new DayDB({
				date: dayJson.date,
				value: dayJson.value,
				alternance: dayJson.alternance
			})
			let savedDay = await day.save()
			weekDays.push(savedDay._id)
			if(weekDays.length === 7){
				console.log(weekDays)
				let week = new WeekDB({
					weekNumber: weekNumber,
					weekDays: weekDays
				})
				let savedWeek = await week.save();
				weekNumber++;
				weeks.push(savedWeek._id)
				if(weeks.length === 17){
					console.log(weeks, 'ok')
					let calendartoSave = new CalendarDB({
						weeks: weeks
					})
					let ok = await calendartoSave.save();
				}
				
			}


		})
	})


	// let ok = await calendarD.save()
	// console.log(ok)

	// let repertoireCours = await polycrawler.polycrawler();
	// repertoireCours.map(async (cours) => {
	// 	let coursDB = new Class({
	// 		name: cours.nom,
	// 		horraire: cours.horraire
	// 	})
	// 	let ok = await coursDB.save()
	// 	console.log(ok);
	// })
	 
	res.status(200).json({ status: 'semester created' });
});

resetDB = async () => {
	await Class.deleteMany({})
	await CalendarDB.deleteMany({})
	await WeekDB.deleteMany({})
	await DayDB.deleteMany({})
}

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
