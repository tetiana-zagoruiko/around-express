const fs = require('fs').promises;
const express = require('express');
const path = require('path');
const usersRouter = express.Router();
const pathtoData = path.join(__dirname, '..', 'data', 'users.json');


function getFileContent(pathtoUsersData) {
  return fs.readFile(pathtoUsersData, { enconding: 'utf-8' })
    .then(JSON.parse)
    .catch(err => {
      err.statusCode = 500;
      console.log('There was an error', err.statusCode);
    });
}

usersRouter.get('/', (req, res) => {

  getFileContent(pathtoData)
    .then((users) => {
      res.send(users);
    });
})

usersRouter.get('/:id', (req, res) => {

  getFileContent(pathtoData)
    .then((users) => {
      const userRes = users.find((user) => user._id === req.params.id);
      if (userRes) {
        return res.send(userRes);
      }
      res.status(404).send({ message: "User ID not found" });
    });
})



module.exports = usersRouter;