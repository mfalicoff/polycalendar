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
	const request = await axios.post(baseURL, data, config);
	console.log(request);
	// return request.data;
	return null;
};

export default {
	create: create,
	setToken: setToken,
};
