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
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        res.status(400).send({ message: 'Это карточка другого участника.' });
      }
      Card.delete(card)
        .orFail()
        .then(() => { res.send({ message: 'Это карточка удалена.' }); })
        .catch((err) => {
          if (req.params.cardId.length !== 24) {
            res.status(400).send({ message: 'Некорректный _id карточки.' });
          } else if (err.name === 'DocumentNotFoundError') {
            res.status(404).send({ message: 'Карточка по указанному _id не найден.' });
          } else {
            res.status(500).send({ message: 'На сервере произошла ошибка' });
          }
        });
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Карточка по указанному _id не найден.' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (req.params.cardId.length !== 24) {
        res.status(400).send({ message: 'Некорректный _id карточки.' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Карточка по указанному _id не найден.' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (req.params.cardId.length !== 24) {
        res.status(400).send({ message: 'Некорректный _id карточки.' });
      } else if (err.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Карточка по указанному _id не найден.' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};
