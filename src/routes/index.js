const { Router } = require('express');

const users = require('./users');
const login = require('./login');
const signup = require('./signup');
const lines = require('./lines');
const reviews = require('./reviews');
const retrieve = require('./retrieve_nearby_lines');

module.exports = () => {
    const routes = Router();
    
    users(routes);
    login(routes);
    signup(routes);
    lines(routes);
    reviews(routes);
    retrieve(routes);

    return routes;
};
