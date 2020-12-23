const logger = require('./logger');

const requestLogger = (request, response, next) => {
	console.log('Method: ', request.method);
	console.log('Path: ', request.path);
	console.log('Body: ', request.body);
	console.log('Query: ', request.query);
	console.log('------');
	next();
};

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
	logger.error(error.message);

	if (error.name === 'CastError' && error.kind === 'ObjectId') {
		return response.status(400).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message });
	}else if(error.message != null){
		return response.status(400).json({ error: error.message });
	}

	next(error);
};

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler
};