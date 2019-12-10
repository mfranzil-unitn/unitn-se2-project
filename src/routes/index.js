const { Router } = require('express');

const login = require('./login');
const signup = require('./signup');
const middlewares = require('./middlewares/index');
const users = require('./users');
const lines = require('./lines');
const reviews = require('./reviews');
const retrieve = require('./retrieve_nearby_lines');
const photo = require('./photos');

module.exports = () => {
    const routes = Router();
    login(routes);
    signup(routes);
    middlewares.checkAuth(routes);
    users(routes);
    lines(routes);
    reviews(routes);
    retrieve(routes);
    photo(routes);

    return routes;
};
