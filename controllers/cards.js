const express = require('express');
const router = express.Router();
const Card = require('../models/card');

module.exports.postCard = router.post('/', (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then(card => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: 'Invalid data passed' })
      } else {
        res.status(500).send({ message: 'Internal server error' })
      }
    });
});

module.exports.getAllCards = router.get('/', (req, res) => {
  Card.find({})
    .then(card => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Internal server error' }));
});

module.exports.deleteCardByID = router.delete('/:id', (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then(card => res.send({ data: card }))
    .catch((err) => res.status(404).send({ message: 'Card not found' }));
});

module.exports.likeCard = router.put('/:id/likes', (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then(card => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: 'Internal server error' }));
});

module.exports.dislikeCard = router.delete('/:id/likes', (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then(card => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Internal server error' }));
});
