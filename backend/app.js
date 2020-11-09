const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');
const semesterRouter = require('./controllers/semester');
const classRouter = require('./controllers/classes');
const userRouter = require('./controllers/users');
const semesterCalendar = require('./controllers/calendarSemester');

app.use(cors());
app.use(express.json());
logger.info('connecting to ', config.MONGODB_URI);

mongoose
	.connect(config.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	// eslint-disable-next-line no-unused-vars
	.then((result) => {
		logger.info('connected to MongoDB');
	})
	.catch((error) => {
		logger.error('error connecting to MongoDB:', error.message);
	});


app.use(middleware.requestLogger);
app.use('/api/Admin/createSemester', semesterRouter);
app.use('/api/Classes/', classRouter);
app.use('/api/login', userRouter);
app.use('/api/Semester', semesterCalendar);
app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;
