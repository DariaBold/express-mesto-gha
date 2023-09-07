const router = require('express').Router();

const {
  getUsers, createUser, getUsersId, patchUser, patchAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.post('/users', createUser);
router.get('/users/:userId', getUsersId);
router.patch('/users/me', patchUser);
router.patch('/users/me/avatar', patchAvatar);

module.exports = router;
