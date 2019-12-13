const { Router } = require('express');

const login = require('@app/routes/login');
const signup = require('@app/routes/signup');
const middlewares = require('@app/routes/middlewares');
const users = require('@app/routes/users');
const lines = require('@app/routes/lines');
const reviews = require('@app/routes/reviews');
const retrieve = require('@app/routes/retrieveNearbyLines');
const photo = require('@app/routes/photos');
const chats = require('@app/routes/chats');

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
    chats(routes);
    
    return routes;
};
