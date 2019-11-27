const { Router } = require('express');

const users = require('./users');
const place_line = require('./place_line');
//const reviews = require('./reviews');

module.exports = () => {
  const routes = Router();
  users(routes);
  place_line(routes);
  //reviews(routes);

  return routes;
};
