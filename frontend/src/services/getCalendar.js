import axios from 'axios';
//eslint-disable-next-line
const baseUrl = process.env.REACT_APP_BASE_URL+'/api/getCalendar';

const getCalendar = async () => {
	let result = await axios.get(baseUrl);
	return result.data;
};

export default getCalendar;
