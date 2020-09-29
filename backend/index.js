require('dotenv').config()
const express = require('express');
const polycrawler = require('./services/polyCrawler');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const password = process.argv.DB_TEST_PASS
const url = `mongodb+srv://mazil007:${password}@cluster0.3xdqk.mongodb.net/<dbname>?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

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
