const { Router } = require('express');

const users = require('./users');
const place_line = require('./place_line');

module.exports = () => {
  const routes = Router();
  users(routes);
  place_line(routes);

  return routes;
};
