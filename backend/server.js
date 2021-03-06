const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const PORT = process.env.PORT || 3000;

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: 'postgres',
		database: 'smartbrain'
	}
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('Working fine.');
});
app.post('/signin', (req, res) => {
	signin.handleSignin(req, res, db, bcrypt);
});
app.post('/register', (req, res) => {
	register.handleRegister(req, res, db, bcrypt);
});
app.get('/profile/:id', (req, res) => {
	profile.handleProfile(req, res, db);
});
app.put('/image', (req, res) => {
	image.handleImage(req, res, db);
});
app.post('/imageurl', (req, res) => {
	image.handleApiCall(req, res, db);
});

app.listen(PORT, () => {
	console.log(`app is running on port ${PORT}`);
});
