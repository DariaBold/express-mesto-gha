const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'на сервере ошибка' });
      }
    });
};
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
module.exports.getUsersId = (req, res) => {
  if (req.params.userId && req.params.userId.length === 24) {
    User.findById(req.params.userId)
      .then((user) => {
        if (user === null) {
          res.status(404).send({ message: 'Пользователь по указанному _id не найден.' });
          return;
        }
        res.send({ data: user });
      })
      .catch((err) => res.status(500).send({ message: err.message }));
  } else {
    res.status(400).send({ message: 'Неккоректный _id.' });
  }
};
module.exports.patchUser = (req, res) => {
  const { name, about } = req.body;
  if (req.user._id) {
    User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
      .then((user) => res.status(201).send({ data: user }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          res.status(400).send({ message: err.message });
        } else {
          res.status(500).send({ message: 'на сервере ошибка' });
        }
      });
  } else {
    res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
  }
};
module.exports.patchAvatar = (req, res) => {
  const { avatar } = req.body;
  if (req.user._id) {
    User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
      .then((user) => res.send({ data: user }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          res.status(400).send({ message: err.message });
        } else {
          res.status(500).send({ message: 'на сервере ошибка' });
        }
      });
  } else {
    res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
  }
};
