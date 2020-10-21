if (process.env.NODE_ENV === 'dev') {
	require('dotenv').config();
}
/* eslint-disable no-unused-vars */

const express = require('express');
const polycrawler = require('./services/polyCrawler');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Class = require('./models/class');
const CalendarDB = require('./models/calendar');
const WeekDB = require('./models/week');
const DayDB = require('./models/day');
const UserDB = require('./models/users');
const SemesterDB = require('./models/semester');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());

const url = process.env.MONGODB_URI;
console.log('connecting to', url);
const NumberofWeeks = 17;

const getTokenFrom = (request) => {
	const authorization = request.get('authorization');
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		return authorization.substring(7);
	}
	return null;
};

mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then((_result) => {
		console.log('connected to MongoDB');
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message);
	});

let resetDB = async () => {
	await Class.deleteMany({});
	await CalendarDB.deleteMany({});
	await WeekDB.deleteMany({});
	await DayDB.deleteMany({});
	await SemesterDB.deleteMany({});
};

app.post('/api/login', async (request, response) => {
	const body = request.body;

	const user = await UserDB.findOne({ username: body.username });
	const passwordCorrect =
		user === null
			? false
			: await bcrypt.compare(body.password, user.passwordHash);

	if (!(user && passwordCorrect)) {
		return response.status(401).json({
			error: 'invalid username or password',
		});
	}

	const userForToken = {
		username: user.username,
		id: user._id,
	};

	const token = jwt.sign(userForToken, process.env.SECRET);

	response
		.status(200)
		.send({ token, username: user.username, name: user.name });
});

app.post('/api/users', async (request, response) => {
	const body = request.body;

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(body.password, saltRounds);

	const newUser = new UserDB({
		username: body.username,
		name: body.name,
		passwordHash,
	});

	const savedUser = await newUser.save();

	response.json(savedUser);
});

app.post('/api/Admin/createSemester', async (request, response) => {
	const token = getTokenFrom(request);
	console.log(token);
	const decodedToken = jwt.verify(token, process.env.SECRET);
	if (!token || !decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' });
	}
	if (decodedToken.id === process.env.ADMIN_ID) {
		await resetDB();

		let calendar = request.body.calendar;
		let semesterName = request.body.name;

		let weeks = [];
		let calendarId = '';

		await calendar.weeks.map(async (weekJson) => {
			let weekDays = [];
			weekJson.map(async (dayJson) => {
				let day = new DayDB({
					date: dayJson.date,
					value: dayJson.value,
					alternance: dayJson.alternance,
				});

				let savedDay = await day.save();
				weekDays.push(savedDay._id);

				if (weekDays.length === 7) {
					let week = new WeekDB({
						weekDays: weekDays,
					});

					let savedWeek = await week.save();
					weeks.push(savedWeek._id);

					if (weeks.length === NumberofWeeks) {
						let calendartoSave = new CalendarDB({
							weeks: weeks,
						});
						let savedCalendar = await calendartoSave.save();
						calendarId = savedCalendar._id;
					}
				}
			});
		});

		let savedclassesId = [];
		let repertoireCours = [];//await polycrawler.polycrawler();

		repertoireCours.map(async (cours) => {
			let coursDB = new Class({
				name: cours.nom,
				horraire: cours.horraire,
			});

			let savedClasses = []; //await coursDB.save();
			savedclassesId.push(savedClasses._id);
		});

		//wait for semester attriubutes to have content
		let interval = setInterval(async () => {
			if (calendarId == '') return;
			clearInterval(interval);

			let newSemester = new SemesterDB({
				name: semesterName,
				calendar: calendarId,
				classes: savedclassesId,
			});

			//await newSemester.save();
			clearInterval(interval);
		}, 10);

		response.status(200).json({ status: 'semester created' });
	}
});

app.get('/api/getClasses', async (req, res) => {
	let classesToQuery = [];
	classesToQuery = req.query.classes;
	classesToQuery = Object.values(JSON.parse(classesToQuery));
	let returnJson = [];

	try {
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

				let classesReturned = await Class.find({
					name: { $regex: `${name}` },
				});
				if (classesReturned.length === 0) {
					console.log('empty');
					throw new Error('Invalid  Class');
				}
				let allHorraireTH = classesReturned[0].horraire[0];
				console.log(allHorraireTH.length, parseInt(sectionTH));
				if (parseInt(sectionTH) > allHorraireTH.length) {
					console.log('invalid section');

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
	} catch (error) {
		console.log(error.message);
		res.status(404).json({ error: error.message });
	}
});
app.get('/api/getCalendar', async (req, res) => {
	let calendarResults = await CalendarDB.find({}).populate({
		path: 'weeks',
		populate: {
			path: 'weekDays',
		},
	});
	console.log(calendarResults);
	res.json(calendarResults);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
