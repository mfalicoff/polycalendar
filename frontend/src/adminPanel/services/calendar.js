import axios from 'axios';
//eslint-disable-next-line
const baseURL = process.env.REACT_APP_BASE_URL+'/api/Admin/createSemester';

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
