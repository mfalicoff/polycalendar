import axios from 'axios';
//eslint-disable-next-line
const baseUrl = process.env.REACT_APP_BASE_URL+'/api/getClasses';

const getClasses = async (classes) => {
	let result = await axios.get(baseUrl, {
		params: {
			classes: classes,
		},
	});
	console.log(result);
	return result.data;
};

export default getClasses;