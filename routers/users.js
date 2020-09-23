const fs = require('fs').promises;
const express = require('express');
const path = require('path');
const usersRouter = express.Router();
const pathtoData = path.join(__dirname, '..', 'data', 'users.json');


function getFileContent(path) {
  return fs.readFile(path, { enconding: 'utf-8' })
    .then(JSON.parse)
    .catch(console.log)
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
      const user = users.find((user) => user._id === req.params.id);
      if (user) {
        return res.send(user);
      }
      res.status(404).send({ message: "User ID not found" });
    });
})



module.exports = usersRouter;