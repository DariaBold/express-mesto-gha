const router = require('express').Router();

const {
  getUsers, getUsersId, patchUser, patchAvatar, getUserNow,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', getUsersId);
router.get('/users/me', getUserNow);
router.patch('/users/me', patchUser);
router.patch('/users/me/avatar', patchAvatar);

module.exports = router;
