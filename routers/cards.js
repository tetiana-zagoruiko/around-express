const fs = require('fs').promises;
const express = require('express');
const path = require('path');
const cardsRouter = express.Router();
const pathtoData = path.join(__dirname, '..', 'data', 'cards.json');


function getFileContent(path) {
  return fs.readFile(path, { enconding: 'utf-8' })
    .then(JSON.parse)
    .catch(console.log)
}

cardsRouter.get('/', (req, res) => {

  getFileContent(pathtoData)
    .then((cards) => {
      res.send(cards);
    });
})


module.exports = cardsRouter;