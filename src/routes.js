const express = require('express');
const AuthController = require('./controllers/AuthController');

const routes = express.Router();

routes.post('/register', AuthController.store);
routes.get('/', (req, res) => {
    res.send('oi');
})

module.exports = routes;