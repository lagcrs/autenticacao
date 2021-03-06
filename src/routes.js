const express = require('express');
const AuthController = require('./controllers/AuthController');

const routes = express.Router();

routes.post('/register', AuthController.store);
routes.post('/authenticate', AuthController.auth);
routes.get('/', (req, res) => {
    res.send('Sistema de Autenticação');
})

module.exports = routes;