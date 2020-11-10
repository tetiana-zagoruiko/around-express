const express = require('express');
const cardsRouter = express.Router();
const { postCard, getAllCards, deleteCardByID, likeCard, dislikeCard } = require('../controllers/cards');

cardsRouter.post('/', postCard);
cardsRouter.get('/', getAllCards);
cardsRouter.delete('/:id', deleteCardByID);
cardsRouter.put('/:id/likes', likeCard);
cardsRouter.delete('/:id/likes', dislikeCard);


module.exports = cardsRouter;