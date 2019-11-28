const { Router } = require('express');

const users = require('./users');
const lines = require('./lines');
const reviews = require('./reviews');

module.exports = () => {
  const routes = Router();
  users(routes);
  lines(routes);
  reviews(routes);

  return routes;
};
