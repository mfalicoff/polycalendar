import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/getCalendar';

const getCalendar = async () => {
	let result = await axios.get(baseUrl);
	console.log(result);
	return result.data;
};

export default getCalendar;
