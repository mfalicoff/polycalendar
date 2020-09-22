const express = require('express');
const polycrawler = require('./services/polyCrawler');
const app = express();

app.get('/', async (req, res) => {
	await polycrawler.polycrawler();
	res.send('<h1>ok</h1>');
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
