const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb2', {

});

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/', auth, require('./routes/cards'));
app.use('/', auth, require('./routes/users'));

app.use('*', (req, res) => {
  res.status(404).send({ message: 'страница не найдена' });
});

app.listen(PORT);
