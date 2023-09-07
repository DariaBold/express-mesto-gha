const Card = require('../models/card');

module.exports.createCards = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
module.exports.deleteCardId = (req, res) => {
  if (req.params.cardId && req.params.cardId.length === 24) {
    Card.findByIdAndDelete(req.params.cardId)
      .then((card) => {
        if (card === null) {
          res.status(404).send({ message: 'Карточка по указанному _id не найдена.' });
          return;
        }
        res.send({ data: card });
      })
      .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
  } else {
    res.status(400).send({ message: 'Некорректное _id карточки.' });
  }
};

module.exports.likeCard = (req, res) => {
  if (req.params.cardId.length && req.params.cardId.length === 24) {
    Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
      .then((card) => {
        if (card === null) {
          res.status(404).send({ message: 'Карточка по указанному _id не найден.' });
          return;
        }
        res.send({ data: card });
      })
      .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
  } else {
    res.status(400).send({ message: 'Некорректный _id карточки.' });
  }
};
module.exports.dislikeCard = (req, res) => {
  if (req.params.cardId && req.params.cardId.length === 24) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
      .then((card) => {
        if (card === null) {
          res.status(404).send({ message: 'Карточка по указанному _id не найден.' });
          return;
        }
        res.send({ data: card });
      })
      .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
  } else {
    res.status(400).send({ message: 'Некорректный _id карточки.' });
  }
};
