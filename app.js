const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const {
  celebrate, Joi, Segments, errors,
} = require('celebrate');

const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb2', {

});

app.post('/signin', login);
app.post('/signup', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use('/', auth, require('./routes/cards'));
app.use('/', auth, require('./routes/users'));

// app.use('*', (req, res) => {
//   res.status(404).send({ message: 'страница не найдена' });
// });
app.use(errors());
app.use((err, req, res, next) => {
  const { code = 500, message } = err;
  res.status(code).send({
    message: code === 500
      ? 'Ошибка сервера' : message,
  });
  next();
});

app.listen(PORT);
