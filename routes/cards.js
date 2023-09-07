const router = require('express').Router();

const {
  getCards, createCards, deleteCardId, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', createCards);
router.delete('/cards/:cardId', deleteCardId);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
