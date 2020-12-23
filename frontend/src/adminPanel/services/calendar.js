import axios from 'axios';
//eslint-disable-next-line
const baseURL = process.env.REACT_APP_BASE_URL + '/api/Admin/createSemester';

let token = null;

const setToken = (newToken) => {
	token = `bearer ${newToken}`;
};

const create = async (newCalendar, semesterName) => {
	let data = {
		calendar: newCalendar,
		name: semesterName,
	};
	const config = {
		headers: {
			Authorization: token,
		},
	};
	console.log(newCalendar);
	const request = await axios.post(baseURL, data, config);
	return request.data;
};

export default {
	create: create,
	setToken: setToken,
};
