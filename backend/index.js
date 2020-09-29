const express = require('express');
const polycrawler = require('./services/polyCrawler');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.post('/api/Admin/createSemester', async (req, res) => {
	console.log(req.body);
	let schedule = await polycrawler.polycrawler();
	console.log(schedule);
	res.status(200).json({ status: 'semester created' });
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
