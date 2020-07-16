const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use('/auth', routes);

server.listen(3333, () => {
    console.log('SERVER ON')
});