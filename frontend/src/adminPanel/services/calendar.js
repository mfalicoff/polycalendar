import axios from 'axios';
const baseURL = 'http://localhost:3001/api/Admin/createSemester';

const create = async (newCalendar) => {
	console.log(newCalendar);
	const request = await axios.post(baseURL, newCalendar);
	return request.data;
};

export default {
	create: create,
};
