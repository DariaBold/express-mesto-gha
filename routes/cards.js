const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const {
  getCards, createCards, deleteCardId, likeCard, dislikeCard,
} = require('../controllers/cards');
const { patternUrl } = require('../models/user');

router.get('/cards', getCards);
router.post('/cards', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().pattern(patternUrl),
  }),
}), createCards);
router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), deleteCardId);
router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), likeCard);
router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), dislikeCard);

module.exports = router;
