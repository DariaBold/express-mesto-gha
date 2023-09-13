const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { celebrate, Joi } = require('celebrate');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb2', {

});

app.post('/signin', login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
    email: Joi.string().required().unique(),
    password: Joi.string().required().unique().min(6),
  }),
}), createUser);

app.use('/', auth, require('./routes/cards'));
app.use('/', auth, require('./routes/users'));

app.use('*', (req, res) => {
  res.status(404).send({ message: 'страница не найдена' });
});

app.listen(PORT);
