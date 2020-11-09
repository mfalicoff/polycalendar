const userRouter = require('express').Router();
const UserDB = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

userRouter.post('/', async (request, response) => {
	const body = request.body;

	const user = await UserDB.findOne({ username: body.username });
	let passwordCorrect;
	passwordCorrect = user === null
		? false
		: await bcrypt.compare(body.password, user.passwordHash);

	if (user && passwordCorrect) {
		const userForToken = {
			username: user.username,
			id: user._id,
		};
		const token = jwt.sign(userForToken, process.env.SECRET);
		response
			.status(200)
			.send({token, username: user.username, name: user.name});
	} else {
		let error = new Error('invalid username or password');
		error.name = 'InvalidCredentials';
		throw error;


	}
});

module.exports = userRouter;