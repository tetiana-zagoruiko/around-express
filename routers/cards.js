const fs = require('fs').promises;
const express = require('express');
const path = require('path');
const cardsRouter = express.Router();
const pathtoData = path.join(__dirname, '..', 'data', 'cards.json');


function getCardContent(pathtoCardsData) {
  return fs.readFile(pathtoCardsData, { enconding: 'utf-8' })
    .then(JSON.parse)
    .catch(console.log)
}

cardsRouter.get('/', (req, res) => {

  getCardContent(pathtoData)
    .then((cards) => {
      res.send(cards);
    })
    .catch(res.status(500).send)
})


module.exports = cardsRouter;