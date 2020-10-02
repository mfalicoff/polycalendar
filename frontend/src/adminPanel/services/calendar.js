import axios from 'axios';
const baseURL = 'http://localhost:3001/api/Admin/createSemester';

const create = async (newCalendar, semesterName) => {
	console.log(newCalendar);
	let data = {
		calendar: newCalendar,
		name: semesterName,
	};
	const request = await axios.post(baseURL, data);
	return request.data;
};

export default {
	create: create,
};
