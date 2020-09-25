const fs = require('fs').promises;
const express = require('express');
const path = require('path');
const usersRouter = express.Router();
const pathtoData = path.join(__dirname, '..', 'data', 'users.json');


function getUserContent(pathtoUsersData) {
  return fs.readFile(pathtoUsersData, { enconding: 'utf-8' })
    .then(JSON.parse)
    .catch(console.log)
}

usersRouter.get('/', (req, res) => {

  getUserContent(pathtoData)
    .then((users) => {
      res.send(users);
    })
    .catch(res.status(500).send)
})

usersRouter.get('/:id', (req, res) => {

  getUserContent(pathtoData)
    .then((users) => {
      const userRes = users.find((user) => user._id === req.params.id);
      if (userRes) {
        return res.send(userRes);
      }
      res.status(404).send({ message: "User ID not found" });
    })
    .catch(res.status(500).send)
})



module.exports = usersRouter;