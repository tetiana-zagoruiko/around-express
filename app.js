const { PORT = 3000 } = process.env;
const express = require('express');
const app = express();
const path = require('path');

const usersRouter = require('./routers/users');
const cardsRouter = require('./routers/cards');


app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.get('*', (req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
})


app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`)
});