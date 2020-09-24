const fs = require('fs').promises;
const express = require('express');
const path = require('path');
const cardsRouter = express.Router();
const pathtoData = path.join(__dirname, '..', 'data', 'cards.json');


function getFileContent(pathtoCardsData) {
  return fs.readFile(pathtoCardsData, { enconding: 'utf-8' })
    .then(JSON.parse)
    .catch(err => {
      err.statusCode = 500;
      console.log('There was an error', err.statusCode);
    });
}

cardsRouter.get('/', (req, res) => {

  getFileContent(pathtoData)
    .then((cards) => {
      res.send(cards);
    });
})


module.exports = cardsRouter;