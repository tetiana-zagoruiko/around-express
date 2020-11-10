const express = require('express');
const usersRouter = express.Router();
const { postUser, getAllUsers, getUserByID, updateProfile, updateAvatar} = require('../controllers/users');

usersRouter.post('/', postUser);
usersRouter.get('/', getAllUsers);
usersRouter.get('/:id', getUserByID);
usersRouter.patch('/me', updateProfile);
usersRouter.patch('/me/avatar', updateAvatar);


module.exports = usersRouter;