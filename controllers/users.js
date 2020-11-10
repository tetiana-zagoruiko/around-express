const express = require('express');
const router = express.Router();
const User = require('../models/user');

module.exports.postUser = router.post('/', (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: 'Invalid data passed' })
      } else {
        res.status(500).send({ message: 'Internal server error' })
      }
    });
});

module.exports.getAllUsers = router.get('/', (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Error' }));
});

module.exports.getUserByID = router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.send({ data: user }))
    .catch(() => res.status(404).send({ message: 'User not found' }));
});

module.exports.updateProfile = router.patch('/me', (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name: name, about: about })
    .then(user => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: 'Invalid data passed' })
      } else {
        res.status(500).send({ message: 'Internal server error' })
      }
    });
});

module.exports.updateAvatar = router.patch('/me/avatar', (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body)
    .then(user => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: 'Invalid data passed' })
      } else {
        res.status(500).send({ message: 'Internal server error' })
      }
    });
});
