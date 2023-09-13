const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb2', {

});
app.use((req, res, next) => {
  req.user = {
    _id: '6501e3584fd3f51dae11ccd8',
  };

  next();
});

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use('*', (req, res) => {
  res.status(404).send({ message: 'страница не найдена' });
});

app.listen(PORT);
