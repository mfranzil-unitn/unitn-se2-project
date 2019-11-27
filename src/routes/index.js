const { Router } = require('express');

const users = require('./users');
//const reviews = require('./reviews');

module.exports = () => {
  const routes = Router();
  users(routes);
  //reviews(routes);

  return routes;
};
