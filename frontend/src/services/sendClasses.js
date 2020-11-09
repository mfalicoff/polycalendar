import axios from 'axios';
//eslint-disable-next-line
const baseUrl = process.env.REACT_APP_BASE_URL + '/api/Classes/getClasses';

const getClasses = async (classes) => {
	let result = await axios.get(baseUrl, {
		params: {
			classes: classes,
		},
	});
	return result.data;
};

export default getClasses;
