const express = require('express');
const app = express();

const usersController = require('./controllers/users');

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

app
    .get('/', (req, res) => {
        res.status(200).send('Happy New Year');
    })
    .use('/users', usersController)
  
app
    .listen(port, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    })
