import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/getClasses';

const getClasses = async (classes) => {
	let result = await axios.get(baseUrl, {
		params: {
			classes: classes,
		},
	});
	console.log(result);
};

export default getClasses;
